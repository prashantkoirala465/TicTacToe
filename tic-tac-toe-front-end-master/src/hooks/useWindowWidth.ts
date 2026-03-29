// Import necessary hooks and constants.
import { useEffect, useState } from 'react';

import { ScreenSizesNumber } from 'theme/StyleConstants';

// Custom hook to track window width.
export const useWindowWidth = (): { windowWidth: number } => {
    // Initialize windowWidth state with innerWidth or a default large screen size.
    const [windowWidth, setWindowWidth] = useState(
        typeof window !== 'undefined' ? window?.innerWidth : ScreenSizesNumber.xlarge,
    );

    // Handle window resize events to update windowWidth.
    useEffect(() => {
        const handleResize = () => setWindowWidth(window?.innerWidth);

        // Add event listener for window resize.
        window.addEventListener('resize', handleResize);

        // Cleanup by removing the event listener on unmount.
        return () => window.removeEventListener('resize', handleResize);
    }, []); // Empty dependency array ensures the effect runs once.

    // Return current windowWidth value.
    return { windowWidth };
};
