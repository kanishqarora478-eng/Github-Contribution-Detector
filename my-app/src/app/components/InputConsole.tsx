import { motion } from 'motion/react';
import { useState } from 'react';
import { Brain, User, Link2, BarChart3, GitFork, FileText } from 'lucide-react';

interface InputConsoleProps {
  onAnalyze: (username: string, projectUrl: string) => void;
}

export function InputConsole({ onAnalyze }: InputConsoleProps) {
  const [username, setUsername] = useState('');
  const [projectUrl, setProjectUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() && projectUrl.trim()) {
      onAnalyze(username.trim(), projectUrl.trim());
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-4 sm:px-6 py-12 sm:py-20 w-full max-w-7xl mx-auto">
      {/* Central Blur Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-[#7f13ec]/10 rounded-full blur-[120px] -z-10"></div>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-[800px] w-full text-center mb-8 sm:mb-12"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7f13ec]/10 border border-[#7f13ec]/20 text-[#7f13ec] text-xs font-bold uppercase tracking-widest mb-4 sm:mb-6"
        >
          <Brain className="w-3 h-3" />
          Industry Standard Verification
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-white text-4xl sm:text-5xl md:text-7xl font-black leading-[1.1] tracking-tight mb-4 sm:mb-6 px-4"
        >
          AI Code Authenticity{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7f13ec] to-blue-400">
            Analyzer
          </span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-slate-400 text-base sm:text-lg md:text-xl font-normal max-w-2xl mx-auto leading-relaxed px-4"
        >
          Detect AI-generated code patterns with advanced intelligence. Analyze GitHub repositories with industry-leading precision.
        </motion.p>
      </motion.div>

      {/* Input Form Card */}
      <motion.form
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        onSubmit={handleSubmit}
        className="w-full max-w-3xl backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 md:p-12 shadow-2xl relative overflow-hidden group"
      >
        {/* Top Gradient Line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#7f13ec] to-transparent opacity-50"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* GitHub Username Input */}
          <div className="flex flex-col gap-2 text-left">
            <label className="text-slate-300 text-sm font-semibold ml-1">GitHub Username</label>
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-[#7f13ec] transition-colors" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-3 sm:py-4 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-[#7f13ec]/50 focus:border-[#7f13ec] transition-all text-sm sm:text-base"
                placeholder="e.g. vercel"
              />
            </div>
          </div>

          {/* Project URL Input */}
          <div className="flex flex-col gap-2 text-left">
            <label className="text-slate-300 text-sm font-semibold ml-1">Project URL</label>
            <div className="relative group">
              <Link2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-[#7f13ec] transition-colors" />
              <input
                type="text"
                value={projectUrl}
                onChange={(e) => setProjectUrl(e.target.value)}
                className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-3 sm:py-4 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-[#7f13ec]/50 focus:border-[#7f13ec] transition-all text-sm sm:text-base"
                placeholder="github.com/..."
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          type="submit"
          className="w-full bg-[#7f13ec] hover:bg-blue-600 text-white font-bold text-base sm:text-lg py-4 sm:py-5 rounded-xl transition-all flex items-center justify-center gap-3"
          style={{ boxShadow: '0 0 20px rgba(127, 19, 236, 0.4)' }}
        >
          <BarChart3 className="w-5 h-5" />
          Analyze Project Authenticity
        </motion.button>

        {/* Info Text */}
        <p className="mt-4 sm:mt-6 text-slate-500 text-xs text-center flex items-center justify-center gap-2">
          <span className="w-3.5 h-3.5 rounded-full border border-slate-500 flex items-center justify-center text-[10px]">i</span>
          Analysis takes less than 2 seconds for most repositories.
        </p>
      </motion.form>

      {/* Feature Cards */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="mt-12 sm:mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 w-full max-w-5xl"
      >
        <motion.div
          whileHover={{ y: -5 }}
          className="flex flex-col items-center md:items-start p-6 rounded-2xl border border-white/5 bg-white/2 hover:bg-white/5 transition-all"
        >
          <div className="bg-slate-800/50 p-3 rounded-xl text-[#7f13ec] mb-4">
            <BarChart3 className="w-6 h-6" />
          </div>
          <h3 className="text-white text-lg font-bold mb-2">Pattern Recognition</h3>
          <p className="text-slate-400 text-sm text-center md:text-left leading-relaxed">
            Advanced ML models identify logical structures characteristic of LLMs.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="flex flex-col items-center md:items-start p-6 rounded-2xl border border-white/5 bg-white/2 hover:bg-white/5 transition-all"
        >
          <div className="bg-slate-800/50 p-3 rounded-xl text-[#7f13ec] mb-4">
            <GitFork className="w-6 h-6" />
          </div>
          <h3 className="text-white text-lg font-bold mb-2">GitHub Native</h3>
          <p className="text-slate-400 text-sm text-center md:text-left leading-relaxed">
            Direct integration with GitHub API for deep commit and branch history analysis.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="flex flex-col items-center md:items-start p-6 rounded-2xl border border-white/5 bg-white/2 hover:bg-white/5 transition-all"
        >
          <div className="bg-slate-800/50 p-3 rounded-xl text-[#7f13ec] mb-4">
            <FileText className="w-6 h-6" />
          </div>
          <h3 className="text-white text-lg font-bold mb-2">Detailed Reports</h3>
          <p className="text-slate-400 text-sm text-center md:text-left leading-relaxed">
            Receive a comprehensive PDF breakdown showing probability of AI involvement per file.
          </p>
        </motion.div>
      </motion.div>

      {/* Partner Logos */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 0.9 }}
        className="mt-12 sm:mt-20 flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-16 grayscale hover:grayscale-0 transition-all duration-500"
      >
        <div className="flex items-center gap-2 text-white font-bold text-lg sm:text-xl tracking-tight">
          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded bg-white/10 flex items-center justify-center text-xs sm:text-sm">G</div>
          GITHUB
        </div>
        <div className="flex items-center gap-2 text-white font-bold text-lg sm:text-xl tracking-tight">
          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded bg-white/10 flex items-center justify-center text-xs sm:text-sm">▲</div>
          Vercel
        </div>
        <div className="flex items-center gap-2 text-white font-bold text-lg sm:text-xl tracking-tight">
          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded bg-white/10 flex items-center justify-center text-xs sm:text-sm">S</div>
          Supabase
        </div>
        <div className="flex items-center gap-2 text-white font-bold text-lg sm:text-xl tracking-tight">
          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded bg-white/10 flex items-center justify-center text-xs sm:text-sm">L</div>
          Linear
        </div>
      </motion.div>
    </div>
  );
}