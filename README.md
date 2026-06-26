# NOVA BOWLS - Site Web Restaurant

Un site web moderne et premium pour un restaurant de bols de smoothie sains avec animations fluides et design époustouflant.

## 🎨 Caractéristiques

### Hero Animé
- **Carrousel de bols** avec animations fluides 3D
- **Shader canvas** avec des blobs animés dynamiques
- **Tracking de la souris** pour des effets parallaxe
- **Palette de couleurs** qui change avec chaque diapositive
- **Navigation intuitive** (flèches, points, boutons, clavier)

### Sections du Site

1. **Accueil (Hero)** - Présentation premium des bols
2. **Menu** - Affichage des plats avec descriptions et prix
3. **À Propos** - Valeurs et caractéristiques du restaurant
4. **Galerie** - Images des bols
5. **Contact** - Formulaire et informations de contact
6. **Footer** - Navigation et liens rapides

### Design Responsive
- Entièrement responsive (mobile, tablette, desktop)
- Animations désactivées pour les utilisateurs préférant `prefers-reduced-motion`
- Performance optimisée

## 🚀 Démarrage Rapide

1. Ouvrez `index.html` dans votre navigateur
2. Naviguez entre les sections via la barre de navigation
3. Explorez le carrousel de bols avec les flèches ou les points
4. Cliquez sur "Réserver" pour ouvrir le formulaire de réservation

## 📁 Structure des Fichiers

```
Restaurant/
├── index.html          # Fichier HTML principal
├── styles.css          # Feuille de style complète
├── script.js           # Logique JavaScript et interactivité
└── README.md           # Ce fichier
```

## 🎮 Interactions

### Navigateur de Bols
- **Flèches droite/gauche** - Bols suivant/précédent
- **Points latéraux** - Navigation directe
- **Boutons flèches** - Navigation assistée
- **Boutons du nav** - Navigation directe
- **Clavier** - Flèches gauche/droite

### Modal de Réservation
- **Clic sur "Réserver"** - Ouvre le formulaire
- **Croix** - Ferme la modal
- **Clic en dehors** - Ferme la modal
- **Touche Échap** - Ferme la modal

## 🎯 Technologies

- **HTML5** - Structure sémantique
- **CSS3** - Animations fluides, dégradés, backdrop-filter
- **JavaScript** - Interactivité, animations, gestion d'état
- **Canvas** - Shader animé avec blobs fluides
- **Google Fonts** - Bebas Neue + Inter

## 🎨 Palette de Couleurs

| Bol | Couleur Primaire | Couleur Secondaire | Teinte de Fond |
|-----|------------------|--------------------|-----------------|
| Myrtille | #9cc5ff | #b798ff | #7078A6 → #2E2951 |
| Fraise | #ff928d | #ffc0d0 | #C94040 → #6B1515 |
| Chocolat | #ffd08a | #bd7b42 | #B07C40 → #4A2A10 |
| Mûre | #e287ff | #9d73ff | #8A3878 → #3A0F50 |

## ✨ Effets Avancés

- **Animations 3D** - Transforms 3D sur les bols et lentilles
- **Blend modes** - Effets de mélange pour plus de profondeur
- **Backdrop filter** - Effet de verre dépoli sur les éléments
- **Particle system** - Animation des blobs sur Canvas
- **Smooth scroll** - Défilement fluide du site
- **Cursor glow** - Lueur autour du curseur

## 📱 Responsive Design

- **Desktop** (> 768px) - Mise en page complète
- **Tablette** (480px - 768px) - Disposition optimisée
- **Mobile** (< 480px) - Vue mobile optimale

## 🔧 Personnalisation

### Modifier les couleurs
Éditer les variables CSS dans `styles.css` sous `:root` et dans la section palettes du `script.js`

### Modifier le contenu
Éditer le texte dans `index.html` dans chaque section

### Ajouter de nouveaux bols
1. Dupliquer une `<div class="slide">` existante
2. Ajouter les couleurs à `palette` et `backgrounds` dans `script.js`
3. Mettre à jour le `<button class="dot">` dans la section de navigation

## 📊 Performance

- Images optimisées (hébergées sur CDN)
- Canvas rendering optimisé (DPR adapté)
- Transform GPU-accelerated
- Lazy loading prêt pour les images

## 🌐 Compatibilité Navigateurs

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile Safari 14+

## 📝 Licence

Libre d'utilisation pour usage personnel et commercial.

---

**NOVA BOWLS** - Bols sains & délicieux pour une vie meilleure ✨
