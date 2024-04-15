export interface Todo {
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

        //Skapa ny todo med completed, false
        const newTodo: Todo = { task, completed: false, priority };
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
    markTodoCompleted(index: number): void {
        //Hämta checkboxen med taskid
        const checkbox = document.getElementById(`index${index}`) as HTMLInputElement;

        // Kontrollera om checkboxen är markerad eller inte
        if (checkbox.checked) {
            // Om checkboxen är markerad, markera uppgiften som klar
            this.todos[index].completed = true;
        } else {
            // Om checkboxen inte är markerad är completed false
            this.todos[index].completed = false;
        }
        //Spara ändringar
        this.saveTodo();
    }

    //Hämta todo-lista
    public getTodos(): Todo[] {
        return this.todos;
    }

    //Radera todo
    public deleteTask(index: number): void {
        if (index !== -1) {
            this.todos.splice(index, 1);
            //Spara
            this.saveTodo();
        }
    }
}
