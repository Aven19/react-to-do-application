import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { collection, doc, setDoc, getDoc, getDocs, deleteDoc  } from "firebase/firestore";

function App({ db }) {
  useEffect(() => {
    getDocs(collection(db, "tasks")).then((querySnapshot) => {
      // console.log(JSON.stringify(doc))
      const allTasks = [];
      querySnapshot.forEach((doc) => {
        allTasks.push(doc.data().tasks);
      });
      if (allTasks.length) {
        setTasks(allTasks);
      }
    });
  }, []);

  const [task, setTask] = useState({ name: "", completed: false });
  const [tasks, setTasks] = useState([]);

  const getTasks = () => {
    return tasks.map((task, index) => (
      <li
        key={index}
        className={
          task.completed
            ? "list-group-item list-group-item-success"
            : "list-group-item list-group-item-danger"
        }
        // onClick={() => {
        //   updateTask(index);
        // }}
        onDoubleClick={() => {
          deleteTask(index);
        }}
      >
        {task.name}
      </li>
    ));
  };

  const addTaskToFirebase = (task) => {
    // const taskRef = collection(db, "tasks");
    const taskRef = doc(collection(db, "tasks"));

    const newTask = { ...task, id: taskRef.id, time: new Date() };

    setDoc(doc(db, "tasks", taskRef.id), {
      tasks: newTask,
    }).then(() => {
      setTasks([...tasks, newTask]);
    });
  };

  const deleteTaskFromFirebase = (task) => {
    // const taskRef = collection(db, "tasks");
    console.log(task.id);
    // const taskRef = getDoc(doc(db, "tasks", task.id));
    deleteDoc(doc(db, "tasks", task.id));
    setTasks(tasks.filter(t=> t.id!==task.id));
    // setDoc(doc(db, "tasks", taskRef.id),{
    //   tasks: newTask,
    // }).then(() => {
    //   setTasks([...tasks, newTask]);
    // });
  };

  // const storeTasks = (tasks) => {
  //   setTasks(tasks);
  //   setDoc(doc(db, "tasks", "first"), {
  //     tasks: tasks,
  //   });
  // };

  const updateTask = (i) => {
    const newTasks = [...tasks];
    newTasks.splice(i, 1, {
      name: newTasks[i].name,
      completed: !newTasks[i].completed,
    });
  };

  const deleteTask = (i) => {
    deleteTaskFromFirebase(tasks[i]);
    // storeTasks(newTasks);
  };

  const addTask = (t) => {
    console.log(t.name);
    if (t.name !== "") {
      const newTasks = [...tasks];
      addTaskToFirebase({ name: t, completed: false });
      // storeTasks(newTasks);
      setTask({ name: "", completed: false });
    } else {
      alert("Enter value");
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
