import { db } from "../firebase-config";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

const todoCollectionRef = collection(db, "todos");

class todoDataService {
  addBook = (newBook) => {
    return addDoc(todoCollectionRef, newBook);
  };
  getAllTodos = () => {
    return getDocs(todoCollectionRef);
  };
  updateTodo = (id, updatedTodo) => {
    const todoDoc = doc(db, "todos", id);
    return updateDoc(todoDoc, updatedTodo);
  };
  deleteTodo = (id) => {
    const todoDoc = doc(db, "todos", id);
    return deleteDoc(todoDoc);
  };
  getTodo = (id) => {
    const todoDoc = doc(db, "todos", id);
    return getDoc(todoDoc);
  };
}

export default new todoDataService();
