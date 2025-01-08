# DataViz_IPante
Carte interactive du nombre de sièges au CN en Suisse, réalisée avec D3

Ce produit a été réalisé grâce aux données swissBOUNDRAIES3D de swisstopo. Aussi, les données relatives au nombre de sièges de chaque canton proviennent du site "parlament.ch".

![Capture1](https://github.com/user-attachments/assets/f90b61c7-3034-4fd5-8d91-13c7e7bdfffa)

# Fonctionnement
La carte présente tout d'abord une carte de la suisse et un diagramme en barres horizontal qui décrite le nombre de sièges pour chauqe canton. Les couleurs sont associées pour que celles des canton dans le diagramme en barres correspondent à celles des cantons dans la carte. Il est ensuite possible, de changer la carte affichées en trois autres cartes. En cliquant sur "carte de la suisse" un bouton "anamorphose apparaît". Ce bouton permet d'afficher une carte qui représente chaque canton en déformant l'espace selon la variable du nombre de sièges au conseil national. Le botuon "tuiles carrées" affiche une carte similaire, mais cette fois, la carte est représentée sous forme de tuiles carrées, chaque tuile correspond alors à un siège au conseil national. Enfin, "tuiles hexagonales" fait de même avec, cette fois-ci, des tuiles en forme d'hexagone.![Capture2](https://github.com/user-attachments/assets/f4c924bd-acde-4681-8a05-d56a8f3758e1)



# Interactivité carte

En survolant avec votre curseur les cantons sur les différentes cartes, ceux-ci appraissent plus grands pour les mettre temporairement en évidence. En cliquant dessus, ils garderont leur opacité de couleur alors que les autres deviendront moins opaques pour une mise définitive. Cela mettra également en évidence la barre correspondante dans le diagramme en barre associé, y ajoutant une ligne traitillée et un point sur l'axe des x à la valeur exacte représentée. En survolant ce point de son curseur, cette valeur exacte s'affichera. En outre, les carte "afficherla suisse" et "anamorphose simple" offrent également une bulle style pop-up qui affichera le nom du canton et son nombre de sièges. Cette fonctionnalité n'a pas été maintenue pour les carte en tuiles polygonales car jugée contraire à l'effet désiré, qui est la mise en valeur de ce type de visualisation sans intervention de nouveaux éléments.
![Capture3](https://github.com/user-attachments/assets/2ee4e2b2-f75e-4e95-8299-bcea24bdfef4)

# Interactivité diagramme

A titre de comparason et comme le sujet de ce travai porte principalement sur les anamorphoses, un menu déroulant offrant la possibilté de choisir des données entre: le "nombre de sièges", la "surface géographique" et le "nombre d'habitants". En changeant la valeur par défaut étant "nombre de sièges" en une des deux autres, le diagramme en barre s'ajustera de manière dynamique. Ainsi, il permet de se rendre compte de la faible corrélation entre le nombre de siège et la surface d'un canton, car il changera drastiquement d'allure. Il permet aussi de se rendre compte de la corrélation évidente entre le nombre de sièges et le nombre d'habtitant, car il ne bougera presque pas.
![Recording 2025-01-08 at 09 59 01](https://github.com/user-attachments/assets/e3e047d4-46cc-494a-8599-83878d0a9f79)
