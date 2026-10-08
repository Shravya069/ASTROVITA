import React from 'react';
import { X, Printer, ShieldCheck, Download, AlertTriangle, FileText, CheckCircle2 } from 'lucide-react';
import { AstronautProfile, VitalsReading, MicroBloodReading, SimulationScenario } from '../../types/dico';

interface FlightSurgeonReportProps {
  crew: AstronautProfile;
  vitals: VitalsReading;
  blood: MicroBloodReading;
  scenario: SimulationScenario;
  isOpen: boolean;
  onClose: () => void;
}

export const FlightSurgeonReportModal: React.FC<FlightSurgeonReportProps> = ({
  crew,
  vitals,
  blood,
  scenario,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="bg-[#0A0E1A] border border-cyan-500/40 rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden print:m-0 print:border-none print:shadow-none">
        {/* Top Action Bar (hidden when printing) */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-slate-800 bg-[#060912] print:hidden">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-300">
            <FileText className="w-4 h-4 text-cyan-400" />
            <span>OFFICIAL BIOASTRONAUTICS TELEMETRY DOSSIER</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-xs transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Export PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Official Medical Dossier */}
        <div className="p-8 overflow-y-auto space-y-6 text-slate-200 font-mono text-xs bg-[#080B14]">
          {/* Document Header */}
          <div className="border-b-2 border-cyan-500/60 pb-4 flex justify-between items-start">
            <div>
              <div className="text-[11px] text-cyan-400 tracking-widest uppercase">
                DEEP-SPACE INTEGRATED CREW OBSERVATORY (DICO)
              </div>
              <h1 className="text-xl font-bold font-display text-white tracking-wide mt-1">
                ASTRONAUT HEALTH & BIOCHEMICAL TELEMETRY REPORT
              </h1>
              <div className="text-[10px] text-slate-400 mt-1">
                MISSION: SIMULATION ORION-04 · HABITAT TRANSLUNAR CRUISE · SOL 142
              </div>
            </div>

            <div className="text-right">
              <div className="text-[10px] text-amber-400 border border-amber-500/40 px-2 py-1 rounded bg-amber-950/30 font-bold uppercase">
                SIMULATED DATA · RESEARCH PROTOTYPE
              </div>
              <div className="text-[10px] text-slate-400 mt-1">
                PACKET ID: DICO-TX-2026-90412
              </div>
              <div className="text-[10px] text-slate-400">
                DATE: 2026-10-07 14:32 UTC
              </div>
            </div>
          </div>

          {/* Section 1: Crew Identification */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-3.5 rounded-lg bg-slate-900/60 border border-slate-800">
            <div>
              <span className="text-slate-400 block text-[10px]">ASTRONAUT NAME</span>
              <strong className="text-white text-sm">{crew.name}</strong>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">CALLSIGN / ROLE</span>
              <span className="text-cyan-300 font-semibold">{crew.callsign} · {crew.role}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">AGE / BLOOD GROUP</span>
              <span className="text-slate-200">{crew.age} YRS · {crew.bloodType}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">MASS (BASELINE vs IN-FLIGHT)</span>
              <span className="text-slate-200">{crew.baselineMassKg} kg → {(crew.baselineMassKg + scenario.massDeltaKg).toFixed(1)} kg ({scenario.massDeltaKg} kg)</span>
            </div>
          </div>

          {/* Section 2: Physiological Telemetry Stream */}
          <div>
            <h2 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2">
              1. Continuous Cardiovascular & Vital Telemetry
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-2.5 rounded bg-slate-900/40 border border-slate-800">
                <span className="text-slate-400 text-[10px] block">HEART RATE</span>
                <span className="text-base font-bold text-white">{vitals.heartRate} BPM</span>
                <span className="text-[10px] text-slate-400 block">HRV SDNN: {vitals.hrvSdnn}ms</span>
              </div>
              <div className="p-2.5 rounded bg-slate-900/40 border border-slate-800">
                <span className="text-slate-400 text-[10px] block">BLOOD PRESSURE</span>
                <span className="text-base font-bold text-white">{vitals.systolicBp}/{vitals.diastolicBp} mmHg</span>
                <span className="text-[10px] text-cyan-400 block">MAP: {vitals.meanArterialPressure} mmHg</span>
              </div>
              <div className="p-2.5 rounded bg-slate-900/40 border border-slate-800">
                <span className="text-slate-400 text-[10px] block">OXYGEN SATURATION</span>
                <span className="text-base font-bold text-white">{vitals.spo2} %</span>
                <span className="text-[10px] text-slate-400 block">Perfusion: {vitals.perfusionIndex.toFixed(1)}%</span>
              </div>
              <div className="p-2.5 rounded bg-slate-900/40 border border-slate-800">
                <span className="text-slate-400 text-[10px] block">COSMIC RADIATION DOSIMETER</span>
                <span className="text-base font-bold text-white">{vitals.dailyRadiationMsv} mSv/d</span>
                <span className="text-[10px] text-slate-400 block">Cumulative: {crew.radiationCumulativeMsv} mSv</span>
              </div>
            </div>
          </div>

          {/* Section 3: Microfluidic Blood Panel */}
          <div>
            <h2 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2">
              2. Micro-Blood 50 µL Capillary Assay Results
            </h2>
            <div className="border border-slate-800 rounded-lg overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-slate-900/90 text-slate-400 text-[10px]">
                  <tr>
                    <th className="p-2">BIOMARKER</th>
                    <th className="p-2">MEASURED VALUE</th>
                    <th className="p-2">NORMAL RANGE</th>
                    <th className="p-2">STATUS EVALUATION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  <tr>
                    <td className="p-2 font-semibold">Hemoglobin (Hb)</td>
                    <td className="p-2">{blood.hemoglobin} g/dL</td>
                    <td className="p-2 text-slate-400">13.8 - 17.2 g/dL</td>
                    <td className="p-2 text-emerald-400">NOMINAL</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-semibold">Hematocrit (Hct)</td>
                    <td className="p-2">{blood.hematocrit} %</td>
                    <td className="p-2 text-slate-400">41.0 - 50.0 %</td>
                    <td className="p-2 text-slate-300">Fluid Shift Monitored</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-semibold">Ionized Calcium (Ca2+)</td>
                    <td className="p-2">{blood.ionizedCalcium} mmol/L</td>
                    <td className="p-2 text-slate-400">1.15 - 1.33 mmol/L</td>
                    <td className={`p-2 font-semibold ${blood.ionizedCalcium > 1.33 ? 'text-amber-400' : 'text-emerald-400'}`}>
                      {blood.ionizedCalcium > 1.33 ? 'ELEVATED (BONE RESORPTION)' : 'NOMINAL'}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 font-semibold">Blood Lactate</td>
                    <td className="p-2">{blood.bloodLactate} mmol/L</td>
                    <td className="p-2 text-slate-400">0.5 - 2.2 mmol/L</td>
                    <td className={`p-2 font-semibold ${blood.bloodLactate > 2.2 ? 'text-rose-400' : 'text-emerald-400'}`}>
                      {blood.bloodLactate > 2.2 ? 'ELEVATED (ANAEROBIC FATIGUE)' : 'NOMINAL'}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 font-semibold">DNA 8-OHdG Oxidative Marker</td>
                    <td className="p-2">{blood.dnaOxidativeStress8OHdG} ng/mL</td>
                    <td className="p-2 text-slate-400">&lt; 5.0 ng/mL</td>
                    <td className={`p-2 font-semibold ${blood.dnaOxidativeStress8OHdG > 5.0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                      {blood.dnaOxidativeStress8OHdG > 5.0 ? 'ELEVATED (COSMIC RADIATION ROS)' : 'NOMINAL'}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 font-semibold">Electrolytes (Na+ / K+)</td>
                    <td className="p-2">{blood.sodium} / {blood.potassium} mmol/L</td>
                    <td className="p-2 text-slate-400">135-145 / 3.5-5.1 mmol/L</td>
                    <td className="p-2 text-emerald-400">BALANCED</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 4: Nutrition & Ground Flight Surgeon Directive */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800">
              <span className="text-cyan-400 font-bold block mb-1">
                ONBOARD NUTRITION COUNTERMEASURE:
              </span>
              <p className="text-slate-300 leading-relaxed">
                {scenario.pantryPrescriptionFocus}
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800">
              <span className="text-emerald-400 font-bold block mb-1">
                GROUND FLIGHT SURGEON DISPOSITION:
              </span>
              <p className="text-slate-300 leading-relaxed">
                {scenario.flightSurgeonRecommendation}
              </p>
              <div className="mt-3 pt-2 border-t border-slate-800 flex justify-between items-center text-[10px] text-slate-400">
                <span>SIGN-OFF: Dr. A. Joshi, Chief Flight Surgeon</span>
                <span className="text-emerald-400">AUTHENTICATED DSN-CRYPTO</span>
              </div>
            </div>
          </div>

          {/* Legal / Engineering Simulator Disclaimer */}
          <div className="text-[10px] text-slate-500 border-t border-slate-800 pt-3 text-center">
            NOTICE: DICO is a research and engineering simulator designed for evaluating automated bioastronautics algorithms in deep space habitats. All telemetry feeds and laboratory indices are synthetic simulated data. Not for terrestrial clinical medical diagnosis.
          </div>
        </div>
      </div>
    </div>
  );
};
