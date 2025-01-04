"use client"

import { useState } from "react";
import styles from "./page.module.css";

// Next.js for Frontend and Backend Framework
// Prisma for Database Object-Relational Mapping
// Material UI for UI Components
// Goal: Use a modular approach to building the app

/**
 * Adds a new task to the task list.
 * 
 * @param {Array<Object>} tasks - The current list of tasks.
 * @param {string} title - The title of the task to be added.
 * @returns {Array<Object>} The updated list of tasks.
 * 
 * @example
 * let tasks = [
 *   { id: 1, title: 'Learn Prisma', completed: false}
 * ];
 * 
 * tasks = addTask(tasks, 'Learn Next.js');
 * 
 * // Result:
 * [
 *   { id: 1, title: 'Learn Prisma', completed: false },
 *   { id: 2, title: 'Learn Next.js', completed: false }
 * ]
 */
function addTask(title, tasks) {
  // Prevent empty tasks
  if (title === "") return;

  const newTask = {
    id: Date.now(), // semi-unique ID for small apps
    title: title,
    completed: false
  };
  return [...tasks, newTask];
}

/**
 * Remove an existing task from the task list.
 * 
 * @param {Array<Object>} tasks - The current list of tasks.
 * @param {int} id - The id of the task to be removed.
 * @returns {Array<Object>} The updated list of tasks.
 * 
 * @example
 * let tasks = [
 *   { id: 1, title: 'Learn Prisma', completed: false },
 *   { id: 2, title: 'Learn Next.js', completed: false }
 * ]
 * 
 * tasks = removeTask(tasks, 2);
 * 
 * // Result:
 * [
 *   { id: 1, title: 'Learn Prisma', completed: false}
 * ];
 */
function removeTask(tasks, id) {
  return tasks.filter(task => task.id !== id);
}

/**
 * Edits an existing task from the task list.
 * 
 * @param {Array<Object>} tasks - The current list of tasks.
 * @param {int} id - The id of the task to be edited.
 * @param {string} newTitle - The new title of said task.
 * @returns {Array<Object>} The updated list of tasks.
 * 
 * @example
 * let tasks = [
 *   { id: 1, title: 'Learn Prisma', completed: false },
 *   { id: 2, title: 'Learn Next.js', completed: false }
 * ]
 * 
 * tasks = editTask(tasks, 2, 'Learn Material UI');
 * 
 * // Result:
 * [
 *   { id: 1, title: 'Learn Prisma', completed: false },
 *   { id: 2, title: 'Learn Material UI', completed: false }
 * ];
 */
function editTask(tasks, id, newTitle) {
  return tasks.map(task =>
    task.id === id ? { ...task, title: newTitle } : task
  );
}

/**
 * Toggles completion on an existing task from the task list.
 * 
 * @param {Array<Object>} tasks - The current list of tasks.
 * @param {int} id - The id of the task to be toggled completion upon.
 * 
 * @example
 * let tasks = [
 *   { id: 1, title: 'Learn Prisma', completed: false },
 *   { id: 2, title: 'Learn Next.js', completed: false }
 * ]
 * 
 * tasks = toggleCompleteTask(tasks, 2);
 * 
 * // Result:
 * [
 *   { id: 1, title: 'Learn Prisma', completed: false },
 *   { id: 2, title: 'Learn Next.js', completed: true }
 * ];
 */
function toggleCompleteTask(tasks, id) {
  return tasks.map(task => 
    task.id === id ? { ...task, completed: !task.completed } : task
  );
}

// Main component
export default function Home() {
  // Create an array 'tasks'
  // Set 'setTasks' to modify array 'tasks'
  const [tasks, setTasks] = useState([]);

  // Create handler functions (since this is a database-oriented app)
  const handleAddTask = (title) => {
    setTasks(prevTasks => addTask(prevTasks, title));
  };

  const handleRemoveTask = (id) => {
    setTasks(prevTasks => removeTask(prevTasks, id));
  };

  const handleEditTask = (id, newTitle) => {
    setTasks(prevTasks => editTaskTask(prevTasks, id, newTitle));
  };

  const handleToggleCompleteTask = (id) => {
    setTasks(prevTasks => toggleCompleteTaskTask(prevTasks, id));
  };

  // UI
  return (
    <div className={styles.page}>
      <head>
        <title>To-Do List</title>
      </head>
      <body>
        <header>A simple to-do list</header>

        <input
          type="text"
          placeholder="Add a new task"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAddTask(e.target.value);
              e.target.value = ""; // Clear input field
            }
          }}
        />

        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              {/* Completed effect on text (strike-through) */}
              <span
                style={{
                  textDecoration: task.completed ? "line-through" : "none",
                }}
              >
                {task.title}
              </span>
              
              {/* Toggle Completion Button */}
              <button onClick={() => handleToggleCompleteTask(task.id)}>
                {task.completed ? "Undo" : "Complete"}
              </button>

              {/* Remove Task Button */}
              <button onClick={() => handleRemoveTask(task.id)}>
                ❌
              </button>

              {/* Edit Task Button */}
              <button onClick={() => {
                const newTitle = prompt("Edit task title:", task.title);
                handleEditTask(task.id, newTitle);
                }}
              >
                ✏️
              </button>
            </li>
          ))}
        </ul>
      </body>
    </div>
  );
}
