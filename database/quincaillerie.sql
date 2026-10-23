CREATE TABLE produits (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    description TEXT,
    prix_unitaire NUMERIC(10, 2) NOT NULL,
    unite VARCHAR(50) NOT NULL
);

INSERT INTO produits (nom, description, prix_unitaire, unite) VALUES 
('Ciment CIMBENIN 42.5', 'Sac de 50kg, idéal pour gros œuvre', 4500, 'sac'),
('Fer à béton 10mm', 'Barre de 12m, haute adhérence', 3200, 'barre'),
('Fer à béton 8mm', 'Barre de 12m', 2100, 'barre'),
('Sable lagunaire', 'Camion de 10 roues', 65000, 'camion'),
('Gravier concassé', 'Camion de 10 roues', 120000, 'camion') ON CONFLICT DO NOTHING;
