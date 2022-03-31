import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

function App() {
  const [task, setTask] = useState({ name: '', completed: false});
  const [tasks, setTasks] = useState([]);

  const getTasks = () => {
    return tasks.map((task, index) => <li className="list-group-item" 
    onClick={()=>{deleteTask(index)}}>{task.name }</li>);
  };

  const deleteTask = (i) => {
    const newTasks = [...tasks];
    newTasks.splice(i,1);
    setTasks(newTasks);
  };

  const addTask = (t) => {
    if (t) {
      const newTasks = [...tasks];
      newTasks.push({ name: t, completed: false});
      setTasks({ name: '', completed: false});
      setTask('');
    }else{
      alert('Enter value')
    }
  };

  return (
    <div className="App">
      <input
        className="form-control"
        type="text"
        placeholder="Enter Task"
        value={task.name}
        onChange={(e) => {
          setTask(e.target.value);
        }}
      ></input>
      <button
        className="btn btn-success w-100"
        onClick={() => {
          addTask(task);
        }}
      >
        Change
      </button>
      <ul className="list-group">{getTasks()}</ul>
    </div>
  );
}

export default App;
