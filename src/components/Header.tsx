import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const links = [
    { id: 'work', label: 'Work' },
    { id: 'projects', label: 'Projects' },
    { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'Contact' },
];

const Header: React.FC = () => {
    const [active, setActive] = useState<string>('portfolio');
    const [hidden, setHidden] = useState<boolean>(false);

    const debounceTimer = useRef<number | null>(null);
    const lastY = useRef<number>(typeof window !== 'undefined' ? window.scrollY : 0);
    const ticking = useRef<boolean>(false);

    useEffect(() => {
        const sections = Array.from(document.querySelectorAll('main section[id]')) as HTMLElement[];
        if (!sections.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActive(entry.target.id);
                    }
                });
            },
            { root: null, rootMargin: '-40% 0px -40% 0px', threshold: 0 }
        );

        sections.forEach((s) => observer.observe(s));

        const updateActiveFromView = () => {
            const secs = Array.from(document.querySelectorAll('main section[id]')) as HTMLElement[];
            if (!secs.length) return;
            const viewportMiddle = window.innerHeight / 2;
            let best: HTMLElement | null = null;
            let bestDist = Infinity;
            secs.forEach((s) => {
                const rect = s.getBoundingClientRect();
                const mid = rect.top + rect.height / 2;
                const dist = Math.abs(mid - viewportMiddle);
                if (dist < bestDist) {
                    bestDist = dist;
                    best = s;
                }
            });
            if (best) setActive((best as HTMLElement).id);
        };

        const debounced = () => {
            if (debounceTimer.current) window.clearTimeout(debounceTimer.current);
            // @ts-ignore
            debounceTimer.current = window.setTimeout(() => {
                updateActiveFromView();
            }, 40);
        };

        window.addEventListener('scroll', debounced);
        window.addEventListener('hashchange', debounced);
        window.addEventListener('popstate', debounced);

        // keep header hide/show logic separate and lightweight
        const onDirScroll = () => {
            if (ticking.current) return;
            ticking.current = true;
            requestAnimationFrame(() => {
                const y = window.scrollY || document.documentElement.scrollTop;
                const delta = y - lastY.current;
                // small threshold to avoid jitter
                if (Math.abs(delta) > 8) {
                    if (delta > 0 && y > 80) {
                        setHidden(true);
                    } else if (delta < 0) {
                        setHidden(false);
                    }
                    lastY.current = y;
                }
                ticking.current = false;
            });
        };
        window.addEventListener('scroll', onDirScroll, { passive: true });

        return () => {
            observer.disconnect();
            window.removeEventListener('scroll', debounced);
            window.removeEventListener('hashchange', debounced);
            window.removeEventListener('popstate', debounced);
            if (debounceTimer.current) window.clearTimeout(debounceTimer.current);
            window.removeEventListener('scroll', onDirScroll as EventListener);
        };
    }, []);

    const location = useLocation();
    const navigate = useNavigate();

    const onTitleClick = (e: React.MouseEvent) => {
        // if we're on a detail page and have a lastScroll, navigate back to root and restore
        if (location.pathname.startsWith('/blog')) {
            e.preventDefault();
            try {
                const raw = sessionStorage.getItem('lastScroll');
                if (raw) {
                    const { scrollY, hash } = JSON.parse(raw);
                    navigate('/');
                    setTimeout(() => {
                        if (hash) window.location.hash = hash;
                        window.scrollTo({ top: scrollY || 0, behavior: 'smooth' });
                    }, 50);
                    return;
                }
            } catch (err) {
                // ignore
            }
            navigate('/');
            return;
        }

        if (location.pathname !== '/') {
            e.preventDefault();
            navigate('/');
        }
    };

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        // if off the homepage, navigate back to root and then set the hash / scroll
        if (location.pathname !== '/') {
            e.preventDefault();
            try {
                // store lastScroll so BlogPost back can still restore if needed
                sessionStorage.setItem(
                    'lastScroll',
                    JSON.stringify({ scrollY: 0, hash: `#${id}` })
                );
            } catch (err) {
                // ignore
            }
            navigate('/');
            setTimeout(() => {
                window.location.hash = `#${id}`;
                // ensure header active updates
                setActive(id);
                // smooth scroll to element
                const el = document.getElementById(id);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 60);
            return;
        }

        // not on blog page — allow normal anchor behavior but update active immediately
        setActive(id);
    };

    return (
        <header className={hidden ? 'hidden' : ''}>
            <h1><a href="#top" onClick={onTitleClick}>Alan Liang</a></h1>
            <nav>
                <ul>
                    {links.map((l) => (
                        <li key={l.id}>
                            <a
                                className={active === l.id ? 'active' : ''}
                                href={`#${l.id}`}
                                onClick={(e) => handleNavClick(e, l.id)}
                            >
                                {l.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
