import './App.css';
import Navbar from './component/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Plants from './pages/Plants/Plants';

function App() {
  return (
    <div>

      <BrowserRouter>
        <Routes>
          <Route path="/sign-in" element={<Plants />} />
          <Route path="/sign-up" element={<Plants />} />
          <Route element={<Navbar />}>
            <Route path="/" element={<Plants />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
