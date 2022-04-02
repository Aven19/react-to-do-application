export default ({ tasks, updateTask, deleteTask }) => {
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
            className={
              task.completed
                ? "btn btn-sm btn-success custom-mr disabled"
                : "btn btn-sm btn-warning custom-mr"
            }
            onClick={() => {
              updateTask(index);
            }}
          >
            {task.completed ? "Completed" : "Update status"}
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

  return <ul className="list-group mb-0">{getTasks()}</ul>;
};
