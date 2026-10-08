import React, { useState } from 'react';
import { 
  Activity, 
  Layers, 
  Eye, 
  CheckCircle2, 
  Sparkles,
  Maximize2
} from 'lucide-react';
import { FingerScanner } from './FingerScanner';
import { MassOscillationPlatform } from './MassOscillationPlatform';
import { MicroBloodLab } from './MicroBloodLab';
import { AstronautProfile, VitalsReading, MicroBloodReading, MassReading } from '../../types/dico';

interface MedicalStationChamberProps {
  crew: AstronautProfile;
  vitals: VitalsReading;
  blood: MicroBloodReading;
  massDeltaKg: number;
  onOpenBloodModal: () => void;
  externalTriggerAll?: boolean;
}

export const MedicalStationChamber: React.FC<MedicalStationChamberProps> = ({
  crew,
  vitals,
  blood,
  massDeltaKg,
  onOpenBloodModal,
  externalTriggerAll,
}) => {
  const [activeTab, setActiveTab] = useState<'ALL' | 'FINGER' | 'MASS' | 'BLOOD'>('ALL');
  const [showStationRender, setShowStationRender] = useState(true);

  return (
    <div className="flex flex-col gap-3">
      {/* Station Visual Chamber Banner */}
      <div className="relative rounded-2xl overflow-hidden border border-cyan-500/30 bg-[#080C16] shadow-xl group">
        {/* Conceptual station rendering image */}
        {showStationRender && (
          <div className="relative h-44 sm:h-52 w-full overflow-hidden">
            <img
              src="/src/assets/images/dico_station_render_1791437637305.jpg"
              alt="DICO Medical Station Habitat Kiosk"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center filter brightness-90 contrast-110 group-hover:scale-102 transition-transform duration-700"
            />
            {/* Dark gradient overlay for HUD legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#080C16] via-[#080C16]/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#080C16]/90 via-transparent to-[#080C16]/80" />

            {/* Astronaut Profile Card In Station HUD */}
            <div className="absolute bottom-3 left-4 right-4 flex flex-wrap items-end justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl overflow-hidden border border-cyan-400/60 bg-slate-900 shadow-md">
                  {crew.avatarUrl ? (
                    <img
                      src={crew.avatarUrl}
                      alt={crew.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-cyan-950 text-cyan-300 font-bold font-display">
                      {crew.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-base sm:text-lg font-bold text-slate-100 font-display tracking-wide">
                      {crew.name}
                    </h2>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900/80 border border-slate-700 text-cyan-300">
                      {crew.callsign}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 font-mono">
                    {crew.role} · Sol {crew.missionDay}
                  </p>
                </div>
              </div>

              {/* Station Diagnostics Badge */}
              <div className="hidden sm:flex items-center gap-2 bg-[#070A12]/90 border border-slate-800 px-3 py-1.5 rounded-lg text-xs font-mono">
                <span className="text-slate-400">STATION BAY:</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  3 SENSORS LINKED
                </span>
              </div>
            </div>
          </div>
        )}

        {/* View Switcher Controls */}
        <div className="px-4 py-2 bg-[#060913] border-t border-slate-800 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-1.5 text-slate-400">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">HARDWARE SUBSYSTEMS:</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setActiveTab('ALL')}
              className={`px-2.5 py-1 rounded text-[11px] transition-colors ${
                activeTab === 'ALL'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All 3 Bays
            </button>
            <button
              onClick={() => setActiveTab('FINGER')}
              className={`px-2.5 py-1 rounded text-[11px] transition-colors ${
                activeTab === 'FINGER'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Finger Sensor
            </button>
            <button
              onClick={() => setActiveTab('MASS')}
              className={`px-2.5 py-1 rounded text-[11px] transition-colors ${
                activeTab === 'MASS'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Zero-G Mass
            </button>
            <button
              onClick={() => setActiveTab('BLOOD')}
              className={`px-2.5 py-1 rounded text-[11px] transition-colors ${
                activeTab === 'BLOOD'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Micro-Blood Chip
            </button>
          </div>
        </div>
      </div>

      {/* Hardware Subsystem Modules Container */}
      <div className="flex flex-col gap-3">
        {(activeTab === 'ALL' || activeTab === 'FINGER') && (
          <FingerScanner
            vitals={vitals}
            externalTrigger={externalTriggerAll}
          />
        )}

        {(activeTab === 'ALL' || activeTab === 'MASS') && (
          <MassOscillationPlatform
            crew={crew}
            massDeltaKg={massDeltaKg}
            externalTrigger={externalTriggerAll}
          />
        )}

        {(activeTab === 'ALL' || activeTab === 'BLOOD') && (
          <MicroBloodLab
            blood={blood}
            onOpenDetailedPanel={onOpenBloodModal}
            externalTrigger={externalTriggerAll}
          />
        )}
      </div>
    </div>
  );
};
