# Structuration d’une application Angular — Comparatif d’approches

Ce document présente les principales approches d’organisation d’une application Angular, selon la logique dominante (page, domaine, module, design system ou couches métier).
Chaque approche est décrite avec ses principes, exemples et bénéfices.

## 1. Page/Features (SILO)

**Structure par page isolée** 
Structure par page isolée
Le Silo désigne une page-fonctionnalité spécifique, autonome dans l’application. Chaque page gère sa propre logique et ses composants internes.

> Idéal pour les petites applications ou les prototypes rapides.

```
src/
└── app/
    └── pages/
        ├── analysis-list/
        │   ├── analysis-list.component.ts
        │   ├── analysis-list.component.html
        │   ├── analysis-list.service.ts
        │   └── components/
        │       ├── analysis-item/
        │       │   ├── analysis-item.component.ts
        │       │   └── analysis-item.component.html
        │       └── status-badge/
        │           ├── status-badge.component.ts
        │           └── status-badge.component.html
        │
        └── analysis-details/
            ├── analysis-details.component.ts
            ├── analysis-details.component.html
            └── analysis-details.service.ts
```

## 2. Pages + Features

**Structure orientée écrans (page-orchestrator)** 
L’application est organisée autour de pages principales (routes) qui orchestrent plusieurs features internes.

> Les features sont des blocs fonctionnels utilisés à l’intérieur de la page : un tableau filtrable, un formulaire d’édition, un viewer de détail.
Souvent nommés feature-* dans l’écosystème Angular moderne.

```
patients/
  pages/
    patient-list/
    patient-details/
  features/
    patient-table/
    patient-filters/
    patient-editor/
```

**✅Avantages :**

* Structure simple à comprendre.
* Organisation claire par écrans utilisateurs.

**⚠️ Risques :**

* Faible mutualisation entre pages.
* La logique métier reste souvent intégrée dans les pages.

## 3. Page + Domain + Feature

> Ce n’est plus “la page est le centre”, c’est “le domaine fonctionnel est le centre”.

**Structure orientée domaine (domaine-orchestrator)** 
Le **domaine fonctionnel** devient l’unité centrale.
Les pages ne font qu’exposer les *features* issues de ce domaine.

```
domains/
  patient/
    model/         (types, VO)
    api/           (adapters, repository)
    store/         (signal/store/facade)
    feature/       (PatientSummary, PatientSearch, etc.)
pages/
  patient-details-page/
  patient-search-page/
  admissions-dashboard-page/
```

**✅ Avantages :**

* Forte réutilisabilité (une feature PatientSearch peut vivre dans plusieurs pages).
* Gouvernance claire : chaque domaine possède son périmètre.
* Prépare une structuration multi-apps ou monorepo.

**⚠️ Risques :**

* Légère complexité cognitive initiale (surtout pour les équipes front centrées UI).

## 4. AppShell + modules

**Structure modulaire / sous-apps lazy** 
L’application est organisée autour d’un **AppShell** (layout principal, navigation, theming, auth, etc.) et de **modules fonctionnels** chargés à la demande (lazy load).

> Chaque module peut être considéré comme une application partielle avec sa propre organisation interne.

```
app/
  app-shell/
    layout/
    navigation/
    theme/
  modules/
    patient/
    billing/
    reports/
```

**✅ Avantages :**

* Chargement rapide (lazy loading).
* Isolation et indépendance des sous-domaines.
* Adaptée aux grandes applications Angular (DSI, produits SaaS).

**⚠️ Risques :**

* Multiplication des frontières modulaires si mal cadrée.
* Risque d’incohérence entre modules sans convention commune.

## 4.1 AppShell + modules (Monorepo)

Chaque module est une sous-application Angular au sein d’un monorepo, partageant un AppShell commun pour le layout, la navigation et les services globaux.

> Approche adaptée aux équipes coordonnées et aux produits internes à fort besoin de cohérence.

```
apps/
  platform-shell/
  patient-app/
  billing-app/
libs/
  ui/
  shared/
  domain/
```

## 4.2 AppShell + modules (Micro-Frontends)

> Variante distribuée où chaque module est **déployé indépendamment** et intégré dynamiquement dans un **AppShell hôte**.

**Implémentations possibles :**

* Module Federation (Webpack/Vite) — chargement dynamique à runtime des bundles distants.
* Web Components — encapsulation de modules UI réutilisables via le standard navigateur.

> Approche adaptée aux **grandes organisations multi-produits**, où la décorrélation des cycles de déploiement est essentielle.


## 5. Profondeur architecturale : Layered / Hexagonal Front

**Structure en couches métier indépendantes de l’UI**
Le modèle hexagonal n’est pas une structure de projet, mais une approche de conception interne qui peut s’appliquer à toutes les architectures précédentes.

> Elle définit la **direction des dépendances et la séparation des responsabilités** entre :

* Domain — logique métier pure, entités, invariants.
* Application — orchestration métier, use-cases.
* Infrastructure — API, storage, mappers, adaptation technique.
* Presentation — composants Angular, signaux, formulaires.

```
domain/         (entités, value objects, règles métier)
application/    (use-cases, orchestrations)
infrastructure/ (adapters HTTP, persistence)
presentation/   (composants, signaux, UI)
```

✅ Caractéristiques :

* Une page Angular ne parle pas directement à HttpClient.
* Une page appelle un “use case” (ex: LoadPatientSummaryUseCase).
* Le use case appelle un repository (PatientRepository).
* Le repository va taper l’API REST concrète.

**✅ Avantages :**

* Séparation claire des responsabilités.
* Testabilité et stabilité élevées.
* Architecture durable et agnostique du framework.

**⚠️ Risques :**

* Complexité accrue pour des projets simples.
* Courbe d’apprentissage plus élevée.

## 6. Atomic / Design System Driven (UI-first)

> Organisation alternative applicable aux librairies de composants UI ou aux applications où l’interface utilisateur est prioritaire.

**Structure pilotée par le design system**
Cette approche n’est pas une architecture applicative, mais une organisation interne de composants partagés.

> On structure par niveaux de composants :

* `ui/primitives/` (bouton, input, card…)
* `ui/composites/` (DataTable, PatientSummaryCard…)
* `ui/layouts/` (MasterDetailLayout, DashboardLayout…)
* `pages/`… qui ne font presque que “assembler des layouts/composites”

**✅ Avantages :**

* Cohérence visuelle et ergonomique.
* Facile à maintenir côté UI.

**⚠️ Risques :**

* Non adaptée à la logique métier.
* Doit être consommée par une architecture applicative (#2–#5).

# Tableau comparatif des approches

| #   | Approche                             | Nature                  | Centre de gravité       | Usage typique                | Avantage principal       | Risque principal       |
| --- | ------------------------------------ | ----------------------- | ----------------------- | ---------------------------- | ------------------------ | ---------------------- |
| 1   | Page / Features (SILO)               | Structurelle            | Page unique             | Petites apps, prototypes     | Simplicité               | Duplication de logique |
| 2   | Pages + Features                     | Structurelle            | Écran                   | App standard, MVP            | Clarté visuelle          | Faible mutualisation   |
| 3   | Page + Domain + Feature              | Structurelle            | Domaine                 | App métier moyenne/grande    | Réutilisation            | Complexité initiale    |
| 4   | AppShell + Modules                   | Structurelle            | Module / sous-app       | Grandes apps, multi-domaines | Modularité               | Fragmentation          |
| 4.1 | AppShell + Modules (Monorepo)        | Organisation build-time | Repo unique             | SI interne coordonné         | Cohérence globale        | Couplage fort au repo  |
| 4.2 | AppShell + Modules (Micro-Frontends) | Organisation runtime    | Déploiement indépendant | SI distribué, multi-produits | Indépendance des équipes | Surcoût d’intégration  |
| 5   | Layered / Hexagonal Front            | Conceptuelle            | Flux de dépendances     | Tout type d’app              | Robustesse, testabilité  | Complexité cognitive   |
| 6   | Atomic / Design System Driven        | Alternative UI          | Système de composants   | Libs UI, design system       | Cohérence visuelle       | Hors périmètre métier  |


# Conclusion

Il n’existe pas de “meilleure” architecture Angular universelle. Le choix dépend du contexte projet, des besoins métier et des compétences de l’équipe.
Souvent, une combinaison d’approches est la plus adaptée : par exemple, une structure par domaine (#3) avec une organisation en modules lazy (#4) et une séparation hexagonale interne (#5).
L’essentiel est de définir des conventions claires, de documenter l’architecture choisie et de veiller à sa cohérence au fil du temps.


# Annexes : Couche technique transverse — core / kernel

> Certaines architectures introduisent une couche technique centrale, commune à tous les domaines.
Cette couche — parfois appelée `core` ou `kernel` — regroupe les éléments transverses de l’application, indépendants des domaines fonctionnels.

## Rôle de cette couche

* Offrir un socle stable pour les domaines (domain/), évitant la duplication des contrats et services techniques.
* Isoler les aspects techniques (infrastructure, mapping, services communs) du code métier pur.
* Favoriser la scalabilité du projet en permettant d’extraire facilement core/ en librairie interne (@org/core).

> En d’autres termes, core/ est la plateforme technique, tandis que domains/ représentent la logique métier.
Les pages, elles, ne font que consommer ces capacités via les features.

```
core/   (ou kernel/)
    dto/            // contrats d'échange externes (API, stockage…)
    types/          // types internes, value objects génériques, constantes typées
    abstractions/   // interfaces, ports, contrats d'accès (HttpPort, StoragePort…)
    infrastructure/
        adapters/   // implémentations concrètes : HTTP, WebSocket, persistence...
        mappers/    // traduction dto <-> types internes
    services/       // services techniques transverses (auth, audit, feature flags...)
    utils/          // fonctions pures et helpers sans état
```