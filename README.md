# Atrium

Proiect de diplomă: Platformă UPT pentru repartizarea studenților la orele de laborator pentru disciplinele opționale

### Link GitHub: https://github.com/tudorrpop/Atrium

În momentul deschiderii repository-ului de pe GitHub, acesta va conține două foldere mari: `atrium_frontend` și `Atrium`.

### Componenta `atrium_frontend`:

Aceasta este responsabilă pentru interfața utilizatorului și este un proiect Angular. Pentru a rula această componentă, urmați pașii de mai jos:

1. Descărcați și instalați un editor de cod precum Visual Studio Code.
2. Deschideți proiectul în editorul de cod.
3. Instalați un manager de pachete precum npm folosind comanda: `npm install`
4. Rulați proiectul folosind comanda: `ng serve`
5. Pentru accesarea aplicației, deschideți un browser și navigați la adresa: `http://localhost:4200`

### Componenta `Atrium`:

Aceasta este responsabilă pentru serverul de back-end, care este coloana vertebrală a oricărei aplicații web și este un proiect Spring Boot. Pentru a rula această componentă, urmați pașii de mai jos:

1. Descărcați și instalați un mediu de dezvoltare pentru limbajul de programare Java, precum IntelliJ.
2. Deschideți proiectul în mediul de dezvoltare.
3. Este necesară crearea unei baze de date în MySQL.
4. Navigați la [MySQL Downloads](https://dev.mysql.com/downloads/mysql/), descărcați și instalați **MySQL Community Server** pentru sistemul dumneavoastră de operare.
5. În timpul instalării, introduceți o parolă pentru utilizatorul root, aceasta va fi necesară în pașii următori.
6. După finalizarea instalării, se va crea automat o instanță locală care rulează pe portul `3306`.
7. Descărcați și instalați [MySQL Workbench](https://dev.mysql.com/downloads/workbench/) pentru sistemul dumneavoastră de operare.
8. Deschideți MySQL Workbench și conectați-vă la instanța locală care rulează pe portul `3306`.
9. Creați o bază de date folosind comanda: `CREATE DATABASE COURSES;`
10. În mediul de dezvoltare, accesați fișierul `application.properties` și adăugați parola setată în pasul 5 la câmpul `spring.datasource.password`.
11. Apăsați butonul `Run` și serverul de back-end va porni.

După finalizarea tuturor pașilor descriși mai sus pentru ambele componente, aplicația va fi funcțională.
