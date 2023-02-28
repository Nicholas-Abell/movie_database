import { useState, createContext, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthContextProvider } from './Context/AuthContext';
import './Index.css';
import Account from './pages/Account';
import Home from './pages/Home';
import Login from './pages/Login';
import MovieInfo from './pages/MovieInfo';
import SignUp from './pages/SignUp';

function App() {

  const [selectedMovie, setSelectedMovie] = useState();

  const movieInfoContext = createContext();

  useEffect(() => {
    console.log(selectedMovie);
    console.log(selectedMovie?.img);
  }, [selectedMovie])

  return (
    <>
      <AuthContextProvider>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home setSelectedMovie={setSelectedMovie} />} />
          <Route path='/movieinfo' element={<MovieInfo selectedMovie={selectedMovie} />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/account' element={<ProtectedRoute><Account setSelectedMovie={setSelectedMovie} /></ProtectedRoute>} />
        </Routes>
      </AuthContextProvider>
    </>
  );
}

export default App;
