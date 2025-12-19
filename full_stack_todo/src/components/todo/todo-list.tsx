import { getTodos } from "@/server/actions/todos";
import { TodoItem } from "./todo-item";

export async function TodoList() {
    const todos = await getTodos();

    if (todos.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center space-y-4 py-12 text-center text-muted-foreground">
                <p className="text-lg">No todos yet</p>
                <p className="text-sm">Create one to get started!</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {todos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} />
            ))}
        </div>
    );
}
