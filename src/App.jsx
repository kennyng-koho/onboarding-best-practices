import React, { useState, useEffect } from 'react';
import {
  Search,
  Globe,
  UserPlus,
  Zap,
  Star,
  Repeat,
  CheckCircle2,
  ChevronRight,
  ChevronDown,
  ArrowRight,
  Lightbulb,
  Trophy,
  Sparkles,
  Loader2,
  Send
} from 'lucide-react';

const OnboardingFlow = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [productNiche, setProductNiche] = useState('');
  const [aiStrategy, setAiStrategy] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const steps = [
    {
      id: 1,
      title: "Google search / Ads",
      icon: <Search className="w-5 h-5" />,
      details: {
        subtitle: "The Discovery Phase",
        description: "Capturing high-intent users at the moment they have a problem.",
        caseStudy: {
          brand: "Monday.com",
          why: "Competitor bidding (e.g., 'Trello Alternative') and sitelink extensions to let users 'choose their own adventure' from the search page."
        },
        bulletPoints: [
          "Optimizing for high-intent keywords",
          "A/B testing ad copy for CTR improvement",
          "Mapping search intent to landing page content"
        ],
        kpi: "CTR > 3%"
      }
    },
    {
      id: 2,
      title: "Website",
      icon: <Globe className="w-5 h-5" />,
      details: {
        subtitle: "First Impressions",
        description: "Communicating value in under 5 seconds to build trust immediately.",
        caseStudy: {
          brand: "Notion",
          why: "Benefit-driven headlines ('Your central nervous system for work') and high-fidelity interactive product previews."
        },
        bulletPoints: [
          "Clear, above-the-fold value proposition",
          "Fast loading times and mobile responsiveness",
          "Social proof (testimonials, logos)"
        ],
        kpi: "Time on Page > 60s"
      }
    },
    {
      id: 3,
      title: "Sign up Flow",
      icon: <UserPlus className="w-5 h-5" />,
      details: {
        subtitle: "Converting Intent",
        description: "A frictionless transition from visitor to user by removing traditional roadblocks.",
        caseStudy: {
          brand: "Slack",
          why: "Pioneered 'Magic Links' to remove password friction and uses a simple one-field email start to get users into the system fast."
        },
        bulletPoints: [
          "Minimizing form fields (Progressive profiling)",
          "Offering social login options (Google, Apple)",
          "Removing unnecessary distractions"
        ],
        kpi: "Conversion > 15%"
      }
    },
    {
      id: 4,
      title: "First session",
      icon: <Zap className="w-5 h-5" />,
      details: {
        subtitle: "The Introduction",
        description: "Providing immediate context without 'Empty State' anxiety.",
        caseStudy: {
          brand: "Canva",
          why: "A 'Template First' approach that ensures users create something beautiful within 60 seconds of joining."
        },
        bulletPoints: [
          "Interactive product tours or walkthroughs",
          "Setting up the first project or profile",
          "Personalized onboarding checklists"
        ],
        kpi: "Activation Rate"
      }
    },
    {
      id: 5,
      title: "Path to Aha moment",
      icon: <Star className="w-5 h-5" />,
      details: {
        subtitle: "Value Realization",
        description: "The 'Wow' moment where the user realizes exactly why they need the product.",
        caseStudy: {
          brand: "Zoom",
          why: "Requires no account for guests to join a call, proving the product's high-quality video utility instantly."
        },
        bulletPoints: [
          "Reducing time-to-value (TTV)",
          "Guiding users to 'killer' features",
          "Removing setup roadblocks"
        ],
        kpi: "Retention Day 1"
      }
    },
    {
      id: 6,
      title: "Habit Forming",
      icon: <Repeat className="w-5 h-5" />,
      details: {
        subtitle: "Retention & Loyalty",
        description: "Moving from a 'nice-to-have' tool to an essential part of the user's workflow.",
        caseStudy: {
          brand: "Duolingo",
          why: "Uses loss aversion (Streaks) and persistent triggers to make the product a daily habit."
        },
        bulletPoints: [
          "Trigger-based notifications (re-engagement)",
          "Rewarding core actions (gamification)",
          "Continuous value delivery via updates"
        ],
        kpi: "Retention Day 30"
      }
    }
  ];

  const currentStep = steps.find(s => s.id === activeStep);

  const fetchAIStrategy = async () => {
    if (!productNiche.trim()) {
      setError("Please describe your product first.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setAiStrategy(null);

    try {
      const response = await fetch('/api/generate-strategy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productNiche,
          stepTitle: currentStep.title,
          stepDescription: currentStep.details.description
        })
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const result = await response.json();

      if (result.error) {
        throw new Error(result.error);
      }

      setAiStrategy(result);
    } catch (err) {
      setError("Failed to generate strategy. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setAiStrategy(null);
    setError(null);
  }, [activeStep]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 md:p-8 font-sans">
      <div className="max-w-7xl w-full bg-white rounded-3xl shadow-2xl p-6 md:p-10 border border-slate-100">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2 tracking-tight">
            Holistic User Journey Flow
          </h1>
          <p className="text-slate-500 text-base">From discovery to long-term habit formation.</p>
        </div>

        {/* Side-by-Side Content */}
        <div className="flex flex-col lg:flex-row gap-8 items-stretch">

          {/* LEFT: The Path Stepper */}
          <div className="lg:w-1/4 flex flex-col gap-2">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4 mb-2">User Journey Path</h4>
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <button
                  onClick={() => setActiveStep(step.id)}
                  className={`flex items-center gap-4 p-4 rounded-2xl transition-all text-left group
                    ${activeStep === step.id
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100 ring-4 ring-indigo-50 translate-x-2'
                      : 'hover:bg-slate-50 text-slate-600'}
                  `}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2 transition-colors
                    ${activeStep === step.id ? 'bg-indigo-500 border-indigo-400' : 'bg-white border-slate-100 group-hover:border-indigo-200'}
                  `}>
                    {activeStep > step.id ? <CheckCircle2 className="w-5 h-5 text-indigo-400" /> : <span className="text-sm font-bold">{step.id}</span>}
                  </div>
                  <div>
                    <span className={`text-[9px] font-bold uppercase tracking-tight block
                      ${activeStep === step.id ? 'text-indigo-200' : 'text-slate-400'}
                    `}>
                      Step 0{step.id}
                    </span>
                    <h3 className="text-sm font-bold leading-none">{step.title}</h3>
                  </div>
                  {activeStep === step.id && <ChevronRight className="ml-auto w-4 h-4 opacity-50" />}
                </button>

                {index < steps.length - 1 && (
                  <div className="flex justify-center h-4">
                    <div className={`w-0.5 h-full ${activeStep > step.id ? 'bg-indigo-400' : 'bg-slate-100'}`}></div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* RIGHT: The Explanation Panel */}
          <div className="lg:w-3/4">
            <div className="bg-slate-50 rounded-3xl p-6 md:p-8 border border-slate-200 h-full flex flex-col animate-in fade-in zoom-in-95 duration-300">
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

                {/* Core Strategy & AI */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
                      {currentStep.icon}
                    </div>
                    <span className="text-indigo-600 font-bold uppercase tracking-wider text-xs">
                      {currentStep.details.subtitle}
                    </span>
                  </div>
                  <h2 className="text-3xl font-black text-slate-900 mb-4">
                    {currentStep.title}
                  </h2>
                  <p className="text-slate-600 text-lg leading-relaxed mb-6">
                    {currentStep.details.description}
                  </p>

                  {/* AI Interaction */}
                  <div className="mb-6 p-4 bg-white rounded-2xl border border-indigo-100 shadow-sm">
                    <label className="block text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-2">
                      Tailor for your product
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="e.g. Finance app for Gen Z"
                        className="flex-1 bg-slate-50 border-none focus:ring-1 focus:ring-indigo-500 rounded-xl px-3 py-2 text-sm text-slate-700 placeholder:text-slate-300"
                        value={productNiche}
                        onChange={(e) => setProductNiche(e.target.value)}
                      />
                      <button
                        onClick={fetchAIStrategy}
                        disabled={isLoading}
                        className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white px-4 rounded-xl transition-all flex items-center gap-2 text-xs font-bold"
                      >
                        {isLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                        Apply AI
                      </button>
                    </div>
                  </div>

                  {aiStrategy && (
                    <div className="mb-6 p-5 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl text-white shadow-xl animate-in slide-in-from-left-4 duration-500">
                      <div className="flex items-center gap-2 mb-3">
                        <Sparkles className="w-4 h-4 text-indigo-200" />
                        <h3 className="font-bold text-sm">✨ Tailored AI Strategy</h3>
                      </div>
                      <div className="space-y-3">
                        {aiStrategy.tactics.map((tactic, i) => (
                          <p key={i} className="text-xs bg-white/10 p-2 rounded-lg border border-white/5 leading-snug">
                            {tactic}
                          </p>
                        ))}
                        <div className="pt-2 border-t border-white/20 italic">
                          <p className="text-sm font-bold leading-tight">"{aiStrategy.copy_suggestion}"</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Benchmark */}
                  <div className="bg-indigo-50 rounded-2xl p-5 border border-indigo-100 relative overflow-hidden group">
                    <Trophy className="absolute top-2 right-2 w-10 h-10 text-indigo-900/5 group-hover:scale-110 transition-transform" />
                    <div className="flex items-center gap-2 text-indigo-800 font-bold text-sm mb-1">
                      <Lightbulb className="w-4 h-4" />
                      {currentStep.details.caseStudy.brand} Case Study
                    </div>
                    <p className="text-indigo-900 text-sm font-medium leading-snug">
                      "{currentStep.details.caseStudy.why}"
                    </p>
                  </div>
                </div>

                {/* KPI & Checklist */}
                <div className="flex flex-col gap-6">
                   <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex-1">
                    <h4 className="text-slate-900 font-extrabold mb-4 text-sm flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      Implementation Checklist
                    </h4>
                    <ul className="space-y-4">
                      {currentStep.details.bulletPoints.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-slate-600 group">
                          <div className="w-5 h-5 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center mt-0.5 shrink-0 group-hover:bg-indigo-50 transition-colors">
                            <span className="text-[9px] font-bold text-slate-400 group-hover:text-indigo-500">{idx + 1}</span>
                          </div>
                          <span className="text-sm leading-snug font-medium group-hover:text-slate-900 transition-colors">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-2xl shadow-sm">
                    <div>
                      <span className="text-slate-400 font-bold text-[10px] uppercase block mb-1">Success Target</span>
                      <span className="text-indigo-600 font-black text-xl">{currentStep.details.kpi}</span>
                    </div>
                    {activeStep < 6 && (
                      <button
                        onClick={() => setActiveStep(activeStep + 1)}
                        className="p-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors flex items-center gap-2 shadow-lg shadow-indigo-100"
                      >
                        Next Step <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  return <OnboardingFlow />;
}
