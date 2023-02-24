import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import './Index.css';
import Home from './pages/Home';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}/>
      </Routes>
    </>
  );
}

export default App;
