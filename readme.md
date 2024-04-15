# TypeScript moment 2

## DT208G

### Av Saga Kikajon/saei2301

## Lösning

För att lösa uppgiften har jag gjort två ts-filer; main.ts och class.ts. I class ligger även mitt interface, eftersom det inte stod uttryckligen att det skulle ligga i en egen fil.

### Class.ts

Class använder sig av Todo genom att initiera todon, men nyckelordet implements används inte.

    Klassen har metoder för lägga till nya todos, både hämta och spara listan ur localstorage, radera todo, markera som genomförd, och så vidare. Jag har använt returns så mycket som möjligt för att inte påverka DOM i klass-filen. Det finns dock ett ställe där jag har använt checkboxen för att markera om markTodoCompleted ska sparas som completed eller ej.

    När man använder en forEach-loop och tar bort objekt ur en array med hjälp av händelselyssnare inuti loopen, får man problem med att index förskjuts och beter sig lite oförutsägbart. Andra objekt påverkas istället, eller så ändras egenskaper. Detta syns i minneslagringen även om uppgifterna tas bort från skärmen.

      För att råda bot på det tog jag UUID till hjälp. Jag har alltså lagt till en extra egenskap i mitt interface, och deleteTask()-metoden använder sig av uuid för att hitta rätt index att radera.

### Main.ts

    I main.ts initieras den nya todolistan med hjälp av constructorn från klassen. När sidan laddats in anropas en funktion som skriver ut items från local storage med hjälp av metoden getTodos, och en forEach-loop. Det unika id:et från uuid lagras som ID i checkbox och därmed också i label-elementet, och används också för i händelsehanterarna för att markera uppgift som slutförd, och för att ta bort uppgift utan att index ballar ur.

    Vid tryck på submit kallas en annan funktion, för att lägga till nya uppgifter, med hjälp av metoden .addTodo();. addTodo returnerar true eller false beroende på inputfältens validering, så funktionen kontrollerar egentligen bara om det skrivs ut ett felmeddelande eller ej efter att ha använt metoden.

### Övrigt

    Jag har använt Sass med enklare partials eftersom det är en ensidig applikation och inte krävde så mycket regler.

    Som sluttankar i det här momentet är jag oerhört frustrerad över hur svårt det ska vara att kunna ta bort objekt ur en array i en forEach-loop med händelselyssnare, för index räcker inte till, och det krävdes många försök innan det fungerade så som jag ville ha det med uuid. Det är tredje gången jag gör en liknande uppgift och det har varit lika svårt varje gång.
