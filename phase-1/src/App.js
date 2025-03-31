// import logo from './logo.svg';
import './App.css';
import Navbar from './Components/NavBar/navbar';
import Footer from './Components/NavBar/footer';
import Slider from './Components/topoviesonshow';
import Othermovies from './Components/othermomvies';
import { Routes, Route } from 'react-router-dom';
import Signin from './Components/signin';
import MovieForm from './Components/CRUD/crud';

function App() {
  return (
    <div className="App">

      <Routes>
        <Route path="/" element={
          <>
            <Navbar />
            <Slider />
            <Othermovies />
            <Footer />
          </>
        }
        />
        <Route path="/signin" element={<Signin />} />
        <Route path="/crud" element={<MovieForm />} />
      </Routes>

    </div>
  );
}

export default App;
