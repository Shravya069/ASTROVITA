import React, { useState, useEffect } from 'react';
import { Dna, Pipette, CheckCircle2, FlaskConical, AlertTriangle, ArrowRight } from 'lucide-react';
import { MicroBloodReading } from '../../types/dico';

interface MicroBloodLabProps {
  blood: MicroBloodReading;
  onOpenDetailedPanel?: () => void;
  externalTrigger?: boolean;
}

export const MicroBloodLab: React.FC<MicroBloodLabProps> = ({
  blood,
  onOpenDetailedPanel,
  externalTrigger,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [assayStep, setAssayStep] = useState<'IDLE' | 'SAMPLING' | 'SEPARATION' | 'FLUORESCENCE' | 'COMPLETE'>('COMPLETE');
  const [channelProgress, setChannelProgress] = useState(100);

  useEffect(() => {
    if (externalTrigger && !isProcessing) {
      handleRunAssay();
    }
  }, [externalTrigger]);

  const handleRunAssay = () => {
    setIsProcessing(true);
    setAssayStep('SAMPLING');
    setChannelProgress(15);

    setTimeout(() => {
      setAssayStep('SEPARATION');
      setChannelProgress(50);
    }, 1200);

    setTimeout(() => {
      setAssayStep('FLUORESCENCE');
      setChannelProgress(80);
    }, 2400);

    setTimeout(() => {
      setAssayStep('COMPLETE');
      setChannelProgress(100);
      setIsProcessing(false);
    }, 3600);
  };

  const isLactateHigh = blood.bloodLactate > 2.2;
  const isCalciumHigh = blood.ionizedCalcium > 1.33;
  const isRadiationHigh = blood.dnaOxidativeStress8OHdG > 5.0;

  return (
    <div className="bg-[#0B0F19] rounded-xl border border-slate-800/90 p-4 relative overflow-hidden flex flex-col justify-between shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800/70 pb-2 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
          <h3 className="text-xs font-mono font-semibold tracking-wider text-slate-200 uppercase">
            03. Micro-Blood Cartridge & Capillary Lab-On-Chip
          </h3>
        </div>
        <span className="text-[10px] font-mono text-rose-400/90">
          MICROFLUIDIC CHIP · 50 µL CAPILLARY ASSAY
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* Microfluidic Chip Visualization & Cartridge Slot */}
        <div className="md:col-span-5 flex flex-col items-center justify-center p-3 rounded-lg bg-[#070A12] border border-slate-800/80 relative">
          <div className="w-full h-32 rounded-xl bg-slate-950/80 border border-slate-800 p-2 relative flex flex-col justify-between overflow-hidden">
            {/* Cartridge bay status */}
            <div className="flex items-center justify-between text-[9px] font-mono text-slate-400">
              <span className="flex items-center gap-1">
                <Pipette className="w-3 h-3 text-rose-400" />
                <span>CHIP BAY A-4</span>
              </span>
              <span className={`font-semibold ${
                assayStep === 'COMPLETE' ? 'text-emerald-400' : 'text-rose-400 animate-pulse'
              }`}>
                {assayStep}
              </span>
            </div>

            {/* Microfluidic channels visual representation */}
            <div className="relative h-12 flex items-center justify-center my-1">
              <div className="w-full h-2.5 rounded-full bg-slate-900 border border-slate-800 relative overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-rose-700 via-rose-500 to-cyan-400 transition-all duration-300 relative"
                  style={{ width: `${channelProgress}%` }}
                >
                  {isProcessing && (
                    <div className="absolute inset-0 bg-white/30 animate-pulse" />
                  )}
                </div>
              </div>

              {/* Reaction chambers along channel */}
              <div className="absolute inset-0 flex justify-between items-center px-4 pointer-events-none">
                <div className={`w-3.5 h-3.5 rounded-full border text-[8px] flex items-center justify-center ${
                  channelProgress >= 25 ? 'bg-rose-500/30 border-rose-400 text-white' : 'border-slate-700 bg-slate-900 text-slate-500'
                }`}>
                  1
                </div>
                <div className={`w-3.5 h-3.5 rounded-full border text-[8px] flex items-center justify-center ${
                  channelProgress >= 60 ? 'bg-rose-500/30 border-rose-400 text-white' : 'border-slate-700 bg-slate-900 text-slate-500'
                }`}>
                  2
                </div>
                <div className={`w-3.5 h-3.5 rounded-full border text-[8px] flex items-center justify-center ${
                  channelProgress >= 90 ? 'bg-cyan-500/30 border-cyan-400 text-white' : 'border-slate-700 bg-slate-900 text-slate-500'
                }`}>
                  3
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-[8px] font-mono text-slate-500">
              <span>Lysis</span>
              <span>Plasma Centrifuge</span>
              <span>Fluorescent Binding</span>
            </div>
          </div>

          <button
            onClick={handleRunAssay}
            disabled={isProcessing}
            className="mt-2.5 w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded text-[11px] font-mono bg-rose-950/60 hover:bg-rose-900/70 border border-rose-500/40 text-rose-200 transition-all disabled:opacity-50"
          >
            <FlaskConical className={`w-3 h-3 ${isProcessing ? 'animate-bounce' : ''}`} />
            <span>
              {isProcessing ? 'Running Capillary Assay...' : 'Run Micro-Blood Assay'}
            </span>
          </button>
        </div>

        {/* Real-time Chemical Biomarker Readouts */}
        <div className="md:col-span-7 flex flex-col gap-2.5">
          <div className="grid grid-cols-3 gap-2">
            {/* Hemoglobin */}
            <div className="p-2 rounded bg-slate-900/80 border border-slate-800">
              <div className="text-[10px] font-mono text-slate-400 uppercase">Hemoglobin</div>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-xl font-mono font-semibold text-slate-100 tabular-nums">
                  {blood.hemoglobin.toFixed(1)}
                </span>
                <span className="text-[10px] font-mono text-slate-400">g/dL</span>
              </div>
              <span className="text-[9px] font-mono text-slate-400">
                Hct: {blood.hematocrit.toFixed(1)}%
              </span>
            </div>

            {/* Lactate */}
            <div className={`p-2 rounded border ${
              isLactateHigh 
                ? 'bg-rose-950/40 border-rose-500/50' 
                : 'bg-slate-900/80 border-slate-800'
            }`}>
              <div className="text-[10px] font-mono text-slate-400 uppercase">Blood Lactate</div>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className={`text-xl font-mono font-semibold tabular-nums ${
                  isLactateHigh ? 'text-rose-300' : 'text-slate-100'
                }`}>
                  {blood.bloodLactate.toFixed(1)}
                </span>
                <span className="text-[10px] font-mono text-slate-400">mmol/L</span>
              </div>
              <span className={`text-[9px] font-mono ${
                isLactateHigh ? 'text-rose-400' : 'text-emerald-400'
              }`}>
                {isLactateHigh ? '▲ POST-EVA DEPLETION' : '● NOMINAL'}
              </span>
            </div>

            {/* Ionized Calcium */}
            <div className={`p-2 rounded border ${
              isCalciumHigh 
                ? 'bg-amber-950/40 border-amber-500/50' 
                : 'bg-slate-900/80 border-slate-800'
            }`}>
              <div className="text-[10px] font-mono text-slate-400 uppercase">Ionized Ca2+</div>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className={`text-xl font-mono font-semibold tabular-nums ${
                  isCalciumHigh ? 'text-amber-300' : 'text-slate-100'
                }`}>
                  {blood.ionizedCalcium.toFixed(2)}
                </span>
                <span className="text-[10px] font-mono text-slate-400">mmol/L</span>
              </div>
              <span className={`text-[9px] font-mono ${
                isCalciumHigh ? 'text-amber-400' : 'text-emerald-400'
              }`}>
                {isCalciumHigh ? '▲ BONE RESORPTION' : '● HOMEOSTASIS'}
              </span>
            </div>
          </div>

          {/* DNA Damage & Electrolyte Ribbon */}
          <div className="bg-[#050811] p-2.5 rounded-lg border border-slate-800 flex items-center justify-between text-[10px] font-mono">
            <div className="flex items-center gap-3">
              <div>
                <span className="text-slate-400">DNA Oxidative (8-OHdG):</span>{' '}
                <span className={`font-semibold tabular-nums ${
                  isRadiationHigh ? 'text-rose-400' : 'text-slate-200'
                }`}>
                  {blood.dnaOxidativeStress8OHdG.toFixed(1)} ng/mL
                </span>
              </div>
              <div>
                <span className="text-slate-400">Na+/K+ Ratio:</span>{' '}
                <span className="text-slate-200 font-semibold tabular-nums">
                  {(blood.sodium / blood.potassium).toFixed(1)}
                </span>
              </div>
            </div>

            {onOpenDetailedPanel && (
              <button
                onClick={onOpenDetailedPanel}
                className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-semibold hover:underline"
              >
                <span>Full Lab Matrix</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
