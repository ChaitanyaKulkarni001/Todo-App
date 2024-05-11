import { useEffect, useState, useRef } from "react";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, Settodo] = useState("");
  const [todos, Settodos] = useState([]);
  const [finished, setFinished] = useState(true);

  const saveTols = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  useEffect(() => {
    let todostring = localStorage.getItem("todos");
    if (todostring) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      Settodos(todos);
    }
  }, []);

  const handleText = (e) => {
    Settodo(e.target.value);
  };

  const handleCheckBox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    Settodos(newTodos);
    saveTols();
  };

  const handleAdd = () => {
    const newTodo = { id: uuidv4(), todo, isCompleted: false };
    Settodos(prevTodos => {
      const updatedTodos = [...prevTodos, newTodo];
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    });
    Settodo(""); // Clear the input field
  };

  const handleDelete = (e) => {
    let id = e.target.name;
    let newTodos = todos.filter(item => item.id !== id);
    Settodos(newTodos);
    saveTols();
  };

  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id);
    Settodo(t[0].todo);
    let newTodos = todos.filter(item => item.id !== id);
    setTimeout(() => {
      Settodos(newTodos);
      saveTols();
    }, 4000);
  };

  const handleDeleteAll = () => {
    alert("Deleting all Todo's");
    Settodos([]);
    saveTols();
  };

  const inputRef = useRef(null);

  const handleFinish = () => {
    setFinished(!finished);
  };

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-4 rounded-full" style={{ maxWidth: '1041px' }}>
        <div className="bg-gray-800 min-h-[80vh]">
          <div className="rounded-full flex justify-between py-3 px-10">
            <h1 className="text-2xl font-semibold ml-6">Todos</h1>
            <h2 onClick={focusInput}>Add a Todo</h2>
          </div>
          <div className="texts flex flex-col md:flex-row items-center justify-between md:items-start md:justify-start md:space-x-6 mt-6 px-6 md:px-0">
            <div className="text">
              <input
                type="text"
                onChange={handleText}
                ref={inputRef}
                className="bg-gray-500 w-full md:w-[500px] rounded-full px-2 py-1 md:ml-[100px] text-black"
                value={todo}
                placeholder="Add a todo"
              />
              <button
                onClick={handleAdd}
                className="bg-gray-500 mt-2 md:mt-0 rounded-full disabled:bg-gray-700 px-3 py-1 md:ml-5"
                disabled={todo.length < 4}
              >
                Add
              </button>
            </div>
            <div className="buttons mt-4 md:mt-0">
              <button className="invert-[1] mr-2 md:mr-5" onClick={focusInput}>
                <img src="src\edit_FILL0_wght400_GRAD0_opsz24.svg" alt="" />
              </button>
              <button className="invert-[1] mr-2 md:mr-5" onClick={handleDeleteAll}>
                <img src="src\delete_FILL0_wght400_GRAD0_opsz24.svg" alt="" />
              </button>
            </div>
          </div>

          <label className="flex mt-4 ml-6 md:ml-[420px]">
            <input
              type="checkbox"
              checked={finished}
              onChange={handleFinish}
              className="form-checkbox h-5 w-5 text-blue-500 rounded mr-2"
            />
            <span className="text-blue-500 font-bold cursor-pointer">Show Finished</span>
          </label>

          <h1 className="text-xl ml-6 md:ml-[140px] mt-7">Your Todos</h1>
          {todos.length === 0 && (
            <div class="alert alert-danger" role="alert">
              <div className="container flex justify-center m-auto">
                <div className="bg-gray-900 border w-[500px] flex justify-center border-gray-600 p-4 rounded-md">
                  Make Your List Now!!!
                </div>
              </div>
            </div>
          )}
          <div className="todos ml-6 md:ml-[150px]">
            {todos.map((item) => {
              return (finished || !item.isCompleted) && (
                <div key={item.id} className="flex justify-between items-center mx-6 whitespace-normal">
                  <span className={item.isCompleted ? "line-through" : ""}>
                    <div className="mr-5 flex row-auto">
                      <input
                        type="checkbox"
                        checked={item.isCompleted}
                        onChange={handleCheckBox}
                        name={item.id}
                        className="form-checkbox h-5 w-5"
                      />
                      <span className="text-gray-400 cursor-pointer w-[500px] overflow-auto flex ml-3">{item.todo}</span>
                    </div>
                  </span>
                  <div className="buttons mt-3 flex items-center">
                    <button className="invert-[1] mr-2 md:mr-5 pb-4" onClick={(e) => handleEdit(e, item.id)}>
                      <img name={item.todo} src="src\edit_FILL0_wght400_GRAD0_opsz24.svg" alt={item.id} />
                    </button>
                    <button onClick={handleDelete} className="invert-[1] mr-2 md:mr-5 mb-4">
                      <img name={item.id} src="src\delete_FILL0_wght400_GRAD0_opsz24.svg" alt="" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
