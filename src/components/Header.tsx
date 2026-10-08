import React from 'react';
import { 
  Activity, 
  Radio, 
  ShieldAlert, 
  HelpCircle, 
  Play, 
  Sparkles,
  Users
} from 'lucide-react';
import { AstronautProfile, SimulationScenario } from '../types/dico';

interface HeaderProps {
  currentCrew: AstronautProfile;
  crewList: AstronautProfile[];
  onSelectCrew: (crew: AstronautProfile) => void;
  scenarios: SimulationScenario[];
  activeScenarioId: string;
  onSelectScenario: (scenarioId: string) => void;
  onOpenJuryModal: () => void;
  onRunAutoCheckup: () => void;
  isAutoRunning: boolean;
  activeView: 'CONSOLE' | 'HEALTH_HISTORY';
  onChangeView: (view: 'CONSOLE' | 'HEALTH_HISTORY') => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentCrew,
  crewList,
  onSelectCrew,
  scenarios,
  activeScenarioId,
  onSelectScenario,
  onOpenJuryModal,
  onRunAutoCheckup,
  isAutoRunning,
  activeView,
  onChangeView,
}) => {
  return (
    <header className="border-b border-slate-800/80 bg-[#070A12]/95 backdrop-blur-md sticky top-0 z-40 px-4 lg:px-8 py-3">
      {/* Top telemetry bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800/50 text-xs">
        {/* Left: Brand Identity & Sub-discipline */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400 font-display font-bold text-lg tracking-wider shadow-[0_0_12px_rgba(6,182,212,0.25)]">
              D
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-slate-100 text-base tracking-widest">
                  DICO
                </span>
                <span className="hidden sm:inline-block text-[11px] font-mono text-cyan-400/90 tracking-wide uppercase">
                  Deep-space Integrated Crew Observatory
                </span>
              </div>
              <p className="text-[10px] text-slate-400 tracking-tight">
                AI Onboard Health & Nutrition Intelligence
              </p>
            </div>
          </div>

          <div className="h-6 w-px bg-slate-800 hidden md:block" />

          {/* Status & Mission Metadata */}
          <div className="hidden md:flex items-center gap-3 font-mono text-[11px] text-slate-300">
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-emerald-400 font-medium">STATUS: ONLINE</span>
            </div>
            <span className="text-slate-600">·</span>
            <div>
              <span className="text-slate-400">MISSION:</span> <span className="text-slate-200">SIMULATION · SOL 142</span>
            </div>
            <span className="text-slate-600">·</span>
            <div className="flex items-center gap-1 text-cyan-300">
              <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>SPACECRAFT ↔ GROUND (DSN 8.4 GHz · RTT 2.48s)</span>
            </div>
          </div>
        </div>

        {/* Right: Simulation Disclaimer & Jury Mode */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-950/40 border border-amber-500/30 text-amber-300 text-[11px] font-mono">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="tracking-wide">SIMULATED DATA · NON-DIAGNOSTIC RESEARCH PROTOTYPE</span>
          </div>

          <button
            onClick={onOpenJuryModal}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-cyan-950/50 hover:bg-cyan-900/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono transition-colors"
            title="View system architecture, SIH presentation guide & research foundation"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Jury Guide</span>
          </button>
        </div>
      </div>

      {/* Control row: Crew member switch, Scenario presets, Automated demo */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2.5">
        {/* Crew Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-cyan-400" />
            <span>CREW:</span>
          </span>
          <div className="flex items-center gap-1.5 bg-slate-900/90 p-1 rounded-lg border border-slate-800">
            {crewList.map((crew) => {
              const isSelected = crew.id === currentCrew.id;
              return (
                <button
                  key={crew.id}
                  onClick={() => onSelectCrew(crew)}
                  className={`flex items-center gap-2 px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                    isSelected
                      ? 'bg-cyan-600/30 text-cyan-200 border border-cyan-500/50 shadow-[0_0_10px_rgba(6,182,212,0.2)]'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    crew.status === 'NOMINAL' ? 'bg-emerald-400' :
                    crew.status === 'ELEVATED' ? 'bg-amber-400' : 'bg-rose-400'
                  }`} />
                  <span className="truncate">{crew.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* View Switcher: Live Medical Station vs Health History */}
        <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-lg border border-slate-800">
          <button
            onClick={() => onChangeView('CONSOLE')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono font-medium transition-all ${
              activeView === 'CONSOLE'
                ? 'bg-cyan-600/30 text-cyan-200 border border-cyan-500/50 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
            }`}
          >
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            <span>Live Diagnostic Station</span>
          </button>

          <button
            onClick={() => onChangeView('HEALTH_HISTORY')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono font-medium transition-all ${
              activeView === 'HEALTH_HISTORY'
                ? 'bg-cyan-600/30 text-cyan-200 border border-cyan-500/50 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>Health History &amp; Trends</span>
          </button>
        </div>

        {/* Scenario Presets & Quick Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-mono text-slate-400">SCENARIO:</span>
            <select
              value={activeScenarioId}
              onChange={(e) => onSelectScenario(e.target.value)}
              className="bg-slate-900 border border-cyan-500/30 text-cyan-200 text-xs rounded-md px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-cyan-400 font-mono"
            >
              {scenarios.map((sc) => (
                <option key={sc.id} value={sc.id} className="bg-slate-950 text-slate-200">
                  {sc.title} ({sc.kicker})
                </option>
              ))}
            </select>
          </div>

          {/* Automated Checkup Demo Run */}
          <button
            onClick={onRunAutoCheckup}
            disabled={isAutoRunning}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono font-medium transition-all shadow-md ${
              isAutoRunning
                ? 'bg-cyan-900/60 text-cyan-300 border border-cyan-500/40 cursor-wait'
                : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white border border-cyan-400/40 shadow-[0_0_12px_rgba(6,182,212,0.3)]'
            }`}
          >
            {isAutoRunning ? (
              <>
                <Sparkles className="w-3.5 h-3.5 animate-spin text-cyan-300" />
                <span>Running Full Diagnostic Cycle...</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Run Automated Medical Cycle</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
