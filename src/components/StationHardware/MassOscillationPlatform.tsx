import React, { useState, useEffect } from 'react';
import { Scale, Play, CheckCircle2, TrendingDown, ArrowDownRight, Compass } from 'lucide-react';
import { AstronautProfile, MassReading } from '../../types/dico';

interface MassOscillationPlatformProps {
  crew: AstronautProfile;
  massDeltaKg: number;
  onMassUpdate?: (mass: MassReading) => void;
  externalTrigger?: boolean;
}

export const MassOscillationPlatform: React.FC<MassOscillationPlatformProps> = ({
  crew,
  massDeltaKg,
  onMassUpdate,
  externalTrigger,
}) => {
  const [isOscillating, setIsOscillating] = useState(false);
  const [oscillationCycle, setOscillationCycle] = useState(0);
  const [currentMass, setCurrentMass] = useState(crew.baselineMassKg + massDeltaKg);
  const [springDisplacement, setSpringDisplacement] = useState(0);

  // Sync when crew or scenario mass changes
  useEffect(() => {
    setCurrentMass(Number((crew.baselineMassKg + massDeltaKg).toFixed(2)));
  }, [crew.baselineMassKg, massDeltaKg]);

  useEffect(() => {
    if (externalTrigger && !isOscillating) {
      handleTriggerOscillation();
    }
  }, [externalTrigger]);

  const handleTriggerOscillation = () => {
    setIsOscillating(true);
    setOscillationCycle(0);

    let cycle = 0;
    const interval = setInterval(() => {
      cycle += 1;
      setOscillationCycle(cycle);
      if (cycle >= 5) {
        clearInterval(interval);
        setIsOscillating(false);
        const measured = Number((crew.baselineMassKg + massDeltaKg).toFixed(2));
        setCurrentMass(measured);
        if (onMassUpdate) {
          onMassUpdate({
            measuredMassKg: measured,
            baselineMassKg: crew.baselineMassKg,
            deltaKg: massDeltaKg,
            harmonicFreqHz: Number((1.65 - massDeltaKg * 0.02).toFixed(3)),
            springConstantNm: 684.2,
            estimatedMuscleLossKg: Number((Math.abs(massDeltaKg) * 0.42).toFixed(2)),
            fluidShiftFractionPct: 58,
            lastMeasuredTimestamp: new Date().toLocaleTimeString(),
          });
        }
      }
    }, 600);
  };

  // Harmonic spring vibration simulation
  useEffect(() => {
    if (!isOscillating) {
      setSpringDisplacement(0);
      return;
    }

    let frameId: number;
    let start = performance.now();

    const animateSpring = (time: number) => {
      const elapsed = (time - start) / 1000;
      // Damped harmonic oscillation curve
      const amplitude = 22 * Math.exp(-elapsed * 0.2);
      const freq = 10;
      setSpringDisplacement(Math.sin(elapsed * freq) * amplitude);

      frameId = requestAnimationFrame(animateSpring);
    };

    frameId = requestAnimationFrame(animateSpring);
    return () => cancelAnimationFrame(frameId);
  }, [isOscillating]);

  const calculatedFreq = Number((1.65 - massDeltaKg * 0.018).toFixed(3));
  const muscleLossEst = (Math.abs(massDeltaKg) * 0.38).toFixed(2);
  const fluidLossEst = (Math.abs(massDeltaKg) * 0.62).toFixed(2);

  return (
    <div className="bg-[#0B0F19] rounded-xl border border-slate-800/90 p-4 relative overflow-hidden flex flex-col justify-between shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800/70 pb-2 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
          <h3 className="text-xs font-mono font-semibold tracking-wider text-slate-200 uppercase">
            02. Microgravity Mass Oscillometry Platform
          </h3>
        </div>
        <span className="text-[10px] font-mono text-blue-400/90">
          SLAMMD · HARMONIC INERTIAL TRANSDUCER
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* Dynamic Harmonic Mechanical Rail Illustration */}
        <div className="md:col-span-5 flex flex-col items-center justify-center p-3 rounded-lg bg-[#070A12] border border-slate-800/80 relative">
          <div className="w-full h-32 flex flex-col justify-center items-center relative overflow-hidden bg-slate-950/60 rounded-xl border border-slate-800/90 px-4">
            {/* Guide rails */}
            <div className="absolute left-4 right-4 top-4 h-0.5 bg-slate-800" />
            <div className="absolute left-4 right-4 bottom-4 h-0.5 bg-slate-800" />

            {/* Microgravity Restraint & Mass Carriage with spring */}
            <div
              className="w-24 h-16 rounded-lg bg-gradient-to-r from-slate-900 to-slate-800 border border-blue-500/40 flex flex-col items-center justify-center shadow-lg transition-transform duration-75 relative z-10"
              style={{ transform: `translateX(${springDisplacement}px)` }}
            >
              <Scale className={`w-5 h-5 ${isOscillating ? 'text-blue-300 animate-spin' : 'text-blue-400'}`} />
              <span className="text-[10px] font-mono text-slate-200 font-semibold mt-1">
                {currentMass.toFixed(2)} kg
              </span>
              {/* Force arrows */}
              {isOscillating && (
                <div className="absolute -bottom-2 text-[8px] font-mono text-cyan-300 bg-cyan-950 px-1 rounded border border-cyan-500/30">
                  k = 684 N/m
                </div>
              )}
            </div>

            {/* Spring visualization coils */}
            <div className="absolute left-6 w-12 h-6 flex items-center justify-between opacity-50">
              <span className="text-[10px] font-mono text-slate-600">〰️〰️</span>
            </div>
            <div className="absolute right-6 w-12 h-6 flex items-center justify-between opacity-50">
              <span className="text-[10px] font-mono text-slate-600">〰️〰️</span>
            </div>

            {/* Zero-g note */}
            <div className="absolute bottom-1 right-2 text-[8px] font-mono text-slate-500">
              MICROGRAVITY INERTIAL HARMONIC
            </div>
          </div>

          <button
            onClick={handleTriggerOscillation}
            disabled={isOscillating}
            className="mt-2.5 w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded text-[11px] font-mono bg-blue-950/60 hover:bg-blue-900/70 border border-blue-500/40 text-blue-200 transition-all disabled:opacity-50"
          >
            <Play className={`w-3 h-3 ${isOscillating ? 'animate-spin' : ''}`} />
            <span>
              {isOscillating ? `Oscillation Cycle ${oscillationCycle}/5...` : 'Trigger Mass Oscillation Cycle'}
            </span>
          </button>
        </div>

        {/* Mass Metrics & Tissue/Fluid Breakdown */}
        <div className="md:col-span-7 flex flex-col gap-2.5">
          <div className="grid grid-cols-2 gap-2">
            {/* Measured Mass */}
            <div className="p-2.5 rounded bg-slate-900/80 border border-slate-800">
              <div className="text-[10px] font-mono text-slate-400 uppercase">Current In-Flight Mass</div>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-2xl font-mono font-bold text-slate-100 tabular-nums">
                  {currentMass.toFixed(2)}
                </span>
                <span className="text-xs font-mono text-slate-400">kg</span>
              </div>
              <div className="flex items-center gap-1 mt-1 text-[10px] font-mono text-slate-400">
                <span>Baseline:</span>
                <span className="text-slate-200 font-semibold">{crew.baselineMassKg.toFixed(1)} kg</span>
              </div>
            </div>

            {/* Mass Delta vs Launch */}
            <div className="p-2.5 rounded bg-slate-900/80 border border-slate-800">
              <div className="text-[10px] font-mono text-slate-400 uppercase">Mass Variance (Δ)</div>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className={`text-2xl font-mono font-bold tabular-nums ${
                  massDeltaKg < -1.5 ? 'text-amber-400' : 'text-slate-100'
                }`}>
                  {massDeltaKg > 0 ? `+${massDeltaKg.toFixed(2)}` : massDeltaKg.toFixed(2)}
                </span>
                <span className="text-xs font-mono text-slate-400">kg</span>
              </div>
              <div className="flex items-center gap-1 mt-1 text-[10px] font-mono">
                <ArrowDownRight className="w-3 h-3 text-amber-400" />
                <span className="text-amber-300">
                  {((massDeltaKg / crew.baselineMassKg) * 100).toFixed(1)}% launch variance
                </span>
              </div>
            </div>
          </div>

          {/* Microgravity Adaptive Breakdown */}
          <div className="bg-[#050811] p-2.5 rounded-lg border border-slate-800 text-[10px] font-mono">
            <div className="flex justify-between items-center text-slate-400 pb-1.5 border-b border-slate-800/60">
              <span>ESTIMATED COMPONENT SHIFT</span>
              <span className="text-blue-400 font-semibold">T = 2π√(m/k) · {calculatedFreq} Hz</span>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Cephalic Fluid Shift Loss:</span>
                <span className="text-slate-200 font-semibold tabular-nums">~{fluidLossEst} kg</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Lean Musculoskeletal Loss:</span>
                <span className={`font-semibold tabular-nums ${
                  Number(muscleLossEst) > 0.8 ? 'text-amber-400' : 'text-emerald-400'
                }`}>
                  ~{muscleLossEst} kg
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
