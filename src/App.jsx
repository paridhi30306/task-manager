import { useState, useEffect } from "react";
import "./App.css"
import Header from "./components/Header";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";


function App() {
  const[task,setTask]=useState("");
  const [tasks, setTasks] = useState(() => {
  const savedTasks = localStorage.getItem("tasks");
  return savedTasks ? JSON.parse(savedTasks) : [];
});

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
return (
  <div className="container">
    <Header />

   <TaskInput
  task={task}
  setTask={setTask}
  addTask={addTask}
/>

  <TaskList
  tasks={tasks}
  toggleComplete={toggleComplete}
  deleteTask={deleteTask}
  editTask={editTask}
/>
  </div>
);
}

export default App;