import { useState, useEffect } from "react";
import "./App.css"
import Header from "./components/Header";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";


function App() {
const [task, setTask] = useState("");
const [tasks, setTasks] = useState(() => {
  const savedTasks = localStorage.getItem("tasks");
  return savedTasks ? JSON.parse(savedTasks) : [];
});

const [search, setSearch] = useState("");
const [filter, setFilter] = useState("all");

   const [editIndex, setEditIndex] = useState(null);
   const editTask = (index) => {
  setTask(tasks[index].text);
  setEditIndex(index);
};

useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
const addTask = () => {
  if (task.trim() === "") return;

  if (editIndex !== null) {
    const updatedTasks = [...tasks];

    updatedTasks[editIndex].text = task;

    setTasks(updatedTasks);

    setEditIndex(null);
  } else {
    setTasks([
      ...tasks,
      {
        text: task,
        completed: false,
      },
    ]);
  }

  setTask("");
};
  const deleteTask=(indexToDelete) => {
    const updatedTasks=tasks.filter((_, index) => index!=indexToDelete
  );
    setTasks(updatedTasks);
  }
const toggleComplete = (index) => {
  const updatedTasks = [...tasks];

  updatedTasks[index].completed =
    !updatedTasks[index].completed;

  setTasks(updatedTasks);
};  
const filteredTasks = tasks.filter((item) => {
  const matchesSearch = item.text
    .toLowerCase()
    .includes(search.toLowerCase());

  const matchesFilter =
    filter === "all" ||
    (filter === "completed" && item.completed) ||
    (filter === "pending" && !item.completed);

  return matchesSearch && matchesFilter;
});
const totalTasks = tasks.length;

const completedTasks = tasks.filter(
  (item) => item.completed
).length;

const pendingTasks = totalTasks - completedTasks;
return (
  <div className="container">
    <Header />

    <input
  type="text"
  placeholder="Search tasks..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>

<div className="filter-buttons">
  <button onClick={() => setFilter("all")}>
    All
  </button>

  <button onClick={() => setFilter("completed")}>
    Completed
  </button>

  <button onClick={() => setFilter("pending")}>
    Pending
  </button>
</div>

<div className="stats">
  <p>Total: {totalTasks}</p>
  <p>Completed: {completedTasks}</p>
  <p>Pending: {pendingTasks}</p>
</div>

   <TaskInput
  task={task}
  setTask={setTask}
  addTask={addTask}
/>

  <TaskList
  tasks={filteredTasks}
  toggleComplete={toggleComplete}
  deleteTask={deleteTask}
  editTask={editTask}
/>
  </div>
);
}

export default App;