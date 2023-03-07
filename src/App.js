import React, { useState, createContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthContextProvider } from './context/AuthContext';
import { SelectedMovieContextProvider } from './context/SelectedMovieContext';
import { ScreenSizeProvider } from './context/ScreenSizeContext';

import './Index.css';
import Navbar from './components/Navbar';
import Account from './pages/Account';
import Home from './pages/Home';
import Login from './pages/Login';
import MovieInfo from './pages/MovieInfo';
import SignUp from './pages/SignUp';
import Trailer from './pages/Trailer';
import Search from './pages/Search';
export const OverLayContext = createContext();

function App() {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);


  return (
    <>
      <ScreenSizeProvider>
        <SelectedMovieContextProvider>
          <AuthContextProvider>
            <OverLayContext.Provider value={{ isOverlayOpen, setIsOverlayOpen }}>
              <Navbar />
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/movieinfo' element={<MovieInfo />} />
                <Route path='/search' element={<Search />} />
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<SignUp />} />
                <Route path='/account' element={<ProtectedRoute><Account /></ProtectedRoute>} />
                <Route path='/trailer' element={<Trailer />} />
              </Routes>
            </OverLayContext.Provider>
          </AuthContextProvider>
        </SelectedMovieContextProvider>
      </ScreenSizeProvider>
    </>
  );
}

export default App;
