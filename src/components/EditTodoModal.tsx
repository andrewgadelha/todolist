// EditTodoModal.tsx
import React, { useState, useEffect } from "react";

interface EditTodoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (text: string, note: string) => void;
 
  selectedTodo: Todo | null;
}
interface Todo {
  id: string;
  text: string;
  note: string;
  completed: boolean;

}

const EditTodoModal: React.FC<EditTodoModalProps> = ({
  isOpen,
  onClose,
  onSave,

  selectedTodo
}) => {
 

  
  console.log(selectedTodo?.note)
  const [formValues, setFormValues] = useState({ text: "", note: "" });

  useEffect(() => {
    if (selectedTodo) {
      setFormValues({ text: selectedTodo.text, note: selectedTodo.note });
    }
  }, [selectedTodo]); // Atualiza o formulário ao mudar o selectedTodo
  

  const handleSave = () => {
    onSave(formValues.text, formValues.note);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0  bg-black bg-opacity-95 flex items-center justify-center">
      <div className="bg-black border-2 text-white p-6 shadow-lg">
        <h2 className="font-cyberpunk  neon-shadow text-4xl mb-4">Editar Tarefa</h2>
        <div>
          <label className="block mb-2">Texto</label>
          <input
            type="text"
            value={formValues.text}
             onChange={(e) => setFormValues({ ...formValues, text: e.target.value })}
            className="border text-black p-2 w-full mb-4"
          />
        </div>
        <div>
          <label className="block mb-2">Nota</label>
          <textarea
            value={formValues.note}
             onChange={(e) => setFormValues({ ...formValues, note: e.target.value })}
            className="border text-black p-2 w-full mb-4"
          />
        </div>
        <div className="flex justify-end space-x-3">
          <button onClick={onClose} className="px-4 py-2 bg-pink-500/30 ">
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 border border-cyan-300 neon-shadow text-white"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTodoModal;
