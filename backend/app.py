from flask import Flask, jsonify, request
from flask_cors import CORS
import psycopg2
from psycopg2.extras import RealDictCursor
import json

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

def get_db_connection():
    return psycopg2.connect(host="127.0.0.1", database="artipro_v3", user="postgres")

# --- ROUTES ARTISAN ET CLIENT EXISTANTES ---
@app.route('/api/feed', methods=['GET'])
def get_feed():
    conn = get_db_connection()
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    cursor.execute("SELECT id, titre, contenu, created_at, 'actualite' as source FROM actualites ORDER BY created_at DESC LIMIT 10")
    actualites = cursor.fetchall()
    cursor.execute("SELECT p.id, p.titre, p.description, p.created_at, u.nom as artisan_nom, 'portfolio' as source FROM portfolio p JOIN users u ON p.artisan_id = u.id WHERE p.est_public = TRUE ORDER BY p.created_at DESC LIMIT 15")
    portfolios = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify({"status": "success", "data": sorted(actualites + portfolios, key=lambda x: x['created_at'], reverse=True)}), 200

@app.route('/api/artisans/<int:artisan_id>/reputation', methods=['GET'])
def get_reputation(artisan_id):
    conn = get_db_connection()
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    cursor.execute("SELECT COALESCE(AVG(note), 0) as moyenne, COUNT(id) as total_avis FROM avis_clients WHERE artisan_id = %s", (artisan_id,))
    avis = cursor.fetchone()
    cursor.execute("SELECT COUNT(id) as total_chantiers FROM chantiers WHERE artisan_id = %s AND statut = 'cloture'", (artisan_id,))
    chantiers = cursor.fetchone()
    cursor.execute("SELECT titre, est_verifie FROM certifications WHERE artisan_id = %s", (artisan_id,))
    certs = cursor.fetchall()
    indice = (float(avis['moyenne']) * 10) + min(chantiers['total_chantiers'] * 2, 20) + (30 if any(c['est_verifie'] for c in certs) else 0)
    cursor.close()
    conn.close()
    return jsonify({"status": "success", "data": {"indice_confiance": round(indice, 1), "certifications": certs}}), 200

@app.route('/api/artisans/<int:artisan_id>/chantiers', methods=['GET'])
def get_chantiers(artisan_id):
    conn = get_db_connection()
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    cursor.execute("SELECT id, titre, statut, localisation, type_metier FROM chantiers WHERE artisan_id = %s ORDER BY created_at DESC", (artisan_id,))
    chantiers = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify({"status": "success", "data": chantiers}), 200

@app.route('/api/chantiers/<int:chantier_id>/taches', methods=['GET'])
def get_taches(chantier_id):
    conn = get_db_connection()
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    cursor.execute("SELECT id, nom, est_coche FROM taches_chantier WHERE chantier_id = %s ORDER BY id ASC", (chantier_id,))
    taches = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify({"status": "success", "data": taches}), 200

@app.route('/api/taches/<int:tache_id>/toggle', methods=['PUT'])
def toggle_tache(tache_id):
    data = request.json
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("UPDATE taches_chantier SET est_coche = %s WHERE id = %s", (data.get('est_coche', False), tache_id))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({"status": "success"}), 200

@app.route('/api/produits', methods=['GET'])
def get_produits():
    conn = get_db_connection()
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    cursor.execute("SELECT id, nom, description, prix_unitaire, unite FROM produits ORDER BY id DESC")
    produits = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify({"status": "success", "data": produits}), 200

@app.route('/api/demandes', methods=['GET'])
def get_demandes():
    conn = get_db_connection()
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    cursor.execute("""
        SELECT d.id, d.titre, d.description_audio, d.created_at, u.nom as client_nom, u.telephone as client_tel
        FROM demandes_clients d JOIN users u ON d.client_id = u.id 
        WHERE d.statut = 'en_attente' ORDER BY d.created_at DESC
    """)
    demandes = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify({"status": "success", "data": demandes}), 200

@app.route('/api/artisans/<int:artisan_id>/demandes/<int:demande_id>/repondre', methods=['POST'])
def repondre_demande(artisan_id, demande_id):
    data = request.json
    conn = get_db_connection()
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    cursor.execute("UPDATE demandes_clients SET statut = 'repondu' WHERE id = %s RETURNING titre, client_id", (demande_id,))
    demande = cursor.fetchone()
    if demande:
        cursor.execute("""
            INSERT INTO chantiers (artisan_id, client_id, titre, type_metier, statut, localisation) 
            VALUES (%s, %s, %s, 'maconnerie', 'en_cours', 'Abomey-Calavi (Via Devis)')
            RETURNING id
        """, (artisan_id, demande['client_id'], demande['titre']))
        nouveau_chantier = cursor.fetchone()
        cursor.execute("INSERT INTO taches_chantier (chantier_id, nom) VALUES (%s, 'Prise de contact client'), (%s, 'Achat matériaux')", (nouveau_chantier['id'], nouveau_chantier['id']))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({"status": "success"}), 201

@app.route('/api/demandes', methods=['POST'])
def create_demande():
    data = request.json
    titre = f"Besoin en {data.get('type_metier', 'divers').capitalize()}"
    audio_filename = "vocal_client_nouveau.mp3" 
    conn = get_db_connection()
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    cursor.execute("""
        INSERT INTO demandes_clients (client_id, titre, description_audio, statut) 
        VALUES (%s, %s, %s, 'en_attente') RETURNING id, statut
    """, (3, titre, audio_filename))
    nouvelle_demande = cursor.fetchone()
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({"status": "success", "data": nouvelle_demande}), 201

# --- NOUVELLES ROUTES FOURNISSEUR ---
@app.route('/api/fournisseur/produits', methods=['POST'])
def add_produit():
    data = request.json
    conn = get_db_connection()
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    cursor.execute("""
        INSERT INTO produits (nom, description, prix_unitaire, unite) 
        VALUES (%s, %s, %s, %s) RETURNING id, nom, description, prix_unitaire, unite
    """, (data.get('nom'), data.get('categorie', 'Divers'), data.get('prix'), data.get('unite')))
    nouveau_produit = cursor.fetchone()
    conn.commit()
    cursor.close()
    conn.close()
    # Le frontend attend le champ en_stock, on l'ajoute dynamiquement pour la réponse
    nouveau_produit['en_stock'] = data.get('en_stock', True)
    return jsonify({"status": "success", "data": nouveau_produit}), 201

@app.route('/api/fournisseur/commandes', methods=['GET'])
def get_commandes_fournisseur():
    conn = get_db_connection()
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    cursor.execute("SELECT id, artisan_nom as artisan, chantier_nom as chantier, statut, articles, to_char(created_at, 'DD/MM/YYYY HH24:MI') as date FROM commandes_fournisseurs ORDER BY created_at DESC")
    commandes = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify({"status": "success", "data": commandes}), 200

@app.route('/api/commandes/<int:commande_id>/statut', methods=['PUT'])
def update_commande_statut(commande_id):
    data = request.json
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("UPDATE commandes_fournisseurs SET statut = %s WHERE id = %s", (data.get('statut'), commande_id))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({"status": "success", "statut": data.get('statut')}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
