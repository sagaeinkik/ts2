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
        //Töm felmeddelande
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
    //Element:
    const tasksUL = document.querySelector('div.comingtasks ul');
    //Töm listan först
    if (tasksUL) {
        tasksUL.innerHTML = '';
    }

    //Hämta todo-array
    const todolist = list.getTodos();

    //Loopa genom
    todolist.forEach((task) => {
        /* Mål: 
        <li class="prio1">
            <span class="task"><input type="checkbox" name="done" id="{nr}">
                <label for="{nr}">{uppgiftstext}</label>
            </span>
            <button class="delete"><i class="fa-solid fa-trash"></i></button>
        </li> */
        //Li-element
        const liEl = document.createElement('li') as HTMLLIElement;
        liEl.classList.add(`prio${task.priority}`);
        //Span
        const spanEl = document.createElement('span') as HTMLSpanElement;
        spanEl.classList.add('task');

        //Checkbox
        const checkbox = document.createElement('input') as HTMLInputElement;
        checkbox.setAttribute('type', 'checkbox');
        checkbox.setAttribute('name', 'done');
        checkbox.setAttribute('id', `index${task.id}`);

        //Bocka i checkbox från början baserat på completed
        checkbox.checked = task.completed;
        //Lägg på completed-klass om completed är sant
        if (task.completed) {
            liEl.classList.add('completed');
        }

        //Label
        const label = document.createElement('label');
        label.setAttribute('for', `index${task.id}`);

        //Uppgiftstext
        const text = document.createTextNode(task.task);
        label.appendChild(text);

        //Peta in i span och span in i lista
        spanEl.appendChild(checkbox);
        spanEl.appendChild(label);
        liEl.appendChild(spanEl);

        //Knapp
        const btn = document.createElement('button') as HTMLButtonElement;
        btn.classList.add('delete');
        //Ikonen (kan inte lagra som I-element??)
        const icon = document.createElement('i');
        icon.classList.add('fa-solid', 'fa-trash');

        //Peta in ikon i knapp och knapp i lista och lista i ul
        btn.appendChild(icon);
        liEl.appendChild(btn);
        tasksUL?.appendChild(liEl);

        //Händelselyssnare
        //Uppdatera completed baserat på i/urbockad
        checkbox.addEventListener('change', (e: Event) => {
            list.markTodoCompleted(task.id);
            //Uppdatera klass
            liEl.classList.toggle('completed', checkbox.checked);
        });
        //Ta bort uppgift (detta är varför jag hade uuid)
        btn.addEventListener('click', (e: Event) => {
            list.deleteTask(task.id);
            liEl.remove();
            renderList();
        });
    });
}
