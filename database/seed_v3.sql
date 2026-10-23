-- ========================================================
-- ARTIPRO V3 - DONNÉES DE TEST (SEED)
-- Peuplement de la base pour tester l'API et le Frontend
-- ========================================================

-- 1. Création d'une quincaillerie (Fournisseur)
INSERT INTO users (id, role, nom, telephone, mot_de_passe_hash, est_verifie) 
VALUES (1, 'fournisseur', 'Quincaillerie La Bénédiction', '22997001122', 'hash_factice_123', TRUE);

INSERT INTO fournisseurs (user_id, slug, nom, whatsapp, localisation)
VALUES (1, 'quincaillerie-benediction', 'Quincaillerie La Bénédiction', '22997001122', 'Cotonou, Akpakpa');

-- 2. Création d'un artisan (Toi, parrainé par la quincaillerie)
INSERT INTO users (id, role, nom, telephone, mot_de_passe_hash, type_metier, zone_intervention, fournisseur_origine_id, est_verifie) 
VALUES (2, 'artisan', 'Gédéon Atindjebo', '22990112233', 'hash_factice_456', 'maconnerie', 'Cotonou', 1, TRUE);

-- 3. Ajout de Diplômes / Certifications (Le fameux CQM)
INSERT INTO certifications (artisan_id, titre, document_url, est_verifie) VALUES 
(2, 'Certificat de Qualification aux Métiers (CQM) - Maçonnerie', 'lien_vers_scan_cqm.pdf', TRUE),
(2, 'Attestation Formation CFPA - Abomey', 'lien_vers_attestation.pdf', TRUE);

-- 4. Un faux client et un chantier clôturé (pour l'expérience)
INSERT INTO users (id, role, nom, telephone, mot_de_passe_hash) 
VALUES (3, 'client', 'Joël Ballo', '22995000000', 'hash_factice_789');

INSERT INTO chantiers (id, artisan_id, client_id, titre, type_metier, statut, localisation)
VALUES (1, 2, 3, 'Mur de clôture Zogbadjè', 'maconnerie', 'cloture', 'Abomey-Calavi');

-- 5. Ajout de faux avis clients pour booster la note
INSERT INTO avis_clients (artisan_id, client_id, chantier_id, note, commentaire) VALUES 
(2, 3, 1, 5, 'Travail très propre et dans les délais, artisan sérieux.'),
(2, 3, 1, 4, 'Bon travail, juste un petit retard sur la livraison du sable.');

-- 6. Alimentation de la Veille Sectorielle (Actualités + Portfolio)
INSERT INTO actualites (titre, contenu, type) VALUES 
('Lancement de ArtiPro V3 !', 'Bienvenue sur la nouvelle version de votre assistant de chantier.', 'info'),
('Alerte Météo : Fortes pluies', 'Attention aux coulages de dalles prévus cette semaine sur Cotonou.', 'alerte');

INSERT INTO portfolio (artisan_id, chantier_id, titre, description, type_metier, est_public) VALUES 
(2, 1, 'Réalisation d''un mur de soutènement', 'Mise en place des fondations et élévation en agglos pleins.', 'maconnerie', TRUE);

-- Ajustement des séquences (pour éviter les erreurs lors des prochains ajouts via l'API)
SELECT setval('users_id_seq', 4);
SELECT setval('chantiers_id_seq', 2);
