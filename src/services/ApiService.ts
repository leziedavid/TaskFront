// src/services/ApiService.ts
import { toast } from 'react-toastify';
import { BaseResponse } from '../interfaces/ApiResponse';

const BASE_URL = 'http://localhost:8090/api/v1';

export const signIn = async (email: string, password: string): Promise<BaseResponse<any>> => {
    try {
        const response = await fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify({ email, password }),
        });
        // if (!response.ok) {}
        return await response.json();

    } catch (error) {
        toast.error("Erreur lors de la connexion :");
        throw error;
    }
};
// Fonction pour s'inscrire
export const signUp = async (username: string, email: string, password: string): Promise<BaseResponse<any>> => {
    try {
        const response = await fetch(`${BASE_URL}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
        });

        if (!response.ok) {
            throw new Error('Failed to sign up');
        }

        return await response.json();

    } catch (error) {

        console.error('Error during sign up:', error);
        throw error;
    }
};


export const sendOTP = async (email: string): Promise<BaseResponse<any>> => {
    try {
        const response = await fetch(`${BASE_URL}/send-otp`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email}),
        });

        if (!response.ok) {
            throw new Error('Failed to verify OTP');
        }

        return await response.json();
    } catch (error) {
        console.error('Error during OTP verification:', error);
        throw error;
    }
};
// Fonction pour vérifier le code OTP
export const verifyOTP = async (email: string, otp: string): Promise<BaseResponse<any>> => {
    try {
        const response = await fetch(`${BASE_URL}/verify-otp`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, otp }),
        });

        if (!response.ok) {
            throw new Error('Failed to verify OTP');
        }

        return await response.json();
    } catch (error) {
        console.error('Error during OTP verification:', error);
        throw error;
    }
};

// Fonction pour réinitialiser le mot de passe
export const resetPassword = async (email: string): Promise<BaseResponse<any>> => {
    try {
        const response = await fetch(`${BASE_URL}/reset-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        if (!response.ok) {
            throw new Error('Failed to reset password');
        }

        return await response.json();
    } catch (error) {
        console.error('Error during password reset:', error);
        throw error;
    }
};

export const changePassword = async (email: string, password: string,otp: string): Promise<BaseResponse<any>> => {
    try {
        const response = await fetch(`${BASE_URL}/ResetPassword`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password, otp }),
        });

        if (!response.ok) {
            throw new Error('Failed to change password');
        }

        return await response.json();
    } catch (error) {
        console.error('Error during password change:', error);
        throw error;
    }
};
