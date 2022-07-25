import React, { useState } from "react";

const Todo = () => {
  const [tarea, setTarea] = useState({ label: "", done: false });
  const [listaTareas, setListaTareas] = useState([]);

  let handleChange = (event) => {
    //console.log(event.target.value)
    setTarea({ ...tarea, [event.target.name]: event.target.value });
  };

  let handleAddTask = (event) => {
    if (event.key === "Enter") {
     setListaTareas([...listaTareas, tarea ])
     setTarea({label:"", done:false})

    }
  };
let handleDeleteTask = (id) => {

    console.log("me ejecuto")
    let newTask = listaTareas.filter((task, ident)=> id != ident 
    )
    setListaTareas(newTask)
}
  return (
    <div className="principal">
      <h1 className="opacity-25">To do</h1>
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-4 col-md-6">
          <input
            className="form-control"
            type="text"
            placeholder="Aqui la tarea"
            name="label"
            value={tarea.label}
            onChange={handleChange}
            onKeyDown={handleAddTask}
            aria-label="Username" 
            aria-describedby="basic-addon1"
          />
        </div>
      </div>
      <div className="row justify-content-center">
      <div className="col-12 col-md-6">
        <ul>
            {listaTareas.map((item,index)=>{
                return ( 
                    <li className="personal" key={index} onClick={()=>handleDeleteTask(index)}><div>{item.label}</div>
                    <div><button type="button" className="btn-close" disabled aria-label="Close" ></button></div>
                  </li>
                )
            }) }
        </ul>
        <span className="opacity-25">
        {listaTareas.length} item left
        </span>
      </div>
      </div>
    </div>
    </div>
  );
};

export default Todo;
