// colors.js
const cantonColors = {
  ZH: "#e6ab02", // Zurich
  BE: "#d95f02", // Berne
  LU: "#7570b3", // Lucerne
  UR: "#1b9e77", // Uri
  SZ: "#66a61e", // Schwyz
  OW: "#666666", // Obwald
  NW: "#a6761d", // Nidwald
  GL: "#a6761d", // Glaris
  ZG: "#e7298a", // Zoug
  FR: "#7570b3", // Fribourg
  SO: "#e6ab02", // Soleure
  BS: "#7570b3", // Bâle-Ville
  BL: "#e7298a", // Bâle-Campagne
  SH: "#66a61e", // Schaffhouse
  AR: "#7570b3", // Appenzell Rhodes-Extérieures
  AI: "#a6761d", // Appenzell Rhodes-Intérieures
  SG: "#e7298a", // Saint-Gall
  GR: "#7570b3", // Grisons
  AG: "#666666", // Argovie
  TG: "#1b9e77", // Thurgovie
  TI: "#666666", // Tessin
  VD: "#66a61e", // Vaud
  VS: "#e6ab02", // Valais
  NE: "#e7298a", // Neuchâtel
  GE: "#666666", // Genève
  JU: "#a6761d" // Jura
};

// Exporter la fonction pour obtenir la couleur du canton
function getCantonColor(abbreviation) {
  return cantonColors[abbreviation] || "#000000"; // Noir par défaut si le canton n'est pas trouvé
}
