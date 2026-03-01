import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { OceanBackground } from "./components/OceanBackground";
import { InputConsole } from "./components/InputConsole";
import { ScanningMode } from "./components/ScanningMode";
import { ResultsDashboard } from "./components/ResultsDashboard";

type AppState = "input" | "scanning" | "results";

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

export default function App() {
  const [appState, setAppState] = useState<AppState>("input");
  const [results, setResults] = useState<AnalysisResult | null>(null);
  const [backgroundIntensity, setBackgroundIntensity] = useState(1);

  const handleAnalyze = async (username: string, projectUrl: string) => {
    // Transition to scanning mode
    setAppState("scanning");
    setBackgroundIntensity(1.5);

    // Simulate API calls
    await new Promise((resolve) => setTimeout(resolve, 5000));

    // Mock results
    const mockResults: AnalysisResult = {
      ai_probability: Math.floor(Math.random() * 40) + 60, // 60-100%
      verdict: Math.random() > 0.5 ? "AI-Generated" : "Human-Written",
      confidence_level: Math.floor(Math.random() * 20) + 80, // 80-100%
      reasoning: `Analysis of the repository "${projectUrl}" from user "${username}" reveals distinct patterns in code structure, commit behavior, and documentation style. The codebase exhibits characteristics consistent with AI-assisted development, including uniform naming conventions, comprehensive inline comments, and consistent formatting across all files. However, certain architectural decisions and problem-solving approaches suggest human oversight and creative input.`,
      evidence: [
        "Uniform code formatting and style consistency across all files suggests automated generation or strict template following.",
        "Documentation comments follow identical structural patterns with similar phrasing and explanation depth.",
        "Commit messages show unusually consistent formatting and level of detail, lacking typical human variations.",
        "Code complexity remains relatively stable without the typical incremental learning curve seen in human development.",
        "Variable naming follows predictable patterns with limited creative deviation or personal style markers.",
      ],
      analysis_summary: {
        style_consistency: `${Math.floor(Math.random() * 20) + 75}%`,
        pattern_repetition: `${Math.floor(Math.random() * 20) + 70}%`,
        sudden_complexity_jump: Math.random() > 0.5,
      },
    };

    setResults(mockResults);
    setAppState("results");
    setBackgroundIntensity(1);
  };

  const handleAnalyzeAnother = () => {
    setAppState("input");
    setResults(null);
  };

  return (
    <div className="relative w-full min-h-screen">
      {/* Animated Ocean Background */}
      <OceanBackground intensity={backgroundIntensity} />

      {/* Underwater Background Image */}
      {appState === "results" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          className="fixed inset-0 -z-0 pointer-events-none"
        >
          <img
            src="https://images.unsplash.com/photo-1589363794163-c428490365c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWVwJTIwb2NlYW4lMjB1bmRlcndhdGVyJTIwZGFyayUyMGJsdWV8ZW58MXx8fHwxNzcyMzIzMDI4fDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt=""
            className="w-full h-full object-cover mix-blend-overlay"
          />
        </motion.div>
      )}

      {/* Main Content */}
      <div className="relative z-10 w-full min-h-screen flex items-center justify-center py-4 sm:py-8">
        <AnimatePresence mode="wait">
          {appState === "input" && (
            <motion.div
              key="input"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="w-full flex items-center justify-center"
            >
              <InputConsole onAnalyze={handleAnalyze} />
            </motion.div>
          )}

          {appState === "scanning" && (
            <motion.div
              key="scanning"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.5 }}
              className="w-full flex items-center justify-center"
            >
              <ScanningMode />
            </motion.div>
          )}

          {appState === "results" && results && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                ease: [0.23, 1, 0.32, 1],
              }}
              className="w-full flex items-center justify-center"
            >
              <ResultsDashboard
                results={results}
                onAnalyzeAnother={handleAnalyzeAnother}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Back button removed - now handled in ResultsDashboard footer */}
    </div>
  );
}
