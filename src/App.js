import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthContextProvider } from './context/AuthContext';
import { SelectedMovieContextProvider } from './context/SelectedMovieContext';

import './Index.css';
import Navbar from './components/Navbar';
import Account from './pages/Account';
import Home from './pages/Home';
import Login from './pages/Login';
import MovieInfo from './pages/MovieInfo';
import SignUp from './pages/SignUp';
import Trailer from './pages/Trailer';

function App() {

  // const [selectedMovie, setSelectedMovie] = useState();

  return (
    <>
      {/* <AppContext.Provider value={{ selectedMovie, setSelectedMovie }}> */}
      <SelectedMovieContextProvider>
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
      </SelectedMovieContextProvider>
      {/* </AppContext.Provider> */}
    </>
  );
}

export default App;
