import axios from 'axios';
import { Profile } from '../types';
import { IMAGE_BASE_URL, PROFILE_URL } from '../config';

let cachedProfile: Profile | null = null;
let profileRequest: Promise<Profile> | null = null;

const withApiBase = (path?: string): string | undefined => {
    if (!path) return path;

    if (path.startsWith('http://') || path.startsWith('https://')) {
        return path;
    }

    if (path.startsWith('/api/')) {
        return `${IMAGE_BASE_URL}/${path.replace(/^\/api\/images\//, '')}`;
    }

    return path;
};

const normalizeProfile = (profile: Profile): Profile => ({
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
});

export const fetchProfile = async (): Promise<Profile> => {
    if (cachedProfile) {
        return cachedProfile;
    }

    if (profileRequest) {
        return profileRequest;
    }

    profileRequest = axios
        .get<Profile>(PROFILE_URL)
        .then((response) => {
            cachedProfile = normalizeProfile(response.data);
            return cachedProfile;
        })
        .catch((error) => {
            console.error('Error fetching profile data:', error);
            profileRequest = null;
            throw error;
        });

    return profileRequest;
};
