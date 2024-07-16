const API_URL = 'http://localhost:4000/api';

export const fetchTasks = async () => {
    try {
        const response = await fetch(API_URL + "/tasklist");
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        return [];
    }
};

export const addTask = async (taskName) => {
    try {
        const response = await fetch(API_URL + "/addTask", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ taskName })
        });
        if (!response.ok) {
            throw new Error('Failed to add task');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error adding task: ", error)
        throw error
    }
}

export const deleteTask = async (taskId) => {
    try {
        const response = await fetch(`${API_URL + "/deletetask"}/${taskId}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Failed to delete task');
        }
    } catch (error) {
        console.error('Error deleting task:', error);
        throw error; // Propagate the error to handle in components
    }
};