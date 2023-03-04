import React, { createContext, useState, useEffect } from 'react';

export const ScreenSizeContext = createContext(false);

export const ScreenSizeProvider = ({ children }) => {
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        function handleResize() {
            setIsSmallScreen(window.innerWidth < 768);
        }

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <ScreenSizeContext.Provider value={isSmallScreen}>
            {children}
        </ScreenSizeContext.Provider>
    );
};
