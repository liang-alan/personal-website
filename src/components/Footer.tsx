import React from 'react';
import useProfile from '../hooks/useProfile';

const Footer: React.FC = () => {
    const { profile } = useProfile();
    const social = (profile as any)?.social || {};
    const github = social.github || 'https://github.com/yourusername';
    const linkedin = social.linkedin || 'https://linkedin.com/in/yourusername';

    return (
        <footer>
            <p>&copy; {new Date().getFullYear()} {profile?.name || 'Alan Liang'}. All rights reserved.</p>
            <div className="social-icons">
                <a href={github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 012.01-.27c.68 0 1.36.09 2.01.27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.19 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                    </svg>
                </a>
                <a href={linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.79-1.75-1.764 0-.973.784-1.763 1.75-1.763s1.75.79 1.75 1.763c0 .974-.784 1.764-1.75 1.764zm13.5 11.268h-3v-5.604c0-1.337-.027-3.057-1.864-3.057-1.865 0-2.151 1.454-2.151 2.957v5.704h-3v-10h2.881v1.367h.041c.401-.759 1.379-1.558 2.84-1.558 3.039 0 3.603 2.001 3.603 4.6v5.591z" />
                    </svg>
                </a>
            </div>
        </footer>
    );
};

export default Footer;