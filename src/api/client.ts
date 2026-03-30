import axios from 'axios';
import { Profile } from '../types';
import { API_BASE_URL } from '../config';

const API_URL = `${API_BASE_URL}/api/profile`;

const withApiBase = (path?: string): string | undefined => {
    if (!path) return path;

    if (path.startsWith('http://') || path.startsWith('https://')) {
        return path;
    }

    if (path.startsWith('/api/')) {
        return `${API_BASE_URL}${path}`;
    }

    return path;
};

export const fetchProfile = async (): Promise<Profile> => {
    try { // changes all API image paths to the path with url for server 
        const response = await axios.get<Profile>(API_URL);
        const profile = response.data;

        const normalizedProfile: Profile = {
            ...profile,
            introImage: withApiBase((profile as any).introImage),
            work: (profile.work || []).map((job: any) => ({
                ...job,
                image: withApiBase(job.image),
            })),
            projects: (profile.projects || []).map((project: any) => ({
                ...project,
                image: withApiBase(project.image),
            })),
        };

        return normalizedProfile;
    } catch (error) {
        console.error('Error fetching profile data:', error);
        throw error;
    }
};