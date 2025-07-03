import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const { t } = useLanguage();

  const botResponses = [
    "I can help you find the best businesses in Nellore! What are you looking for?",
    "You can search for restaurants, hospitals, hotels, educational institutions, and more on our platform.",
    "To submit your business, click on 'Submit Business' in the navigation menu.",
    "All businesses are verified and reviewed by our community. You can also leave reviews!",
    "For technical support, please contact our admin team through the contact form.",
    "Nellore has amazing local businesses. Use our filters to find exactly what you need!"
  ];

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponses[Math.floor(Math.random() * botResponses.length)],
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const initializeChat = () => {
    if (messages.length === 0) {
      const welcomeMessage: Message = {
        id: '1',
        text: t('chat.welcome'),
        isBot: true,
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => {
          setIsOpen(true);
          initializeChat();
        }}
        className="fixed bottom-6 right-6 bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-lg transition-all transform hover:scale-110 z-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border dark:border-gray-600 dark:shadow-glow-dark"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 bg-white dark:bg-black rounded-lg shadow-2xl z-50 border border-blue-200 dark:border-gray-700 dark:shadow-glow-dark transition-all duration-500">
          {/* Header */}
          <div className="bg-blue-500 dark:bg-gray-900 text-white p-4 rounded-t-lg flex justify-between items-center border-b border-blue-400 dark:border-gray-700">
            <h3 className="font-semibold">{t('chat.assistant')}</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-blue-100 dark:hover:text-gray-300 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="h-64 overflow-y-auto p-4 space-y-3 bg-blue-50 dark:bg-gray-900">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-xs px-3 py-2 rounded-lg ${
                    message.isBot
                      ? 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-blue-200 dark:border-gray-700 shadow-sm dark:shadow-glow-dark'
                      : 'bg-blue-500 dark:bg-gray-700 text-white dark:shadow-glow-dark'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className={`text-xs mt-1 ${
                    message.isBot 
                      ? 'text-blue-600 dark:text-gray-400' 
                      : 'text-blue-100 dark:text-gray-300'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-blue-200 dark:border-gray-700 bg-white dark:bg-black">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder={t('chat.placeholder')}
                className="flex-1 px-3 py-2 border border-blue-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-gray-600 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-blue-400 dark:placeholder-gray-500 dark:shadow-glow-dark"
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-500 dark:bg-gray-700 text-white p-2 rounded-lg hover:bg-blue-600 dark:hover:bg-gray-600 transition-colors dark:shadow-glow-dark"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;