import React from 'react';
import { X, Award, Sparkles, CheckCircle2, ShieldAlert, Cpu, Utensils, Radio, Scale, Fingerprint, FlaskConical } from 'lucide-react';

interface JuryDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectScenario: (scenarioId: string) => void;
}

export const JuryDemoModal: React.FC<JuryDemoModalProps> = ({
  isOpen,
  onClose,
  onSelectScenario,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="bg-[#090D18] border border-cyan-500/40 rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#060912]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-950/80 border border-cyan-500/40 text-cyan-300">
              <Award className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold font-display text-white tracking-wider">
                  DICO JURY DEMONSTRATION & ARCHITECTURE DOSSIER
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/40 text-emerald-300">
                  SIH PROTOTYPE
                </span>
              </div>
              <p className="text-xs font-mono text-cyan-400">
                Deep-space Integrated Crew Observatory · Spacecraft Health & Nutrition Intelligence
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-300 font-mono">
          {/* Executive Overview */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <h3 className="text-sm font-bold text-white mb-1.5 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Problem Statement & DICO Solution</span>
            </h3>
            <p className="text-slate-300 leading-relaxed text-xs">
              On long-duration missions to Mars and deep space, communications with Earth experience <strong>up to 20-minute signal delays</strong>, making real-time telemedicine impossible. Meanwhile, microgravity causes rapid bone demineralization (-1.5%/month), fluid cephalic shifts (SANS), muscle atrophy, and cosmic radiation DNA oxidative damage.
            </p>
            <p className="text-slate-300 leading-relaxed text-xs mt-2">
              <strong>DICO (Deep-space Integrated Crew Observatory)</strong> is an autonomous onboard multi-modal clinical intelligence station that unifies physical biometric hardware, microfluidic blood diagnostics, and closed-loop spacecraft nutrition dispensing into a single self-reliant system.
            </p>
          </div>

          {/* 3 Core Hardware Modules */}
          <div>
            <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-3">
              The 3 Integrated Station Hardware Subsystems
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3 rounded-lg bg-slate-900/40 border border-slate-800">
                <div className="flex items-center gap-2 text-cyan-300 font-bold mb-1">
                  <Fingerprint className="w-4 h-4 text-cyan-400" />
                  <span>1. Finger Scanner</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-normal">
                  Dual-wavelength (660/940nm) photoplethysmography sensor capturing SpO2, heart rate variability (HRV), pulse wave velocity, and vascular elasticity.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-slate-900/40 border border-slate-800">
                <div className="flex items-center gap-2 text-blue-300 font-bold mb-1">
                  <Scale className="w-4 h-4 text-blue-400" />
                  <span>2. Zero-G Mass Platform</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-normal">
                  SLAMMD harmonic spring-mass oscillator measuring inertial mass (T = 2π√(m/k)) in zero gravity to isolate muscle loss from cephalic fluid shift.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-slate-900/40 border border-slate-800">
                <div className="flex items-center gap-2 text-rose-300 font-bold mb-1">
                  <FlaskConical className="w-4 h-4 text-rose-400" />
                  <span>3. Micro-Blood Lab Chip</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-normal">
                  50 µL capillary lab-on-a-chip evaluating 10 deep-space biomarkers including ionized calcium (bone demineralization), lactate, and 8-OHdG (cosmic radiation DNA stress).
                </p>
              </div>
            </div>
          </div>

          {/* Key Demonstrable Simulation Scenarios */}
          <div>
            <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2">
              Jury Demo Presets (Click to Load Scenario)
            </h3>
            <div className="space-y-2">
              <button
                onClick={() => { onSelectScenario('scenario-nominal'); onClose(); }}
                className="w-full text-left p-2.5 rounded-lg bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 hover:border-emerald-500/40 transition-colors flex items-center justify-between"
              >
                <div>
                  <span className="font-bold text-emerald-400 text-xs">Scenario A: Nominal Orbital Cruise</span>
                  <p className="text-[11px] text-slate-400">Baseline microgravity adaptation, maintenance nutrition, 24-hr routine telemetry downlink.</p>
                </div>
                <span className="text-[10px] text-emerald-300 font-mono px-2 py-1 rounded bg-emerald-950/60 border border-emerald-500/30">Select</span>
              </button>

              <button
                onClick={() => { onSelectScenario('scenario-fluid-shift'); onClose(); }}
                className="w-full text-left p-2.5 rounded-lg bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 hover:border-amber-500/40 transition-colors flex items-center justify-between"
              >
                <div>
                  <span className="font-bold text-amber-400 text-xs">Scenario B: Cephalic Fluid Shift & SANS Risk</span>
                  <p className="text-[11px] text-slate-400">High hematocrit & upper torso venous engorgement. DICO prescribes strict low-sodium + retinal DHA/EPA lipids.</p>
                </div>
                <span className="text-[10px] text-amber-300 font-mono px-2 py-1 rounded bg-amber-950/60 border border-amber-500/30">Select</span>
              </button>

              <button
                onClick={() => { onSelectScenario('scenario-eva-fatigue'); onClose(); }}
                className="w-full text-left p-2.5 rounded-lg bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 hover:border-rose-500/40 transition-colors flex items-center justify-between"
              >
                <div>
                  <span className="font-bold text-rose-400 text-xs">Scenario C: Post-EVA Fatigue & Electrolyte Depletion</span>
                  <p className="text-[11px] text-slate-400">6.5hr spacewalk suit fatigue. High lactate (4.8 mmol/L). DICO dispenses potassium-magnesium salts & recovery cherry compote.</p>
                </div>
                <span className="text-[10px] text-rose-300 font-mono px-2 py-1 rounded bg-rose-950/60 border border-rose-500/30">Select</span>
              </button>

              <button
                onClick={() => { onSelectScenario('scenario-solar-radiation'); onClose(); }}
                className="w-full text-left p-2.5 rounded-lg bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 hover:border-rose-500/40 transition-colors flex items-center justify-between"
              >
                <div>
                  <span className="font-bold text-rose-400 text-xs">Scenario D: Solar Particle Event (SPE) Radiation Surge</span>
                  <p className="text-[11px] text-slate-400">Cosmic flux elevation. DNA oxidative stress 8-OHdG spikes to 8.9 ng/mL. DICO auto-alerts Flight Surgeon and dispenses Spirulina phycocyanin.</p>
                </div>
                <span className="text-[10px] text-rose-300 font-mono px-2 py-1 rounded bg-rose-950/60 border border-rose-500/30">Select</span>
              </button>

              <button
                onClick={() => { onSelectScenario('scenario-bone-resorption'); onClose(); }}
                className="w-full text-left p-2.5 rounded-lg bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 hover:border-amber-500/40 transition-colors flex items-center justify-between"
              >
                <div>
                  <span className="font-bold text-amber-400 text-xs">Scenario E: Microgravity Bone Resorption & Calcium Leaching</span>
                  <p className="text-[11px] text-slate-400">Serum calcium elevates to 1.41 mmol/L. DICO escalates hydration to prevent kidney stones and dispenses chelated Ca/D3/K2 puree.</p>
                </div>
                <span className="text-[10px] text-amber-300 font-mono px-2 py-1 rounded bg-amber-950/60 border border-amber-500/30">Select</span>
              </button>
            </div>
          </div>

          {/* Research & Engineering Disclaimer */}
          <div className="p-3 rounded-lg bg-amber-950/20 border border-amber-500/30 text-amber-300 text-[11px] flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
            <div>
              <strong>IMPORTANT RESEARCH PROTOTYPE DISCLAIMER:</strong> This simulator is an engineering concept prototype created for software and bioastronautics algorithm demonstrations. All readings are simulated data; this system does not perform certified clinical diagnostic procedures.
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-[#060912] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-xs transition-colors"
          >
            Enter Simulator Console
          </button>
        </div>
      </div>
    </div>
  );
};
