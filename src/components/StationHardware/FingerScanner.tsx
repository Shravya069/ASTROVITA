import React, { useState, useEffect, useRef } from 'react';
import { Fingerprint, CheckCircle2, RefreshCw } from 'lucide-react';
import { VitalsReading } from '../../types/dico';

interface FingerScannerProps {
  vitals: VitalsReading;
  onScanComplete?: (scannedVitals: Partial<VitalsReading>) => void;
  externalTrigger?: boolean;
}

export const FingerScanner: React.FC<FingerScannerProps> = ({
  vitals,
  onScanComplete,
  externalTrigger,
}) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(100);
  const [hasScanned, setHasScanned] = useState(true);
  const [pulsePhase, setPulsePhase] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Trigger scan when externalTrigger fires
  useEffect(() => {
    if (externalTrigger && !isScanning) {
      handleStartScan();
    }
  }, [externalTrigger]);

  const handleStartScan = () => {
    setIsScanning(true);
    setScanProgress(0);
    setHasScanned(false);

    let progress = 0;
    const interval = setInterval(() => {
      progress += 4;
      setScanProgress(Math.min(progress, 100));
      if (progress >= 100) {
        clearInterval(interval);
        setIsScanning(false);
        setHasScanned(true);
        if (onScanComplete) {
          onScanComplete({
            spo2: vitals.spo2,
            heartRate: vitals.heartRate,
            perfusionIndex: vitals.perfusionIndex,
            hrvSdnn: vitals.hrvSdnn,
            vascularElasticity: vitals.vascularElasticity,
            stressIndex: vitals.stressIndex,
          });
        }
      }
    }, 120);
  };

  // Continuous PPG pulse wave rendering
  useEffect(() => {
    let animationFrameId: number;
    let t = 0;

    const renderWave = () => {
      t += 0.08;
      setPulsePhase(t);

      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          const width = canvas.width;
          const height = canvas.height;
          ctx.clearRect(0, 0, width, height);

          // Draw grid lines
          ctx.strokeStyle = 'rgba(56, 189, 248, 0.08)';
          ctx.lineWidth = 1;
          for (let x = 0; x < width; x += 20) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
          }
          for (let y = 0; y < height; y += 15) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
          }

          // Draw simulated Photoplethysmography (PPG) arterial pulse wave
          ctx.strokeStyle = isScanning ? '#06B6D4' : '#38BDF8';
          ctx.lineWidth = 2;
          ctx.shadowColor = '#06B6D4';
          ctx.shadowBlur = isScanning ? 8 : 4;
          ctx.beginPath();

          const points = 120;
          for (let i = 0; i < points; i++) {
            const x = (i / points) * width;
            // Synthetic PPG wave formula: systolic peak + dicrotic notch
            const phase = (i * 0.15 - t) % (Math.PI * 2);
            const systolic = Math.sin(phase) * 0.5 + 0.5;
            const dicrotic = Math.sin(phase * 2.5) * 0.2;
            const rawVal = Math.pow(systolic, 3) + dicrotic * (systolic > 0.4 ? 1 : 0);
            
            const amplitude = isScanning ? 24 : 18;
            const y = height / 2 - rawVal * amplitude + 10;

            if (i === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }
          ctx.stroke();
          ctx.shadowBlur = 0;
        }
      }

      animationFrameId = requestAnimationFrame(renderWave);
    };

    renderWave();
    return () => cancelAnimationFrame(animationFrameId);
  }, [isScanning]);

  return (
    <div className="bg-[#0B0F19] rounded-xl border border-slate-800/90 p-4 relative overflow-hidden flex flex-col justify-between shadow-lg">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-slate-800/70 pb-2 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <h3 className="text-xs font-mono font-semibold tracking-wider text-slate-200 uppercase">
            01. Optical Finger Sensor Bay
          </h3>
        </div>
        <span className="text-[10px] font-mono text-cyan-400/90">
          PPG · 660nm / 940nm DUAL EMITTER
        </span>
      </div>

      {/* Main scanner interactable unit */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* Physical Scanner Pad */}
        <div className="md:col-span-5 flex flex-col items-center justify-center p-3 rounded-lg bg-[#070A12] border border-slate-800/80 relative">
          <div
            onClick={!isScanning ? handleStartScan : undefined}
            className={`w-28 h-36 rounded-2xl border-2 cursor-pointer transition-all flex flex-col items-center justify-center p-2 relative select-none ${
              isScanning
                ? 'border-cyan-400 bg-cyan-950/30 shadow-[0_0_25px_rgba(6,182,212,0.4)]'
                : 'border-slate-700 hover:border-cyan-500/70 bg-slate-900/60 hover:bg-slate-900/90'
            }`}
          >
            {/* Animated Laser Scan Bar */}
            {isScanning && (
              <div 
                className="absolute left-2 right-2 h-0.5 bg-cyan-300 shadow-[0_0_10px_#22d3ee] pointer-events-none transition-all duration-75"
                style={{ top: `${scanProgress}%` }}
              />
            )}

            {/* Glowing biometric contact target */}
            <div className={`w-16 h-20 rounded-xl border border-dashed flex items-center justify-center transition-all ${
              isScanning 
                ? 'border-cyan-400/80 bg-cyan-500/10' 
                : 'border-slate-600/70 bg-slate-800/30'
            }`}>
              <Fingerprint 
                className={`w-10 h-10 transition-colors ${
                  isScanning 
                    ? 'text-cyan-300 animate-pulse' 
                    : hasScanned 
                      ? 'text-emerald-400' 
                      : 'text-slate-500'
                }`} 
              />
            </div>

            <div className="mt-2 text-center">
              <span className="text-[10px] font-mono tracking-wide text-slate-300 uppercase block">
                {isScanning ? 'Acquiring PPG Pulse...' : 'Place Finger / Tap'}
              </span>
              <span className="text-[9px] font-mono text-cyan-400/80 block">
                {isScanning ? `${scanProgress}%` : 'Capacitive Active'}
              </span>
            </div>
          </div>

          <button
            onClick={handleStartScan}
            disabled={isScanning}
            className="mt-2.5 w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded text-[11px] font-mono bg-cyan-950/60 hover:bg-cyan-900/70 border border-cyan-500/40 text-cyan-200 transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-3 h-3 ${isScanning ? 'animate-spin' : ''}`} />
            <span>{isScanning ? 'Scanning Photons...' : 'Initiate Optical Scan'}</span>
          </button>
        </div>

        {/* Live PPG Arterial Wave & Metrics */}
        <div className="md:col-span-7 flex flex-col gap-2.5">
          {/* Waveform monitor */}
          <div className="bg-[#050811] p-2 rounded-lg border border-slate-800/80 relative">
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1">
              <span>ARTERIAL PULSE WAVE (LEAD PPG)</span>
              <span className="text-cyan-400">
                {isScanning ? 'SAMPLING 250 Hz' : 'CONTINUOUS BUFFER'}
              </span>
            </div>
            <canvas
              ref={canvasRef}
              width={320}
              height={70}
              className="w-full h-[70px] rounded block"
            />
          </div>

          {/* Metric Telemetry Grid */}
          <div className="grid grid-cols-3 gap-2 text-left">
            <div className="p-2 rounded bg-slate-900/80 border border-slate-800">
              <div className="text-[10px] font-mono text-slate-400 uppercase">SpO2 Level</div>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-xl font-mono font-semibold text-slate-100 tabular-nums">
                  {vitals.spo2}
                </span>
                <span className="text-[10px] font-mono text-slate-400">%</span>
              </div>
              <span className="text-[9px] font-mono text-emerald-400">
                {vitals.spo2 >= 95 ? '● OPTIMAL' : '▲ HYPOXIC RISK'}
              </span>
            </div>

            <div className="p-2 rounded bg-slate-900/80 border border-slate-800">
              <div className="text-[10px] font-mono text-slate-400 uppercase">Pulse Rate</div>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-xl font-mono font-semibold text-slate-100 tabular-nums">
                  {vitals.heartRate}
                </span>
                <span className="text-[10px] font-mono text-slate-400">bpm</span>
              </div>
              <span className="text-[9px] font-mono text-slate-400">
                HRV SDNN: {vitals.hrvSdnn}ms
              </span>
            </div>

            <div className="p-2 rounded bg-slate-900/80 border border-slate-800">
              <div className="text-[10px] font-mono text-slate-400 uppercase">Perfusion (PI)</div>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-xl font-mono font-semibold text-slate-100 tabular-nums">
                  {vitals.perfusionIndex.toFixed(1)}
                </span>
                <span className="text-[10px] font-mono text-slate-400">%</span>
              </div>
              <span className="text-[9px] font-mono text-cyan-400">
                Elasticity: {vitals.vascularElasticity}/100
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
