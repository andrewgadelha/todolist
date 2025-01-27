import { useState } from "react";
import { addTask} from "../firestoreService";

interface AddTodoProps {
  onTaskAdded: () => void; // Callback para atualizar a lista de tarefas
}


export default function AddTodo({ onTaskAdded }: AddTodoProps)  {
  const [text, setText] = useState("");
  const [note, setNote] = useState("");

  const handleAddTodo = async (e: React.FormEvent) => {
     e.preventDefault(); // Impede o recarregamento da página ao submeter o formulário
    if (!text.trim() || !note.trim()) {
      alert("Preencha todos os campos!");
      return;
    }

    try {
      await addTask(text, note); // Chama a função para adicionar no Firestore
      setText(""); 
      setNote(""); 
      onTaskAdded(); 
    } catch (error) {
      console.error("Erro ao adicionar tarefa:", error);
    }
  };
  
  return (
    <form onSubmit={handleAddTodo} className="flex flex-col space-y-2 border p-2">
      <input
        type="text"
        placeholder="Enter task"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="border-2 p-2 text-white bg-transparent"
      />
      <textarea
        placeholder="Enter note"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="border-2 p-2 text-white bg-black"
      />
      <button type="submit" className="border-2 border-cyan-300 text-white font-cyberpunk neon-shadow font-bold text-lg py-1">
        Adicionar Tarefa
      </button>
    </form>
  );
}
