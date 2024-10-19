import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import AgentSelection from './components/AgentSelection';
import StreamingChat from './components/StreamingChat';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  const [selectedAgent, setSelectedAgent] = useState(null);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {selectedAgent ? (
            <StreamingChat key="chat" agent={selectedAgent} onBack={() => setSelectedAgent(null)} />
          ) : (
            <AgentSelection key="selection" onSelectAgent={setSelectedAgent} />
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

export default App;