import { Todo } from './class.ts';
import { TodoList } from './class.ts';
const uuid = require('uuid');

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
    console.log(todolist);

    //Loopa genom
    todolist.forEach((task, index) => {
        /* <li class="prio1"><span class="task"><input type="checkbox" name="done" id="{nr}"><label for="{nr}">{uppgiftstext}</label></span><button class="delete"><i class="fa-solid fa-trash"></i></button></li> */
        const liEl = document.createElement('li') as HTMLLIElement;
        liEl.classList.add(`prio${task.priority}`);

        //Span
        const spanEl = document.createElement('span') as HTMLSpanElement;
        spanEl.classList.add('task');

        //Checkbox
        const checkbox = document.createElement('input') as HTMLInputElement;
        checkbox.setAttribute('type', 'checkbox');
        checkbox.setAttribute('name', 'done');
        checkbox.setAttribute('id', `index${index}`);

        //Label
        const label = document.createElement('label');
        label.setAttribute('for', `index${index}`);

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

        //Uppdatera om tasks är slutförda
        checkbox.addEventListener('change', (e: Event) => {
            if (checkbox.checked) {
                list.markTodoCompleted(index);
                liEl.classList.add('completed');
            } else {
                task.completed = false;
                liEl.classList.remove('completed');
            }
        });

        //Ta bort task
        /*  btn.addEventListener('click', (e: Event) => {
            const taskID = liEl.getAttribute('data-id');
            console.log(taskID);
            if (taskID) {
                list.deleteTask(index);
                liEl.remove();
                console.log(todolist);
            }
        }); */
    });
}
