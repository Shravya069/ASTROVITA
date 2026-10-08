import React from 'react';
import { X, Dna, FlaskConical, AlertTriangle, CheckCircle2, Info } from 'lucide-react';
import { MicroBloodReading } from '../../types/dico';

interface MicroBloodPanelProps {
  blood: MicroBloodReading;
  isOpen: boolean;
  onClose: () => void;
}

interface BiomarkerItem {
  id: string;
  name: string;
  value: number;
  unit: string;
  minNormal: number;
  maxNormal: number;
  lowAlarm?: number;
  highAlarm?: number;
  spaceflightRelevance: string;
}

export const MicroBloodPanel: React.FC<MicroBloodPanelProps> = ({
  blood,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const markers: BiomarkerItem[] = [
    {
      id: 'hgb',
      name: 'Hemoglobin (Hb)',
      value: blood.hemoglobin,
      unit: 'g/dL',
      minNormal: 13.8,
      maxNormal: 17.2,
      spaceflightRelevance: 'Monitors spaceflight hemolytic anemia caused by rapid destruction of newly formed erythrocytes in microgravity.'
    },
    {
      id: 'hct',
      name: 'Hematocrit (Hct)',
      value: blood.hematocrit,
      unit: '%',
      minNormal: 41.0,
      maxNormal: 50.0,
      spaceflightRelevance: 'Key index of cephalic fluid shift and relative hemoconcentration due to plasma volume reduction.'
    },
    {
      id: 'ca',
      name: 'Ionized Calcium (Ca2+)',
      value: blood.ionizedCalcium,
      unit: 'mmol/L',
      minNormal: 1.15,
      maxNormal: 1.33,
      spaceflightRelevance: 'Elevations directly indicate osteoclast-mediated bone demineralization and heightened risk of nephrolithiasis.'
    },
    {
      id: 'na',
      name: 'Serum Sodium (Na+)',
      value: blood.sodium,
      unit: 'mmol/L',
      minNormal: 135.0,
      maxNormal: 145.0,
      spaceflightRelevance: 'Regulates extracellular osmotic volume; hypernatremia exacerbates intracranial pressure in SANS.'
    },
    {
      id: 'k',
      name: 'Serum Potassium (K+)',
      value: blood.potassium,
      unit: 'mmol/L',
      minNormal: 3.5,
      maxNormal: 5.1,
      spaceflightRelevance: 'Critical for cardiac repolarization stability and muscle contractile endurance during resistance routines.'
    },
    {
      id: 'glu',
      name: 'Blood Glucose',
      value: blood.bloodGlucose,
      unit: 'mg/dL',
      minNormal: 70.0,
      maxNormal: 100.0,
      spaceflightRelevance: 'Assesses metabolic glucose tolerance, which can become impaired during prolonged spaceflight.'
    },
    {
      id: 'lac',
      name: 'Blood Lactate',
      value: blood.bloodLactate,
      unit: 'mmol/L',
      minNormal: 0.5,
      maxNormal: 2.2,
      spaceflightRelevance: 'Index of systemic anaerobic metabolism, muscle exhaustion, and post-EVA recovery kinetics.'
    },
    {
      id: 'cort',
      name: 'Serum Cortisol',
      value: blood.serumCortisol,
      unit: 'nmol/L',
      minNormal: 140.0,
      maxNormal: 550.0,
      spaceflightRelevance: 'Biomarker of autonomic stress, circadian misalignment, and deep-space mission operational strain.'
    },
    {
      id: 'dna',
      name: '8-OHdG Oxidative DNA Marker',
      value: blood.dnaOxidativeStress8OHdG,
      unit: 'ng/mL',
      minNormal: 0.5,
      maxNormal: 5.0,
      spaceflightRelevance: 'Direct molecular marker of genomic oxidative damage from galactic cosmic rays and solar radiation flux.'
    },
    {
      id: 'osm',
      name: 'Plasma Osmolarity',
      value: blood.bloodOsmolarity,
      unit: 'mOsm/kg',
      minNormal: 275.0,
      maxNormal: 295.0,
      spaceflightRelevance: 'Essential for dosing targeted rehydration electrolytes and preventing cellular swelling or dehydration.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-[#090D17] border border-cyan-500/40 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#060911]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-rose-950/60 border border-rose-500/40 text-rose-300">
              <FlaskConical className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold font-display text-slate-100 tracking-wider">
                MICRO-BLOOD BIOCHEMICAL TELEMETRY PANEL
              </h2>
              <p className="text-xs font-mono text-cyan-400">
                50 µL Capillary Lab-On-A-Chip Spectrophotometric Assay · Sol 142
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

        {/* Disclaimer */}
        <div className="px-6 py-2 bg-amber-950/20 border-b border-amber-500/20 text-amber-300 text-xs font-mono flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400" />
          <span>RESEARCH SIMULATION PROTOCOL: Values represent simulated aerospace biomarkers for flight engineering demonstrations.</span>
        </div>

        {/* Markers Grid */}
        <div className="p-6 overflow-y-auto space-y-3">
          {markers.map((item) => {
            const isElevated = item.value > item.maxNormal;
            const isDepleted = item.value < item.minNormal;
            const isNominal = !isElevated && !isDepleted;

            // Normalized progress bar calculation
            const span = (item.maxNormal - item.minNormal) * 2;
            const normalizedPct = Math.max(
              5,
              Math.min(95, ((item.value - (item.minNormal - span * 0.25)) / span) * 100)
            );

            return (
              <div
                key={item.id}
                className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/30 transition-all flex flex-col md:flex-row md:items-center justify-between gap-3"
              >
                {/* Left info */}
                <div className="md:w-1/3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-slate-200">
                      {item.name}
                    </span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                      isNominal 
                        ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/30' 
                        : isElevated 
                          ? 'bg-rose-950/60 text-rose-300 border border-rose-500/30' 
                          : 'bg-amber-950/60 text-amber-300 border border-amber-500/30'
                    }`}>
                      {isNominal ? 'NOMINAL' : isElevated ? '▲ ELEVATED' : '▼ DEFICIT'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                    {item.spaceflightRelevance}
                  </p>
                </div>

                {/* Center Gauge Meter */}
                <div className="md:w-1/3 flex flex-col gap-1">
                  <div className="flex justify-between text-[10px] font-mono text-slate-400">
                    <span>Range: {item.minNormal} - {item.maxNormal} {item.unit}</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-slate-950 border border-slate-800 relative overflow-hidden">
                    {/* Normal middle zone visual marker */}
                    <div className="absolute inset-y-0 left-[25%] right-[25%] bg-emerald-500/10 border-x border-emerald-500/20" />
                    
                    {/* Value indicator marker */}
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isNominal 
                          ? 'bg-emerald-500' 
                          : isElevated 
                            ? 'bg-rose-500' 
                            : 'bg-amber-500'
                      }`}
                      style={{ width: `${normalizedPct}%` }}
                    />
                  </div>
                </div>

                {/* Right Value */}
                <div className="md:w-1/4 text-right flex md:flex-col justify-between items-end">
                  <div className="flex items-baseline gap-1">
                    <span className={`text-xl font-mono font-bold tabular-nums ${
                      isNominal ? 'text-slate-100' : isElevated ? 'text-rose-400' : 'text-amber-400'
                    }`}>
                      {item.value}
                    </span>
                    <span className="text-xs font-mono text-slate-400">{item.unit}</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">
                    Deviation: {item.value > item.maxNormal ? `+${(item.value - item.maxNormal).toFixed(2)}` : (item.value < item.minNormal ? `${(item.value - item.minNormal).toFixed(2)}` : '0.00')}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-[#060911] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-xs transition-colors"
          >
            Close Laboratory Viewer
          </button>
        </div>
      </div>
    </div>
  );
};
