import { useState, createContext, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthContextProvider } from './Context/AuthContext';

import './Index.css';
import Navbar from './components/Navbar';
import Account from './pages/Account';
import Home from './pages/Home';
import Login from './pages/Login';
import MovieInfo from './pages/MovieInfo';
import SignUp from './pages/SignUp';
import Trailer from './pages/Trailer';

export const AppContext = createContext();

function App() {

  const [selectedMovie, setSelectedMovie] = useState();

  return (
    <>
      <AppContext.Provider value={{ selectedMovie, setSelectedMovie }}>
        <AuthContextProvider>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/movieinfo' element={<MovieInfo />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/account' element={<ProtectedRoute><Account /></ProtectedRoute>} />
            <Route path='/trailer' element={<Trailer />} />
          </Routes>
        </AuthContextProvider>
      </AppContext.Provider>
    </>
  );
}

export default App;
