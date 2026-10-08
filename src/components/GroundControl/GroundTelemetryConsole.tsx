import React, { useState } from 'react';
import { 
  Radio, 
  Send, 
  CheckCircle2, 
  FileText, 
  ShieldAlert, 
  Clock, 
  UserCheck, 
  ExternalLink,
  Printer
} from 'lucide-react';
import { TelemetryPacket, AstronautProfile, VitalsReading, MicroBloodReading, SimulationScenario } from '../../types/dico';

interface GroundTelemetryProps {
  crew: AstronautProfile;
  vitals: VitalsReading;
  blood: MicroBloodReading;
  activeScenario: SimulationScenario;
  onOpenReportModal: () => void;
}

export const GroundTelemetryConsole: React.FC<GroundTelemetryProps> = ({
  crew,
  vitals,
  blood,
  activeScenario,
  onOpenReportModal,
}) => {
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [transmissionProgress, setTransmissionProgress] = useState(100);
  const [lastTransmittedTime, setLastTransmittedTime] = useState('14:28:12 UTC');
  const [packetCount, setPacketCount] = useState(482);

  const handleTransmit = () => {
    setIsTransmitting(true);
    setTransmissionProgress(0);

    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setTransmissionProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setIsTransmitting(false);
        setPacketCount(prev => prev + 1);
        setLastTransmittedTime(new Date().toLocaleTimeString() + ' UTC');
      }
    }, 248); // Represents 2.48s simulated delay
  };

  const isCritical = blood.dnaOxidativeStress8OHdG > 5.0 || blood.bloodLactate > 3.0 || blood.ionizedCalcium > 1.35;

  return (
    <div className="bg-[#0B0F19] rounded-xl border border-slate-800 p-4 shadow-lg flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
        <div className="flex items-center gap-2">
          <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
          <h3 className="text-xs font-mono font-semibold tracking-wider text-slate-200 uppercase">
            Spacecraft ↔ Ground Medical Control Downlink
          </h3>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-mono text-cyan-400">
          <span>DSN CARRIER: 8.412 GHz LOCK</span>
          <span>·</span>
          <span>RTT: 2.48s</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
        {/* Telemetry packet transmission status */}
        <div className="md:col-span-7 bg-[#060912] p-3 rounded-lg border border-slate-800/90 flex flex-col gap-2">
          <div className="flex items-center justify-between text-[11px] font-mono">
            <span className="text-slate-400">TELEMETRY PACKET #{packetCount}</span>
            <span className={`px-2 py-0.5 rounded text-[10px] ${
              isCritical
                ? 'bg-rose-950/80 text-rose-300 border border-rose-500/40'
                : 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40'
            }`}>
              {isCritical ? 'ALERT DISPATCH ACTIVE' : 'NOMINAL DOWNLINK'}
            </span>
          </div>

          {/* Simulated progress bar during transmission */}
          {isTransmitting && (
            <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden border border-slate-800">
              <div 
                className="bg-cyan-400 h-full transition-all duration-200"
                style={{ width: `${transmissionProgress}%` }}
              />
            </div>
          )}

          <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-slate-400 pt-1">
            <div>
              <span>Subject:</span> <strong className="text-slate-200">{crew.name}</strong>
            </div>
            <div>
              <span>Last Ack:</span> <strong className="text-slate-200">{lastTransmittedTime}</strong>
            </div>
            <div>
              <span>Latency:</span> <strong className="text-cyan-300">1.24s One-Way (2.48s RTT)</strong>
            </div>
            <div>
              <span>Ground Station:</span> <strong className="text-slate-200">Goldstone DSN-14</strong>
            </div>
          </div>
        </div>

        {/* Flight Surgeon Directive & Action */}
        <div className="md:col-span-5 flex flex-col gap-2">
          <div className="bg-[#060912] p-2.5 rounded-lg border border-slate-800 text-[10px] font-mono">
            <div className="flex items-center gap-1.5 text-slate-300 font-semibold mb-1">
              <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>FLIGHT SURGEON DIRECTIVE:</span>
            </div>
            <p className="text-slate-400 line-clamp-2 leading-tight">
              {activeScenario.flightSurgeonRecommendation}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleTransmit}
              disabled={isTransmitting}
              className="flex-1 py-1.5 px-3 rounded bg-cyan-950/60 hover:bg-cyan-900/70 border border-cyan-500/40 text-cyan-200 font-mono text-xs flex items-center justify-center gap-1.5 transition-all disabled:opacity-50"
            >
              <Send className={`w-3.5 h-3.5 ${isTransmitting ? 'animate-bounce' : ''}`} />
              <span>{isTransmitting ? 'Downlinking Packet...' : 'Transmit Telemetry'}</span>
            </button>

            <button
              onClick={onOpenReportModal}
              className="py-1.5 px-3 rounded bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-mono text-xs flex items-center gap-1.5 transition-colors"
              title="Open full flight surgeon medical telemetry report"
            >
              <FileText className="w-3.5 h-3.5 text-cyan-400" />
              <span>Medical Report</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
