import { motion } from "motion/react";
import { useEffect, useState } from "react";
import {
  Waves,
  Settings,
  CheckCircle,
  Brain,
  Eye,
  BarChart3,
  Code,
  Database,
  FileText,
  Download,
  Share,
  TrendingUp,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

interface AnalysisResult {
  ai_probability: number;
  verdict: string;
  confidence_level: number;
  reasoning: string;
  evidence: string[];
  analysis_summary: {
    style_consistency: string;
    pattern_repetition: string;
    sudden_complexity_jump: boolean;
  };
}

interface ResultsDashboardProps {
  results: AnalysisResult;
  onAnalyzeAnother?: () => void;
}

export function ResultsDashboard({
  results,
  onAnalyzeAnother,
}: ResultsDashboardProps) {
  const [animatedProbability, setAnimatedProbability] = useState(0);

  // Generate mock time-series data for the chart
  const chartData = [
    { time: "Week 1", aiProbability: 15, humanProbability: 85 },
    { time: "Week 2", aiProbability: 28, humanProbability: 72 },
    { time: "Week 3", aiProbability: 42, humanProbability: 58 },
    { time: "Week 4", aiProbability: 58, humanProbability: 42 },
    { time: "Week 5", aiProbability: 71, humanProbability: 29 },
    { time: "Week 6", aiProbability: 84, humanProbability: 16 },
    {
      time: "Week 7",
      aiProbability: Math.round(results.ai_probability),
      humanProbability: Math.round(100 - results.ai_probability),
    },
  ];

  useEffect(() => {
    const duration = 2000;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);

      setAnimatedProbability(easeOutQuart * results.ai_probability);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  }, [results.ai_probability]);

  const isHighAI = results.ai_probability > 60;
  const getRiskLevel = () => {
    if (results.ai_probability > 80)
      return { label: "High", color: "text-red-400" };
    if (results.ai_probability > 60)
      return { label: "Medium", color: "text-yellow-400" };
    return { label: "Low", color: "text-green-400" };
  };
  const riskLevel = getRiskLevel();

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative z-10 w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex flex-col gap-4 sm:gap-6"
    >
      {/* Header Section */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 gap-4"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#7f13ec] rounded-lg flex items-center justify-center">
            <Waves className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
            Oceanic<span className="text-[#7f13ec]">Intelligence</span>
          </h1>
        </div>
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="px-3 sm:px-4 py-2 bg-[#7f13ec]/10 border border-[#7f13ec]/20 rounded-full flex items-center gap-2 flex-1 sm:flex-initial">
            <span className="w-2 h-2 rounded-full bg-[#7f13ec] animate-pulse"></span>
            <span className="text-xs sm:text-sm font-medium text-[#7f13ec]">
              Live Authenticity Stream
            </span>
          </div>
          <button className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:text-white transition-colors flex-shrink-0">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </motion.header>

      {/* Main Glassmorphism Panel */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex-1 backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4 sm:p-6 lg:p-8 flex flex-col gap-6 sm:gap-8 shadow-2xl relative overflow-hidden"
      >
        {/* Top Section: Scoring */}
        <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8 lg:gap-12 pt-4">
          {/* Circular Progress Ring */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6, type: "spring" }}
            className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 flex items-center justify-center flex-shrink-0"
          >
            <svg className="absolute inset-0 -rotate-90" viewBox="0 0 256 256">
              {/* Background circle */}
              <circle
                cx="128"
                cy="128"
                r="120"
                fill="none"
                stroke="rgba(127, 19, 236, 0.1)"
                strokeWidth="6"
              />
              {/* Progress circle */}
              <motion.circle
                cx="128"
                cy="128"
                r="120"
                fill="none"
                stroke="#7f13ec"
                strokeWidth="6"
                strokeLinecap="round"
                initial={{ strokeDashoffset: 754 }}
                animate={{
                  strokeDashoffset: 754 - (754 * animatedProbability) / 100,
                }}
                transition={{ duration: 2, ease: [0.23, 1, 0.32, 1] }}
                style={{
                  strokeDasharray: 754,
                  filter: "drop-shadow(0 0 10px rgba(127, 19, 236, 0.6))",
                }}
              />
            </svg>
            <div className="absolute inset-[6px] rounded-full bg-[#0a0612] flex flex-col items-center justify-center">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-br from-white to-[#7f13ec] bg-clip-text text-transparent">
                {Math.round(animatedProbability)}%
              </span>
              <span className="text-slate-400 text-xs sm:text-sm mt-1 uppercase tracking-widest">
                AI Probability
              </span>
            </div>
            {/* Outer Decorative Ring */}
            <div className="absolute -inset-4 border border-dashed border-[#7f13ec]/30 rounded-full"></div>
          </motion.div>

          {/* Verdict Badge & Quick Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="flex-1 space-y-4 sm:space-y-6 w-full"
          >
            <div>
              <div
                className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 rounded-full bg-[#7f13ec]/20 border border-[#7f13ec]/40 text-[#7f13ec] font-bold text-xs uppercase tracking-tighter mb-3 sm:mb-4"
                style={{ boxShadow: "0 0 30px rgba(127, 19, 236, 0.4)" }}
              >
                <CheckCircle className="w-3 h-3" />
                Analysis Verdict
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
                {isHighAI ? "Synthetic Code Structure" : "Human Code Patterns"}
                <br />
                <span className="text-slate-400 text-lg sm:text-xl lg:text-2xl">
                  {isHighAI
                    ? "Detected in Multiple Modules"
                    : "Authentic Development Signature"}
                </span>
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="flex-1 p-3 sm:p-4 rounded-lg bg-white/5 border border-white/5"
              >
                <div className="text-slate-400 text-xs uppercase mb-1">
                  Source Integrity
                </div>
                <div
                  className={`text-lg sm:text-xl font-bold ${isHighAI ? "text-red-400" : "text-cyan-400"}`}
                >
                  {isHighAI ? "Compromised" : "Verified"}
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
                className="flex-1 p-3 sm:p-4 rounded-lg bg-white/5 border border-white/5"
              >
                <div className="text-slate-400 text-xs uppercase mb-1">
                  AI Signature
                </div>
                <div className="text-lg sm:text-xl font-bold text-[#7f13ec]">
                  {isHighAI ? "LLM-Delta-4" : "None Detected"}
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="flex-1 p-3 sm:p-4 rounded-lg bg-white/5 border border-white/5"
              >
                <div className="text-slate-400 text-xs uppercase mb-1">
                  Risk Level
                </div>
                <div
                  className={`text-lg sm:text-xl font-bold ${riskLevel.color}`}
                >
                  {riskLevel.label}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section: Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 flex-1 min-h-0">
          {/* Reasoning Panel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
            className="bg-white/5 border border-white/5 rounded-xl p-4 sm:p-6 flex flex-col"
          >
            <div className="flex items-center gap-2 mb-4">
              <Brain className="w-5 h-5 text-[#7f13ec]" />
              <h3 className="font-bold text-base sm:text-lg">Reasoning</h3>
            </div>
            <div className="text-slate-300 text-sm leading-relaxed overflow-y-auto pr-2">
              <p>{results.reasoning}</p>
            </div>
          </motion.div>

          {/* Evidence Accordion */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            className="bg-white/5 border border-white/5 rounded-xl p-4 sm:p-6 flex flex-col"
          >
            <div className="flex items-center gap-2 mb-4">
              <Eye className="w-5 h-5 text-cyan-400" />
              <h3 className="font-bold text-base sm:text-lg">Evidence</h3>
            </div>
            <div className="space-y-3 overflow-y-auto pr-2">
              {results.evidence.slice(0, 3).map((item, index) => {
                const icons = [Code, Database, FileText];
                const Icon = icons[index] || Code;
                const isHighlighted = index === 0;
                const matchScore = (0.99 - index * 0.07).toFixed(2);

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.5 + index * 0.1 }}
                    className={`p-3 rounded-lg ${
                      isHighlighted
                        ? "bg-cyan-400/5 border border-cyan-400/10"
                        : "bg-white/5 border border-white/5"
                    } flex items-center justify-between gap-2`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        className={`w-4 h-4 ${isHighlighted ? "text-cyan-400" : "text-slate-400"} flex-shrink-0`}
                      />
                      <span className="text-xs sm:text-sm font-medium">
                        {index === 0
                          ? "Cyclomatic Density"
                          : index === 1
                            ? "Memory Overlap"
                            : "Docstring Syntax"}
                      </span>
                    </div>
                    <span className="text-xs text-slate-400 flex-shrink-0">
                      {matchScore} Match
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Summary & Visualizations */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="bg-white/5 border border-white/5 rounded-xl p-4 sm:p-6 flex flex-col"
          >
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="w-5 h-5 text-slate-400" />
              <h3 className="font-bold text-base sm:text-lg">Summary</h3>
            </div>
            <div className="space-y-4 sm:space-y-6">
              <div>
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-slate-400">Style Consistency</span>
                  <span className="text-[#7f13ec] font-bold">
                    {results.analysis_summary.style_consistency}
                  </span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: results.analysis_summary.style_consistency,
                    }}
                    transition={{ delay: 1.7, duration: 1 }}
                    className="h-full bg-[#7f13ec]"
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-slate-400">Pattern Repetition</span>
                  <span className="text-cyan-400 font-bold">
                    {results.analysis_summary.pattern_repetition}
                  </span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: results.analysis_summary.pattern_repetition,
                    }}
                    transition={{ delay: 1.9, duration: 1 }}
                    className="h-full bg-cyan-400"
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-slate-400">Unique Heuristics</span>
                  <span className="text-slate-100 font-bold">
                    {100 -
                      parseInt(results.analysis_summary.pattern_repetition)}
                    %
                  </span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: `${100 - parseInt(results.analysis_summary.pattern_repetition)}%`,
                    }}
                    transition={{ delay: 2.1, duration: 1 }}
                    className="h-full bg-slate-500"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Floating Decoration */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#7f13ec]/50 to-transparent"></div>
      </motion.div>

      {/* AI Probability Trend Chart */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
        className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6 shadow-2xl"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#7f13ec]" />
            <h3 className="font-bold text-lg">AI Probability Trend</h3>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#7f13ec]"></div>
              <span className="text-slate-400">AI Generated</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-cyan-400"></div>
              <span className="text-slate-400">Human Written</span>
            </div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorAI" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7f13ec" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#7f13ec" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorHuman" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.05)"
            />
            <XAxis
              dataKey="time"
              stroke="#64748b"
              style={{ fontSize: "12px" }}
              tick={{ fill: "#64748b" }}
            />
            <YAxis
              stroke="#64748b"
              style={{ fontSize: "12px" }}
              tick={{ fill: "#64748b" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(15, 23, 42, 0.9)",
                border: "1px solid rgba(127, 19, 236, 0.3)",
                borderRadius: "8px",
                backdropFilter: "blur(12px)",
              }}
              labelStyle={{ color: "#e2e8f0" }}
              itemStyle={{ color: "#e2e8f0" }}
            />
            <Area
              type="monotone"
              dataKey="aiProbability"
              stroke="#7f13ec"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorAI)"
              name="AI Probability"
            />
            <Area
              type="monotone"
              dataKey="humanProbability"
              stroke="#22d3ee"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorHuman)"
              name="Human Probability"
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Footer Actions */}
      <motion.footer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8 }}
        className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center py-4 gap-4"
      >
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <button className="px-4 sm:px-6 py-2.5 rounded-lg border border-white/10 hover:bg-white/5 transition-all text-sm font-medium flex items-center justify-center gap-2">
            <Download className="w-4 h-4" />
            Export Report
          </button>
          <button className="px-4 sm:px-6 py-2.5 rounded-lg border border-white/10 hover:bg-white/5 transition-all text-sm font-medium flex items-center justify-center gap-2">
            <Share className="w-4 h-4" />
            Share Results
          </button>
        </div>
        <button
          onClick={onAnalyzeAnother}
          className="px-6 sm:px-8 py-2.5 bg-[#7f13ec] text-white rounded-lg font-bold hover:opacity-90 transition-all"
          style={{ boxShadow: "0 0 30px rgba(127, 19, 236, 0.4)" }}
        >
          Analyze Another
        </button>
      </motion.footer>
    </motion.main>
  );
}
