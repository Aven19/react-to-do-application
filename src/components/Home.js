import { useEffect, useState } from "react";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
} from "firebase/firestore";
import List from "../list";
import Controls from "../controls";
import { getAuth, signOut } from "firebase/auth";

const Home = ({ db }) => {

  const auth = getAuth();

  const logOut = (e) => {
    e.preventDefault();
    
    signOut(auth).then(() => {
      console.log('sign out successfull')
    }).catch((error) => {
      // An error happened.
    });
  };


  const [task, setTask] = useState({ name: "", completed: false });
  const [tasks, setTasks] = useState([]);

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

  const addTaskToFirebase = (task) => {
    // const taskRef = collection(db, "tasks");
    const taskRef = doc(collection(db, "tasks"));

    const newTask = { ...task, id: taskRef.id, time: new Date() };

    setDoc(doc(db, "tasks", taskRef.id), newTask)
      .then(() => {
        setTasks([...tasks, newTask]);
      })
      .catch((err) => {
        console.log(err);
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
    if (t.name !== "") {
      // const newTasks = [...tasks];
      addTaskToFirebase({ name: t, completed: false });
      // storeTasks(newTasks);
      setTask({ name: "", completed: false });
    } else {
      alert("Enter value");
    }
  };

  const listProps = { tasks, updateTask, deleteTask };
  const controlProps = { task, setTask, addTask };
  return (
    <div>
      <section className="vh-100 gradient-custom">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card">
                <div className="card-body p-5">

                  <div className="d-flex justify-content-center align-items-center mb-4">
                    <div className="form-outline flex-fill"></div>
                    <button
                      className="btn btn-sm btn-warning ms-2"
                      onClick={logOut}
                    >
                      Sign Out
                    </button>
                  </div>

                  <Controls {...controlProps}></Controls>
                  <List {...listProps}></List>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
