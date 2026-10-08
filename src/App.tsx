import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { MedicalStationChamber } from './components/StationHardware/MedicalStationChamber';
import { RealtimeVitalsStream } from './components/Vitals/RealtimeVitalsStream';
import { NutritionIntelligenceEngine } from './components/Nutrition/NutritionIntelligenceEngine';
import { GroundTelemetryConsole } from './components/GroundControl/GroundTelemetryConsole';
import { MicroBloodPanel } from './components/Biomarkers/MicroBloodPanel';
import { FlightSurgeonReportModal } from './components/GroundControl/FlightSurgeonReportModal';
import { DICOAiAssistant } from './components/AIAdvisor/DICOAiAssistant';
import { JuryDemoModal } from './components/JuryDemoModal';
import { HealthHistory } from './components/HealthHistory/HealthHistory';
import { CREW_MEMBERS, INITIAL_PANTRY, SIMULATION_SCENARIOS, HISTORICAL_HEALTH_RECORDS, LONGITUDINAL_TRENDS } from './data/mockData';
import { AstronautProfile, VitalsReading, MicroBloodReading, FoodPantryItem, HealthHistoryRecord } from './types/dico';
import { Sparkles, Bot, AlertTriangle, Calendar, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [crewList, setCrewList] = useState<AstronautProfile[]>(CREW_MEMBERS);
  const [currentCrew, setCurrentCrew] = useState<AstronautProfile>(CREW_MEMBERS[0]);
  const [activeScenarioId, setActiveScenarioId] = useState<string>('scenario-nominal');
  const [pantry, setPantry] = useState<FoodPantryItem[]>(INITIAL_PANTRY);
  const [activeView, setActiveView] = useState<'CONSOLE' | 'HEALTH_HISTORY'>('CONSOLE');
  const [historyRecords, setHistoryRecords] = useState<HealthHistoryRecord[]>(HISTORICAL_HEALTH_RECORDS);
  const [snapshotToast, setSnapshotToast] = useState<string | null>(null);

  // Active scenario data
  const activeScenario = SIMULATION_SCENARIOS.find(s => s.id === activeScenarioId) || SIMULATION_SCENARIOS[0];

  // Dynamic telemetry state
  const [vitals, setVitals] = useState<VitalsReading>(activeScenario.vitals);
  const [blood, setBlood] = useState<MicroBloodReading>(activeScenario.blood);
  const [massDeltaKg, setMassDeltaKg] = useState<number>(activeScenario.massDeltaKg);

  // Modals state
  const [isBloodModalOpen, setIsBloodModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isJuryModalOpen, setIsJuryModalOpen] = useState(false);

  // Automated Diagnostic Cycle runner
  const [isAutoRunning, setIsAutoRunning] = useState(false);
  const [autoTriggerHardware, setAutoTriggerHardware] = useState(false);

  // When scenario changes, update local telemetry
  useEffect(() => {
    setVitals(activeScenario.vitals);
    setBlood(activeScenario.blood);
    setMassDeltaKg(activeScenario.massDeltaKg);
  }, [activeScenarioId]);

  // Automated Full Medical Cycle
  const handleRunAutoCheckup = () => {
    setIsAutoRunning(true);
    setAutoTriggerHardware(true);

    setTimeout(() => {
      setAutoTriggerHardware(false);
      setIsAutoRunning(false);
      // Auto-append checkup to health history
      handleSnapshotCurrentState();
    }, 4500);
  };

  // Snapshot current state as new health history record
  const handleSnapshotCurrentState = () => {
    const isCritical = vitals.dailyRadiationMsv > 1.0 || blood.bloodLactate > 3.0 || blood.dnaOxidativeStress8OHdG > 5.0;
    const isElevated = activeScenario.id !== 'scenario-nominal' || blood.ionizedCalcium > 1.33 || blood.hematocrit > 48.0;

    const newRecord: HealthHistoryRecord = {
      id: `hist-live-${Date.now()}`,
      astronautId: currentCrew.id,
      sol: currentCrew.missionDay,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) + ' UTC',
      earthDate: '2026-10-08',
      eventType: isCritical ? 'BIOMARKER_ALERT' : (isElevated ? 'MEDICAL_EVENT' : 'ROUTINE_CHECK'),
      title: `Sol ${currentCrew.missionDay}: ${activeScenario.title}`,
      summary: `Station telemetry logged: ${activeScenario.description}`,
      severity: isCritical ? 'CRITICAL' : (isElevated ? 'ELEVATED' : 'NOMINAL'),
      vitalsSnapshot: {
        heartRate: vitals.heartRate,
        bloodPressure: `${vitals.systolicBp}/${vitals.diastolicBp}`,
        spo2: vitals.spo2,
        meanArterialPressure: vitals.meanArterialPressure,
      },
      biomarkerHighlights: [
        {
          label: 'Ionized Ca2+',
          value: `${blood.ionizedCalcium.toFixed(2)} mmol/L`,
          trend: blood.ionizedCalcium > 1.33 ? 'UP' : 'STABLE',
          status: blood.ionizedCalcium > 1.33 ? 'ELEVATED' : 'NOMINAL',
        },
        {
          label: 'Blood Lactate',
          value: `${blood.bloodLactate.toFixed(1)} mmol/L`,
          trend: blood.bloodLactate > 2.2 ? 'UP' : 'DOWN',
          status: blood.bloodLactate > 2.2 ? 'WARNING' : 'NOMINAL',
        },
        {
          label: 'DNA 8-OHdG',
          value: `${blood.dnaOxidativeStress8OHdG.toFixed(1)} ng/mL`,
          trend: blood.dnaOxidativeStress8OHdG > 5.0 ? 'UP' : 'STABLE',
          status: blood.dnaOxidativeStress8OHdG > 5.0 ? 'WARNING' : 'NOMINAL',
        },
      ],
      dietaryAdjustment: {
        caloriesTarget: Math.round(10 * currentCrew.currentMassKg + 1720),
        prescribedPacks: [activeScenario.pantryPrescriptionFocus.split('+')[0]?.trim() || 'Balanced Flight Pack'],
        specialProtocols: activeScenario.pantryPrescriptionFocus,
        waterIntakeMl: blood.bloodLactate > 3.0 ? 3200 : (blood.ionizedCalcium > 1.33 ? 2800 : 2400),
      },
      flightSurgeonDisposition: activeScenario.flightSurgeonRecommendation,
      countermeasuresApplied: ['Diagnostic scan completed', 'Nutritional allocation logged'],
    };

    setHistoryRecords(prev => [newRecord, ...prev]);
    setSnapshotToast(`Logged to Sol ${currentCrew.missionDay} Health History Timeline`);
    setTimeout(() => setSnapshotToast(null), 3500);
  };

  // Pantry deduction handler
  const handleDispenseFood = (deductions: { itemId: string; count: number }[]) => {
    setPantry(prev =>
      prev.map(item => {
        const found = deductions.find(d => d.itemId === item.id);
        if (found) {
          return {
            ...item,
            stockUnits: Math.max(0, item.stockUnits - found.count),
          };
        }
        return item;
      })
    );

    // Also log a dietary adjustment event into health history
    const itemNames = deductions.map(d => {
      const p = pantry.find(i => i.id === d.itemId);
      return `${d.count}x ${p?.name || 'Ration'}`;
    });

    const dietaryLog: HealthHistoryRecord = {
      id: `hist-diet-${Date.now()}`,
      astronautId: currentCrew.id,
      sol: currentCrew.missionDay,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) + ' UTC',
      earthDate: '2026-10-08',
      eventType: 'DIETARY_ADJUSTMENT',
      title: `Sol ${currentCrew.missionDay}: Onboard Closed-Loop Dietary Ration Dispensed`,
      summary: `Automated nutritional allocation dispensed from habitat pantry: ${itemNames.join(', ')}.`,
      severity: 'NOMINAL',
      dietaryAdjustment: {
        caloriesTarget: Math.round(10 * currentCrew.currentMassKg + 1720),
        prescribedPacks: itemNames,
        specialProtocols: activeScenario.pantryPrescriptionFocus,
        waterIntakeMl: 2400,
      },
      flightSurgeonDisposition: 'Dietary intake logged to flight crew metabolic profile.',
    };

    setHistoryRecords(prev => [dietaryLog, ...prev]);
  };

  const trendPointsForCrew = LONGITUDINAL_TRENDS[currentCrew.id] || LONGITUDINAL_TRENDS['crew-1'];

  return (
    <div className="min-h-screen bg-[#06080F] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Header */}
      <Header
        currentCrew={currentCrew}
        crewList={crewList}
        onSelectCrew={setCurrentCrew}
        scenarios={SIMULATION_SCENARIOS}
        activeScenarioId={activeScenarioId}
        onSelectScenario={setActiveScenarioId}
        onOpenJuryModal={() => setIsJuryModalOpen(true)}
        onRunAutoCheckup={handleRunAutoCheckup}
        isAutoRunning={isAutoRunning}
        activeView={activeView}
        onChangeView={setActiveView}
      />

      {/* Snapshot Toast Confirmation */}
      {snapshotToast && (
        <div className="fixed top-20 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-950/90 border border-cyan-400 text-cyan-200 font-mono text-xs shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200">
          <CheckCircle2 className="w-4 h-4 text-cyan-400" />
          <span>{snapshotToast}</span>
          <button
            onClick={() => setActiveView('HEALTH_HISTORY')}
            className="ml-2 text-white underline hover:text-cyan-300 font-semibold"
          >
            View History →
          </button>
        </div>
      )}

      {/* Main Console Workspace */}
      <main className="flex-1 max-w-[1720px] w-full mx-auto px-4 lg:px-8 py-5 flex flex-col gap-5">
        {/* Scenario Alert Kicker Banner (if elevated or anomaly) */}
        {activeScenario.id !== 'scenario-nominal' && (
          <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/40 flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2 text-amber-300">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                <strong>SIMULATED EVENT:</strong> {activeScenario.title} ({activeScenario.kicker}) · {activeScenario.description}
              </span>
            </div>
            <div className="flex items-center gap-3 shrink-0 ml-3">
              <button
                onClick={handleSnapshotCurrentState}
                className="text-[11px] text-amber-300 hover:text-amber-100 underline font-semibold"
              >
                Snapshot to History Log
              </button>
              <button
                onClick={() => setIsAiModalOpen(true)}
                className="text-[11px] text-cyan-300 hover:text-cyan-100 underline font-semibold"
              >
                Analyze in DICO AI →
              </button>
            </div>
          </div>
        )}

        {/* VIEW 1: HEALTH HISTORY VIEW */}
        {activeView === 'HEALTH_HISTORY' ? (
          <HealthHistory
            crew={currentCrew}
            historyRecords={historyRecords}
            trendPoints={trendPointsForCrew}
            currentVitals={vitals}
            currentBlood={blood}
            activeScenarioTitle={activeScenario.title}
            onSnapshotCurrentState={handleSnapshotCurrentState}
          />
        ) : (
          /* VIEW 2: LIVE MEDICAL STATION CONSOLE */
          <div className="flex flex-col gap-5">
            {/* 2-Column Desktop Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
              {/* LEFT SECTION (Col 7): Conceptual Station + 3 Hardware Bays + Nutrition Engine */}
              <div className="lg:col-span-7 flex flex-col gap-5">
                {/* 3D-styled Station Chamber with 3 bays: Finger, Mass, Micro-Blood */}
                <MedicalStationChamber
                  crew={currentCrew}
                  vitals={vitals}
                  blood={blood}
                  massDeltaKg={massDeltaKg}
                  onOpenBloodModal={() => setIsBloodModalOpen(true)}
                  externalTriggerAll={autoTriggerHardware}
                />

                {/* Nutrition Intelligence Engine */}
                <NutritionIntelligenceEngine
                  crew={currentCrew}
                  blood={blood}
                  vitals={vitals}
                  pantry={pantry}
                  onDispenseFood={handleDispenseFood}
                  onOpenConsultAI={() => setIsAiModalOpen(true)}
                />
              </div>

              {/* RIGHT SECTION (Col 5): Vitals Stream, Ground Telemetry, AI Consultation */}
              <div className="lg:col-span-5 flex flex-col gap-5">
                {/* Continuous Physiological Telemetry Stream & ECG */}
                <RealtimeVitalsStream
                  vitals={vitals}
                  crewName={currentCrew.name}
                />

                {/* Ground Medical Control & Telemetry Downlink */}
                <GroundTelemetryConsole
                  crew={currentCrew}
                  vitals={vitals}
                  blood={blood}
                  activeScenario={activeScenario}
                  onOpenReportModal={() => setIsReportModalOpen(true)}
                />

                {/* Quick Longitudinal Health History Navigation Banner */}
                <div className="bg-[#0B0F19] rounded-xl border border-slate-800 p-3.5 shadow-lg flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-cyan-950/80 border border-cyan-500/30 text-cyan-400">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-mono font-bold text-white">
                        Longitudinal Health &amp; Dietary History
                      </div>
                      <p className="text-[11px] font-mono text-slate-400">
                        {historyRecords.filter(r => r.astronautId === currentCrew.id).length} recorded medical events &amp; nutrition logs across Sols 0-142.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveView('HEALTH_HISTORY')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-950/60 hover:bg-cyan-900/70 border border-cyan-500/40 text-cyan-200 font-mono text-xs transition-colors whitespace-nowrap"
                  >
                    <span>View Trends</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Quick AI Clinical Advisor Card */}
                <div className="bg-[#0B0F19] rounded-xl border border-slate-800 p-4 shadow-lg flex flex-col justify-between gap-3">
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                    <div className="flex items-center gap-2">
                      <Bot className="w-4 h-4 text-cyan-400" />
                      <h3 className="text-xs font-mono font-semibold tracking-wider text-slate-200 uppercase">
                        DICO Onboard Clinical AI Engine
                      </h3>
                    </div>
                    <span className="text-[10px] font-mono text-cyan-400">
                      AUTONOMOUS DECISION SUPPORT
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 font-mono leading-relaxed">
                    Autonomous bioastronautics agent correlates live PPG waveforms, microgravity mass loss, and microfluidic blood biomarkers to synthesize dietary prescriptions and deep-space countermeasures without requiring instant Earth communication.
                  </p>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => setIsAiModalOpen(true)}
                      className="w-full py-2 px-3 rounded-lg bg-gradient-to-r from-cyan-600/30 to-blue-600/30 hover:from-cyan-600/50 hover:to-blue-600/50 border border-cyan-500/40 text-cyan-200 font-mono text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-[0_0_12px_rgba(6,182,212,0.2)]"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                      <span>Open DICO Clinical AI Consultation</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer: Quiet, unboxed metadata adhering to anti-slop rules */}
      <footer className="border-t border-slate-800/80 bg-[#070A12] px-4 lg:px-8 py-3 text-[11px] font-mono text-slate-500 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span>DICO SYSTEM</span>
          <span aria-hidden="true">·</span>
          <span>Deep-space Integrated Crew Observatory</span>
          <span aria-hidden="true">·</span>
          <span>Simulation Environment</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-amber-400/80">SIMULATED DATA · RESEARCH PROTOTYPE</span>
          <span aria-hidden="true">·</span>
          <span>DSN Carrier 8.4 GHz Lock</span>
        </div>
      </footer>

      {/* Modals */}
      <MicroBloodPanel
        blood={blood}
        isOpen={isBloodModalOpen}
        onClose={() => setIsBloodModalOpen(false)}
      />

      <FlightSurgeonReportModal
        crew={currentCrew}
        vitals={vitals}
        blood={blood}
        scenario={activeScenario}
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
      />

      <DICOAiAssistant
        crew={currentCrew}
        vitals={vitals}
        blood={blood}
        activeScenario={activeScenario}
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
      />

      <JuryDemoModal
        isOpen={isJuryModalOpen}
        onClose={() => setIsJuryModalOpen(false)}
        onSelectScenario={setActiveScenarioId}
      />
    </div>
  );
}

