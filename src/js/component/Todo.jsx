import React, { useState, useEffect } from "react";

const Todo = () => {
  const [tarea, setTarea] = useState({ label: "", done: false });
  const [listaTareas, setListaTareas] = useState([]);

  const urlBase = "https://assets.breatheco.de/apis/fake/todos/user";
  const useBase = "orlando";

  let handleChange = (event) => {
    //console.log(event.target.value)
    setTarea({ ...tarea, [event.target.name]: event.target.value });
  };

  const salvaListaTarea = async (event) => {
    if (event.key === "Enter") {
      if (tarea.label.trim() !== "") {
        //buena practica para validar los errores (catch)
        try {
          let response = await fetch(`${urlBase}/${useBase}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },

            body: JSON.stringify([...listaTareas, tarea]),
          });

          if (response.ok) {
            setTarea({ label: "", done: false });
            getTask();
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  let handleAddTask = (event) => {
    if (event.key === "Enter") {
      setListaTareas([...listaTareas, tarea]);
      setTarea({ label: "", done: false });
    }
  };
  let handleDeleteTask = async (id) => {
    console.log("me ejecuto");
    let newTask = listaTareas.filter((task, ident) => id != ident);
    try {
      let respuesta = await fetch(`${urlBase}/${useBase}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });
      if (respuesta.ok) {
        getTask();
      }
    } catch (error) {
      console.log(error);
    }
    //setListaTareas(newTask);
  };
  const getTask = async () => {
    try {
      let response = await fetch(`${urlBase}/${useBase}`);
      let data = await response.json();
      if (response.status !== 404) {
        setListaTareas(data);
      } else {
        let responseTodo = await fetch(`${urlBase}/${useBase}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify([]),
        });
        if (responseTodo.ok) {
          getTask();
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getTask();
  }, []);

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
              onKeyDown={salvaListaTarea}
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-12 col-md-6">
            <ul>
              {listaTareas.map((item, index) => {
                return (
                  <li
                    className="personal"
                    key={index}
                    onClick={() => handleDeleteTask(index)}
                  >
                    <div>{item.label}</div>
                    <div>
                      <button
                        type="button"
                        className="btn-close"
                        disabled
                        aria-label="Close"
                      ></button>
                    </div>
                  </li>
                );
              })}
            </ul>
            <span className="opacity-25">{listaTareas.length} item left</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;
