import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
} from "firebase/firestore";

function App({ db }) {
  useEffect(() => {
    getDocs(query(collection(db, "tasks"), orderBy("time", "desc"))).then(
      (querySnapshot) => {
        const allTasks = [];
        querySnapshot.forEach((doc) => {
          allTasks.push(doc.data());
        });
        if (allTasks.length) {
          setTasks(allTasks);
        }
      }
    );
  }, []);

  const [task, setTask] = useState({ name: "", completed: false });
  const [tasks, setTasks] = useState([]);

  const getTasks = () => {
    return tasks.map((task, index) => (
      <li
        key={index}
        className={
          task.completed
            ? "list-group-item list-group-item-danger d-flex align-items-center border-0 mb-2 rounded"
            : "list-group-item list-group-item-success d-flex align-items-center border-0 mb-2 rounded"
        }

        style={{ backgroundColor: "#f4f6f7" }}
      >
        {task.completed ? <s>{task.name}</s> : task.name}
        
        <div className="right">
          <button
            type="button"
            className=" btn btn-sm btn-success custom-mr"
            onClick={() => {
              updateTask(index);
            }}  
          >
          {task.completed ? 'Completed' : 'Update status'}

          </button>
          <button
            type="button"
            className=" btn btn-sm btn-danger custom-mr"
            onClick={() => {
              deleteTask(index);
            }}
          >
            Delete Task
          </button>
        </div>
      </li>
    ));
  };

  const addTaskToFirebase = (task) => {
    // const taskRef = collection(db, "tasks");
    const taskRef = doc(collection(db, "tasks"));

    const newTask = { ...task, id: taskRef.id, time: new Date() };

    setDoc(doc(db, "tasks", taskRef.id), newTask).then(() => {
      setTasks([...tasks, newTask]);
    });
  };

  const deleteTaskFromFirebase = (task) => {
    deleteDoc(doc(db, "tasks", task.id)).then(() => {
      setTasks(tasks.filter((t) => t.id !== task.id));
    });
  };

  const updateTaskFromFirebase = (task, i) => {
    updateDoc(doc(db, "tasks", task.id), task).then(() => {
      const allTasks = [...tasks];
      allTasks.splice(i, 1, task);
      setTasks(allTasks);
    });
  };

  const updateTask = (i) => {
    const updatedTask = { ...tasks[i], completed: !tasks[i].completed };
    updateTaskFromFirebase(updatedTask, i);
  };

  const deleteTask = (i) => {
    deleteTaskFromFirebase(tasks[i]);
    // storeTasks(newTasks);
  };

  const addTask = (t) => {
    console.log(t.name);
    if (t.name !== "") {
      // const newTasks = [...tasks];
      addTaskToFirebase({ name: t, completed: false });
      // storeTasks(newTasks);
      setTask({ name: "", completed: false });
    } else {
      alert("Enter value");
    }
  };

  return (
    <div className="App">
      <section className="vh-100 gradient-custom">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card">
                <div className="card-body p-5">
                  <div className="d-flex justify-content-center align-items-center mb-4">
                    <div className="form-outline flex-fill">
                      {/* <input type="text" id="form2" className="form-control" /> */}
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Enter Task"
                        value={task.name}
                        onChange={(e) => {
                          setTask(e.target.value);
                        }}
                      ></input>
                    </div>
                    <button
                      className="btn btn-info ms-2"
                      onClick={() => {
                        addTask(task);
                      }}
                    >
                      Add
                    </button>
                  </div>
                  <ul
                    className="nav nav-tabs mb-4 pb-2"
                    id="ex1"
                    role="tablist"
                  >
                    <li className="nav-item" role="presentation">
                      <a
                        className="nav-link active"
                        id="ex1-tab-1"
                        data-mdb-toggle="tab"
                        href="#ex1-tabs-1"
                        role="tab"
                        aria-controls="ex1-tabs-1"
                        aria-selected="true"
                      >
                        All
                      </a>
                    </li>
                    <li className="nav-item" role="presentation">
                      <a
                        className="nav-link"
                        id="ex1-tab-2"
                        data-mdb-toggle="tab"
                        href="#ex1-tabs-2"
                        role="tab"
                        aria-controls="ex1-tabs-2"
                        aria-selected="false"
                      >
                        Active
                      </a>
                    </li>
                    <li className="nav-item" role="presentation">
                      <a
                        className="nav-link"
                        id="ex1-tab-3"
                        data-mdb-toggle="tab"
                        href="#ex1-tabs-3"
                        role="tab"
                        aria-controls="ex1-tabs-3"
                        aria-selected="false"
                      >
                        Completed
                      </a>
                    </li>
                  </ul>
                  <div className="tab-content" id="ex1-content">
                    <div
                      className="tab-pane fade show active"
                      id="ex1-tabs-1"
                      role="tabpanel"
                      aria-labelledby="ex1-tab-1"
                    >
                      <ul className="list-group mb-0">{getTasks()}</ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
