import React from 'react'
import {FaRegTrashAlt} from 'react-icons/fa'

const Todo = ({todo, toggleComplete, deleteTodo}) => {
    const style = {
        list: `flex justify-between bg-slate-200 p-4 my-2 capitalize`,
        listComplete: `flex justify-between bg-slate-400 p-4 my-2 capitalize`,
        text: `ml-2 cursor-pointer`,
        textCompleted: `ml-2 cursor-pointer line-through`
    }
  return (
    <li className={todo.completed ? style.listComplete : style.list}>
        <div className='flex'>
            <input type="checkbox" onChange={() => toggleComplete(todo)} checked={todo.completed ? 'checked' : ''} />
            <p onClick={() => toggleComplete(todo)} className={todo.completed ? style.textCompleted : style.text}>{todo.text}</p>
        </div>
        <button onClick={() => deleteTodo(todo.id)} className='flex items-center cursor-pointer'><FaRegTrashAlt /></button>
    </li>
  )
}

export default Todo