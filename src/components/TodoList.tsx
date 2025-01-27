
import TodoItem from "./TodoItem";

interface TodoProps {
  id: string;
  text: string;
  note: string;
  completed: boolean;
}

interface TodoListProps {
  todos: TodoProps[];
  onToggleCompleted: (id: string) => void;
  onRemove: (id: string) => void;
   handleEdit: (todo:{id: string; text: string; note: string; completed: boolean }) => void;
}

export default function TodoList({
  todos,
  onToggleCompleted,
  onRemove,
  handleEdit
}: TodoListProps) {
  return (
    <div>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggleCompleted={onToggleCompleted}
          onRemove={onRemove}
          handleEdit={handleEdit}
        />
      ))}
    </div>
  );
}
