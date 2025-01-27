import { useState, useEffect } from "react";
import Header from "./components/Header";
import TodoList from "./components/TodoList";
import AddTodo from "./components/AddTodo";
import EditTodoModal from "./components/EditTodoModal"; 

import { getTasks, removeTask, updateTask } from "./firestoreService";

interface Todo {
  id: string;
  text: string;
  note: string;
  completed: boolean; 
}

export default function App() {
  const [tasks, setTasks] = useState<Todo[]>([]);
 

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  // Carregar tarefas ao iniciar
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks();
        setTasks(data); 
      } catch (error) {
        console.error("Erro ao buscar tarefas:", error);
      }
    };
    fetchTasks();
  }, []);

  const handleToggleCompleted = async (id: string) => {
    const task = tasks.find((task) => task.id === id);
    if (task) {
      await updateTask(id, {
        text: task.text,
        note: task.note,
        completed: !task.completed,
      }); 
      const updatedTasks = await getTasks(); 
      setTasks(updatedTasks);
    }
  };

  // Remover tarefa
  const handleRemoveTask = async (id: string) => {
    await removeTask(id);
    const updatedTasks = await getTasks();
    setTasks(updatedTasks);
  };

  // Função para adicionar uma nova tarefa
  const handleTaskAdded = () => {
    const fetchTasks = async () => {
      const data = await getTasks();
      setTasks(data);
    };
    fetchTasks();
  };

  const handleEditClick = (todo: Todo) => {
    setSelectedTodo(todo);
    setIsModalOpen(true);
    // console.log(todo);
  };

  // Função para salvar/editar tarefa
  const handleSave = async (text: string, note: string) => {
    if (selectedTodo) {
      const updatedTask = {
        ...selectedTodo,
        text, 
        note,
      };

      // Atualiza no Firebase
      await updateTask(selectedTodo.id, updatedTask);

      // Atualiza a tarefa na lista local
      setTasks((prev) =>
        prev.map((task) => (task.id === selectedTodo.id ? updatedTask : task)),
      );
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTodo(null);
  };

  return (
    <div className=" p-2 space-y-2.5 mx-auto h-screen">
      <div className="max-w-sm mx-auto my-auto border-4 p-2  ">
        <Header />
        <EditTodoModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSave={handleSave}
          selectedTodo={selectedTodo}
        />
        <div className="max-w-auto max-h-auto mx-auto my-auto border-2 p-2 ">
          <AddTodo onTaskAdded={handleTaskAdded} />
          <div className="border p-2 pr-2 mt-2 list overflow-y-auto ">
            <TodoList
              todos={tasks}
              onToggleCompleted={handleToggleCompleted}
              onRemove={handleRemoveTask}
              handleEdit={handleEditClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
