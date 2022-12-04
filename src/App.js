import React, { useEffect, useState } from 'react'
import { Amplify, API, graphqlOperation } from 'aws-amplify'
import { createTodo } from './graphql/mutations'
import { listTodos } from './graphql/queries'
import {Link,useNavigate} from "react-router-dom"
import awsExports from "./aws-exports";
import { withAuthenticator, Button, Heading } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import '/Users/toshitgurajala/Desktop/ampilfy-app/src/App.css';
Amplify.configure(awsExports);

const initialState = { name: '', description: '' }
  /* src/App.js */
function App({ signOut, user }) { 
    const [formState, setFormState] = useState(initialState)
  const [todos, setTodos] = useState([])
  useEffect(() => {
    fetchTodos()
  }, [])
  
  function setInput(key, value) {
    setFormState({ ...formState, [key]: value })
  }

  async function fetchTodos() {
    try {
      const todoData = await API.graphql(graphqlOperation(listTodos))
      const todos = todoData.data.listTodos.items
      setTodos(todos)
    } catch (err) { console.log('error fetching todos') }
  }

  async function addTodo() {
    try {
      if (!formState.name || !formState.description) return
      const todo = { ...formState }
      setTodos([...todos, todo])
      setFormState(initialState)
      await API.graphql(graphqlOperation(createTodo, {input: todo}))
      alert("Todo ADDED Check BELOW TABLE")
    } catch (err) {
      console.log('error creating todo:', err)
    }
  }
  
   
  return (
    
    <div style={styles.container}>
      <h1 id='hello'>Hello, {user.username}</h1>
    <Button id='signout'onClick={signOut}>Sign out</Button>
      <h2><center>Daily Work</center></h2>
      <input
        onChange={event => setInput('name', event.target.value)}
        style={styles.input}
        value={formState.name}
        placeholder="Name"
      />
      <input
        onChange={event => setInput('description', event.target.value)}
        style={styles.input}
        value={formState.description}
        placeholder="Description"
      />
      <button style={styles.button} onClick={addTodo}>Create Todo</button>
   <br></br>
      <table >
            <tr>
              <th>Name</th>
              <th>Desription</th>
            </tr>
     {
        todos.map((todo, index) => (
          <tr>
         <div key={todo.id ? todo.id : index}id='table' >
         
           
              <td>
              <center>{todo.name}</center>
              </td>
              <td>
              <center>{todo.description}</center>
              </td>
           
          
          
         </div>
         </tr>
        
       ))
        }
        </table>
    </div>
  )
 
} 


const styles = {
  container: { width: 500, margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 20 },
  todo: {  marginBottom: 15 },
  input: { border: 'none', backgroundColor: '#ddd', marginBottom: 10, padding: 8, fontSize: 18 },
  todoName: { fontSize: 20, fontWeight: 'bold' },
  todoDescription: { marginBottom: 0 },
  button: { backgroundColor: 'purple', color: 'white', outline: 'none', fontSize: 18, padding: '12px 0px',borderRadius:'0% 20% 0% 20%' },
}

export default withAuthenticator(App);

