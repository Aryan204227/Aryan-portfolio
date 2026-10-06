import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, X, CornerDownLeft, Sparkles } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function TerminalDrawer({ isOpen, onClose }) {
  const [history, setHistory] = useState([
    { type: 'output', text: 'Aryan Dadwal CLI v1.0.0 [Architecture: MERN + Java]' },
    { type: 'output', text: 'Type "help" to view available developer commands.' },
  ]);
  const [inputVal, setInputVal] = useState('');
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const handleCommand = (e) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    const newHistory = [...history, { type: 'input', text: `> ${inputVal}` }];

    switch (cmd) {
      case 'help':
        newHistory.push({
          type: 'output',
          text: `Available Commands:
  • about     - Who is Aryan Dadwal?
  • skills    - Core tech stack & CS fundamentals
  • projects  - 3 featured production projects
  • resume    - Download Aryan's official Resume PDF
  • contact   - Email, WhatsApp, LinkedIn, GitHub
  • clear     - Clear terminal screen
  • exit      - Close terminal`,
        });
        break;

      case 'about':
        newHistory.push({
          type: 'output',
          text: `ARYAN DADWAL
Role: Full Stack Developer
Education: B.Tech Computer Science & Engineering
University: Lovely Professional University (LPU), Phagwara
CGPA: 7.07
Focus: Full Stack Engineering (MERN), Java & DSA, AI Integrations.`,
        });
        break;

      case 'skills':
        newHistory.push({
          type: 'output',
          text: `LANGUAGES: JavaScript, TypeScript, Java, C++, C, Python
FRONTEND: React.js, Tailwind CSS, Vite, HTML5, CSS3
BACKEND: Node.js, Express.js, REST APIs
DATABASE: MongoDB, DBMS, SQL
CORE CS: Data Structures & Algorithms, DFS, Backtracking, OOP, Multithreading`,
        });
        break;

      case 'projects':
        newHistory.push({
          type: 'output',
          text: `1. Career Guidance System (MERN Stack, Render)
   URL: https://career-guidance-system-l855.onrender.com/
2. StockSense AI (Node.js, Express, AI Sentiment Chatbot)
   URL: https://stocksense-ai-r24w.onrender.com/
3. Maze Solver (Java, Swing, Java2D, DFS Backtracking)
   15x15 Grid, 172 Visited Nodes, 79 Depth.`,
        });
        break;

      case 'resume':
        window.open(portfolioData.personalInfo.resumePdf, '_blank');
        newHistory.push({
          type: 'output',
          text: 'Opening verified Resume PDF (/Aryan_Dadwal_Professional_Resume.pdf)...',
        });
        break;

      case 'contact':
        newHistory.push({
          type: 'output',
          text: `Email: aryandadwal709@gmail.com
WhatsApp: +91 8626963353
LinkedIn: https://www.linkedin.com/in/aryan-dadwal-cse/
GitHub: https://github.com/Aryan204227`,
        });
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      case 'exit':
      case 'quit':
        onClose();
        return;

      default:
        newHistory.push({
          type: 'error',
          text: `Command not found: "${cmd}". Type "help" for a list of commands.`,
        });
    }

    setHistory(newHistory);
    setInputVal('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#0f0f11] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col font-mono text-xs">
        {/* Terminal Header Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#18181c] border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            <span className="ml-2 text-neutral-400 font-sans text-xs flex items-center gap-1.5 font-medium">
              <TerminalIcon className="w-3.5 h-3.5 text-orange-400" />
              aryan@portfolio-dev:~$
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Terminal Body */}
        <div className="p-4 sm:p-5 h-80 overflow-y-auto space-y-2 text-neutral-300">
          {history.map((item, idx) => (
            <div
              key={idx}
              className={`whitespace-pre-wrap leading-relaxed ${
                item.type === 'input'
                  ? 'text-orange-400 font-semibold'
                  : item.type === 'error'
                  ? 'text-red-400'
                  : 'text-neutral-300'
              }`}
            >
              {item.text}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Command Input Form */}
        <form onSubmit={handleCommand} className="flex items-center gap-2 px-4 py-3 bg-[#141417] border-t border-white/10">
          <span className="text-orange-400 font-bold">&gt;</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type 'help', 'projects', 'resume'..."
            className="flex-1 bg-transparent text-white focus:outline-none placeholder:text-neutral-600 font-mono text-xs"
          />
          <button
            type="submit"
            className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
          >
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
}
