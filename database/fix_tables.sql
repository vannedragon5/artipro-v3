-- 1. Création des tables manquantes
CREATE TABLE certifications (
    id BIGSERIAL PRIMARY KEY,
    artisan_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
    titre VARCHAR(255) NOT NULL,
    document_url VARCHAR(500),
    est_verifie BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE chantiers (
    id BIGSERIAL PRIMARY KEY,
    artisan_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
    client_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
    titre VARCHAR(255) NOT NULL,
    type_metier metier NOT NULL,
    statut VARCHAR(50) DEFAULT 'en_cours',
    localisation VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE avis_clients (
    id BIGSERIAL PRIMARY KEY,
    artisan_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
    client_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
    chantier_id BIGINT REFERENCES chantiers(id) ON DELETE CASCADE,
    note INT CHECK (note >= 1 AND note <= 5),
    commentaire TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Insertion des données (Gédéon, CQM, Joël, Chantier)
INSERT INTO certifications (artisan_id, titre, document_url, est_verifie) VALUES 
(2, 'Certificat de Qualification aux Métiers (CQM) - Maçonnerie', 'lien_vers_scan_cqm.pdf', TRUE),
(2, 'Attestation Formation CFPA - Abomey', 'lien_vers_attestation.pdf', TRUE);

INSERT INTO users (id, role, nom, telephone, mot_de_passe_hash) 
VALUES (3, 'client', 'Joël Ballo', '22995000000', 'hash_factice_789') ON CONFLICT DO NOTHING;

INSERT INTO chantiers (id, artisan_id, client_id, titre, type_metier, statut, localisation)
VALUES (1, 2, 3, 'Mur de clôture Zogbadjè', 'maconnerie', 'cloture', 'Abomey-Calavi') ON CONFLICT DO NOTHING;

INSERT INTO avis_clients (artisan_id, client_id, chantier_id, note, commentaire) VALUES 
(2, 3, 1, 5, 'Travail très propre et dans les délais, artisan sérieux.'),
(2, 3, 1, 4, 'Bon travail, juste un petit retard sur la livraison du sable.');

SELECT setval('chantiers_id_seq', 2);
