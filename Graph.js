// Extraction des données spécifiques
var swissDATA = swissMAPP.features.map(feature => {
  return {
    NAME: feature.properties.NAME,
    ABR_NAME: feature.properties.ABR_NAME,
    EINWOHNERZ: feature.properties.EINWOHNERZ,
    area: feature.properties.area,
    NBR_SIEGES: feature.properties.NBR_SIEGES
  };
});

swissDATA.forEach(function(d) {
  console.log(d.ABR_NAME);
});

// // Données pour chaque graphique
var nbrSieges = swissDATA.map(d => d.NBR_SIEGES);
var surf = swissDATA.map(d => Math.round(d.area / 1000000)); //conversion m2 en km2
var pop = swissDATA.map(d => d.EINWOHNERZ);
var canton = swissDATA.map(d => d.NAME);

// Création du scale pour la largeur des barres
var bars_max_width = 1000;
var scale_bars = d3
  .scaleLinear()
  .domain([0, d3.max(nbrSieges)])
  .range([0, bars_max_width]);

// Création de la barre initiale
var bars = d3
  .select("g.bars")
  .selectAll("rect")
  .data(nbrSieges)
  .enter()
  .append("rect")
  .attr("x", 10)
  .attr("height", 24)
  .style("fill", function(d, i) {
    return getCantonColor(swissDATA[i].ABR_NAME);
  })
  .attr("y", function(d, i) {
    return i * 25;
  })
  .attr("width", function(d) {
    return scale_bars(d);
  });

// Création des lignes traitillées à partir des barres
var dotLine = d3
  .select("g.bars")
  .selectAll("line")
  .data(swissDATA)
  .enter()
  .append("line")
  .attr("x1", function(d) {
    return scale_bars(d.NBR_SIEGES) + 10; // La position X de la ligne correspond à la position X de la barre
  })
  .attr("y1", function(d, i) {
    return i * 25 + 12; // La position Y de la ligne au niveau de la barre
  })
  .attr("x2", function(d) {
    return scale_bars(d.NBR_SIEGES) + 10; // La position X finale de la ligne est la même que la barre
  })
  .attr("y2", 670) // La position Y finale est 670 (sur l'axe des X)
  .style("stroke", "black") // Couleur de la ligne
  .style("stroke-dasharray", "0") // Traitillés (5px de trait, 5px d'espace)
  .style("stroke-width", 0); // Largeur du trait

// Ajout des cercles rouges pour l'axe X
var circles = d3
  .select("g.bars")
  .selectAll("circle")
  .data(nbrSieges)
  .enter()
  .append("circle")
  .attr("cx", function(d) {
    return scale_bars(d) + 10; // Position sur l'axe X en fonction de la valeur de la barre
  })
  .attr("cy", 670) // Position sur l'axe Y (au niveau de l'axe X)
  .attr("r", 10) // Rayon du cercle
  .style("fill", "red")
  .attr("fill-opacity", 0); // Cercle invisible par défaut

// Création de l'axe initial
var x_axis = d3
  .axisBottom(scale_bars)
  .tickSizeInner(-700)
  .tickSizeOuter(10)
  .tickPadding(20);

d3
  .select("g.bars")
  .append("g")
  .attr("class", "x-axis") // Ajouter une classe pour l'identifier
  .attr("transform", "translate(10, 670)") // Position de l'axe au bas du graphique
  .call(x_axis);

bars
  .select("g.bars")
  .data(swissDATA)
  .enter()
  .append("text")
  .attr("text-anchor", "start")
  .attr("x", function(d) {
    return scale_bars(d.NBR_SIEGES) + 15;
  })
  .attr("y", function(d, i) {
    return i * 25 + 15;
  })
  .text(function(d) {
    return d.NAME;
  })
  .attr("font-family", "Arial")
  .attr("font-size", "12px")
  .attr("fill", "#333");

function updateGraph(data) {
  var maxVal = d3.max(data);

  // Redéfinir le scale avec la nouvelle valeur maximale
  scale_bars.domain([0, maxVal]);

  // Supprimer l'ancien axe (si présent)
  d3.select("g.x-axis").remove();

  // Créer un nouvel axe avec la nouvelle échelle
  var newXAxis = d3
    .axisBottom(scale_bars)
    .tickSizeInner(-700)
    .tickSizeOuter(10)
    .tickPadding(20);

  // Ajouter un nouvel axe avec transition
  var newAxisGroup = d3
    .select("g.bars")
    .append("g")
    .attr("class", "x-axis")
    .attr("transform", "translate(10, 670)");

  newAxisGroup
    .call(newXAxis)
    .style("opacity", 0)
    .transition()
    .duration(1000)
    .ease(d3.easeCubic)
    .style("opacity", 1);

  // Mise à jour des cercles
  var circles = d3.select("g.bars").selectAll("circle").data(data);

  circles
    .enter()
    .append("circle")
    .merge(circles) // Combine les cercles existants et nouveaux
    .transition()
    .duration(1000)
    .ease(d3.easeCubic)
    .attr("cx", function(d) {
      return scale_bars(d) + 10;
    })
    .attr("cy", 670)
    .attr("r", 10);

  // Mise à jour des barres
  var bars = d3.select("g.bars").selectAll("rect").data(data);
  var texts = d3.select("g.bars").selectAll("text").data(canton);
  var dotLine = d3.select("g.bars").selectAll("line").data(data);

  dotLine
    .enter()
    .append("line")
    .merge(dotLine)
    .transition()
    .duration(1000)
    .ease(d3.easeCubic)
    .attr("x1", function(d) {
      return scale_bars(d) + 10; // La position X de la ligne correspond à la position X de la barre
    })
    .attr("y1", function(d, i) {
      return i * 25 + 12; // La position Y de la ligne au niveau de la barre
    })
    .attr("x2", function(d) {
      return scale_bars(d) + 10; // La position X finale de la ligne est la même que la barre
    })
    .attr("y2", 670); // La position Y finale est 670 (sur l'axe des X)

  bars
    .enter()
    .append("rect")
    .merge(bars)
    .transition()
    .duration(1000)
    .ease(d3.easeCubic)
    .attr("width", function(d) {
      return scale_bars(d);
    })
    .attr("y", function(d, i) {
      return i * 25;
    });

  texts
    .enter()
    .append("text")
    .merge(texts)
    .transition()
    .duration(1000)
    .ease(d3.easeCubic)
    .attr("x", function(d, i) {
      return scale_bars(data[i]) + 15;
    })
    .attr("y", function(d, i) {
      return i * 25 + 15;
    })
    .text(function(d) {
      return d;
    })
    .attr("font-family", "Arial")
    .attr("font-size", "12px")
    .attr("fill", "#333");
}

// Sélectionner le menu déroulant et ajouter un événement pour mettre à jour le graphique
document
  .getElementById("graph-selector")
  .addEventListener("change", function(event) {
    var selectedValue = event.target.value;

    // Selon l'option sélectionnée, mettre à jour le graphique
    if (selectedValue === "nbrSieges") {
      updateGraph(nbrSieges);
    } else if (selectedValue === "surf") {
      updateGraph(surf);
    } else if (selectedValue === "pop") {
      updateGraph(pop);
    }
  });

// Créer un formateur avec un séparateur de milliers
var formatNumber = function(number) {
  return d3.format(",")(number).replace(/,/g, "'");
};

circles
  .on("mouseover", function(event, d) {
    // Vérifier si l'opacité du cercle est de 1
    if (d3.select(this).attr("fill-opacity") === "1") {
      // Récupérer la donnée sélectionnée
      var selectedValue = document.getElementById("graph-selector").value;

      // Déterminer le texte en fonction de la donnée sélectionnée
      var label = "";
      if (selectedValue === "nbrSieges") {
        label = "Sièges ";
      } else if (selectedValue === "surf") {
        label = "Km² ";
      } else if (selectedValue === "pop") {
        label = "Habitants ";
      }

      // Si l'opacité est de 1, alors on affiche le texte
      d3
        .select("g.bars")
        .append("text")
        .attr("class", "hover-text")
        .attr("x", scale_bars(d) + 25) // Placer le texte près du cercle
        .attr("y", 680) // Position sur l'axe Y
        .text(formatNumber(d) + " " + label) // Le texte avec la donnée correspondante
        .attr("font-family", "Arial")
        .attr("font-size", "20px")
        .attr("fill", "#333");
    }
  })
  .on("mouseout", function(event, d) {
    // Supprimer le texte au départ du survol
    d3.selectAll(".hover-text").remove(); // Supprimer le texte
  });
