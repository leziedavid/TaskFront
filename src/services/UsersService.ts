
const BASE_URL = 'http://localhost:8090/api/v1';

export const getAllUsersService = async () => {
    try {
        const response = await fetch(`${BASE_URL}/getAllUsers`);
        if (!response.ok) {
            throw new Error('Failed to fetch departments');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching departments:', error);
        throw error;
    }
};