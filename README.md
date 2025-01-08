# Nombre de sièges au conseil national par canton: visualisation en anamorphose simple et tuiles polygonales.
## Carte interactive du nombre de sièges au CN en Suisse, réalisée avec D3

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

# Difficultés rencontrées

Une des principales difficultés de ce travail a été la réalisation des cartes en tuiles polygonales. En effet, la variable choisie pour mes données n'offrent que très peu de polygones à certains cantons comme Uri avec un seul siège. Ainsi il devient impossible d'approximer la forme topologique du canton avec un seul hexagone. La tache est plus aisée avec le canton de vaud par exemple, offrant 19 tuiles avec lesquelles travailler. Cela complique également la cohérence topologique de mes cantons. Il est impossible de faire coïncider les 7 voisins au canton d'Uri avec un seul hexagone, qui n'accepte que 6 voisins directs. Cela peu paraître plus facile en utilisant les tuiles carrées: il peut être considéré qu'un unique carré accepte 8 voisins en décidant que les sommets opposés d'autres tuiles carrées en font des voisins. Néanmoins, de mon ressenti, les tuiles hexagonales offrent un visuels plus agréable à lire, permettant de mieux approximer certaines formes géographiques complexes.
![Capture4](https://github.com/user-attachments/assets/8b81c189-4f60-4847-a46a-09c017f7c140)
![Capture5](https://github.com/user-attachments/assets/4329bc81-0dd8-4773-a914-9f25f3891f00)
![Capture6](https://github.com/user-attachments/assets/87170b01-0124-4b19-9070-a1bcdea17205)

Par la suite, j'aimerais pouvoir réaliser un tel produit permettant d'y ajouter à son gré de nouvelles données, puis d'en afficher une visualisation d'anamorphose en tuiles polygonales. Pour ce faire, il faudra développer un algorithme sachant calculer de manière dynamique et suffisamment rapide les nouvelles positions des différentes tuiles polygonales tout en maintenant une logique topologique satisfaisante. Une bonne piste à étudier est la page "Tilegrams" développée par Pitch Interactive (Simon 2016).

# Ressources pour la réalisation

Ce produit  a été réalisé en grande partie grâce aux contenus des cours "Visualisation de données" du professeur Isaac Pante et "Géovisualisation dynamique"  du professeur Christian Kaiser. L'inetelligence artificielle via "ChatGPT" à également permis d'améliorer et débuguer du code. Les ressources disponible sur "d3js.org" ont aussi été d'une grande aide dans la compréhension de multiples concepts et leur fonctionnement. Le logiciel de cartographie et traitement SIG "QGIS" a facilité l'élaboration en amont des visuels artographiques simples, en anamorphose et en tuiles polygonales avant d'être exporté au format geojson.

Quelques articles de recherches et sites internet m'ont offerts une bonne base de démarrage pour imaginer ce à quoi mon produit allait ressembler, le travail de Raplh Straumann (2013) notamment, s'est avéré très intéressant.

# Bibliographie


Colares Barreto, Moises, Doris Kosminsky, et Claudio Esperança. « Hexagonal Hierarchical Cartogram: Towards a Thematic Map of Brazil ». InfoDesign - Revista Brasileira de Design Da Informação 15, nᵒ 1 (28 août 2018): 45‑62. https://doi.org/10.51358/id.v15i1.563.


DeBelius, Danny DeBelius . « Let’s Tesselate: Hexagons for Tile Grid Maps », 31 juillet 2024. http://blog.apps.npr.org/2015/05/11/hex-tile-maps.html.


Langton, Samuel H, et Reka Solymosi. « Cartograms, Hexograms and Regular Grids: Minimising Misrepresentation in Spatial Data Visualisations ». Environment and Planning B: Urban Analytics and City Science 48, nᵒ 2 (1 février 2021): 348‑57. https://doi.org/10.1177/2399808319873923.


Rogers, Simon. « Tilegrams: Make Your Own Cartogram Hexmaps with Our New Tool. » Google News Lab (blog), 22 septembre 2016. https://medium.com/google-news-lab/tilegrams-make-your-own-cartogram-hexmaps-with-our-new-tool-df46894eeec1.


Straumann, Ralph - twentyfirst. « Conceptualisation of a D3 Linked View with a Hexagonal Cartogram », 6 mai 2013. https://www.ralphstraumann.ch/blog/2013/05/conceptualisation-of-a-d3-linked-view-with-hexagonal-cartogram/.


Wongsuphasawat, Krist - Quality Metrics for Tile Grid Maps.pdf. (https://github.com/user-attachments/files/18345038/Wongsuphasawat.-.Quality.Metrics.for.Tile.Grid.Maps.pdf)


# Données

Données limites des cantons: https://www.swisstopo.admin.ch/de/landschaftsmodell-swissboundaries3d

Données nbr sièges par canton: https://www.parlament.ch/fr/organe/conseil-national/membre-conseil-national-par-canton

