import React, { useState, useEffect } from 'react';
import { MessageCircle, Mic, MicOff, Send, X, Sparkles, Brain, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  isVoice?: boolean;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ isOpen, onClose }) => {
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hello! I'm your AI legal assistant. I can help you find the perfect lawyer for your needs. You can either type your question or use voice input. What legal matter can I help you with today?",
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const toggleVoiceMode = () => {
    setIsVoiceMode(!isVoiceMode);
    if (isListening) {
      setIsListening(false);
    }
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    if (!isListening) {
      // Simulate voice recognition
      setTimeout(() => {
        setIsListening(false);
        handleVoiceInput("I need help with a personal injury case from a car accident last week");
      }, 3000);
    }
  };

  const handleVoiceInput = (voiceText: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: voiceText,
      timestamp: new Date(),
      isVoice: true
    };
    
    setMessages(prev => [...prev, userMessage]);
    generateAIResponse(voiceText);
  };

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    generateAIResponse(inputText);
  };

  const generateAIResponse = (userInput: string) => {
    setIsTyping(true);
    
    setTimeout(() => {
      const responses = [
        "I understand you're dealing with a personal injury case. Based on your description, I recommend connecting with a personal injury specialist. I've found 3 highly-rated lawyers in your area with excellent track records in car accident cases. Would you like me to show you their profiles?",
        "That sounds like a complex legal matter. Let me analyze your situation and match you with the most suitable attorney. I'm searching through our network of verified lawyers who specialize in this area of law.",
        "I can definitely help you with that. Based on the details you've provided, I'm identifying lawyers who have successfully handled similar cases. This will ensure you get the best possible representation for your specific situation."
      ];

      const aiMessage: Message = {
        id: Date.now().toString(),
        type: 'ai',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="fixed bottom-6 right-6 w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Brain className="h-4 w-4" />
              </div>
              <h3 className="font-semibold">Legal AI Assistant</h3>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors p-1"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleVoiceMode}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-full text-sm transition-all ${
                isVoiceMode
                  ? 'bg-white text-primary-600 shadow-sm'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              <Mic className="h-3 w-3" />
              <span>Voice</span>
            </button>
            <button
              onClick={toggleVoiceMode}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-full text-sm transition-all ${
                !isVoiceMode
                  ? 'bg-white text-primary-600 shadow-sm'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              <MessageCircle className="h-3 w-3" />
              <span>Text</span>
            </button>
            <div className="flex items-center space-x-1 ml-auto">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-white/80">Online</span>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="h-80 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-xs rounded-2xl px-4 py-3 ${
                message.type === 'user'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-800 shadow-sm border border-gray-100'
              }`}>
                {message.type === 'ai' && (
                  <div className="flex items-center space-x-2 mb-2">
                    <Sparkles className="h-3 w-3 text-primary-500" />
                    <span className="text-xs font-medium text-primary-600">AI Assistant</span>
                  </div>
                )}
                {message.isVoice && (
                  <div className="flex items-center space-x-1 mb-2">
                    <Mic className="h-3 w-3 text-white/80" />
                    <span className="text-xs text-white/80">Voice message</span>
                  </div>
                )}
                <p className="text-sm leading-relaxed">{message.content}</p>
                <p className="text-xs opacity-60 mt-2">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </motion.div>
          ))}
          
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="bg-white text-gray-800 shadow-sm border border-gray-100 rounded-2xl px-4 py-3 max-w-xs">
                <div className="flex items-center space-x-2 mb-2">
                  <Sparkles className="h-3 w-3 text-primary-500" />
                  <span className="text-xs font-medium text-primary-600">AI Assistant</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="text-xs text-gray-500 ml-2">Thinking...</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-gray-100">
          {isVoiceMode ? (
            <div className="text-center">
              <button
                onClick={toggleListening}
                className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 mb-3 mx-auto ${
                  isListening
                    ? 'bg-red-500 text-white animate-pulse shadow-lg'
                    : 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white hover:shadow-lg'
                }`}
              >
                {isListening ? <MicOff className="h-7 w-7" /> : <Mic className="h-7 w-7" />}
              </button>
              <p className="text-sm text-gray-600">
                {isListening
                  ? 'Listening... Describe your legal issue'
                  : 'Tap to start speaking'}
              </p>
              {isListening && (
                <div className="mt-3 flex justify-center space-x-1">
                  <div className="w-1 h-4 bg-primary-500 rounded-full animate-pulse"></div>
                  <div className="w-1 h-6 bg-primary-500 rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-1 h-8 bg-primary-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-1 h-6 bg-primary-500 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                  <div className="w-1 h-4 bg-primary-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
              )}
            </div>
          ) : (
            <form onSubmit={handleTextSubmit} className="flex space-x-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type your legal question..."
                className="flex-1 border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white p-3 rounded-xl hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          )}
        </div>

        {/* Powered by */}
        <div className="px-4 pb-3">
          <div className="text-xs text-gray-500 text-center flex items-center justify-center space-x-1">
            <Zap className="h-3 w-3" />
            <span>Powered by Omnidimension Voice AI</span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AIAssistant;