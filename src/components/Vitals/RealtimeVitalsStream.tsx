import React, { useEffect, useRef } from 'react';
import { Activity, Heart, Thermometer, Wind, Radiation, ShieldCheck, AlertCircle } from 'lucide-react';
import { VitalsReading } from '../../types/dico';

interface RealtimeVitalsStreamProps {
  vitals: VitalsReading;
  crewName: string;
}

export const RealtimeVitalsStream: React.FC<RealtimeVitalsStreamProps> = ({
  vitals,
  crewName,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Dynamic continuous ECG line animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let xOffset = 0;
    const speed = 1.6;

    // Buffer to hold ECG points
    const width = canvas.width;
    const height = canvas.height;
    const points: number[] = new Array(width).fill(height / 2);

    let cycleStep = 0;

    const render = () => {
      // Advance step
      cycleStep += 1;
      const bpm = vitals.heartRate || 72;
      const cycleLength = Math.max(30, Math.round(3600 / bpm));

      const posInCycle = cycleStep % cycleLength;
      let sampleY = height / 2;

      // Realistic P-Q-R-S-T electro-cardiac waveform
      if (posInCycle === Math.round(cycleLength * 0.15)) {
        // P-wave (atrial depolarization)
        sampleY -= 5;
      } else if (posInCycle === Math.round(cycleLength * 0.28)) {
        // Q-drop
        sampleY += 4;
      } else if (posInCycle === Math.round(cycleLength * 0.31)) {
        // R-spike (ventricular depolarization)
        sampleY -= 32;
      } else if (posInCycle === Math.round(cycleLength * 0.34)) {
        // S-drop
        sampleY += 10;
      } else if (posInCycle === Math.round(cycleLength * 0.52)) {
        // T-wave (ventricular repolarization)
        sampleY -= 9;
      } else {
        // Baseline noise / microgravity slight drift
        sampleY += (Math.random() - 0.5) * 1.5;
      }

      // Shift buffer
      points.shift();
      points.push(sampleY);

      // Render onto canvas
      ctx.clearRect(0, 0, width, height);

      // Medical ECG millimeter background grid
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.08)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 15) {
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

      // Draw ECG trace
      ctx.strokeStyle = '#10B981'; // Phosphor green telemetry
      ctx.lineWidth = 2;
      ctx.shadowColor = '#10B981';
      ctx.shadowBlur = 6;
      ctx.beginPath();

      for (let i = 0; i < points.length; i++) {
        if (i === 0) ctx.moveTo(i, points[i]);
        else ctx.lineTo(i, points[i]);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Sweep head highlight
      const sweepX = points.length - 2;
      ctx.fillStyle = '#34D399';
      ctx.beginPath();
      ctx.arc(sweepX, points[sweepX], 3, 0, Math.PI * 2);
      ctx.fill();

      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animationId);
  }, [vitals.heartRate]);

  return (
    <div className="bg-[#0B0F19] rounded-xl border border-slate-800 p-4 shadow-lg flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-emerald-400" />
          <h3 className="text-xs font-mono font-semibold tracking-wider text-slate-200 uppercase">
            Continuous Physiological Telemetry Stream
          </h3>
        </div>
        <div className="flex items-center gap-2 font-mono text-[10px] text-slate-400">
          <span>MONITORING: <strong className="text-slate-200">{crewName}</strong></span>
          <span>·</span>
          <span className="text-emerald-400">LEAD II 500Hz</span>
        </div>
      </div>

      {/* ECG Live Waveform Monitor */}
      <div className="bg-[#040810] rounded-lg border border-slate-800 p-2 relative overflow-hidden">
        <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1 px-1">
          <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
            <Heart className="w-3 h-3 animate-pulse text-rose-500 fill-current" />
            <span>ECG LEAD-II TELEMETRY</span>
          </span>
          <span>GAIN: 10mm/mV · 25mm/s</span>
        </div>
        <canvas
          ref={canvasRef}
          width={600}
          height={85}
          className="w-full h-[85px] block rounded"
        />
      </div>

      {/* Telemetry Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {/* Heart Rate */}
        <div className="p-2.5 rounded bg-slate-900/80 border border-slate-800">
          <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
            <span>HEART RATE</span>
            <Heart className="w-3 h-3 text-rose-400" />
          </div>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-mono font-bold text-slate-100 tabular-nums">
              {vitals.heartRate}
            </span>
            <span className="text-xs font-mono text-slate-400">BPM</span>
          </div>
          <span className="text-[9px] font-mono text-emerald-400 block mt-0.5">
            {vitals.heartRate > 85 ? 'Tachycardia Drift' : 'Normal Sinus Rhythm'}
          </span>
        </div>

        {/* Blood Pressure & MAP */}
        <div className="p-2.5 rounded bg-slate-900/80 border border-slate-800">
          <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
            <span>BLOOD PRESSURE</span>
            <Activity className="w-3 h-3 text-cyan-400" />
          </div>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-mono font-bold text-slate-100 tabular-nums">
              {vitals.systolicBp}/{vitals.diastolicBp}
            </span>
            <span className="text-xs font-mono text-slate-400">mmHg</span>
          </div>
          <span className="text-[9px] font-mono text-slate-400 block mt-0.5">
            MAP: <strong className="text-cyan-300">{vitals.meanArterialPressure}</strong> mmHg
          </span>
        </div>

        {/* Respiration & Core Temp */}
        <div className="p-2.5 rounded bg-slate-900/80 border border-slate-800">
          <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
            <span>RESPIRATION & TEMP</span>
            <Wind className="w-3 h-3 text-blue-400" />
          </div>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-mono font-bold text-slate-100 tabular-nums">
              {vitals.respirationRate}
            </span>
            <span className="text-xs font-mono text-slate-400">RPM</span>
          </div>
          <span className="text-[9px] font-mono text-slate-400 block mt-0.5">
            Core: <strong className="text-slate-200">{vitals.coreTempC.toFixed(1)}°C</strong>
          </span>
        </div>

        {/* Space Radiation Dosimeter */}
        <div className="p-2.5 rounded bg-slate-900/80 border border-slate-800">
          <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
            <span>RADIATION FLUX</span>
            <Radiation className="w-3 h-3 text-amber-400" />
          </div>
          <div className="flex items-baseline gap-1 mt-1">
            <span className={`text-2xl font-mono font-bold tabular-nums ${
              vitals.dailyRadiationMsv > 1.0 ? 'text-amber-400' : 'text-slate-100'
            }`}>
              {vitals.dailyRadiationMsv.toFixed(2)}
            </span>
            <span className="text-xs font-mono text-slate-400">mSv/day</span>
          </div>
          <span className={`text-[9px] font-mono block mt-0.5 ${
            vitals.dailyRadiationMsv > 1.0 ? 'text-amber-400' : 'text-emerald-400'
          }`}>
            {vitals.dailyRadiationMsv > 1.0 ? '▲ SPE ELEVATED FLUX' : '● NOMINAL DOSIMETRY'}
          </span>
        </div>
      </div>
    </div>
  );
};
