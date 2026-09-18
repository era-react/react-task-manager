import { useState } from "react";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  function addTask() {
    if (task.trim() === "") {
      return;
    }

    const newTask = {
      id: Date.now(),
      text: task,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setTask("");
  }

  function toggleTask(id) {
    setTasks(
      tasks.map((item) =>
        item.id === id
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  }

  function deleteTask(id) {
    setTasks(tasks.filter((item) => item.id !== id));
  }

  const completedCount = tasks.filter((item) => item.completed).length;

  return (
    <div className="app">
      <h1>Task Manager</h1>
      <p className="subtitle">Keep track of your daily tasks</p>

      <div className="input-section">
        <input
          type="text"
          placeholder="Enter a task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addTask();
            }
          }}
        />

        <button onClick={addTask}>Add Task</button>
      </div>

      <div className="stats">
        <span>Total: {tasks.length}</span>
        <span>Completed: {completedCount}</span>
      </div>

      <div className="task-list">
        {tasks.length === 0 ? (
          <p className="empty-message">No tasks yet. Add your first task!</p>
        ) : (
          tasks.map((item) => (
            <div className="task-item" key={item.id}>
              <label>
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => toggleTask(item.id)}
                />

                <span className={item.completed ? "completed" : ""}>
                  {item.text}
                </span>
              </label>

              <button
                className="delete-button"
                onClick={() => deleteTask(item.id)}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;