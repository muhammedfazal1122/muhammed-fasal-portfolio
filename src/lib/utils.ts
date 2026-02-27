/**
 * Utility functions for mobile optimization and performance
 */

/**
 * Detects if the current device is mobile
 * Uses both user agent and screen width for accuracy
 */
export function isMobile(): boolean {
    if (typeof window === 'undefined') return false;

    // Check user agent for mobile devices
    const userAgent = navigator.userAgent.toLowerCase();
    const mobileKeywords = ['android', 'webos', 'iphone', 'ipad', 'ipod', 'blackberry', 'windows phone'];
    const isMobileUA = mobileKeywords.some(keyword => userAgent.includes(keyword));

    // Check screen width (mobile typically < 768px)
    const isMobileWidth = window.innerWidth < 768;

    return isMobileUA || isMobileWidth;
}

/**
 * Checks if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
    if (typeof window === 'undefined') return false;

    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Returns optimized Framer Motion animation config based on device and user preferences
 */
export function getMobileAnimationConfig() {
    const mobile = isMobile();
    const reducedMotion = prefersReducedMotion();

    if (reducedMotion) {
        // Disable all animations for users who prefer reduced motion
        return {
            initial: {},
            animate: {},
            transition: { duration: 0 },
            whileInView: {},
            viewport: { once: true }
        };
    }

    if (mobile) {
        // Simplified animations for mobile – disable transforms, reduce work
        return {
            initial: {},
            animate: {},
            whileInView: {},
            transition: {
                duration: 0.2,
                ease: "linear" as const
            },
            // Disable hover effects
            whileHover: {},
            // Simpler viewport configuration
            viewport: {
                once: true,
                margin: "-50px" // Trigger earlier on mobile
            }
        };
    }

    // Full animations for desktop
    return {
        transition: {
            duration: 0.8,
            ease: "easeOut" as const
        },
        viewport: {
            once: true
        }
    };
}

/**
 * Get optimized spring config for scroll-based animations
 */
export function getScrollSpringConfig() {
    const mobile = isMobile();

    if (mobile) {
        // Lighter spring physics for mobile
        return {
            damping: 30,
            stiffness: 200
        };
    }

    // Desktop - smooth spring
    return {
        damping: 50,
        stiffness: 400
    };
}

/**
 * Get appropriate video source based on device
 */
export function getVideoSource(desktopSrc: string, mobileSrc: string): string {
    return isMobile() ? mobileSrc : desktopSrc;
}

/**
 * Get video preload strategy based on device
 */
export function getVideoPreloadStrategy(): "auto" | "metadata" | "none" {
    const mobile = isMobile();

    // On mobile, only preload metadata to save bandwidth and improve initial load
    // On desktop, preload full video for better UX
    return mobile ? "metadata" : "auto";
}
