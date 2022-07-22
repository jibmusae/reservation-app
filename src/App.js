import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/AdminPage';
import MyPage from './pages/MyPage';
import Site from './pages/Site';
import About from './pages/About';
import Reservation from './pages/Reservation';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/MyPage" element={<MyPage />} />
          <Route path="/site" element={<Site />} />
          <Route path="/about" element={<About />} />
          <Route path="/reservation/" element={<Reservation />} />
          <Route
            path="/reservation/:roomID/:roomName/:peopleNumber"
            element={<Reservation />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
