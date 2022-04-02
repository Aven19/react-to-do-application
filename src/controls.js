export default ({task, setTask,addTask}) => {
  return (
    <>
      <div className="d-flex justify-content-center align-items-center mb-4">
        <div className="form-outline flex-fill">
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
    </>
  );
};
