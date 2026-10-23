CREATE TYPE role_user AS ENUM ('artisan', 'fournisseur', 'client', 'admin');
CREATE TYPE metier AS ENUM ('maconnerie', 'electricite', 'plomberie', 'peinture', 'carrelage');

CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    role role_user NOT NULL DEFAULT 'artisan',
    nom VARCHAR(255) NOT NULL,
    telephone VARCHAR(20) UNIQUE NOT NULL,
    mot_de_passe_hash VARCHAR(255) NOT NULL,
    type_metier metier NULL,
    zone_intervention VARCHAR(255),
    code_parrainage VARCHAR(50) UNIQUE,
    est_verifie BOOLEAN DEFAULT FALSE,
    fournisseur_origine_id BIGINT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE fournisseurs (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    slug VARCHAR(80) UNIQUE NOT NULL,
    nom VARCHAR(255) NOT NULL,
    whatsapp VARCHAR(20),
    localisation VARCHAR(255),
    est_agree BOOLEAN DEFAULT TRUE,
    date_expiration_acces TIMESTAMPTZ DEFAULT (now() + interval '30 days'), 
    created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE users ADD CONSTRAINT users_fournisseur_origine_fk FOREIGN KEY (fournisseur_origine_id) REFERENCES fournisseurs(id) ON DELETE SET NULL;

CREATE TABLE actualites (
    id BIGSERIAL PRIMARY KEY,
    titre VARCHAR(255) NOT NULL,
    contenu TEXT NOT NULL,
    type VARCHAR(50) DEFAULT 'info' CHECK (type IN ('info', 'realisation', 'alerte')),
    auteur_id BIGINT REFERENCES users(id) ON DELETE SET NULL, 
    lien_url VARCHAR(500),
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE portfolio (
    id BIGSERIAL PRIMARY KEY,
    artisan_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    chantier_id BIGINT,
    titre VARCHAR(255) NOT NULL,
    description TEXT,
    type_metier metier NOT NULL,
    photos JSONB,
    est_public BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT now()
);
