// const API_URL = 'http://localhost:4000/api/task';
const API_URL = "https://todo-app-ecru-one-76.vercel.app";

export const fetchTasks = async () => {
    try {
        const response = await fetch(API_URL + "/");
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
        const response = await fetch(API_URL + "/add", {
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
        const response = await fetch(`${API_URL}/${taskId}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Failed to delete task');
        }
    } catch (error) {
        console.error('Error deleting task:', error);
        throw error;
    }
};

export const updateTask = async (taskId, taskName) => {
    try {
        const response = await fetch(`${API_URL}/${taskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ taskName })
        });
        if (!response.ok) {
            throw new Error('Failed to update task');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error deleting task:', error);
        throw error;
    }
}