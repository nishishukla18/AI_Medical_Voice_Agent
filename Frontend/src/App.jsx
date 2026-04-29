// import React, { useState } from 'react';
// import Home from './pages/Home';
// import Dashboard from './pages/Dashboard';
// import Pricing from './components/Pricing';
// import Features from './components/Features';
// import Layout from './pages/Layout';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import VoiceCall from './components/VoiceCall';
// import History from './components/History';

// // Community system imports
// import MessageList from './components/MessageList';
// import MessageForm from './components/MessageForm';

// function App() {
//   const [messages, setMessages] = useState([]);

//   const handleNewMessage = (msg) => {
//     setMessages((prev) => [msg, ...prev]);
//   };

//   return (
//     <div>
//       <BrowserRouter>
//         <Routes>
//           <Route element={<Layout />}>
//             <Route path="/" element={<Home />} />
//             <Route path="/pricing" element={<Pricing />} />
//             <Route path="/features" element={<Features />} />
//             <Route path="/voicecall" element={<VoiceCall />} />
//             <Route path="/dashboard" element={<Dashboard />} />
//             <Route path="/history" element={<History />} />

//             {/* New community support route */}
//             <Route
//               path="/community"
//               element={
//                 <div>
//                   <h1>Community Support</h1>
//                   <MessageForm onNewMessage={handleNewMessage} />
//                   <MessageList />
//                 </div>
//               }
//             />
//           </Route>
//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;

import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Pricing from './components/Pricing';
import Features from './components/Features';
import Layout from './pages/Layout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import VoiceCall from './components/VoiceCall';
import History from './components/History';
import Community from './components/Community'
import { fetchMessages } from './api';

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const load = async () => {
      const data = await fetchMessages();
      setMessages(data);
    };
    load();

    const interval = setInterval(load, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleNewMessage = (msg) => {
    setMessages((prev) => [msg, ...prev]);
  };

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/features" element={<Features />} />
            <Route path="/voicecall" element={<VoiceCall />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/history" element={<History />} />

            {/* Community support route */}
            <Route path="/community" element={<Community />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
