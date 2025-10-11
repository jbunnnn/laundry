import { useEffect, useRef, useState } from 'react';
import { X, ChevronDown, ChevronUp } from 'lucide-react';
import botAvatar from '../assets/logo.png';
import userAvatar from '../assets/user.png';

const faqAnswers = {
  'Layanan kami': 'Kami menyediakan layanan laundry kiloan, satuan, ekspres, dan antar-jemput.',
  'Harga laundry': 'Harga mulai dari Rp7.000 per kg. Untuk detail lengkap bisa cek halaman harga.',
  'Lama pengerjaan': 'Waktu pengerjaan standar adalah 1–2 hari kerja. Bisa lebih cepat untuk layanan ekspres.',
  'Antar jemput': 'Ya, kami menyediakan layanan antar-jemput gratis untuk area tertentu.',
};

const keywordResponses = [
  {
    keywords: ['kamu siapa', 'siapa kamu', 'kenalin', 'asisten siapa'],
    reply: 'Aku Casey Assistant, asisten virtual dari Casey Laundry. Siap bantu kapan aja! 👕✨',
  },
  {
    keywords: ['tugas kamu', 'kerjaan kamu', 'kerja kamu apa'],
    reply: 'Tugas aku bantu kamu tanya-tanya soal layanan, harga, lokasi, dan semua tentang Casey Laundry.',
  },
  {
    keywords: ['bisa bantu apa', 'kamu bisa apa', 'fitur kamu'],
    reply: 'Aku bisa bantu jawab pertanyaan umum, estimasi harga, cek lokasi, dan info layanan lainnya!',
  },
  {
    keywords: ['jam buka', 'jam operasional'],
    reply: 'Casey Laundry buka setiap hari dari jam 08.00 sampai 20.00 WIB ya!',
  },
  {
    keywords: ['lokasi', 'dimana alamat', 'alamat lengkap'],
    reply: 'Alamat kami di 📍Jl. Swadaya I No.103, Bedahan, Sawangan, Depok, Jawa Barat.',
  },
  {
    keywords: ['halo casey', 'hai casey', 'halo assistant', 'apa kamu asisten'],
    reply: 'Hai juga! Casey Assistant di sini 🙋 Siap bantu kamu kapan aja.',
  },
];

const ChatBox = ({ onClose }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [showFAQ, setShowFAQ] = useState(false);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    setMessages([
      {
        sender: 'bot',
        text: '👋 Hai! Selamat datang di Casey Assistant.\nAda yang bisa kami bantu hari ini?',
      },
    ]);
  }, []);

  const findLocalResponse = (text) => {
    const lower = text.toLowerCase();
    for (const item of keywordResponses) {
      if (item.keywords.some((kw) => lower.includes(kw))) {
        return item.reply;
      }
    }
    for (const [key, reply] of Object.entries(faqAnswers)) {
      if (lower.includes(key.toLowerCase())) return reply;
    }
    return null;
  };

  const handleSend = async (msg = null) => {
    const text = msg || input.trim();
    if (!text) return;

    setMessages((prev) => [...prev, { sender: 'user', text }]);
    setInput('');

    const local = findLocalResponse(text);
    if (local) {
      setTimeout(() => {
        setMessages((prev) => [...prev, { sender: 'bot', text: local }]);
      }, 400);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { sender: 'bot', text: data.reply || 'Maaf, belum bisa menjawab.' }]);
    } catch {
      setMessages((prev) => [...prev, { sender: 'bot', text: '⚠️ Terjadi kesalahan. Coba lagi nanti.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-2 sm:right-3 w-[92%] sm:w-80 max-h-[80vh] bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl shadow-xl z-[1000] flex flex-col transition-all duration-300">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b dark:border-gray-600">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Casey Assistant</h2>
        <button 
          onClick={onClose}
          className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          <X size={20} className="text-gray-700 dark:text-gray-300" />
        </button>
      </div>

      {/* FAQ Section */}
      <div className="border-b dark:border-gray-700 p-2">
        <button
          onClick={() => setShowFAQ(!showFAQ)}
          className="text-sm font-medium flex items-center gap-1 text-blue-600 hover:text-blue-700 dark:hover:text-blue-400 transition"
        >
          {showFAQ ? <ChevronUp size={16} /> : <ChevronDown size={16} />} 
          Tanya seputar layanan?
        </button>
        {showFAQ && (
          <div className="mt-2 flex flex-wrap gap-2">
            {Object.keys(faqAnswers).map((q, i) => (
              <button
                key={i}
                onClick={() => handleSend(q)}
                className="text-xs bg-blue-100 hover:bg-blue-200 text-blue-700 px-2.5 py-1 rounded-full dark:bg-blue-800 dark:hover:bg-blue-700 dark:text-white transition"
              >
                {q}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-gray-50 dark:bg-gray-900 text-sm">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} items-end gap-2`}>
            {msg.sender === 'bot' && (
              <img src={botAvatar} alt="Bot" className="w-6 h-6 rounded-full border border-gray-300" />
            )}
            <div
              className={`px-4 py-2 rounded-2xl max-w-[80%] whitespace-pre-wrap ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-br from-blue-500 to-teal-500 text-white rounded-br-none'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-none'
              }`}
            >
              {msg.text}
            </div>
            {msg.sender === 'user' && (
              <img src={userAvatar} alt="User" className="w-6 h-6 rounded-full border border-gray-300" />
            )}
          </div>
        ))}
        {loading && (
          <div className="flex justify-start items-center gap-2">
            <img src={botAvatar} alt="Bot" className="w-6 h-6 rounded-full border border-gray-300" />
            <div className="text-xs text-gray-400 italic px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-2xl rounded-bl-none">
              Casey sedang mengetik...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-2 border-t dark:border-gray-700 flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          className="flex-1 px-3 py-2 rounded-l-lg text-sm border border-r-0 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-600"
          placeholder="Tulis pesan..."
        />
        <button
          onClick={() => handleSend()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-lg transition"
        >
          Kirim
        </button>
      </div>
    </div>
  );
};

export default ChatBox;