import TaskItem from "./TaskItem";

function TaskList({
  tasks,
  toggleComplete,
  deleteTask,
  editTask,
}) {
  return (
    <ul>
      {tasks.map((item, index) => (
<TaskItem
  key={index}
  item={item}
  index={index}
  toggleComplete={toggleComplete}
  deleteTask={deleteTask}
  editTask={editTask}
/>
))}
    </ul>
  );
}

export default TaskList;