ARTIPRO-BTP

Cahier des charges général de finalisation intégrale de l'application métier

Document : AGF-007
Version : 1.0
Statut : Spécification de référence pour la finalisation technique et fonctionnelle
Produit : ArtiPro-BTP
Écosystème : ARTI — Affaires, Rendement, Travail & Innovation
Destinataire : Agent IA de développement logiciel
Objectif final : Obtenir une application métier cohérente, fonctionnelle, sécurisée, testée et prête pour le lancement du pilote auprès des artisans.

---

1. MISSION GÉNÉRALE

Tu es chargé de prendre en charge la finalisation intégrale du projet logiciel existant ArtiPro-BTP.

Tu dois intervenir comme un ingénieur logiciel senior capable d'effectuer un audit de code, de comprendre une architecture existante, de concevoir les composants manquants, de corriger les défauts, d'intégrer le frontend au backend, de tester les parcours utilisateur et de préparer une application pour sa mise en exploitation.

Le projet existe déjà. Il peut contenir des fonctionnalités achevées, des fonctionnalités partiellement implémentées, des interfaces alimentées par des données fictives, des opérations simulées, des défauts techniques ou des modules incomplets.

Ta mission consiste à transformer cet état existant en un produit métier cohérent et opérationnel.

1.1. Résultats obligatoires

À la fin de ta mission :

1. L'application doit avoir été auditée dans son ensemble.
2. Les fonctionnalités existantes doivent avoir été vérifiées.
3. Les mocks et simulations présents dans les parcours de production doivent avoir été remplacés par de véritables implémentations.
4. Les fonctionnalités métier indispensables doivent fonctionner de bout en bout.
5. Les interfaces doivent être reliées aux véritables opérations backend.
6. Les données doivent être correctement enregistrées, consultées, modifiées et supprimées lorsque cela est autorisé.
7. Les erreurs doivent être gérées proprement.
8. Les problèmes de sécurité et les défauts critiques doivent être corrigés.
9. Les tests pertinents doivent être exécutés.
10. La documentation technique et opérationnelle doit être actualisée.
11. L'application doit être prête pour une démonstration professionnelle et un pilote terrain.
12. Les éventuels blocages externes doivent être clairement identifiés, sans être masqués par des simulations.

Ne te limite pas à produire un rapport, des recommandations ou des maquettes. Tu dois effectivement réaliser les modifications nécessaires dans le dépôt auquel tu as accès, les vérifier et documenter les résultats.

---

2. PRINCIPES DE TRAVAIL IMPÉRATIFS

2.1. Comprendre avant de modifier

Commence par examiner le dépôt complet :

- Structure des répertoires et fichiers.
- Technologies utilisées et versions.
- Configuration du projet.
- Frontend et backend.
- Routes et composants.
- API et services.
- Base de données, schémas et migrations.
- Authentification et autorisations.
- Gestion des fichiers.
- Paiements et abonnements.
- Tâches asynchrones éventuelles.
- Tests existants.
- Configuration de déploiement.
- Variables d'environnement et services externes.
- Documentation technique existante.

Consulte également les fichiers de configuration, les scripts de lancement, les journaux d'erreur disponibles et l'historique du projet lorsque cela est utile.

Établis une cartographie des fonctionnalités réellement présentes.

2.2. Préserver l'architecture existante

Tu dois :

- Conserver la stack technique actuelle lorsqu'elle est viable.
- Réutiliser les composants et services déjà fonctionnels.
- Éviter les réécritures intégrales sans nécessité démontrée.
- Respecter les conventions du projet.
- Réutiliser les bibliothèques déjà présentes lorsqu'elles conviennent.
- Limiter les dépendances supplémentaires.
- Éviter la duplication de code et de logique métier.
- Maintenir la compatibilité des API et des données existantes lorsque cela est possible.

Si une modification architecturale importante est nécessaire, explique le problème, les risques et la solution retenue dans le rapport final.

2.3. Ne jamais simuler une fonctionnalité de production

Il est interdit de déclarer une fonctionnalité terminée simplement parce que son interface est visible.

Exemples de défauts à éliminer :

- Bouton qui affiche un succès sans effectuer l'opération.
- Devis qui disparaît après rechargement.
- Tableau de bord alimenté par des statistiques codées en dur.
- Profil qui affiche des données fictives en production.
- Fonction de partage qui génère un lien inutilisable.
- Paiement déclaré réussi sans confirmation du prestataire.
- Recherche qui filtre uniquement un tableau statique.
- API qui retourne des exemples fixes à la place des données persistées.
- Fonctionnalité qui ne fonctionne qu'avec un compte administrateur.

Les données fictives peuvent être conservées dans des fixtures ou un environnement de démonstration clairement isolé, mais elles ne doivent pas être confondues avec les données réelles.

2.4. Travailler avec autonomie et traçabilité

Ne demande pas une validation humaine pour chaque correction ordinaire. Tu dois pouvoir analyser, planifier, implémenter et tester de manière autonome.

En revanche, ne réalise pas sans autorisation les opérations qui pourraient détruire des données, supprimer des ressources, modifier irréversiblement un environnement de production, engager des dépenses ou exposer des secrets.

Ne prétends jamais avoir testé, déployé ou corrigé quelque chose si tu ne l'as pas réellement fait.

---

3. IDENTITÉ ET FINALITÉ DU PRODUIT

ArtiPro-BTP est une application métier destinée aux artisans et professionnels du bâtiment et des travaux publics.

Elle doit les aider à structurer et gérer leur activité professionnelle depuis leur téléphone ou leur ordinateur.

Le produit doit permettre de passer progressivement d'une activité gérée de manière informelle à une activité documentée, organisée, présentable et plus facile à développer.

3.1. Proposition de valeur

Un artisan doit pouvoir :

- Présenter son activité et ses compétences.
- Gérer les informations professionnelles utiles.
- Préparer rapidement des devis.
- Organiser ses chantiers.
- Suivre l'évolution de son travail.
- Gérer les documents associés.
- Retrouver son historique professionnel.
- Constituer un portfolio à partir de ses réalisations.
- Partager son profil et ses réalisations avec ses clients.
- Accéder aux services correspondant à son abonnement ou à ses achats.

L'application doit être simple à prendre en main, même pour un utilisateur peu habitué aux logiciels de gestion.

3.2. Priorité produit

Le périmètre minimal prioritaire repose sur deux fonctions centrales :

1. Le devis rapide.
2. Le carnet de chantier.

Les autres modules doivent compléter ces deux fonctions sans compromettre leur fiabilité.

L'objectif immédiat n'est pas de multiplier les fonctionnalités. Il est de disposer d'un produit stable, compréhensible, réellement utilisable et suffisamment abouti pour un pilote auprès d'artisans.

---

4. UTILISATEURS, RÔLES ET AUTORISATIONS

Identifie les rôles déjà définis dans le projet. Complète le système de permissions selon les besoins réels, sans créer inutilement des comptes ou des niveaux hiérarchiques.

4.1. Artisan

L'artisan doit pouvoir, selon les droits accordés :

- Créer et gérer son profil.
- Gérer ses coordonnées et ses compétences.
- Créer et gérer ses devis.
- Créer et suivre ses chantiers.
- Consulter ses documents.
- Consulter son portfolio.
- Partager les informations autorisées.
- Gérer son abonnement et consulter son historique de transactions.
- Modifier les paramètres de son compte.

4.2. Visiteur ou client

Les informations publiques accessibles sans authentification doivent être strictement limitées aux contenus prévus pour le partage.

Un visiteur autorisé doit pouvoir consulter le profil public d'un artisan, les réalisations rendues publiques et les documents explicitement partagés avec lui.

Il ne doit jamais pouvoir accéder aux données privées d'autres utilisateurs.

Si le produit prévoit un parcours client authentifié, vérifie son existence et complète-le selon l'architecture existante.

4.3. Administrateur

L'administration doit permettre aux personnes autorisées de gérer les opérations nécessaires à l'exploitation :

- Consulter les comptes et leur statut.
- Rechercher les utilisateurs.
- Contrôler les abonnements et les transactions.
- Gérer les catégories et paramètres métier.
- Consulter les erreurs et événements techniques utiles.
- Effectuer les opérations de support autorisées.
- Détecter les anomalies et abus.
- Consulter les indicateurs d'activité disponibles.

Les actions sensibles doivent être protégées par des permissions appropriées et, lorsque nécessaire, une journalisation.

Ne crée pas une interface d'administration qui contourne les contrôles de sécurité du backend.

4.4. Règles générales d'accès

- Un utilisateur ne peut modifier que les ressources auxquelles il a droit.
- Les autorisations sont contrôlées côté serveur.
- Les identifiants de ressources ne constituent jamais une preuve d'autorisation.
- Les ressources privées ne sont pas exposées par une simple modification d'URL.
- Les opérations administratives sont réservées aux rôles autorisés.
- Les règles d'accès aux documents partagés sont explicites et vérifiées.

---

5. GESTION DU PROFIL PROFESSIONNEL

Le profil constitue l'identité métier de l'artisan sur ArtiPro-BTP.

5.1. Informations à gérer

Selon le modèle de données existant et les besoins du produit :

- Nom ou nom commercial.
- Photo ou logo.
- Présentation de l'activité.
- Métier principal.
- Spécialités.
- Compétences.
- Localisation professionnelle.
- Coordonnées de contact.
- Références professionnelles.
- Réalisations publiées.
- Statut du profil.
- Date de création et de mise à jour.

N'impose pas inutilement des informations qui ne sont pas nécessaires au parcours métier.

5.2. Fonctionnement attendu

L'artisan doit pouvoir créer, consulter et modifier son profil.

Les modifications doivent être persistées et visibles après rechargement ou reconnexion.

Le système doit distinguer :

- Les informations privées.
- Les informations publiques.
- Les informations partagées dans un contexte particulier.

La publication du profil doit respecter les paramètres de visibilité.

5.3. Qualité

Prévoir la validation des champs, le traitement des valeurs manquantes, la gestion des images, les messages d'erreur et la prévention des doublons lorsque cela est pertinent.

---

6. MODULE DE DEVIS — FONCTION PRIORITAIRE

Le module de devis doit permettre à l'artisan de produire un document professionnel rapidement, sans calculs manuels répétitifs.

6.1. Création d'un devis

L'artisan doit pouvoir renseigner :

- Un numéro de devis unique.
- La date de création.
- La date de validité si nécessaire.
- Les informations du client.
- Le chantier ou l'objet de la prestation.
- Les lignes de travaux.
- Les quantités.
- Les unités.
- Les prix unitaires.
- Les remises éventuelles.
- Les taxes éventuelles, selon le régime applicable.
- Les conditions et observations.
- Le statut du devis.

Les champs obligatoires doivent être clairement identifiés.

6.2. Calculs

Le système doit calculer les montants à partir des lignes de devis.

Pour chaque ligne :

Montant de ligne = quantité × prix unitaire.

Le total doit être calculé selon les règles métier applicables, avec prise en compte des remises et taxes lorsqu'elles sont activées.

Les calculs doivent être effectués de manière fiable côté serveur ou validés côté serveur, et ne doivent pas dépendre exclusivement des valeurs envoyées par le navigateur.

Évite les erreurs d'arrondi et utilise une représentation numérique adaptée aux montants financiers.

La devise doit être explicitement gérée. Vérifie la configuration actuelle et utilise le franc CFA BCEAO (XOF) si cela correspond à la configuration métier du projet.

6.3. Cycle de vie

Le devis doit pouvoir être :

- Créé.
- Enregistré comme brouillon.
- Consulté.
- Modifié selon son état.
- Dupliqué si cette fonction est prévue.
- Généré en document téléchargeable.
- Partagé.
- Retrouvé dans l'historique.

Si le projet gère des statuts tels que brouillon, envoyé, accepté ou refusé, vérifie leur cohérence et formalise les transitions autorisées.

Ne prétends pas qu'un client a accepté un devis sans événement ou action permettant de le confirmer.

6.4. Document final

Le devis généré doit présenter :

- L'identité professionnelle de l'artisan.
- Les informations du client.
- Le numéro et la date.
- Le détail des prestations.
- Les quantités et montants.
- Les totaux.
- Les conditions utiles.
- Les mentions applicables au document.

La mise en page doit être lisible sur téléphone et dans un document imprimé.

6.5. Historique

L'artisan doit pouvoir retrouver ses devis, consulter leur état et accéder aux documents correspondants.

Les filtres et recherches doivent utiliser les véritables données enregistrées.

---

7. CARNET DE CHANTIER — FONCTION PRIORITAIRE

Le carnet de chantier doit permettre de documenter le travail réalisé et de conserver une trace exploitable de l'activité.

7.1. Création d'un chantier

Informations possibles :

- Nom ou référence du chantier.
- Client associé.
- Localisation.
- Description.
- Type de travaux.
- Date de début.
- Date prévisionnelle de fin.
- Statut.
- Devis associé.
- Notes utiles.

Les champs obligatoires doivent être définis à partir des règles métier réelles.

7.2. Suivi du chantier

L'artisan doit pouvoir :

- Consulter les chantiers.
- Modifier les informations autorisées.
- Mettre à jour l'avancement.
- Ajouter des observations.
- Enregistrer des étapes ou événements.
- Associer les documents nécessaires.
- Consulter l'historique.
- Clôturer un chantier.

Si des photos sont prévues, leur téléversement, leur stockage et leur association au chantier doivent fonctionner réellement.

7.3. États et transitions

Définis ou conserve des états cohérents : par exemple, à préparer, en cours, terminé ou annulé.

Les transitions doivent respecter les règles métier. La clôture d'un chantier ne doit pas supprimer son historique.

7.4. Historique et intégrité

Les informations enregistrées doivent rester disponibles après reconnexion.

Les modifications importantes doivent être traçables lorsque nécessaire.

Les chantiers d'un utilisateur ne doivent pas être accessibles à un autre utilisateur sans autorisation.

---

8. RELATION ENTRE DEVIS, CHANTIERS ET RÉALISATIONS

Le produit doit éviter les silos de données.

Lorsqu'un devis est associé à un chantier, cette relation doit être conservée dans le modèle de données.

Lorsqu'un chantier est terminé, l'application doit permettre de transformer les informations pertinentes en une réalisation de portfolio, selon les règles de publication retenues.

Cette transformation peut être automatique ou proposer une validation par l'artisan, selon le fonctionnement actuel. Dans tous les cas, elle ne doit pas publier des informations privées sans autorisation.

Le système doit préserver la cohérence entre :

- Le profil de l'artisan.
- Le devis.
- Le chantier.
- Les documents.
- Les réalisations du portfolio.

La modification ou la suppression d'un objet ne doit pas provoquer de corruption silencieuse des données liées.

---

9. PORTFOLIO PROFESSIONNEL ET PARTAGE

Le portfolio doit permettre à l'artisan de présenter ses réalisations et de valoriser son travail.

9.1. Réalisations

Chaque réalisation peut contenir :

- Un titre.
- Une description.
- Le type de travaux.
- Une localisation générale.
- Une date ou période.
- Des photos autorisées.
- Un chantier d'origine.
- Un statut de publication.

N'affiche pas automatiquement les coordonnées privées du client, les adresses précises ou les documents confidentiels.

9.2. Profil public

Le profil public doit être consultable à travers une URL stable lorsque la fonction existe ou est nécessaire au produit.

Les visiteurs doivent pouvoir accéder aux informations publiées sans obtenir de droits sur les ressources privées.

9.3. Partage par QR code

Le système doit permettre de produire un QR code associé au profil public ou à un lien de partage autorisé.

Le scan doit ouvrir la bonne ressource, sur téléphone notamment.

Le QR code ne doit jamais exposer directement un identifiant secret ou permettre de contourner l'authentification.

Teste le lien généré, son comportement sur mobile et les cas où le profil n'est plus publié.

---

10. PLANNING ET ORGANISATION DU TRAVAIL

Vérifie les fonctions de planning déjà présentes dans l'application et finalise celles qui correspondent au périmètre métier retenu.

Selon le modèle existant, un utilisateur doit pouvoir :

- Visualiser les échéances des chantiers.
- Consulter les dates de début et de fin prévues.
- Identifier les tâches ou étapes à réaliser.
- Repérer les retards.
- Modifier les échéances autorisées.
- Consulter les informations associées à chaque chantier.

Les dates doivent être enregistrées et restituées correctement.

Les vues calendrier ou listes doivent être adaptées au mobile.

Ne développe pas un système complexe de gestion des ressources ou de planification avancée si cela n'est pas nécessaire au pilote.

---

11. DOCUMENTS ET GESTION DES FICHIERS

Tous les documents produits ou téléversés doivent suivre un cycle de vie cohérent.

Fonctions attendues selon le périmètre existant :

- Génération de devis.
- Consultation et téléchargement.
- Association des documents aux chantiers.
- Gestion des pièces jointes.
- Accès contrôlé.
- Vérification des formats et tailles.
- Gestion des erreurs de téléversement.
- Suppression ou remplacement selon les droits.
- Nettoyage contrôlé des fichiers devenus inutiles.

Le stockage doit être compatible avec l'environnement de déploiement.

Ne stocke pas les fichiers uniquement dans un répertoire temporaire si cela entraîne leur disparition lors d'un redémarrage ou d'un redéploiement.

Les liens privés doivent être protégés. Les documents ne doivent pas être publiés par défaut.

---

12. RECHERCHE, FILTRES ET NAVIGATION

Les fonctionnalités de recherche doivent interroger les données réelles accessibles à l'utilisateur.

Selon les modules existants, prévoir :

- Recherche de devis.
- Recherche de chantiers.
- Recherche de réalisations.
- Filtres par statut.
- Filtres par période.
- Tri cohérent.
- Pagination si nécessaire.
- États vides explicites.
- Indicateurs de chargement.
- Gestion des erreurs.

La navigation doit être cohérente et permettre de passer d'un chantier à son devis ou à ses documents sans rechercher manuellement chaque élément.

---

13. ABONNEMENTS, OFFRES ET PAIEMENTS

Examine intégralement le système de paiement existant avant toute modification.

Le projet a déjà connu des configurations de paiement de test et une migration envisagée vers un prestataire adapté aux paiements au Bénin. Vérifie l'état réel de l'intégration avant de choisir ou de remplacer un prestataire.

13.1. Offres commerciales

Les tarifs évoqués dans l'historique du projet ont évolué. Tu ne dois pas choisir arbitrairement entre des tarifs contradictoires.

Retrouve les tarifs actuellement retenus dans le code, la configuration et les documents de référence. Signale les divergences et centralise les paramètres commerciaux pour éviter qu'un même prix soit codé à plusieurs endroits.

Le catalogue doit pouvoir représenter les offres, leurs prix, leur durée et leurs limites.

Les offres précédemment envisagées comprennent notamment :

- Un abonnement mensuel.
- Une offre limitée à un chantier.
- Des services ou opérations de devis à l'unité.

Ces éléments ne doivent être activés commercialement que s'ils sont confirmés par la configuration métier retenue.

13.2. Paiement réel

Si le paiement en ligne est activé, le système doit :

- Créer une transaction identifiable.
- Communiquer avec le prestataire réel.
- Traiter le retour utilisateur.
- Vérifier les notifications serveur du prestataire.
- Vérifier l'authenticité des webhooks.
- Gérer les paiements réussis, échoués, annulés ou en attente.
- Éviter les doubles activations.
- Éviter les doubles traitements d'une même notification.
- Conserver un historique exploitable.
- Activer les droits uniquement selon un événement de paiement vérifié.

Ne fais jamais confiance à une simple URL de retour client pour confirmer un paiement.

Les clés secrètes doivent rester dans les variables d'environnement ou un système de secrets approprié.

Si les identifiants du prestataire ou son accès de production ne sont pas disponibles, finalise les éléments pouvant être développés et testés sans ces accès, puis documente précisément le blocage. Ne simule pas un paiement réel.

13.3. Droits et consommation

Si une offre donne droit à un nombre limité de chantiers, devis ou opérations, les limites doivent être appliquées côté serveur.

La vérification et la consommation d'un droit doivent éviter les dépassements provoqués par des requêtes simultanées.

Les droits expirés ou révoqués doivent être traités conformément aux règles métier retenues.

---

14. ASSISTANCE ET COMMUNICATION

Vérifie les fonctions de notification et de communication déjà présentes.

Lorsqu'une notification est prévue, elle doit correspondre à un événement réel et être délivrée par le canal effectivement configuré.

Exemples possibles :

- Confirmation d'une opération.
- Information sur un changement de statut.
- Alerte liée à une échéance.
- Notification de paiement.
- Message d'erreur ou d'action requise.

Si un canal externe n'est pas configuré, ne prétends pas que le message a été envoyé.

Les erreurs destinées à l'utilisateur doivent être compréhensibles. Les détails techniques sensibles doivent rester dans les journaux adaptés.

Si une assistance intégrée existe, vérifie ses opérations, ses permissions et ses coûts. N'ajoute pas de service d'IA externe payant sans nécessité démontrée.

---

15. TABLEAU DE BORD ET INDICATEURS

Le tableau de bord doit présenter des informations utiles à l'artisan, calculées à partir des données réelles.

Indicateurs possibles :

- Nombre de chantiers actifs.
- Nombre de devis enregistrés.
- Devis selon leur statut.
- Chantiers récemment modifiés.
- Prochaines échéances.
- Dernières réalisations.
- Informations sur l'offre utilisée.

Les indicateurs financiers ne doivent pas confondre montants des devis, montants facturés, paiements reçus et revenus réellement encaissés.

Les chiffres doivent correspondre aux données persistées et aux règles de calcul définies.

Évite les statistiques décoratives sans utilité métier.

---

16. INTERFACE UTILISATEUR ET EXPÉRIENCE MOBILE

L'application doit être agréable à utiliser sur les appareils réellement utilisés par les artisans, notamment les téléphones Android.

16.1. Exigences

- Interface responsive.
- Navigation compréhensible.
- Formulaires adaptés aux petits écrans.
- Boutons suffisamment accessibles.
- Typographie lisible.
- États de chargement.
- Messages de confirmation.
- Messages d'erreur explicites.
- États vides utiles.
- Prévention des doubles soumissions.
- Gestion des formulaires incomplets.
- Confirmation des actions destructrices.
- Affichage cohérent des montants et dates.
- Gestion des longues listes.
- Accessibilité de base et contrastes lisibles.

16.2. Cohérence visuelle

Préserve l'identité visuelle existante si elle est cohérente.

Unifie les composants, les espacements, les formulaires, les tableaux, les fenêtres de confirmation et les notifications.

Évite de remplacer une interface existante par une autre sans raison.

16.3. Fonctionnement réel

Chaque élément interactif doit effectuer l'action annoncée.

Les boutons sans fonction doivent être implémentés ou retirés de l'interface de production.

Les liens doivent pointer vers des ressources existantes.

Les erreurs backend ne doivent pas être masquées par un message de succès.

---

17. MODÈLE DE DONNÉES ET INTÉGRITÉ

Analyse le modèle de données existant et complète-le uniquement lorsque nécessaire.

Les principales entités métier à vérifier sont :

- Utilisateurs et comptes.
- Profils professionnels.
- Clients, si cette entité existe.
- Devis et lignes de devis.
- Chantiers.
- Étapes ou événements de chantier.
- Documents et pièces jointes.
- Réalisations et portfolio.
- Abonnements et offres.
- Transactions et paiements.
- Notifications.
- Paramètres et journaux d'audit.

Il s'agit d'un inventaire conceptuel, pas d'une obligation de créer une table distincte pour chaque élément.

Exigences

- Relations cohérentes entre entités.
- Contraintes d'intégrité appropriées.
- Identifiants stables.
- Horodatages utiles.
- Validation des données.
- Gestion des suppressions.
- Prévention des doublons métier.
- Migrations versionnées.
- Compatibilité avec les données existantes.
- Transactions de base de données lorsque nécessaire.

Toute migration doit être documentée, reproductible et conçue pour éviter la perte de données.

Ne supprime pas de données de production pour simplifier les tests.

---

18. SÉCURITÉ ET PROTECTION DES DONNÉES

La sécurité fait partie des critères d'acceptation, et non d'une amélioration facultative.

Vérifie notamment :

- Authentification.
- Gestion des sessions.
- Contrôle d'accès côté serveur.
- Protection des routes privées.
- Validation des entrées.
- Protection contre les injections.
- Protection contre les attaques XSS et CSRF lorsque pertinentes pour la stack.
- Sécurisation des téléversements.
- Limitation des tentatives abusives.
- Protection des secrets.
- Sécurité des webhooks.
- Contrôle des ressources accessibles par identifiant.
- Journalisation des opérations sensibles.
- Gestion des erreurs sans fuite d'informations.
- Configuration HTTPS pour les environnements concernés.
- Politique de conservation et suppression des données.

N'enregistre jamais des mots de passe en clair, des clés secrètes ou des informations de paiement sensibles dans les journaux.

Les données personnelles doivent être limitées aux besoins du service. L'accès, la publication et le partage doivent respecter les permissions définies.

Vérifie également la présence et l'état des conditions d'utilisation et de la politique de confidentialité. Si ces documents doivent être intégrés, signale les validations juridiques ou commerciales encore nécessaires.

---

19. QUALITÉ TECHNIQUE ET MAINTENABILITÉ

Le projet doit être suffisamment propre pour permettre des corrections ultérieures sans devoir tout réécrire.

Corrige notamment :

- Erreurs de compilation.
- Erreurs de typage pertinentes.
- Imports inutilisés ou invalides.
- Fonctions dupliquées.
- Logique métier dispersée.
- Dépendances inutiles.
- Gestion incohérente des erreurs.
- Fuites de ressources.
- Requêtes inefficaces.
- Problèmes de concurrence.
- Configuration fragile.
- Incompatibilités de versions identifiées.

N'entreprends pas une refonte générale du style de code si elle ne contribue pas à la stabilité, à la sécurité ou à la maintenabilité.

L'objectif est une application fiable, pas une réécriture cosmétique.

---

20. TESTS ET CRITÈRES D'ACCEPTATION

Les tests doivent vérifier le comportement réel de l'application.

20.1. Tests automatisés

Complète les tests adaptés à la stack existante :

- Tests unitaires de la logique métier.
- Tests des calculs de devis.
- Tests des validations.
- Tests des autorisations.
- Tests d'intégration backend et base de données.
- Tests des transitions de statut.
- Tests des opérations de persistance.
- Tests des erreurs.
- Tests des paiements à l'aide des environnements ou mécanismes de test appropriés.
- Tests de non-régression.
- Tests des principaux parcours utilisateur.

N'ajoute pas un framework supplémentaire sans nécessité.

20.2. Scénarios de validation obligatoires

Scénario A — Compte artisan

Un utilisateur peut créer ou utiliser un compte autorisé, se connecter, modifier son profil et retrouver ses données après reconnexion.

Scénario B — Devis

Un artisan peut créer un devis, ajouter des lignes, obtenir les bons calculs, enregistrer le document, le retrouver et le partager.

Scénario C — Chantier

Un artisan peut créer un chantier, y associer les informations prévues, mettre à jour son état et retrouver son historique.

Scénario D — Réalisation

Un chantier terminé peut donner lieu à une réalisation de portfolio selon le processus prévu, sans publication non autorisée de données privées.

Scénario E — Accès et permissions

Un utilisateur ne peut pas consulter ou modifier les ressources privées d'un autre utilisateur en changeant un identifiant ou une URL.

Scénario F — Erreurs

Une panne réseau, une validation invalide ou un échec backend produit un résultat explicite et ne génère pas de fausse confirmation.

Scénario G — Mobile

Les parcours essentiels restent utilisables sur un écran de téléphone.

Scénario H — Paiement

Si le paiement est activé, les droits sont attribués après confirmation vérifiée, et une notification répétée ne provoque pas une double activation.

20.3. Seuil de validation

La finalisation ne doit pas être déclarée réussie uniquement parce que l'application démarre.

Les critères minimaux sont :

- Build réussi.
- Démarrage correct.
- Absence d'erreur bloquante dans les parcours essentiels.
- Tests pertinents exécutés.
- Résultats des tests documentés.
- Mocks de production identifiés et éliminés des parcours déclarés terminés.
- Contrôles d'accès vérifiés.
- Données persistantes vérifiées.
- Aucune régression critique connue non signalée.

Si des tests échouent, indique lesquels et pourquoi. Ne masque pas les échecs pour obtenir un statut artificiellement positif.

---

21. ENVIRONNEMENTS, CONFIGURATION ET DÉPLOIEMENT

Examine les mécanismes de lancement et de déploiement existants.

Prépare une configuration documentée permettant de distinguer :

- Développement.
- Tests.
- Préproduction ou démonstration.
- Production.

Les secrets et paramètres sensibles doivent être configurés par environnement.

Fournis, selon la stack :

- Instructions d'installation.
- Liste des variables d'environnement nécessaires.
- Commandes de lancement.
- Commandes de migration.
- Commandes de tests.
- Procédure de build.
- Procédure de déploiement.
- Vérifications après déploiement.
- Procédure de diagnostic.
- Procédure de sauvegarde et de restauration adaptée.

Vérifie les contraintes réelles de l'hébergement avant de choisir une solution de déploiement.

Si un VPS ou un service externe est indisponible, ne déclare pas l'application déployée. Termine les travaux locaux possibles et documente les opérations nécessitant cet accès.

Aucune modification de production ne doit être effectuée sans les autorisations et garanties nécessaires.

---

22. OBSERVABILITÉ ET DIAGNOSTIC

L'application doit permettre de diagnostiquer les erreurs courantes.

Selon l'architecture existante, prévois :

- Journaux applicatifs utiles.
- Identification des erreurs.
- Corrélation des requêtes lorsque pertinente.
- Suivi des erreurs backend.
- Contrôles de disponibilité.
- Messages de diagnostic.
- Journalisation des opérations sensibles.

Les journaux ne doivent pas exposer de données confidentielles.

Évite les mécanismes de surveillance coûteux ou disproportionnés pour le pilote.

---

23. FONCTIONNALITÉS SECONDAIRES ET PÉRIMÈTRE FUTUR

ArtiPro est destiné à évoluer. Toutefois, cette mission ne doit pas être détournée vers le développement de fonctionnalités futures non nécessaires au lancement du pilote.

Les éléments suivants doivent être inventoriés s'ils existent déjà, mais leur développement ne doit pas retarder le cœur du produit :

- Fil d'actualité ou veille professionnelle.
- Assistant d'intelligence artificielle.
- Fonctionnalités avancées de gestion d'équipe.
- Comptabilité approfondie.
- Gestion complexe des stocks.
- Automatisation commerciale avancée.
- Fonctionnalités multi-secteurs au-delà du BTP.
- Intégrations externes non indispensables.

Pour chaque élément, indique s'il est opérationnel, partiel, simulé, absent ou hors périmètre du pilote.

Ne supprime pas une fonctionnalité existante sans analyser ses dépendances et son utilité.

Ne développe pas une nouvelle fonctionnalité coûteuse simplement parce qu'elle semble intéressante.

---

24. ORDRE D'EXÉCUTION

Travaille selon les phases suivantes.

Phase A — Audit et sauvegarde

- Cartographier le projet.
- Vérifier son état de compilation.
- Examiner les tests.
- Inventorier les mocks.
- Identifier les défauts critiques.
- Sauvegarder les éléments nécessaires avant les changements.

Livrable : rapport d'audit technique et fonctionnel.

Phase B — Stabilisation

- Corriger les erreurs empêchant le lancement.
- Corriger les défauts de configuration.
- Réparer les problèmes de dépendances.
- Corriger les défauts de sécurité critiques.
- Établir une base de tests reproductible.

Livrable : projet démarrable et environnement de travail vérifié.

Phase C — Finalisation métier

- Terminer le profil.
- Finaliser le devis.
- Finaliser le carnet de chantier.
- Relier les données et les modules.
- Finaliser les documents et le partage.
- Compléter les fonctions secondaires indispensables au pilote.

Livrable : parcours métier fonctionnels.

Phase D — Intégration et sécurité

- Supprimer les simulations de production.
- Vérifier les permissions.
- Contrôler la persistance.
- Vérifier les opérations sensibles.
- Corriger les erreurs d'intégration.
- Tester les cas d'échec.

Livrable : application intégrée et contrôlée.

Phase E — Validation complète

- Exécuter les tests automatisés.
- Tester les parcours de bout en bout.
- Vérifier l'expérience mobile.
- Effectuer une non-régression.
- Corriger les anomalies découvertes.

Livrable : rapport de validation.

Phase F — Préparation du pilote

- Vérifier la configuration de démonstration.
- Préparer les comptes et données de test.
- Vérifier les documents générés.
- Finaliser la documentation.
- Identifier les éventuelles opérations manuelles restantes.
- Préparer la procédure de lancement.

Livrable : version candidate au pilote, avec ses limites documentées.

---

25. GESTION DES PRIORITÉS

Classe les anomalies selon leur gravité.

P0 — Bloquant critique

- Perte ou corruption de données.
- Faille de sécurité grave.
- Impossibilité de lancer l'application.
- Parcours essentiel inutilisable.
- Opération financière incorrecte.

P1 — Essentiel au pilote

- Devis inutilisable.
- Chantier impossible à gérer.
- Données non persistantes.
- Fonction de partage essentielle défectueuse.
- Défaut majeur d'interface sur mobile.
- Autorisation métier incorrecte.

P2 — Important mais non bloquant

- Amélioration d'ergonomie.
- Optimisation non critique.
- Fonction secondaire incomplète.
- Défaut visuel mineur.

P3 — Évolution future

- Fonctionnalité non nécessaire au pilote.
- Amélioration avancée.
- Nouvelle intégration facultative.

Traite les P0 avant les P1. Les P2 sont traités ensuite selon le temps et leur impact. Les P3 sont documentés sans détourner la mission.

---

26. DOCUMENTATION À PRODUIRE OU À ACTUALISER

La mission doit laisser un projet compréhensible par un autre développeur.

Fournis ou actualise :

1. Un README général.
2. Un guide d'installation.
3. Un guide de configuration.
4. Une description de l'architecture.
5. Une description des principaux modules.
6. La documentation des API disponibles.
7. Les instructions de migration.
8. Les instructions de tests.
9. La documentation de déploiement.
10. Les règles de configuration des paiements, si présents.
11. Le rapport des mocks supprimés ou conservés.
12. Le rapport des anomalies corrigées.
13. Le rapport des tests.
14. La liste des limites restantes.
15. Une procédure de préparation et de lancement du pilote.

Ne produis pas quinze fichiers redondants si une structure documentaire plus simple répond au même besoin. La documentation doit rester cohérente et maintenable.

---

27. RAPPORT FINAL OBLIGATOIRE

À la fin de l'intervention, présente un rapport structuré avec les rubriques suivantes.

A. État initial

- Stack technique.
- Architecture.
- État du projet au démarrage.
- Modules opérationnels.
- Modules incomplets.
- Mocks identifiés.

B. Travaux réalisés

Pour chaque modification importante :

- Problème.
- Solution.
- Fichiers ou modules concernés.
- Justification technique.

C. Fonctionnalités validées

Indique, pour chaque module, s'il est :

- Fonctionnel et testé.
- Fonctionnel mais partiellement testé.
- Partiellement implémenté.
- Bloqué par un accès externe.
- Non réalisé.

D. Tests

Présente :

- Commandes exécutées.
- Résultats obtenus.
- Tests réussis.
- Tests échoués.
- Tests impossibles à exécuter et raisons.

E. Sécurité et intégrité

Présente les contrôles réalisés et les anomalies encore présentes.

F. Déploiement

Indique si le déploiement a réellement été effectué ou si la version reste locale ou en préproduction.

G. Blocages restants

Pour chaque blocage :

- Cause.
- Conséquence.
- Action nécessaire.
- Accès ou décision attendu.
- Possibilité ou non de lancer le pilote sans résoudre le blocage.

H. Évaluation finale

Donne une conclusion claire :

- Prêt pour le pilote.
- Prêt sous conditions identifiées.
- Non prêt pour le pilote.

Justifie cette conclusion par des preuves techniques et fonctionnelles.

---

28. DÉFINITION FINALE DU SUCCÈS

La mission est considérée comme achevée lorsque l'application existante a été finalisée dans la mesure techniquement possible, que les fonctions essentielles ont été implémentées et testées, que les risques sont identifiés et que la version candidate au pilote est clairement documentée.

Une fonctionnalité ne peut être déclarée achevée sur la seule base de son apparence.

Une application ne peut être déclarée sécurisée sur la seule base de l'absence d'erreur visible.

Un paiement ne peut être déclaré réel sans confirmation vérifiée.

Un déploiement ne peut être déclaré effectué sans vérification de l'environnement cible.

Les limites imposées par des accès indisponibles, des décisions métier non tranchées ou des services externes doivent être documentées explicitement.

Le résultat attendu est un produit utilisable et maintenable, pas une démonstration artificielle de complétude.

---

29. INSTRUCTION FINALE À L'AGENT

Prends maintenant en charge le dépôt existant d'ArtiPro-BTP.

Commence par examiner le projet et produire une cartographie précise de son état réel. Ensuite, poursuis les travaux de manière autonome, en respectant les priorités, les règles de sécurité et les critères d'acceptation de ce cahier des charges.

Ne te contente pas d'expliquer ce qu'il faudrait faire : effectue les corrections, implémente les briques manquantes, intègre les modules, exécute les tests et actualise la documentation.

Ne demande pas de confirmation pour chaque tâche ordinaire. Fais les choix techniques raisonnables compatibles avec l'architecture existante et documente les décisions importantes.

Si une information métier est absente, examine d'abord le code et la documentation. Ne fabrique pas une règle commerciale ou juridique. Isole la décision manquante, choisis une solution conservatrice lorsque cela est possible et évite de bloquer les parties indépendantes du travail.

Ne masque aucun défaut. Ne déclare aucune réussite sans vérification. Ne détruis aucune donnée. Ne déploie rien de risqué sans autorisation.

Ta mission est de faire passer ArtiPro-BTP de son état actuel à une version réellement prête pour son pilote terrain, avec le maximum de travail accompli, testé, documenté et vérifiable.