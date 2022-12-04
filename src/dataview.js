import React from "react";
function data()
{ 
    return(
      <div className="App">
        {
    
    todos.map((todo, index) => (
      <div key={todo.id ? todo.id : index} >
        <p >{todo.name}</p>
        <p >{todo.description}</p>
      </div>
    ))
    
  }
      </div>
    );
}
export default data;