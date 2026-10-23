CREATE TABLE commandes_fournisseurs (
    id SERIAL PRIMARY KEY,
    artisan_nom VARCHAR(255) NOT NULL,
    chantier_nom VARCHAR(255) NOT NULL,
    statut VARCHAR(50) DEFAULT 'en_attente',
    articles JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

INSERT INTO commandes_fournisseurs (artisan_nom, chantier_nom, articles) 
VALUES (
    'Koffi Bâtiment', 
    'Zogbadjè, Abomey-Calavi', 
    '[{"nom": "Ciment CPJ 35", "quantite": 20, "unite": "sacs", "prix": 4500}, {"nom": "Fer à béton 8 mm", "quantite": 15, "unite": "barres", "prix": 3200}]'
) ON CONFLICT DO NOTHING;
