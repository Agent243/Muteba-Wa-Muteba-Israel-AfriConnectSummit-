# AfriConnect Summit 
[AfriSummit](https://agent243.github.io/Muteba-Wa-Muteba-Israel-AfriConnectSummit-/)

Bienvenue dans le projet AfriConnect Summit, un site web moderne et responsive développé en HTML, CSS et JavaScript pur.

Ce site présente un événement de networking et d’innovation, avec plusieurs pages ... accueil, programme, intervenants, contact et mini-jeu ...

---------------------------------------------------------------------------------

## Arborescence du projet

```text
AfriConnectSummit/
├── index.html
├── pgm.html
├── intervenants.html
├── contact.html
├── jeu.html
├── css/
│   └── style.css
├── js/
│   └── main.js
└── README.md
```

---------------------------------------------------------------------------------

## Objectif du projet

Créer une expérience web élégante, claire et interactive pour mettre en valeur ...
- le programme du sommet ...
- les intervenants ...
- les informations de contact ...
- et un mini-jeu amusant et visuellement attractif ...

---------------------------------------------------------------------------------

## Structure du projet

- index.html ... page d’accueil
- programme.html ... page du programme
- intervenants.html ... page des intervenants
- contact.html ... page de contact
- jeu.html ... page du mini-jeu
- css/style.css ... styles et mise en page du site
- js/main.js ... logique JavaScript et interactions
- README.md ... documentation du projet

---------------------------------------------------------------------------------

## Côté CSS

Le fichier CSS centralise l’ensemble du style du site.
---------------------------------------------------------------------------------
### 1. Variables CSS
Les variables permettent de gérer facilement les couleurs, les espacements, les rayons de bordure et les ombres.

Exemples de variables utilisées ...
- couleur principale
- couleur d’accent
- couleurs de texte
- fond clair et fond sombre
- espacements standards

### 2. Styles de base
Le CSS définit ...
- la police générale ...
- les titres ...
- les liens ...
- les boutons ...
- les marges et les espacements ...

### 3. Navigation
Le menu est stylisé avec ...
- fond semi-transparent ...
- effet de flou ...
- boutons avec états au survol ...
- adaptation mobile ...

### 4. Composants visuels
Le CSS met en forme ...
- les cartes de contenu ...
- les sections de programme ...
- les fiches intervenants ...
- les formulaires ...
- les FAQ ...
- les boutons d’action ...
---------------------------------------------------------------------------------
### 5. Thème clair/sombre
Le site prend en charge un thème sombre et un thème clair grâce à une gestion CSS dynamique.
---------------------------------------------------------------------------------
### 6. Animations et effets
Le CSS ajoute des effets visuels tels que ...
- survol des cartes ...
- transitions fluides ...
- animations de présentation ...
- effets de mise en avant sur les sections ...
---------------------------------------------------------------------------------
### 7. Barre néon
La barre néon affiche le texte “AfriConnect Summit” avec un effet lumineux qui se colore progressivement.

Exemple de code CSS ...

```css
.neon-bar {
  width: 100%;
  max-width: 600px;
  margin: 20px auto;
  padding: 14px 20px;
  text-align: center;
  font-size: 1.4rem;
  font-weight: 700;
  letter-spacing: 2px;
  color: #fff;
  border-radius: 999px;
  background: linear-gradient(90deg, #0f172a, #2563eb, #f59e0b, #0f172a);
  background-size: 300% 100%;
  box-shadow: 0 0 20px rgba(37, 99, 235, 0.6);
  animation: neonMove 3s linear infinite;
}

@keyframes neonMove {
  0% { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
}
```

Fonction ... elle crée un effet de défilement chromatique et un rendu lumineux sur le texte.

---------------------------------------------------------------------------------

## Côté JavaScript

Le fichier JavaScript gère toutes les interactions du site.
---------------------------------------------------------------------------------
### 1. Initialisation du DOM
Le script attend que la page soit chargée avant d’exécuter les interactions.

### 2. Thème clair/sombre
Le bouton de thème permet de basculer entre le mode clair et le mode sombre.

### 3. Menu mobile
Le script gère l’affichage du menu sur les petits écrans.
---------------------------------------------------------------------------------
### 4. Filtres des intervenants
Sur la page des intervenants, les boutons permettent de filtrer les cartes par catégorie.

Catégories possibles ...
- Tous
- IA & Tech
- Business
- Design
---------------------------------------------------------------------------------
### 5. Onglets du programme
Sur la page du programme, les boutons de jours affichent la bonne section de contenu.
---------------------------------------------------------------------------------
### 6. Formulaire de contact
Le JavaScript contrôle les validations simples du formulaire, comme ...
- champ obligatoire ...
- email valide ...
- longueur minimale du message ...
- message de succès après envoi ...
---------------------------------------------------------------------------------
### 7. Mini-jeu
Le script pilote le mini-jeu avec ...
- mouvement de la bulle ...
- progression de niveau ...
- affichage de messages ...
- effets de confettis ...
- animations de récompense ...
- écran de bienvenue avec pseudo ...
---------------------------------------------------------------------------------
### 8. Barre néon
Le JavaScript peut animer une barre dynamique en modifiant un texte ou une classe au fil du temps.

Exemple de code JavaScript ...

```javascript
const neonBar = document.querySelector('.neon-bar');

if (neonBar) {
  const words = ['AfriConnect Summit', 'Innovation', 'Afrique', 'Tech'];
  let index = 0;

  setInterval(() => {
    neonBar.textContent = words[index];
    index = (index + 1) % words.length;
  }, 2500);
}
```

Fonction ... elle fait défiler plusieurs textes dans la barre pour renforcer l’effet dynamique.

---------------------------------------------------------------------------------

## Fonctionnalités principales

- page d’accueil moderne et élégante ...
- programme organisé par jours ...
- page intervenants avec filtres ...
- formulaire de contact stylisé ...
- FAQ interactive ...
- mini-jeu dynamique ...
- thème clair/sombre ...
- design responsive ...

---------------------------------------------------------------------------------


