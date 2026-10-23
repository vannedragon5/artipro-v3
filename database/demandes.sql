CREATE TABLE demandes_clients (
    id BIGSERIAL PRIMARY KEY,
    client_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
    titre VARCHAR(255) NOT NULL,
    description_audio VARCHAR(255), -- Lien vers le fichier vocal
    statut VARCHAR(50) DEFAULT 'en_attente',
    created_at TIMESTAMPTZ DEFAULT now()
);

INSERT INTO demandes_clients (client_id, titre, description_audio, statut) 
VALUES (3, 'Construction d''un puits aménagé', 'vocal_client_123.mp3', 'en_attente') ON CONFLICT DO NOTHING;
