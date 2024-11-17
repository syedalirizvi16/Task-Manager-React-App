import React, { useState } from 'react';
import './styles.css';

function App() {
    // State to manage tasks, search term, and input field
    const [tasks, setTasks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [taskInput, setTaskInput] = useState('');

    // Function to handle task input
    const handleInputChange = (event) => {
        setTaskInput(event.target.value);
    };

    // Function to add a new task
    const addTask = () => {
        if (taskInput.trim()) {
            setTasks([...tasks, { text: taskInput.trim(), completed: false, priority: 'Low' }]);
            setTaskInput(''); // Clear input field
        }
    };

    // Function to toggle task completion
    const toggleTaskCompletion = (index) => {
        const updatedTasks = tasks.map((task, i) =>
            i === index ? { ...task, completed: !task.completed } : task
        );
        setTasks(updatedTasks);
    };

    // Function to delete a task
    const deleteTask = (index) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    };

    // Function to handle search input
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    // Function to set priority of a task
    const setTaskPriority = (index, priority) => {
        const updatedTasks = tasks.map((task, i) =>
            i === index ? { ...task, priority } : task
        );
        setTasks(updatedTasks);
    };

    // Filtered tasks based on search term
    const filteredTasks = tasks.filter((task) =>
        task.text.toLowerCase().includes(searchTerm)
    );

    return (
        <div className="container">
            <header>Task Manager</header>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search tasks..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>
            <div className="add-task-container">
                <input
                    type="text"
                    placeholder="Enter a task"
                    value={taskInput}
                    onChange={handleInputChange}
                />
                <button className="add-task-btn" onClick={addTask}>
                    Add Task
                </button>
            </div>
            <ul className="task-list">
                {filteredTasks.map((task, index) => (
                    <li key={index} className={`task-item ${task.completed ? 'completed' : ''}`}>
                        <span onClick={() => toggleTaskCompletion(index)}>
                            {task.text}
                        </span>
                        <div className="priority">
                            <button
                                className={`priority-btn ${task.priority === 'Low' ? 'low' : ''}`}
                                onClick={() => setTaskPriority(index, 'Low')}
                            >
                                Low
                            </button>
                            <button
                                className={`priority-btn ${task.priority === 'Medium' ? 'medium' : ''}`}
                                onClick={() => setTaskPriority(index, 'Medium')}
                            >
                                Medium
                            </button>
                            <button
                                className={`priority-btn ${task.priority === 'High' ? 'high' : ''}`}
                                onClick={() => setTaskPriority(index, 'High')}
                            >
                                High
                            </button>
                            <button onClick={() => deleteTask(index)} style={{ backgroundColor: '#dc3545' }}>
                                Delete
                            </button>
                            {/* Add "Completed" Button */}
                            <button
                                className="completed-btn"
                                onClick={() => toggleTaskCompletion(index)}
                            >
                                {task.completed ? 'Undo' : 'Complete'}
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
