import React, { useState, useEffect } from 'react';
import { fetchTasks, addTask, deleteTask } from '../services/taskService';
import { } from '../App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons'


const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [taskName, setTaskName] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <div class="container__item">
                <form onSubmit={handleAddTask} class='form'>
                    <input
                        type='text'
                        class="form__field"
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                        placeholder='Enter task name'
                    />
                    <button type="submit" class="btn btn--primary btn--inside uppercase"><FontAwesomeIcon icon={faPlus} />  Add Task</button>
                </form>
            </div>
            <div class='task-list'>
                <ul class="custom-list">
                    {tasks && tasks.map(task => (
                        <li key={task._id} class="task-index">
                            <span class='task-text'>{task.taskName} </span>
                            <button class="delete-button" onClick={() => handleDeleteTask(task._id)}><FontAwesomeIcon icon={faTrash} /></button>

                        </li>
                    ))}
                </ul>
            </div>
        </div>

    );
};

export default TaskList;
