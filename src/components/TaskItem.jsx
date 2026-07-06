function TaskItem({
  item,
  index,
  toggleComplete,
  deleteTask,
  editTask,
}) {
  return (
    <li>
      <span
        style={{
          textDecoration: item.completed ? "line-through" : "none",
        }}
      >
        {item.text}
      </span>

      <div>
        <button onClick={() => toggleComplete(index)}>
          {item.completed ? "Undo" : "Complete"}
        </button>
        <button onClick={() => editTask(index)}>
         Edit
        </button>
        <button
          className="delete-btn"
          onClick={() => deleteTask(index)}
        >
          Delete
        </button>
      </div>
    </li>
  );
}

export default TaskItem;