"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import styles from "./page.module.css";
import { TextField, List, ListItem, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";

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
function addTask(tasks, title) {
  return [...tasks, title];
}

/**
 * Remove an existing task from the task list.
 * 
 * @param {Array<Object>} tasks - The current list of tasks.
 * @param {number} id - The id of the task to be removed.
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
 * @param {number} id - The id of the task to be edited.
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

  // Fetch tasks from database on page build
  // TODO: Research more on this topic
  useEffect(() => {
    const fetchTasks = async () => {
      const res = await fetch("/api/tasks/[id]");
      const data = await res.json();
      setTasks(data);
    };

    fetchTasks();
  }, []);

  // Create handler functions (since this is a database-oriented app)
  // TODO: Research more on integrating Frontend functions with Backend databases
  const handleAddTask = async (title) => {
    if (!title.trim()) return;

    const res = await fetch("/api/tasks/[id]", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });

    const newTask = await res.json();
    setTasks(prevTasks => addTask(prevTasks, newTask));
  };

  const handleRemoveTask = async (id) => {
    if (!id) return;
    
    await fetch(`/api/tasks/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    setTasks(prevTasks => removeTask(prevTasks, id));
  };

  const handleEditTask = async (id, newTitle) => {
    if (!newTitle.trim()) return;

    const res = await fetch(`/api/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, title: newTitle }),
    });

    const { id: updatedId, title: updatedTitle } = await res.json();
    setTasks(prevTasks => editTask(prevTasks, updatedId, updatedTitle));
  };

  const handleToggleCompleteTask = async (id) => {
    const task = tasks.find(task => task.id === id);
    if (!task) return;

    await fetch("/api/tasks/[id]", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, completed: !task.completed }),
    });

    setTasks(prevTasks => toggleCompleteTask(prevTasks, id));
  };

  // UI
  return (
    <div className={styles.page}>
      <Head>
        <title>To-Do List</title>
      </Head>

      <h1>A simple To-Do list</h1>

      {/* Input Field */}
      <TextField
        label="Add a new task"
        variant="outlined"
        fullWidth
        onKeyDown={(e) => {
          if (e.key === "Enter" && e.target.value.trim() !== "") {
            handleAddTask(e.target.value);
            e.target.value = ""; // Clear input field
          }
        }}
      />

      {/* Task List */}
      <div className={styles["task-container"]}>
        <List>
          {tasks.map(task => (
            <ListItem key={task.id} className={styles["task-item"]}>
              {/* Completed effect on text (strike-through) */}
              <span 
                style={{
                  textDecoration: task.completed ? "line-through" : "none",
                  userSelect: "none"
                }}
              >
                {task.title}
              </span>

              {/* Complete Task Button */}
              <IconButton 
                edge="end"
                onClick={() => handleToggleCompleteTask(task.id)}
                aria-label="complete"
              >
                <CheckIcon />
              </IconButton>

              {/* Remove Task Button */}
              <IconButton 
                edge="end"
                onClick={() => handleRemoveTask(task.id)}
                aria-label="delete"
              >
                <DeleteIcon />
              </IconButton>

              {/* Edit Task Button */}
              <IconButton 
                edge="end"
                onClick={() => {
                  const newTitle = prompt("Edit task title:", task.title);
                  if (newTitle) {
                    handleEditTask(task.id, newTitle);
                  }
                }}
                aria-label="edit"
              >
                <EditIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
}
