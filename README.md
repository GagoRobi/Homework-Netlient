# Homework - Gágó Róbert

Ez a teszt feladat local verziója.<br/> <b><u> Ha a program működését szeretnétek tesztelni, ezen az oldalon megtehetitek</u></b> -> [https://netlient-deploy.onrender.com/](https://netlient-deploy.onrender.com/)
<br/> A deployolt verziónak készítettem külön git repositoryt, ami ennek a másolata, csak pár dolgot
még bele kellett írnom, és endpointokat át kellett írni hogy deployolva működjön.
<br/> <b><u>Deployolt repository</b></u> -> [https://github.com/GagoRobi/Netlient-Deploy](https://github.com/GagoRobi/Netlient-Deploy)

Java Spring backenddel, PostgreSQL adatbázissal és React-Vite frontenddel készítettem el a feladatot.
Ha nem szeretnétek lokálisan konfigurálni, telepíteni a programot, akkor a másik repot ajánlom, de leírom a telepítést is, ha localisan is megnéznétek.

Lokális futtatáshoz szükség lesz:
* Java JDK 17+
* Maven 3.6.3+
* PostgreSQL (esetleg pgAdmin 4)

<br/>
A repository klónozása után:

* Navigálj a root mappába, ha még nem ott vagy: ```cd netlient-homework``` (ahol a "pom.xml" is van)
* Telepítsd a dependenciákat ```mvn install```
* Utána navigálj a frontend mappába ```cd .\src\main\ui\```
* És telepítsd az itt szükséges csomagokat ```npm install```
* Ezután el a root folderben készíts egy `env.properties` fájlt ahova be kell illeszd az elkészített adatbázisod részleteit. Ehhez kell legyen egy PostgeSQL adatbázis előkészítve.

* Például: `DB_URL=jdbc:postgresql://localhost:5432/adatbazis `<br/>`
  DB_USER=user`<br/>`
  DB_PASSWORD=password`
* Ha ez is megvan kelleni fog egy terminal amiben a `\src\main\ui\` mappában kiadjuk az ```npm run dev``` parancsot. Ez elindítja a reactot.
* És végül elindítjuk a spring backendet vagy az IDE-ből, vagy root mappában nyitunk egy másik terminált és ki adjuk a következő parancsot ```mvn spring-boot:run```
* Ha minden igaz a keresőben már használható is az app a `http://localhost:5173/` címen.
