import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/home/home';
import ChatBox from './pages/chatBox/chatBox'
import { initializeApp } from 'firebase/app';
import Remote from "./pages/remote/remote";

function App() {
  const firebaseConfig = {
    apiKey: "AIzaSyAvOFgcfbELNrVbS-ZQBlRQkUp2FPRcDnk",
    authDomain: "littlerabbitwebdemo.firebaseapp.com",
    databaseURL: "https://littlerabbitwebdemo-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "littlerabbitwebdemo",
    storageBucket: "littlerabbitwebdemo.appspot.com",
    messagingSenderId: "820736734652",
    appId: "1:820736734652:web:03f48cee592e00bcbc27b9",
    measurementId: "G-ZKHYR4R5FK"
  };

  // Initialize Firebase
  initializeApp(firebaseConfig);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}> </Route>
        <Route path="/chatBox" element={<ChatBox />}> </Route>
        <Route path="/remote" element={<Remote />}> </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
