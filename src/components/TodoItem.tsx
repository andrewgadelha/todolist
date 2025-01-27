interface TodoItem {
  todo: { id: string; text: string; note: string; completed: boolean };
  onToggleCompleted: (id: string) => void;
  onRemove: (id: string) => void;
  handleEdit: (todo:{id: string; text: string; note: string; completed: boolean }) => void;
}

export default function TodoItem({
  todo,
  onToggleCompleted,
  onRemove,
  handleEdit
}: TodoItem) {
  return (
    <div className="border-2 p-4 pt-2 pb-2 mb-2 text-white  ">
      <div className="flex-wrap ">
        <div className="flex space-x-6 items-center">
          <input
            onChange={() => onToggleCompleted(todo.id)}
            id="checked-checkbox"
            type="checkbox"
            value=""
            checked={todo.completed}
            className="w-4  text-blue-600 bg-white focus:ring-cyan-300 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <div className="w-8/12">
            <h2
              className={`${todo.completed ? "line-through" : ""} break-all text-lg font-medium`}
            >
              {todo.text}
            </h2>
            <p
              className={`${todo.completed ? "line-through" : "text-gray-300"} break-all text-gray-300`}
            >
              {todo.note}
            </p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => onRemove(todo.id)}
              className="px-1 py-1 bg-pink-500/30 text-white"
            >
              Remover
            </button>
            <button
              className="px-1 border border-cyan-300 neon-shadow text-white"
              onClick={() => handleEdit(todo)}>Editar</button>
          </div>
        </div>
      </div>
    </div>
  );
}
