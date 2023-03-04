import React, { useState, createContext, useContext } from "react";

const SelectedMovieContext = createContext();

export function SelectedMovieContextProvider({ children }) {
    const [selectedMovie, setSelectedMovie] = useState();

    return (
        <SelectedMovieContext.Provider value={{ selectedMovie, setSelectedMovie }}>
            {children}
        </SelectedMovieContext.Provider>
    )
}

export function SelectedMovie() {
    return useContext(SelectedMovieContext);
}