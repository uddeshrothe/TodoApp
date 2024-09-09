import React, { useState, useEffect } from 'react';
import { fetchTasks, addTask, deleteTask, updateTask } from '../services/taskService';
import { } from '../App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPlus, faEdit } from '@fortawesome/free-solid-svg-icons'


const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [taskName, setTaskName] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editing, setEditing] = useState(false)
    const [currentTask, setCurrentTask] = useState({})


    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = '/login'; // Redirect to login if not authenticated
        }

        const getTasks = async () => {
            try {
                const tasksData = await fetchTasks();
                setTasks(tasksData);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        getTasks();
    }, []);

    useEffect(() => {
        const getTasks = async () => {
            try {
                const tasksData = await fetchTasks();
                setTasks(tasksData);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        getTasks();
    }, []);

    const handleAddTask = async (e) => {
        e.preventDefault();
        if (!taskName) return;
        try {
            const newTask = await addTask(taskName);
            setTasks([...tasks, newTask]);
            setTaskName('');
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    const handleDeleteTask = async (taskId) => {
        try {
            await deleteTask(taskId);
            setTasks(tasks.filter(task => task._id !== taskId));
        } catch (error) {
            console.error('Error deleting task:', error.message);
        }
    };

    const handleCheckboxChange = (index) => {
        const newTasks = tasks.map((task, i) => {
            if (i === index) {
                return { ...task, completed: !task.completed };
            }
            return task;
        });
        setTasks(newTasks);
    };

    const handleEditTask = (task) => {
        console.log('Editing Task:', task);
        setEditing(true);
        setCurrentTask(task);
        setTaskName(task.taskName);
    };

    const handleUpdateTask = async (e) => {
        e.preventDefault();
        if (!taskName) return;
        try {
            setEditing(false);
            const updatedTask = { ...currentTask, taskName };
            setTasks(tasks.map(task => task._id === updatedTask._id ? updatedTask : task));
            try {
                await updateTask(currentTask._id, taskName);
            } catch (error) {
                setTasks(tasks.map(task => task._id === currentTask._id ? currentTask : task));
                setError(error.message);
            } finally {
                setTaskName('');
            }
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <div className="container__item">
                <form onSubmit={editing ? handleUpdateTask : handleAddTask} className='form'>
                    <input
                        type='text'
                        className="form__field"
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                        placeholder='Enter task name'
                    />
                    <button type="submit" className="btn btn--primary btn--inside uppercase">
                        <FontAwesomeIcon icon={editing ? faEdit : faPlus} /> {editing ? 'Update Task' : 'Add Task'}
                    </button>
                </form>
            </div>
            <div className='task-list'>
                <ul className="custom-list">
                    {tasks && tasks.map((task, index) => (
                        <li key={task._id} className="task-index">
                            <label className="custom-checkbox">
                                <input
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={() => handleCheckboxChange(index)}
                                /><span className="checkmark"></span>
                            </label>
                            <span className={`task-text ${task.completed ? 'completed' : ''}`}>{task.taskName} </span>
                            <button className="edit-button" onClick={() => handleEditTask(task)}>
                                <FontAwesomeIcon icon={faEdit} />
                            </button>
                            <button className="delete-button" onClick={() => handleDeleteTask(task._id)}><FontAwesomeIcon icon={faTrash} /></button>

                        </li>
                    ))}
                </ul>
            </div>
        </div>

    );
};

export default TaskList;
