// src/services/ApiService.ts
import { toast } from 'react-toastify';
import { BaseResponse } from '../interfaces/ApiResponse';

const BASE_URL = 'http://localhost:8090/api/v1';


export const getAllUsersByDepartment = async (department: string) => {
    try {
        const response = await fetch(`${BASE_URL}/departments/${department}/users`);
        if (!response.ok) {
            throw new Error('Failed to fetch departments');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching departments:', error);
        throw error;
    }
};

export const getAllDepartments = async () => {
    try {
        const response = await fetch(`${BASE_URL}/departments/getAllDepartments`);
        if (!response.ok) {
            throw new Error('Failed to fetch departments');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching departments:', error);
        throw error;
    }
};


export const SaveProject = async (data: FormData): Promise<BaseResponse<any>> => {
    try {
        const response = await fetch(`${BASE_URL}/projects`, {
            method: 'POST',
            body: data,
            // headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });
        
        if (!response.ok) {
            throw new Error('Erreur lors de la sauvegarde du projet');
        }
        
        return await response.json();

    } catch (error: any) {
        toast.error(`Erreur lors de la sauvegarde du projet : ${error.message}`);
        throw error;
    }
};

export const updateProject = async (id: string, data: FormData): Promise<BaseResponse<any>> => {
    try {
        const response = await fetch(`${BASE_URL}/projects/update/${id}`, {
            method: 'PUT',
            body: data,
            // headers: { 'Content-Type': 'multipart/form-data' } // Décommentez cette ligne si nécessaire
        });

        if (!response.ok) {
            throw new Error('Erreur lors de la mise à jour du projet');
        }

        return await response.json();

    } catch (error: any) {
        console.error(`Erreur lors de la mise à jour du projet : ${error.message}`);
        throw error;
    }
};

export const addNewsFile = async (data: FormData): Promise<BaseResponse<any>> => {
    try {
        const response = await fetch(`${BASE_URL}/projects/files/addNewsFile`, {
            method: 'POST',
            body: data
        });
    
        if (!response.ok) {
            throw new Error('Erreur lors de la sauvegarde des fichiers');
        }
    
        return await response.json();
    
    } catch (error) {
        toast.error(`Erreur lors de la sauvegarde des fichiers`);
        throw error;
    }
    
};

export const getAllProjects = async () => {
    try {
        const response = await fetch(`${BASE_URL}/projects/getAllProjects`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch projects');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching projects:', error);
        throw error;
    }
};

export const getProjectDetails = async (projectCode: string) => {
    try {
        const response = await fetch(`${BASE_URL}/projects/detail/${projectCode}`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch project details');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching project details:', error);
        throw error;
    }
};
export const getProjectUsers = async (projectCode: string) => {
    try {
        const response = await fetch(`${BASE_URL}/projects/projetUsersliste/${projectCode}`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch project details');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching project details:', error);
        throw error;
    }
};
export const getProjectByCodes = async (projectCode: string) => {
    try {
        const response = await fetch(`${BASE_URL}/projects/getProjectByCodes/${projectCode}`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch project details');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching project details:', error);
        throw error;
    }
};

export const deleteProject = async (id: number) => {
    try {
        const response = await fetch(`${BASE_URL}/projects/delete/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Failed to delete project');
        }
        return await response.json();
    } catch (error) {
        console.error('Error deleting project:', error);
        throw error;
    }
};

export const changePriority = async (id: number, priority: string, selectedColors: string) => {
    try {
        const response = await fetch(`${BASE_URL}/projects/updatePriority/${id}?priority=${encodeURIComponent(priority)}&Colors=${encodeURIComponent(selectedColors)}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) {
            throw new Error('Failed to update priority');
        }
        return await response.json();
    } catch (error) {
        console.error('Error updating priority:', error);
        throw error;
    }
};

export const changeState = async (id: number, state: string, selectedColors: string) => {
    try {
        const response = await fetch(`${BASE_URL}/projects/updateState/${id}?state=${encodeURIComponent(state)}&Colors=${encodeURIComponent(selectedColors)}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) {
            throw new Error('Failed to update priority');
        }
        return await response.json();
    } catch (error) {
        console.error('Error updating priority:', error);
        throw error;
    }
};

export const assignUsersToProject = async (id: string, data: FormData) => {
    try {
        const response = await fetch(`${BASE_URL}/projects/assignUsers/${id}/assignUsers`, {
            method: 'POST',
            body: data
        });

        if (!response.ok) {
            throw new Error(`Erreur HTTP ${response.status} - ${response.statusText}`);
        }

        return await response.json(); // Si vous souhaitez retourner des données du backend
    } catch (error) {
        throw new Error(`Erreur lors de l'assignation des utilisateurs au projet :`);
    }
};


export const removeUserFromProject = async (projectId: string, userId: number) => {
    try {
        const response = await fetch(`${BASE_URL}/projects/removeUserFromProject/${projectId}/users/${userId}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Failed to delete user from project');
        }
        return await response.json();

    } catch (error) {
        
        console.error('Error deleting user from project:', error);
        throw error;
    }
};

export const  updateGroupLeader = async (projectId: string, currentLeaderId: number, newLeaderId: number) => {
    try {
        
        const response = await fetch(`${BASE_URL}/projects/updateGroupLeader/${projectId}?currentLeaderId=${encodeURIComponent(currentLeaderId)}&newLeaderId=${encodeURIComponent(newLeaderId)}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                // Ajoutez vos headers d'authentification ou autres si nécessaire
            },
            body: JSON.stringify({ currentLeaderId, newLeaderId }),
        });

        if (!response.ok) {
            throw new Error('Erreur lors de la mise à jour du leader : ' + response.statusText);
        }

        console.log('Mise à jour du leader réussie');
        return await response.json();

        } catch (error) {

            console.error('Erreur lors de la mise à jour du leader :');
            // Gérez l'erreur selon vos besoins
        }
};




