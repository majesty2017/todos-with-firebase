import React, { useEffect, useState } from "react";

import {AiOutlinePlus} from 'react-icons/ai'
import Todo from "./components/Todo";
import {db} from './firebase'
import {query, collection, onSnapshot, updateDoc, doc, addDoc, deleteDoc} from 'firebase/firestore'

function App() {

  const [todos, setTodos] = useState([])
  const [todoName, setTodoName] = useState('')

  // Create Todo
  const createTodo = async (e) => {
    e.preventDefault()
    if(todoName === '') {
      alert('Todo name is required!')
      return;
    }
    await addDoc(collection(db, 'todos'), {
      text: todoName,
      completed: false,
    })
    setTodoName('')
  }
  // Read todo from firebase
  useEffect(() => {
    const conn = query(collection(db, 'todos'))
    const unsubscribe = onSnapshot(conn, (querySnapshot) => {
      let todoList = []
      querySnapshot.forEach((doc) => {
        todoList.push({...doc.data(), id: doc.id})
      })
      setTodos(todoList)
    })
    return () => unsubscribe
  }, [])
  
  // Update todo in firebase
  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, 'todos', todo.id), {
      completed: !todo.completed
    })
  }
  // Delete todo from firebase
  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, 'todos', id))
  }


  return (
    <div className="h-screen w-screen p-4 bg-gradient-to-r from-[#2F80ED] to-[#1CB5E0]">
      <div className="bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4">
        <h3 className="text-3xl text-center font-bold text-green-800 p-2">Todo App</h3>  
        <form className="flex justify-between" onSubmit={createTodo}>
          <input value={todoName} onChange={(e) => setTodoName(e.target.value)} className="border w-full p-2 text-xl" type="text" placeholder="Add Todo..." />
          <button className="border p-4 ml-2 sm:mt-0 text-slate-100 bg-blue-500 hover:bg-gray-200 hover:text-blue-500"><AiOutlinePlus size={30} /></button>
        </form>
        <ul>
          {todos.map((todo, index) => (
            <Todo todo={todo} toggleComplete={toggleComplete} deleteTodo={deleteTodo} key={index} />
          ))}
        </ul>
        {todos.length < 1 ? null : 
        (
        <p className="text-center p-2">{`You have ${todos.length} todos`}</p>
        )}
      </div>   
    </div>
  );
}

export default App;
