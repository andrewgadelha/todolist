import { db } from "./firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
  updateDoc
} from "firebase/firestore";
interface Todo {
  id: string;
  text: string;
  note: string;
  completed: boolean; 
}
// Referência à coleção "tasks" no Firestore
const tasksCollection = collection(db, "tasks");

// Adicionar tarefa
export const addTask = async (text: string, note: string) => {
  try {
    const docRef = await addDoc(collection(db, "tasks"), {
      text,
      note,
      completed: false,
      createdAt: serverTimestamp(), // Aqui estamos pedindo para o Firebase adicionar a data automaticamente
    });
    console.log("Task added with ID: ", docRef.id);
    return docRef.id; // Retorna o ID gerado se precisar usar no app
  } catch (error) {
    console.error("Error adding task: ", error);
    throw error;
  }
};

// Obter todas as tarefas
export const getTasks = async (): Promise<Todo[]> => {

  const tasksRef = collection(db, "tasks");
  const tasksQuery = query(tasksRef, orderBy("createdAt", "desc")); // Ordena pela data de criação, "asc" para crescente, "desc" para decrescente
  const snapshot = await getDocs(tasksQuery);
  

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Todo, "id">), // Garante o tipo correto
  }));
};

// Remover tarefa
export const removeTask = async (id: string): Promise<void> => {
  const taskDoc = doc(tasksCollection, id);
  await deleteDoc(taskDoc);
};


// Função para atualizar o status de 'completed' de uma tarefa
export const updateTask = async (id: string, updatedTask: { text: string, note: string, completed: boolean }) => {
  const taskRef = doc(db, "tasks", id);

  // Atualiza a tarefa no Firebase, preservando os campos necessários
  await updateDoc(taskRef, {
    text: updatedTask.text,
    note: updatedTask.note,
    completed: updatedTask.completed,  // Atualiza o campo 'completed'
  });
};