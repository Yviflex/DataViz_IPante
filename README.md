# DataViz_IPante
Carte interactive du nombre de sièges au CN en Suisse, réalisée avec D3

Ce produit a été réalisé grâce aux données swissBOUNDRAIES3D de swisstopo. Aussi, les données relatives au nombre de sièges de chaque canton proviennent du site "parlament.ch".

![Capture1](https://github.com/user-attachments/assets/f90b61c7-3034-4fd5-8d91-13c7e7bdfffa)

# Fonctionnement
La carte présente tout d'abord une carte de la suisse et un diagramme en barres horizontal qui décrite le nombre de sièges pour chauqe canton. Les couleurs sont associées pour que celles des canton dans le diagramme en barres correspondent à celles des cantons dans la carte. Il est ensuite possible, de changer la carte affichées en trois autres cartes. En cliquant sur "carte de la suisse" un bouton "anamorphose apparaît". Ce bouton permet d'afficher une carte qui représente chaque canton en déformant l'espace selon la variable du nombre de sièges au conseil national. Le botuon "tuiles carrées" affiche une carte similaire, mais cette fois, la carte est représentée sous forme de tuiles carrées, chaque tuile correspond alors à un siège au conseil national. Enfin, "tuiles hexagonales" fait de même avec, cette fois-ci, des tuiles en forme d'hexagone.
![Capture2](https://github.com/user-attachments/assets/f4c924bd-acde-4681-8a05-d56a8f3758e1)



# Interactivité carte

En survolant avec votre curseur les cantons sur les différentes cartes, ceux-ci appraissent plus grands pour les mettre temporairement en évidence. En cliquant dessus, ils garderont leur opacité de couleur alors que les autres deviendront moins opaques pour une mise définitive. Cela mettra également en évidence la barre correspondante dans le diagramme en barre associé, y ajoutant une ligne traitillée et un point sur l'axe des x à la valeur exacte représentée. En survolant ce point de son curseur, cette valeur exacte s'affichera. En outre, les carte "afficherla suisse" et "anamorphose simple" offrent également une bulle style pop-up qui affichera le nom du canton et son nombre de sièges. Cette fonctionnalité n'a pas été maintenue pour les carte en tuiles polygonales car jugée contraire à l'effet désiré, qui est la mise en valeur de ce type de visualisation sans intervention de nouveaux éléments.
![Recording 2025-01-08 at 10 08 06](https://github.com/user-attachments/assets/93f70d7d-fe8e-4cf8-a918-37817d02be03)



# Interactivité diagramme

A titre de comparason et comme le sujet de ce travai porte principalement sur les anamorphoses, un menu déroulant offrant la possibilté de choisir des données entre: le "nombre de sièges", la "surface géographique" et le "nombre d'habitants". En changeant la valeur par défaut étant "nombre de sièges" en une des deux autres, le diagramme en barre s'ajustera de manière dynamique. Ainsi, il permet de se rendre compte de la faible corrélation entre le nombre de siège et la surface d'un canton, car il changera drastiquement d'allure. Il permet aussi de se rendre compte de la corrélation évidente entre le nombre de sièges et le nombre d'habtitant, car il ne bougera presque pas.
![Recording 2025-01-08 at 10 01 29](https://github.com/user-attachments/assets/619ada59-3ad9-491c-b57f-9877d2206a02)

# Resoources pour la réalisation

Ce produit  a été réalisé en grande partie grâce aux contenus des cours "Visualisation de données" du professeur Isaac Pante et "Géovisualisation dynamique"  du professeur Christian Kaiser. L'inetelligence artificielle via "ChatGPT" à également permis d'améliorer et débuguer du code. Les ressources disponible sur "d3js.org" ont aussi été d'une grande aide dans la compréhension de multiples concepts et leur fonctionnement. Le logiciel de cartographie et traitement SIG "QGIS" a facilité l'élaboration en amont des visuels artographiques simples, en anamorphose et en tuiles polygonales avant d'être exporté au format geojson. Quelques articles de recherches m'ont offerts une bonne base de démarrage pour imaginer ce à quoi mon produit allait ressembler.

# Bibliographie


Colares Barreto, Moises, Doris Kosminsky, et Claudio Esperança. « Hexagonal Hierarchical Cartogram: Towards a Thematic Map of Brazil ». InfoDesign - Revista Brasileira de Design Da Informação 15, nᵒ 1 (28 août 2018): 45‑62. https://doi.org/10.51358/id.v15i1.563.

Rogers, Simon. « Tilegrams: Make Your Own Cartogram Hexmaps with Our New Tool. » Google News Lab (blog), 22 septembre 2016. https://medium.com/google-news-lab/tilegrams-make-your-own-cartogram-hexmaps-with-our-new-tool-df46894eeec1.


