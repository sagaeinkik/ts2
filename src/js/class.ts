import { v4 as uuidv4 } from 'uuid';

/* Jag tog mig friheten att lägga till en egenskap eftersom ni inte uttryckligen skrev att man inte fick. 
Detta är för att om man tar bort index ur en array i slumpmässig ordning via en foreach-loop, så ballar index ur
och man påverkar objekt man inte ville röra. Därför lade jag till uuid */
export interface Todo {
    id: string;
    task: string;
    completed: boolean;
    priority: number;
}

//Klass för todolist
export class TodoList {
    private todos: Todo[];

    //Initialisera todos
    constructor() {
        this.todos = this.loadTodo();
    }

    // Hämta todos från storage
    public loadTodo(): Todo[] {
        const savedTodos = localStorage.getItem('todos');
        return savedTodos ? JSON.parse(savedTodos) : [];
    }

    //Lägga till saker i listan:
    public addTodo(task: string, priority: number): boolean {
        //Kolla om värdena är korrekta: ingen tom sträng eller fel prioritering
        if (task.trim() === '' || (priority !== 1 && priority !== 2 && priority !== 3)) {
            //Ge false
            return false;
        }
        const id: string = uuidv4();
        //Skapa ny todo med completed, false från start
        const newTodo: Todo = { id, task, completed: false, priority };
        //peta in i array
        this.todos.push(newTodo);
        //Spara
        this.saveTodo();

        //Ge true
        return true;
    }

    // Spara todos till storage
    public saveTodo(): void {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    // Markera todo som klar
    markTodoCompleted(taskid: string): void {
        //Hitta index
        const todo = this.todos.find((todo) => todo.id === taskid);

        // Kontrollera om checkboxen är markerad eller inte
        if (todo) {
            todo.completed = !todo.completed;
        }
        //Spara ändringar
        this.saveTodo();
    }

    //Hämta todo-lista
    public getTodos(): Todo[] {
        return this.todos;
    }

    //Radera todo
    public deleteTask(taskid: string): void {
        //Hitta index
        const index = this.todos.findIndex((todo) => todo.id === taskid);
        //Klipp ut index
        if (index !== -1) {
            this.todos.splice(index, 1);
            this.saveTodo();
        }
    }
}
