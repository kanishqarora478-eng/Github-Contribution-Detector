import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { Check, RotateCw, HourglassIcon, Beaker, Database } from 'lucide-react';

interface ProcessStep {
  label: string;
  detail: string;
  status: 'complete' | 'processing' | 'waiting';
}

export function ScanningMode() {
  const [progress, setProgress] = useState(0);
  const [filesScanned, setFilesScanned] = useState(0);
  const [codeBlobs, setCodeBlobs] = useState(0);
  const [steps, setSteps] = useState<ProcessStep[]>([
    { label: 'Fetching Repository Data', detail: '3,421 files indexed successfully', status: 'complete' },
    { label: 'Structuring Code Signals', detail: 'Processing code blobs...', status: 'processing' },
    { label: 'Running AI Analysis', detail: 'Waiting for signal matrix', status: 'waiting' },
  ]);

  useEffect(() => {
    // Animate progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + 2;
      });
    }, 100);

    // Animate file counts
    const fileInterval = setInterval(() => {
      setFilesScanned((prev) => {
        if (prev >= 2108) return 2108;
        return prev + 50;
      });
      setCodeBlobs((prev) => {
        if (prev >= 8492) return 8492;
        return prev + 200;
      });
    }, 100);

    // Update steps
    const stepTimer1 = setTimeout(() => {
      setSteps([
        { label: 'Fetching Repository Data', detail: '3,421 files indexed successfully', status: 'complete' },
        { label: 'Structuring Code Signals', detail: 'Processing code blobs...', status: 'complete' },
        { label: 'Running AI Analysis', detail: 'Processing neural patterns...', status: 'processing' },
      ]);
    }, 2000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(fileInterval);
      clearTimeout(stepTimer1);
    };
  }, []);

  const timeRemaining = Math.max(0, Math.ceil((100 - progress) / 4));

  return (
    <div className="relative flex flex-1 flex-col items-center justify-center px-4 sm:px-6 w-full max-w-7xl mx-auto">
      {/* Floating Code Snippets - Hide on mobile */}
      <motion.div
        initial={{ opacity: 0, y: -20, rotate: -12 }}
        animate={{ opacity: 0.15, y: 0 }}
        transition={{ delay: 0.2 }}
        className="hidden lg:block absolute top-20 left-10 bg-slate-800 p-4 rounded-lg font-mono text-xs transform -rotate-12"
        style={{ filter: 'blur(1px)' }}
      >
        const analyzePatterns = (code) =&gt; &#123;<br />
        &nbsp;&nbsp;return neuralSignal.process(code);<br />
        &#125;;
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20, rotate: 6 }}
        animate={{ opacity: 0.15, y: 0 }}
        transition={{ delay: 0.4 }}
        className="hidden lg:block absolute bottom-40 right-20 bg-slate-800 p-4 rounded-lg font-mono text-xs transform rotate-6"
        style={{ filter: 'blur(1px)' }}
      >
        import &#123; GPTDetector &#125; from '@codepure/core';<br />
        const results = await detector.scan(repo);
      </motion.div>

      <motion.div
        initial={{ opacity: 0, rotate: -3 }}
        animate={{ opacity: 0.15 }}
        transition={{ delay: 0.6 }}
        className="hidden lg:block absolute top-1/2 left-1/4 bg-slate-800 p-4 rounded-lg font-mono text-xs transform -rotate-3"
        style={{ filter: 'blur(1px)' }}
      >
        export async function validateAuthenticity(input) &#123;<br />
        &nbsp;&nbsp;const signal = await model.predict(input);<br />
        &nbsp;&nbsp;return signal.confidence &gt; 0.85;<br />
        &#125;
      </motion.div>

      {/* Main Content Grid */}
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Side: Steps and Stats */}
        <div className="lg:col-span-4 flex flex-col gap-6 sm:gap-8 order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-2"
          >
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">Analyzing Repository</h1>
            <p className="text-slate-400 text-sm sm:text-base font-normal">
              Scanning{' '}
              <span className="text-[#7f13ec] font-mono bg-[#7f13ec]/10 px-2 py-0.5 rounded text-xs sm:text-sm">
                ai-code-analyzer
              </span>{' '}
              for AI patterns.
            </p>
          </motion.div>

          {/* Progress Steps */}
          <div className="space-y-2">
            <div className="flex flex-col gap-0">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.2 }}
                  className="grid grid-cols-[40px_1fr] gap-x-4"
                >
                  <div className="flex flex-col items-center">
                    {/* Status Icon */}
                    {step.status === 'complete' && (
                      <div className="size-8 rounded-full bg-[#7f13ec] flex items-center justify-center text-white ring-4 ring-[#7f13ec]/20">
                        <Check className="w-4 h-4" />
                      </div>
                    )}
                    {step.status === 'processing' && (
                      <div className="size-8 rounded-full bg-[#7f13ec]/20 border-2 border-[#7f13ec] flex items-center justify-center text-[#7f13ec]">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                        >
                          <RotateCw className="w-4 h-4" />
                        </motion.div>
                      </div>
                    )}
                    {step.status === 'waiting' && (
                      <div className="size-8 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center text-slate-500">
                        <HourglassIcon className="w-4 h-4" />
                      </div>
                    )}
                    {/* Connector Line */}
                    {index < steps.length - 1 && (
                      <div
                        className={`w-0.5 h-12 ${
                          step.status === 'complete' ? 'bg-[#7f13ec]' : 'bg-slate-700'
                        }`}
                      />
                    )}
                  </div>
                  <div className="pt-1 pb-4">
                    <p className={`font-semibold ${step.status === 'waiting' ? 'text-slate-500' : 'text-white'}`}>
                      {step.label}
                    </p>
                    <p
                      className={`text-sm ${
                        step.status === 'complete'
                          ? 'text-slate-500'
                          : step.status === 'processing'
                          ? 'text-[#7f13ec] font-medium'
                          : 'text-slate-600'
                      }`}
                    >
                      {step.detail}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-4 rounded-xl">
              <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Files Scanned</p>
              <p className="text-2xl font-black text-white">{filesScanned.toLocaleString()}</p>
            </div>
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-4 rounded-xl">
              <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Code Blobs</p>
              <p className="text-2xl font-black text-white">{codeBlobs.toLocaleString()}</p>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Circular Progress */}
        <div className="lg:col-span-8 flex flex-col items-center justify-center order-1 lg:order-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="relative size-72 md:size-96 flex items-center justify-center"
          >
            {/* Ping Animations */}
            <div className="absolute inset-0 rounded-full border border-[#7f13ec]/20 animate-[ping_3s_linear_infinite]"></div>
            <div className="absolute inset-8 rounded-full border border-[#7f13ec]/30 animate-[ping_4s_linear_infinite] delay-700"></div>

            {/* Progress Ring */}
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="size-full -rotate-90 transform" viewBox="0 0 100 100">
                <circle
                  className="text-slate-800"
                  cx="50"
                  cy="50"
                  fill="none"
                  r="45"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <motion.circle
                  className="text-[#7f13ec]"
                  cx="50"
                  cy="50"
                  fill="none"
                  r="45"
                  stroke="currentColor"
                  strokeWidth="4"
                  initial={{ strokeDashoffset: 283 }}
                  animate={{ strokeDashoffset: 283 - (283 * progress) / 100 }}
                  transition={{ duration: 0.5 }}
                  style={{
                    strokeDasharray: 283,
                    filter: 'drop-shadow(0 0 8px rgba(127, 19, 236, 0.8))',
                  }}
                />
              </svg>
            </div>

            {/* Center Circle */}
            <div
              className="backdrop-blur-xl bg-white/5 border border-[#7f13ec]/30 size-48 md:size-64 rounded-full flex flex-col items-center justify-center"
              style={{ boxShadow: '0 0 50px 10px rgba(127, 19, 236, 0.3)' }}
            >
              <span className="text-5xl md:text-7xl font-black text-white tracking-tighter">
                {Math.round(progress)}%
              </span>
              <span className="text-xs md:text-sm font-bold text-[#7f13ec] tracking-widest uppercase mt-2">
                Deep Scanning
              </span>
            </div>

            {/* Floating Icons */}
            <motion.div
              animate={{ rotate: [12, 18, 12] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute top-0 right-10 size-16 backdrop-blur-xl bg-white/5 border border-[#7f13ec]/40 rounded-xl flex items-center justify-center rotate-12"
            >
              <Beaker className="w-6 h-6 text-[#7f13ec]" />
            </motion.div>
            <motion.div
              animate={{ rotate: [-12, -18, -12] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute bottom-10 left-5 size-12 backdrop-blur-xl bg-white/5 border border-blue-400/20 rounded-lg flex items-center justify-center -rotate-12"
            >
              <Database className="w-5 h-5 text-blue-400" />
            </motion.div>
          </motion.div>

          {/* Bottom Progress Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-12 w-full max-w-md space-y-3 px-4"
          >
            <div className="flex justify-between text-xs font-bold text-slate-500 uppercase tracking-widest">
              <span>Analysis Engine</span>
              <span>v4.2-Neural</span>
            </div>
            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
                className="h-full bg-gradient-to-r from-[#7f13ec] to-blue-400 rounded-full"
              />
            </div>
            <p className="text-center text-slate-500 text-sm font-medium">
              Estimated time remaining: <span className="text-slate-300">{timeRemaining} seconds</span>
            </p>
          </motion.div>
        </div>
      </div>

      {/* Background Blurs */}
      <div className="absolute -top-10 right-1/3 w-96 h-96 bg-[#7f13ec]/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute -bottom-20 left-1/3 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>
    </div>
  );
}