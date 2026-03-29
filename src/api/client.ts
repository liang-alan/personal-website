import axios from 'axios';
import { Profile } from '../types';

const API_URL = '/api/profile';

export const fetchProfile = async (): Promise<Profile> => {
    try {
        const response = await axios.get<Profile>(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching profile data:', error);
        throw error;
    }
};