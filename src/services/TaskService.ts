// src/services/ApiService.ts
import { toast } from 'react-toastify';
import { BaseResponse } from '../interfaces/ApiResponse';

const BASE_URL = 'http://localhost:8090/api/v1';

export const SaveTask = async (data: any): Promise<BaseResponse<any>> => {
    try {
        const response = await fetch(`${BASE_URL}/tasks/addTasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Spécifier le type de contenu comme JSON
            },
            body: JSON.stringify(data), // Convertir l'objet JavaScript en chaîne JSON
        });

        if (!response.ok) {

            throw new Error('Erreur lors de la sauvegarde du projet');
        }

        return await response.json();

    } catch (error: any) {
        // toast.error(`Erreur lors de la sauvegarde du projet : ${error.message}`);
        throw error;
    }
};

export const deleteTask = async (id: number) => {
    try {
        const response = await fetch(`${BASE_URL}/tasks/delete/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Failed to delete tasks');
        }
        return await response.json();
    } catch (error) {
        console.error('Error deleting tasks:', error);
        throw error;
    }
};

export const changeTaskState = async (id: number, state: string, selectedColors: string) => {
    try {
        const response = await fetch(`${BASE_URL}/tasks/updateTaskState/${id}?state=${encodeURIComponent(state)}&Colors=${encodeURIComponent(selectedColors)}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) {
            throw new Error('Failed to update task');
        }
        return await response.json();
    } catch (error) {
        console.error('Error updating task:', error);
        throw error;
    }
};

