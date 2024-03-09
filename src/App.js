import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/home/home';
import ChatBox from './pages/chatBox/chatBox'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}> </Route>
        <Route path="/chatBox" element={<ChatBox />}> </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
