import React from 'react';
import { Code, PenTool, Languages, Bot } from 'lucide-react';
import { motion } from 'framer-motion';

const agents = [
  { id: 'python', name: 'Python ProPrompt', icon: Code, prompt: "You are an expert Python programmer. Provide detailed, efficient, and well-commented Python code solutions." },
  { id: 'cpp', name: 'C++ Expert', icon: Code, prompt: "You are a C++ expert. Offer optimized C++ code solutions with clear explanations of advanced concepts." },
  { id: 'writer', name: 'Creative Writer', icon: PenTool, prompt: "You are a creative writer. Generate engaging and original content across various genres and styles." },
  { id: 'translator', name: 'Language Translator', icon: Languages, prompt: "You are a multilingual translator. Provide accurate translations between languages, considering context and cultural nuances." },
  { id: 'general', name: 'General Assistant', icon: Bot, prompt: "You are a helpful AI assistant. Provide informative and friendly responses on a wide range of topics." },
];

const AgentSelection = ({ onSelectAgent }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-[calc(100vh-8rem)] bg-gray-100 flex flex-col items-center justify-center p-4"
    >
      <motion.h1 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-3xl font-bold mb-8 text-blue-600"
      >
        Select an AI Agent
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((agent, index) => (
          <motion.button
            key={agent.id}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelectAgent(agent)}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center"
          >
            <agent.icon size={48} className="text-blue-500 mb-4" />
            <h2 className="text-xl font-semibold text-gray-800">{agent.name}</h2>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default AgentSelection;