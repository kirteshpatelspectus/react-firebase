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
  addBook = (newBook, uid) => {
    return addDoc(collection(db, "todos", uid, "clients"), newBook);
  };
  getAllTodos = (uid) => {
    return getDocs(collection(db, "todos", uid, "clients"));
  };
  updateTodo = (id, updatedTodo, uid) => {
    console.log(updatedTodo);
    const todoDoc = doc(db, "todos", uid, "clients", id);
    return updateDoc(todoDoc, updatedTodo);
  };
  deleteTodo = (id,uid) => {
    const todoDoc = doc(db, "todos", uid, "clients", id);
    return deleteDoc(todoDoc);
  };
  getTodo = (id) => {
    const todoDoc = doc(db, "todos", id);
    return getDoc(todoDoc);
  };
}

export default new todoDataService();
