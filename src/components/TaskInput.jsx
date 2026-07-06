function TaskInput({ task, setTask, addTask }) {
  return (
    <div className="input-group">
      <input
        type="text"
        placeholder="Enter a task..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />

      <button className="add-btn" onClick={addTask}>
        Add
      </button>
    </div>
  );
}

export default TaskInput;