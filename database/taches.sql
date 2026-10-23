CREATE TABLE taches_chantier (
    id BIGSERIAL PRIMARY KEY,
    chantier_id BIGINT REFERENCES chantiers(id) ON DELETE CASCADE,
    nom VARCHAR(255) NOT NULL,
    est_coche BOOLEAN DEFAULT FALSE
);

INSERT INTO taches_chantier (chantier_id, nom, est_coche) VALUES 
(1, 'Installation du chantier et sécurisation', TRUE),
(1, 'Fouilles et fondations', TRUE),
(1, 'Élévation des murs (Agglos pleins)', FALSE),
(1, 'Coulage du chaînage haut', FALSE),
(1, 'Nettoyage final et repli', FALSE) ON CONFLICT DO NOTHING;
