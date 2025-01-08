// Définir les dimensions de la carte
const width = 1000,
  height = 650;

// Créer un élément SVG pour la carte
const svg = d3.select("#map").attr("width", width).attr("height", height);

// Définir la projection géographique
const projection = d3
  .geoMercator()
  .center([8.2275, 46.8182]) // Centré sur la Suisse
  .scale(11000)
  .translate([width / 1.8, height / 1.9]);

// Générateur de chemins pour la projection
const path = d3.geoPath().projection(projection);

// Fonction pour supprimer le bouton supplémentaire
function removeExtraButton() {
  const extraBtn = document.getElementById("extra-btn");
  if (extraBtn) {
    extraBtn.remove();
  }
}

function hideSwissButton() {
  const changeBTN = document.getElementById("swissmap-btn");
  if (changeBTN) {
    changeBTN.style.display = "none"; // Cache le bouton
  }
}

function showSwissButton() {
  const changeBTN = document.getElementById("swissmap-btn");
  if (changeBTN) {
    changeBTN.style.display = "block"; // Affiche le bouton
  }
}

// Gestion des boutons
document
  .getElementById("squaretiles-btn")
  .addEventListener("click", function() {
    // Si les tuiles carrées sont déjà présentes, ne rien faire
    if (!squareTilesLayer) {
      cartogramLayer = null;
      removeHextiles(); // Supprimer les tuiles hexagonales
      removeSwissMAP(); // Supprimer la carte suisse
      removeHexGridLayer(); // Supprimer la grille hexagonale
      addSquareGridLayer(); // Ajouter la grille carrée
      removeCartogram();
      showSwissButton();
      addSquaretiles(); // Ajouter les tuiles carrées
      closePopup();
    }
    removeExtraButton(); // Supprimer le bouton supplémentaire
  });

document.getElementById("hextiles-btn").addEventListener("click", function() {
  // Si les tuiles hexagonales sont déjà présentes, ne rien faire
  if (!hexTilesLayer) {
    cartogramLayer = null;
    removeSquaretiles(); // Supprimer les tuiles carrées
    removeSwissMAP(); // Supprimer la carte suisse
    removeSquareGridLayer(); // Supprimer la grille carrée
    addHexGridLayer(); // Ajouter la grille hexagonale
    removeCartogram();
    showSwissButton();
    addHextiles(); // Ajouter les tuiles hexagonales
    closePopup();
  }
  removeExtraButton(); // Supprimer le bouton supplémentaire
});

// Gestionnaire de l'événement pour le bouton swissmap-btn
document.getElementById("swissmap-btn").addEventListener("click", function() {
  // Si la carte de la Suisse n'est pas déjà présente, ajouter la carte suisse
  if (!swissMAPLayer) {
    cartogramLayer = null;
    removeSquaretiles(); // Supprimer les tuiles carrées
    removeHextiles(); // Supprimer les tuiles hexagonales
    removeSquareGridLayer(); // Supprimer la grille carrée
    removeHexGridLayer(); // Supprimer la grille hexagonale
    removeCartogram(); // Supprimer la couche cartogram si présente
    addSwissMAP(); // Ajouter la carte suisse
  }

  if (!document.getElementById("extra-btn")) {
    // Créer un nouveau bouton "Action supplémentaire"
    const extraBtn = document.createElement("button");
    extraBtn.id = "extra-btn";
    extraBtn.textContent = "Anamorphose simple";

    extraBtn.addEventListener("click", function() {
      const tiles = svg.selectAll(".tile"); // Sélectionne les éléments de SwissMAP

      if (!cartogramLayer) {
        hideSwissButton();
        extraBtn.textContent = "Afficher la Suisse";

        // Transition vers l'anamorphose (cartogram)
        tiles
          .data(swissGRAM.features, d => d.properties.ABR_NAME) // Utilise un identifiant unique
          .transition()
          .duration(1000)
          .attr("d", path)
          .on("end", () => {
            cartogramLayer = true; // Définit que le cartogram est activé
            console.log("Cartogram activé");
          });
      } else {
        // Retour à SwissMAP
        extraBtn.textContent = "Anamorphose simple";

        tiles
          .data(swissMAPP.features, d => d.properties.ABR_NAME) // Utilise un identifiant unique
          .transition()
          .duration(1000)
          .attr("d", path)
          .on("end", () => {
            cartogramLayer = null; // Réinitialise l'état du cartogram
            console.log("SwissMAP activé");
          });
      }
    });

    // Insérer le bouton juste après le bouton swissmap-btn
    const swissMapBtn = document.getElementById("swissmap-btn");
    swissMapBtn.parentNode.insertBefore(extraBtn, swissMapBtn.nextSibling);

    // Ajouter une classe pour animer l'apparition du bouton
    setTimeout(function() {
      extraBtn.classList.add("visible");
    }, 10);
  }
});

// Ajouter la carte suisse au démarrage
addSwissMAP();

function addLegend() {
  const svg = d3.select("svg"); // Sélectionnez le conteneur SVG de votre carte

  // Ajouter un groupe pour la légende
  const legendGroup = svg
    .append("g")
    .attr("class", "legend")
    .attr(
      "transform",
      `translate(${svg.node().clientWidth - 10}, ${svg.node().clientHeight -
        10})`
    );

  // Ajouter le texte de la légende
  legendGroup
    .append("text")
    .attr("x", 0)
    .attr("y", 0)
    .attr("text-anchor", "end")
    .attr("font-family", "Arial")
    .attr("font-size", "12px")
    .attr("fill", "#333")
    .text(
      "© 2024 parlament.ch, © 2024 Office fédéral de topographie (swisstopo)"
    );
}

// Appeler la fonction pour ajouter la légende
addLegend();
