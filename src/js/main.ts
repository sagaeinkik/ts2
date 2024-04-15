import { Todo } from './class.ts';
import { TodoList } from './class.ts';

//Ny instans av klass
const list = new TodoList();

//Händeleselyssnare
//Läs in lista när sidan laddats
document.addEventListener('DOMContentLoaded', () => {
    renderList();
});

//Lägg till ny vid submit
document.addEventListener('submit', (e: Event) => {
    e.preventDefault();
    addNewTask();
});

//Funktion för att lägga till nya uppgifter
function addNewTask(): void {
    //Värdena från formulär
    const taskInput = document.getElementById('syssla') as HTMLInputElement;
    const priorityInput = document.getElementById('priority') as HTMLInputElement;
    const task: string = taskInput.value;
    //Gör om prioritering till nummer istället för sträng
    const priority: number = parseInt(priorityInput.value);

    //Hämta spanelement
    const errorSpan = document.querySelector('span.error') as HTMLSpanElement;

    /* Försök lägga till ny uppgift. Denna returnerar false om input är felaktigt */
    const newTask = list.addTodo(task, priority);

    /* Om det returnerade true, töm fält och uppdatera skärmen */
    if (newTask) {
        //Töm inputfält
        taskInput.value = '';
        priorityInput.value = '';
        errorSpan.innerText = '';
        //kalla renderList
        renderList();
    } else {
        /* Annars, visa felmeddelande */
        errorSpan.innerText = 'Vänligen fyll i både uppgift och prioritet (heltal mellan 1-3).';
    }
}

//Skriv ut arrayen till skärmen
function renderList(): void {
    console.log(list);
    //Element
}
