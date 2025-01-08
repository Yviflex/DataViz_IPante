// Variables globales pour stocker les couches D3
let squareTilesLayer = null;
let hexTilesLayer = null;
let swissMAPLayer = null;
let cartogramLayer = null;

// Fonction pour fermer toutes les bulles existantes
function closePopup() {
  const existingPopups = document.querySelectorAll(".custom-popup");
  existingPopups.forEach(popup => popup.remove());
}

// Fonction pour afficher une bulle personnalisée à l'endroit du clic
function showPopup(content, x, y) {
  const popup = document.createElement("div");
  popup.classList.add("custom-popup");
  popup.innerHTML = content;

  // Sélectionner l'élément de la carte
  const mapContainer = document.querySelector("#map-container");

  // Calculer les coordonnées du conteneur
  const containerRect = mapContainer.getBoundingClientRect();

  // Calculer la position finale du pop-up
  const adjustedX = x - containerRect.left; // Coordonnée X relative au conteneur
  const adjustedY = y - containerRect.top; // Coordonnée Y relative au conteneur

  // Positionner la bulle
  popup.style.position = "absolute";
  popup.style.left = `${adjustedX}px`; // Décaler légèrement vers la droite
  popup.style.top = `${adjustedY + 150}px`; // Décaler légèrement vers le bas

  // Ajouter la bulle au conteneur
  mapContainer.appendChild(popup);
}

// Fonction pour ajouter une couche avec animation et pour gérer les interactions de mise en gris des tuiles non sélectionnées, réalisé avec la'ide de chatGPT
function highlightSelectedTiles(selectedABRName, styleFn) {
  d3
    .select("g.bars")
    .selectAll("line")
    .style("stroke", "black") // Couleur de la ligne
    .style("stroke-dasharray", 0) // Retirer les traits pointillés
    .style("stroke-width", 0); // Réduire la largeur du trait

  // Filtrer et appliquer un style spécial pour la ligne correspondant au canton sélectionné
  d3
    .select("g.bars")
    .selectAll("line")
    .data(swissDATA) // Assurez-vous que les lignes sont liées aux données
    .filter(d => d.ABR_NAME === selectedABRName) // Filtrer la ligne correspondant au canton sélectionné
    .style("stroke", "grey") // Couleur de la ligne
    .style("stroke-dasharray", "3,3") // Traitillés (5px de trait, 5px d'espace)
    .style("stroke-width", 0.8); // Largeur du trait

  d3
    .select("g.bars")
    .selectAll("circle")
    .style("fill", (d, i) => getCantonColor(swissDATA[i].ABR_NAME)) // Restaurer la couleur
    .attr("fill-opacity", 0) // Réinitialiser l'opacité
    .attr("r", 1);

  // Mettre en évidence le cercle correspondant au canton sélectionné
  d3
    .select("g.bars")
    .selectAll("circle")
    .filter((d, i) => swissDATA[i].ABR_NAME === selectedABRName) // Filtrer le canton sélectionné
    .attr("fill-opacity", 1) // Opacité maximale
    .attr("r", 10)
    .enter()
    .style("fill", (d, i) => getCantonColor(swissDATA[i].ABR_NAME)); // Couleur du cercle

  svg
    .selectAll(".tile")
    .attr("fill-opacity", 0.4)
    .attr("fill", (data, i) => styleFn(data, i).fillColor);

  // Les tuiles du canton sélectionné conservent leur couleur
  svg
    .selectAll(".tile")
    .filter(data => data.properties.ABR_NAME === selectedABRName)
    .attr("fill", (data, i) => styleFn(data, i).fillColor)
    .attr("fill-opacity", 1); // Couleur originale

  // Réinitialiser toutes les barres à leur état d'origine
  d3
    .select("g.bars")
    .selectAll("rect")
    .style("fill", (d, i) => getCantonColor(swissDATA[i].ABR_NAME)) // Restaurer la couleur
    .attr("fill-opacity", 0.4); // Réinitialiser l'opacité

  // Mettre en évidence la barre correspondant au canton sélectionné
  d3
    .select("g.bars")
    .selectAll("rect")
    .style("fill", (d, i) => getCantonColor(swissDATA[i].ABR_NAME))
    .filter((d, i) => swissDATA[i].ABR_NAME === selectedABRName)
    // Restaurer la couleur
    .attr("fill-opacity", 1); // Opacité maximale
}

// Fonction principale pour ajouter une couche avec animation, réalisée avec la'ide de chatGPT
function addAnimatedLayer(geoJsonData, styleFn, popupFn, isTileLayer) {
  // Ajouter un gestionnaire pour réinitialiser la carte lors d'un clic à l'extérieur
  const mapContainer = document.querySelector("#map-container"); // ID du conteneur de la carte
  mapContainer.addEventListener("click", function(event) {
    // Vérifiez si l'élément cliqué est une tuile ou non, pour réinitialiser l'état initail si on clique dans le vide
    const target = event.target;
    if (!target.classList.contains("tile")) {
      // Réinitialiser toutes les tuiles à leurs styles par défaut
      svg
        .selectAll(".tile")
        .attr("fill-opacity", 1) // Restaurer l'opacité par défaut
        .attr("fill", (d, i) => styleFn(d, i).fillColor); // Restaurer la couleur par défaut
      d3
        .select("g.bars")
        .selectAll("rect")
        .style("fill", (data, i) => getCantonColor(swissDATA[i].ABR_NAME)) // Restaurer la couleur d'origine
        .attr("fill-opacity", 1); // Restaurer l'opacité d'origine
      d3
        .select("g.bars")
        .selectAll("circle")
        .style("fill", (d, i) => getCantonColor(swissDATA[i].ABR_NAME)) // Restaurer la couleur
        .attr("fill-opacity", 0); // restaurer l'état inital

      d3
        .select("g.bars")
        .selectAll("line")
        .style("stroke", "black") // Couleur de la ligne
        .style("stroke-dasharray", "0") // Traitillés (5px de trait, 5px d'espace)
        .style("stroke-width", 0); // Largeur du trait

      // Fermer les popups existants
      closePopup();
    }
  });

  const features = svg
    .append("g")
    .selectAll("path")
    .data(geoJsonData.features)
    .enter()
    .append("path")
    .attr("class", "tile")
    .attr("d", path)
    .attr("fill", (d, i) => styleFn(d, i).fillColor)
    .attr("stroke", (d, i) => styleFn(d, i).color)
    .attr("stroke-width", (d, i) => styleFn(d, i).weight)
    .attr("fill-opacity", (d, i) => styleFn(d, i).fillOpacity)
    .attr("opacity", 0) // Initialisation de l'opacité à 0 pour l'animation
    .each(function(d, i) {
      // Animation d'apparition des tuiles (opacité)
      d3
        .select(this)
        .transition()
        .duration(i * 5) // Délai de chaque tuile
        .attr("opacity", 1); // L'opacité devient 1 pour que la tuile apparaisse
    })
    .on("mouseover", function(event, d) {
      // Sélectionner toutes les tuiles partageant le même ABR_NAME
      svg
        .selectAll(".tile")
        .filter(data => data.properties.ABR_NAME === d.properties.ABR_NAME)
        .each(function() {
          const bbox = this.getBBox(); // Obtenir les dimensions de la tuile
          const cx = bbox.x + bbox.width / 2; // Calculer le centre X
          const cy = bbox.y + bbox.height / 2; // Calculer le centre Y

          d3
            .select(this)
            .raise() // Amène cet élément au sommet du DOM
            .attr(
              "transform",
              `translate(${cx},${cy}) scale(1.3) translate(${-cx},${-cy})`
            ); // Appliquer le scale en gardant la tuile en place
        });
    })
    .on("mouseout", function(event, d) {
      // Réinitialiser la taille et la position des tuiles
      svg
        .selectAll(".tile")
        .filter(data => data.properties.ABR_NAME === d.properties.ABR_NAME)
        .attr("transform", null); // Supprimer la transformation
    })
    .on("click", function(event, d) {
      const popupContent = popupFn(d);

      // Empêcher l'affichage de l'alerte
      closePopup(); // Ferme une popup existante si elle est ouverte

      // Obtenir les coordonnées du clic
      const [x, y] = d3.pointer(event); // Utilise D3 pour obtenir les coordonnées relatives à l'élément SVG

      // Afficher la bulle à l'endroit du clic
      showPopup(popupContent, x, y); // Affiche la popup à la position du clic

      // Appliquer la mise en surbrillance des tuiles sélectionnées
      highlightSelectedTiles(d.properties.ABR_NAME, styleFn);
    });

  // Si c'est une couche de type tuile, appliquer également cette interaction
  if (isTileLayer) {
    features.on("click", function(event, d) {
      highlightSelectedTiles(d.properties.ABR_NAME, styleFn);
    });
  }
}

// Fonction pour ajouter les tuiles carrées (Squaretiles)
function addSquaretiles() {
  if (squareTilesLayer) return; // Si déjà ajouté, ne rien faire
  squareTilesLayer = addAnimatedLayer(
    Squaretiles,
    feature => {
      const color = getCantonColor(feature.properties.ABR_NAME);
      return {
        color: "#fff",
        weight: 1,
        fillColor: color,
        fillOpacity: 1
      };
    },
    feature => {
      let popupContent =
        "Canton: " +
        feature.properties.NAME +
        " (" +
        feature.properties.ABR_NAME +
        ")";
      if (feature.properties.NBR_SIEGES) {
        popupContent +=
          "<br>Nombre de sièges: " + feature.properties.NBR_SIEGES;
      }
      return popupContent;
    },
    true // Mettre les tuiles en avant
  );
}

// Fonction pour ajouter les tuiles hexagonales (Hextiles)
function addHextiles() {
  if (hexTilesLayer) return; // Si déjà ajouté, ne rien faire
  hexTilesLayer = addAnimatedLayer(
    Hextiles,
    feature => {
      const color = getCantonColor(feature.properties.ABR_NAME);
      return {
        color: "#fff",
        weight: 1,
        fillColor: color,
        fillOpacity: 1
      };
    },
    feature => {
      let popupContent =
        "Canton: " +
        feature.properties.NAME +
        " (" +
        feature.properties.ABR_NAME +
        ")";
      if (feature.properties.NBR_SIEGES) {
        popupContent +=
          "<br>Nombre de sièges: " + feature.properties.NBR_SIEGES;
      }
      return popupContent;
    },
    true // Mettre les tuiles en avant
  );
}

// Fonction pour ajouter la carte de la Suisse (SwissMAP)
function addSwissMAP() {
  if (swissMAPLayer) return; // Si déjà ajouté, ne rien faire
  swissMAPLayer = addAnimatedLayer(
    swissMAPP,
    feature => {
      const color = getCantonColor(feature.properties.ABR_NAME);
      return {
        color: "#fff",
        weight: 1,
        fillColor: color,
        fillOpacity: 1
      };
    },
    feature => {
      let popupContent =
        "Canton: " +
        feature.properties.NAME +
        " (" +
        feature.properties.ABR_NAME +
        ")";
      if (feature.properties.NBR_SIEGES) {
        popupContent +=
          "<br>Nombre de sièges: " + feature.properties.NBR_SIEGES;
      }
      return popupContent;
    },
    false // Pas de tuiles, juste la carte suisse
  );
}

// // Fonction pour ajouter la carte de la Suisse (SwissMAP), réalisé avec l'aide de chatGPT
function addCartogram() {
  if (cartogramLayer) return; // Si déjà ajouté, ne rien faire
  cartogramLayer = addAnimatedLayer(
    swissGRAM,
    feature => {
      const color = getCantonColor(feature.properties.ABR_NAME);
      return {
        color: "#fff",
        weight: 1,
        fillColor: color,
        fillOpacity: 1
      };
    },
    feature => {
      let popupContent = "Canton: " + feature.properties.ABR_NAME;
      if (feature.properties.NBR_SIEGES) {
        popupContent +=
          "<br>Nombre de sièges: " + feature.properties.NBR_SIEGES;
      }
      return popupContent;
    },
    false // Pas de tuiles, juste la carte suisse
  );
}

// Fonction pour retirer les couches spécifiques
function removeSquaretiles() {
  if (squareTilesLayer) {
    squareTilesLayer.remove();
    squareTilesLayer = null;
  }
}

function removeHextiles() {
  if (hexTilesLayer) {
    hexTilesLayer.remove();
    hexTilesLayer = null;
  }
}

function removeSwissMAP() {
  if (swissMAPLayer) {
    swissMAPLayer.remove();
    swissMAPLayer = null;
  }
}

function removeCartogram() {
  if (cartogramLayer) {
    cartogramLayer.remove();
    cartogramLayer = null;
  }
}
