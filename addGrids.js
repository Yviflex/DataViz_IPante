let hexGridLayer = null;
let squareGridLayer = null;

// Fonction pour gérer les grilles
function addSquareGridLayer() {
  squareGridLayer = svg
    .append("g")
    .selectAll("path")
    .data(squareGRID.features)
    .enter()
    .append("path")
    .attr("d", path)
    .attr("fill", "grey")
    .attr("stroke", "white")
    .attr("stroke-width", 1)
    .attr("fill-opacity", 1)
    .attr("opacity", 0.5); // La grille derrière les tuiles
}

function addHexGridLayer() {
  hexGridLayer = svg
    .append("g")
    .selectAll("path")
    .data(hexGRID.features)
    .enter()
    .append("path")
    .attr("d", path)
    .attr("fill", "grey")
    .attr("stroke", "white")
    .attr("stroke-width", 1)
    .attr("fill-opacity", 1)
    .attr("opacity", 0.5); // La grille derrière les tuiles
}

function removeSquareGridLayer() {
  svg.selectAll("path").remove();
  squareGridLayer = null;
}

function removeHexGridLayer() {
  svg.selectAll("path").remove();
  hexGridLayer = null;
}
