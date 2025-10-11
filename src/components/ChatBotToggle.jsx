import { useEffect, useState } from 'react';
import ChatBox from './Chatbox';
import { Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ChatBotToggle() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  const handleToggle = () => setIsOpen(prev => !prev);

  useEffect(() => {
    const handleScroll = () => setIsHidden(window.scrollY < 200);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {isOpen && (
        <>
          <div className="fixed inset-0 bg-black/30 z-30" onClick={handleToggle} />
          <ChatBox onClose={handleToggle} />
        </>
      )}

      {isHidden && !isOpen && (
        <div className="fixed inset-0 bg-black/10 z-20 pointer-events-none" />
      )}

      <AnimatePresence>
        {!isHidden && (
          <motion.div
            key="chatbot"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.4 }}
            className="fixed z-30 flex flex-col items-end space-y-2"
            style={{ bottom: '15rem', right: '2rem' }}
          >
            {!isOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white px-4 py-2 rounded-xl shadow-md"
              >
                Ada yang bisa dibantu?
              </motion.div>
            )}

            <motion.button
              onClick={handleToggle}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-gradient-to-br from-blue-600 to-teal-500 text-white p-4 rounded-full shadow-xl hover:opacity-90"
            >
              <Bot size={24} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
