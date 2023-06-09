import React, { useState, useEffect } from 'react';
import '../App.css';

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [activeTag, setActiveTag] = useState('all');

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        setTasks(storedTasks);
    }, []);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleAddTask = () => {
        if (inputValue.trim() !== '') {
            const newTask = {
                id: Date.now(),
                text: inputValue,
                completed: false,
            };
            setTasks([...tasks, newTask]);
            setInputValue('');
        }
    };

    const handleCompleteTask = (taskId) => {
        const updatedTasks = tasks.map((task) => {
            if (task.id === taskId) {
                return {
                    ...task,
                    completed: !task.completed,
                };
            }
            return task;
        });
        setTasks(updatedTasks);
    };

    const handleDeleteTask = (taskId) => {
        const updatedTasks = tasks.filter((task) => task.id !== taskId);
        setTasks(updatedTasks);
    };

    const handleDeleteAllTasks = () => {
        setTasks([]);
    };

    const filteredTasks = tasks.filter((task) => {
        if (activeTag === 'active') {
            return !task.completed;
        } else if (activeTag === 'complete') {
            return task.completed;
        }
        return true;
    });

    return (
        <div className="app">
            <h1>#Todo App</h1>
            <div className="tag-container">
                <span
                    className={activeTag === 'all' ? 'active' : ''}
                    onClick={() => setActiveTag('all')}
                >
                    All
                </span>
                <span
                    className={activeTag === 'active' ? 'active' : ''}
                    onClick={() => setActiveTag('active')}
                >
                    Active
                </span>
                <span
                    className={activeTag === 'complete' ? 'active' : ''}
                    onClick={() => setActiveTag('complete')}
                >
                    Complete
                </span>
            </div>
            <div className="input-container">
                <input
                    type="text"
                    placeholder="Enter a task"
                    value={inputValue}
                    onChange={handleInputChange}
                />
                <button className='btn' onClick={handleAddTask}>Add</button>
            </div>
            <ul className="task-list">
                {filteredTasks.map((task) => (
                    <li key={task.id} className={task.completed ? 'completed' : ''}>
                        <span
                            className="task-text"
                            onClick={() => handleCompleteTask(task.id)}
                        >
                            {task.text}
                        </span>
                        <button
                            className="delete-icon"
                            onClick={() => handleDeleteTask(task.id)}
                            class ="des"
                        >delete</button>
                    </li>
                ))}
            </ul>
            <button className="delete-all-button" onClick={handleDeleteAllTasks}>
                Delete All
            </button>
        </div>
    );
};

export default App;