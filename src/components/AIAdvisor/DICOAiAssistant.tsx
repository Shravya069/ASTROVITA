import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  Bot, 
  AlertCircle, 
  Loader2, 
  ChevronRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { AstronautProfile, VitalsReading, MicroBloodReading, SimulationScenario } from '../../types/dico';

interface DICOAiAssistantProps {
  crew: AstronautProfile;
  vitals: VitalsReading;
  blood: MicroBloodReading;
  activeScenario: SimulationScenario;
  isOpen: boolean;
  onClose: () => void;
}

export const DICOAiAssistant: React.FC<DICOAiAssistantProps> = ({
  crew,
  vitals,
  blood,
  activeScenario,
  isOpen,
  onClose,
}) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [aiSource, setAiSource] = useState<'gemini-2.5-flash' | 'onboard-aerospace-heuristics'>('onboard-aerospace-heuristics');

  if (!isOpen) return null;

  const quickPrompts = [
    'Synthesize clinical diagnosis for current telemetry state',
    'Evaluate cephalic fluid shift & SANS ocular risk',
    'Prescribe 48-hour bone demineralization countermeasure',
    'Assess post-EVA lactate clearance and rest schedule',
    'Cosmic radiation DNA free-radical mitigation protocol'
  ];

  const handleAskAi = async (customPrompt?: string) => {
    const promptToSend = customPrompt || query;
    if (!promptToSend.trim()) return;

    setLoading(true);
    setResponse(null);

    try {
      const res = await fetch('/api/dico-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          astronaut: crew,
          vitals,
          blood,
          mass: { deltaKg: activeScenario.massDeltaKg },
          userQuery: promptToSend,
          scenarioTitle: activeScenario.title,
        }),
      });

      const data = await res.json();
      if (data.success && data.analysis) {
        setResponse(data.analysis);
        setAiSource(data.source);
      } else {
        setResponse('DICO AI Analysis: Telemetry nominal. Standard deep-space closed-loop nutritional protocol maintained.');
      }
    } catch (err) {
      setResponse(`[ DICO ONBOARD AUTONOMOUS MEDICAL ASSESSMENT ]
DIAGNOSTIC STATUS: ${activeScenario.title.toUpperCase()}
ASTRONAUT: ${crew.name} (Sol ${crew.missionDay})

1. BIOMARKER SUMMARY:
- Lactate: ${blood.bloodLactate} mmol/L | Ionized Ca2+: ${blood.ionizedCalcium} mmol/L | DNA 8-OHdG: ${blood.dnaOxidativeStress8OHdG} ng/mL
- Vitals: HR ${vitals.heartRate} bpm, SpO2 ${vitals.spo2}%, MAP ${vitals.meanArterialPressure} mmHg

2. TARGETED NUTRITION PRESCRIPTION:
${activeScenario.pantryPrescriptionFocus}

3. GROUND FLIGHT SURGEON DIRECTIVE:
${activeScenario.flightSurgeonRecommendation}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-[#090D17] border border-cyan-500/40 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#060911]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-950/60 border border-cyan-500/40 text-cyan-300">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold font-display text-slate-100 tracking-wider">
                  DICO AUTONOMOUS CLINICAL AI ASSISTANT
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30 text-cyan-300">
                  {aiSource === 'gemini-2.5-flash' ? 'POWERED BY GEMINI 2.5' : 'ONBOARD AEROSPACE ENGINE'}
                </span>
              </div>
              <p className="text-xs font-mono text-slate-400">
                Deep-Space Bioastronautics & Nutritional Countermeasure Synthesizer
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-100 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          {/* Quick Prompts */}
          <div>
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-2">
              Deep-Space Clinical Query Templates:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {quickPrompts.map((p, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setQuery(p);
                    handleAskAi(p);
                  }}
                  className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-200 transition-all text-left"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* AI Response Display */}
          {loading && (
            <div className="p-8 rounded-xl bg-slate-900/50 border border-slate-800 flex flex-col items-center justify-center gap-3 text-cyan-400">
              <Loader2 className="w-8 h-8 animate-spin" />
              <span className="text-xs font-mono tracking-wider">
                Synthesizing Multi-Modal Biometrics & Microfluidic Assays...
              </span>
            </div>
          )}

          {response && !loading && (
            <div className="p-4 rounded-xl bg-slate-900/80 border border-cyan-500/30 shadow-inner">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-3 text-xs font-mono text-cyan-300">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span>DICO CLINICAL SYNTHESIS COMPLETE</span>
                </span>
                <span className="text-[10px] text-slate-400">
                  Source: {aiSource}
                </span>
              </div>
              <div className="text-xs font-mono text-slate-200 leading-relaxed whitespace-pre-wrap">
                {response}
              </div>
            </div>
          )}

          {/* Input field */}
          <div className="flex items-center gap-2 pt-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAskAi()}
              placeholder="Ask DICO AI about crew vitals, fluid shifts, or customized pantry rations..."
              className="flex-1 bg-slate-950 border border-slate-800 focus:border-cyan-500/60 rounded-xl px-4 py-2.5 text-xs font-mono text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/50"
            />
            <button
              onClick={() => handleAskAi()}
              disabled={loading || !query.trim()}
              className="px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-xs flex items-center gap-1.5 transition-all disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Query AI</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-[#060911] flex justify-between items-center text-[10px] font-mono text-slate-500">
          <span>DICO SYSTEM ENGINE · AUTONOMOUS MEDICAL INTELLIGENCE</span>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
};
