import React, { useState, useEffect } from 'react';
import { fetchTasks, addTask, deleteTask } from '../services/taskService';

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
            <h1>Task List</h1>
            <form onSubmit={handleAddTask}>
                <input
                    type='text'
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                    placeholder='Enter task name'
                />
                <button type="submit">Add Task</button>
            </form>
            <ul>
                {tasks && tasks.map(task => (
                    <li key={task._id}>
                        <h2>{task.taskName}</h2>
                        <button onClick={() => handleDeleteTask(task._id)}>Delete task</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
