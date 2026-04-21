type AnalyticsParams = Record<string, string | number | boolean | undefined>;

declare global {
    interface Window {
        dataLayer: unknown[];
        gtag?: (...args: unknown[]) => void;
    }
}

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim();
const GA_SCRIPT_ID = 'ga4-script';

let initialized = false;

const isEnabled = (): boolean => Boolean(GA_MEASUREMENT_ID);
const isLocalDebug = (): boolean =>
    typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
const shouldTrack = (): boolean => isEnabled() && !isLocalDebug();
const shouldLogDebug = (): boolean => isLocalDebug();

const debugLog = (message: string, payload?: unknown): void => {
    if (!shouldLogDebug()) {
        return;
    }

    if (payload !== undefined) {
        console.log(`[ga4] ${message}`, payload);
        return;
    }

    console.log(`[ga4] ${message}`);
};

const getGtag = (): ((...args: unknown[]) => void) | null => {
    if (!isEnabled() || typeof window === 'undefined') {
        return null;
    }

    if (!window.dataLayer) {
        window.dataLayer = [];
    }

    if (!window.gtag) {
        window.gtag = function gtag() {
            window.dataLayer.push(arguments);
        };
    }

    return window.gtag;
};

const cleanParams = (params: AnalyticsParams = {}): Record<string, string | number | boolean> =>
    Object.fromEntries(
        Object.entries(params).filter(([, value]) => value !== undefined)
    ) as Record<string, string | number | boolean>;

export const initializeAnalytics = (): void => {
    if (!isEnabled() || typeof document === 'undefined' || initialized) {
        return;
    }

    if (!shouldTrack()) {
        debugLog('analytics disabled on localhost');
        initialized = true;
        return;
    }

    const gtag = getGtag();
    if (!gtag) {
        return;
    }

    if (!document.getElementById(GA_SCRIPT_ID)) {
        const script = document.createElement('script');
        script.id = GA_SCRIPT_ID;
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
        script.onload = () => debugLog('gtag script loaded');
        script.onerror = () => debugLog('gtag script failed to load');
        document.head.appendChild(script);
    }

    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID, {
        send_page_view: false,
        anonymize_ip: true,
        debug_mode: isLocalDebug(),
    });
    debugLog('initialized', { measurementId: GA_MEASUREMENT_ID });

    initialized = true;
};

export const trackPageView = (path: string): void => {
    if (!shouldTrack()) {
        debugLog('page_view skipped on localhost', { path });
        return;
    }

    const gtag = getGtag();
    if (!gtag || typeof window === 'undefined' || typeof document === 'undefined') {
        return;
    }

    gtag('event', 'page_view', {
        page_path: path,
        page_location: window.location.href,
        page_title: document.title,
        debug_mode: isLocalDebug(),
    });
    debugLog('page_view', { path });
};

export const trackEvent = (eventName: string, params?: AnalyticsParams): void => {
    const cleanedParams = cleanParams(params);

    if (!shouldTrack()) {
        debugLog(`event:${eventName} skipped on localhost`, cleanedParams);
        return;
    }

    const gtag = getGtag();
    if (!gtag) {
        return;
    }

    gtag('event', eventName, cleanedParams);
    debugLog(`event:${eventName}`, cleanedParams);
};

export const analyticsEnabled = isEnabled();
