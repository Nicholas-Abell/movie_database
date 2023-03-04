import React, { useState, createContext, useContext } from "react";

const InfoOverlayContext = createContext();

export function InfoOverlayContextProvider({ Children }) {
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);

    return (
        <InfoOverlayContext.Provider value={{ isOverlayOpen, setIsOverlayOpen }}>
            {Children}
        </InfoOverlayContext.Provider>
    )
}

export function InfoOverlayC() {
    return useContext(InfoOverlayContext)
}