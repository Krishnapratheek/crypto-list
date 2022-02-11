import logo from './logo.svg';
import './App.css';
import {Routes, Route,BrowserRouter as Router} from "react-router-dom";
import Home from './pages/Home';
import AddCoin from './pages/AddCoin';

function App() {
  return (
    <div className="App">
 
      <Routes>
      <Route index path="/" element={<Home />} />
      <Route path="/addCoin" element={< AddCoin/>} />
    </Routes>
     
   
    </div>
  );
}

export default App;
