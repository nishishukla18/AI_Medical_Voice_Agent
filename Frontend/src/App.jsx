import React from 'react'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard';
import Pricing from './components/Pricing';
import Features from "./components/Features"
import Layout from './pages/Layout';
import { BrowserRouter, Routes, Route } from "react-router";
import VoiceCall from './components/VoiceCall';
import History from './components/History';


function App() {
  return (
    <div>
      <BrowserRouter>
    <Routes>
      <Route element={<Layout/>}>
      <Route path="/" element={<Home />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/features" element={<Features/>} />
      <Route path="/voicecall" element={<VoiceCall />} />
      <Route path="/dashboard" element={<Dashboard/>}/>
       <Route path="/history" element={<History/>} />
      </Route>
    </Routes>
  </BrowserRouter>,
    </div>
  )
}

export default App