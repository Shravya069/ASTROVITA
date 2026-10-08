import React, { useState, useMemo } from 'react';
import { 
  Calendar, 
  Search, 
  Filter, 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Utensils, 
  Activity, 
  AlertTriangle, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  PlusCircle, 
  FileDown, 
  Clock, 
  ShieldCheck, 
  Flame, 
  Scale, 
  Dna, 
  Radiation,
  UserCheck
} from 'lucide-react';
import { 
  AstronautProfile, 
  HealthHistoryRecord, 
  HealthEventType, 
  LongitudinalTrendPoint,
  VitalsReading,
  MicroBloodReading
} from '../../types/dico';

interface HealthHistoryProps {
  crew: AstronautProfile;
  historyRecords: HealthHistoryRecord[];
  trendPoints: LongitudinalTrendPoint[];
  currentVitals: VitalsReading;
  currentBlood: MicroBloodReading;
  activeScenarioTitle: string;
  onSnapshotCurrentState: () => void;
}

export const HealthHistory: React.FC<HealthHistoryProps> = ({
  crew,
  historyRecords,
  trendPoints,
  currentVitals,
  currentBlood,
  activeScenarioTitle,
  onSnapshotCurrentState,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'ALL' | HealthEventType>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedRecordId, setExpandedRecordId] = useState<string | null>(null);
  const [selectedMetric, setSelectedMetric] = useState<'mass' | 'calcium' | 'radiation' | 'lactate'>('mass');

  // Filter records by selected astronaut, category, and search query
  const filteredRecords = useMemo(() => {
    return historyRecords
      .filter((rec) => rec.astronautId === crew.id)
      .filter((rec) => {
        if (selectedFilter === 'ALL') return true;
        return rec.eventType === selectedFilter;
      })
      .filter((rec) => {
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase();
        return (
          rec.title.toLowerCase().includes(q) ||
          rec.summary.toLowerCase().includes(q) ||
          `sol ${rec.sol}`.toLowerCase().includes(q) ||
          rec.dietaryAdjustment?.prescribedPacks.some(p => p.toLowerCase().includes(q)) ||
          rec.flightSurgeonDisposition?.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => b.sol - a.sol); // Most recent sol first
  }, [historyRecords, crew.id, selectedFilter, searchQuery]);

  const toggleExpand = (id: string) => {
    setExpandedRecordId(prev => (prev === id ? null : id));
  };

  // Export longitudinal record log as JSON file
  const handleExportHistory = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(filteredRecords, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `DICO_HEALTH_HISTORY_${crew.callsign}_SOL142.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Sparkline builder for trend metrics
  const renderTrendSvg = () => {
    if (!trendPoints || trendPoints.length === 0) return null;
    const width = 640;
    const height = 110;
    const padding = 28;

    let values: { sol: number; val: number }[] = [];
    let unit = '';
    let normalMin = 0;
    let normalMax = 0;

    if (selectedMetric === 'mass') {
      values = trendPoints.map(p => ({ sol: p.sol, val: p.massKg }));
      unit = 'kg';
      normalMin = crew.baselineMassKg - 2.5;
      normalMax = crew.baselineMassKg + 0.5;
    } else if (selectedMetric === 'calcium') {
      values = trendPoints.map(p => ({ sol: p.sol, val: p.calciumMmol }));
      unit = 'mmol/L';
      normalMin = 1.15;
      normalMax = 1.33;
    } else if (selectedMetric === 'radiation') {
      values = trendPoints.map(p => ({ sol: p.sol, val: p.radiationMsvCumulative }));
      unit = 'mSv';
      normalMin = 0;
      normalMax = 50;
    } else {
      values = trendPoints.map(p => ({ sol: p.sol, val: p.lactateMmol }));
      unit = 'mmol/L';
      normalMin = 0.5;
      normalMax = 2.2;
    }

    const minVal = Math.min(...values.map(v => v.val), normalMin) * 0.96;
    const maxVal = Math.max(...values.map(v => v.val), normalMax) * 1.04;
    const maxSol = 142;

    const getX = (sol: number) => padding + (sol / maxSol) * (width - padding * 2);
    const getY = (val: number) => height - padding - ((val - minVal) / (maxVal - minVal)) * (height - padding * 2);

    const pathData = values
      .map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${getX(p.sol)} ${getY(p.val)}`)
      .join(' ');

    const normalY1 = getY(normalMax);
    const normalY2 = getY(normalMin);

    return (
      <div className="relative bg-[#050811] rounded-xl border border-slate-800 p-3 overflow-hidden">
        <div className="flex items-center justify-between text-xs font-mono mb-2">
          <div className="flex items-center gap-2">
            <span className="text-slate-400">LONGITUDINAL TELEMETRY TRAJECTORY:</span>
            <span className="text-cyan-300 font-semibold uppercase">
              {selectedMetric === 'mass' ? 'Inertial Body Mass (SLAMMD)' :
               selectedMetric === 'calcium' ? 'Bone Ionized Calcium Turnover' :
               selectedMetric === 'radiation' ? 'Cumulative Cosmic Radiation Dose' :
               'Systemic Lactate Clearance'}
            </span>
          </div>
          <span className="text-slate-500 text-[10px]">
            Sol 0 → Sol 142 (Translunar Cruise)
          </span>
        </div>

        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-28 block overflow-visible">
          {/* Subtle grid lines */}
          <line x1={padding} y1={padding} x2={width - padding} y2={padding} stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
          <line x1={padding} y1={height / 2} x2={width - padding} y2={height / 2} stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
          <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />

          {/* Normal Reference Band */}
          {normalMin > 0 && (
            <rect
              x={padding}
              y={Math.min(normalY1, normalY2)}
              width={width - padding * 2}
              height={Math.abs(normalY2 - normalY1)}
              fill="rgba(16, 185, 129, 0.06)"
              stroke="rgba(16, 185, 129, 0.15)"
              strokeDasharray="2 2"
            />
          )}

          {/* Trend Line */}
          <path
            d={pathData}
            fill="none"
            stroke="#06B6D4"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data Points */}
          {values.map((p, idx) => {
            const cx = getX(p.sol);
            const cy = getY(p.val);
            const isLatest = idx === values.length - 1;
            return (
              <g key={idx} className="group cursor-pointer">
                <circle
                  cx={cx}
                  cy={cy}
                  r={isLatest ? 4.5 : 3}
                  className={`${isLatest ? 'fill-cyan-300 stroke-cyan-500' : 'fill-slate-900 stroke-cyan-400'} stroke-2 hover:r-5 transition-all`}
                />
                <title>{`Sol ${p.sol}: ${p.val.toFixed(2)} ${unit}`}</title>
              </g>
            );
          })}
        </svg>

        <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 mt-1 px-2">
          <span>Sol 0 (Launch Baseline)</span>
          <span className="text-emerald-400">Green Band: Target Physiological Envelope</span>
          <span>Sol 142 (Current Cruise)</span>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-[#0B0F19] rounded-2xl border border-slate-800 p-4 lg:p-6 shadow-xl flex flex-col gap-5">
      {/* Header & Sub-discipline */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-cyan-400" />
            <h2 className="text-base sm:text-lg font-bold font-display text-white tracking-wider">
              LONGITUDINAL CREW HEALTH HISTORY & DIETARY LOG
            </h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/30 text-cyan-300">
              SOL 0 - 142
            </span>
          </div>
          <p className="text-xs font-mono text-slate-400 mt-0.5">
            Subject: <strong className="text-slate-200">{crew.name}</strong> ({crew.callsign}) · 
            Tracking chronobiological adaptation, microgravity bone turnover, and closed-loop dietary interventions.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onSnapshotCurrentState}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-950/60 hover:bg-cyan-900/70 border border-cyan-500/40 text-cyan-200 font-mono text-xs transition-colors"
            title="Append current simulator measurements to health history log"
          >
            <PlusCircle className="w-3.5 h-3.5 text-cyan-400" />
            <span>Log Current Checkup</span>
          </button>

          <button
            onClick={handleExportHistory}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-mono text-xs transition-colors"
            title="Download longitudinal telemetry log in JSON format"
          >
            <FileDown className="w-3.5 h-3.5 text-cyan-400" />
            <span>Export Log</span>
          </button>
        </div>
      </div>

      {/* 4 Interactive Metric Selector Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
        <button
          onClick={() => setSelectedMetric('mass')}
          className={`p-3 rounded-xl border text-left transition-all ${
            selectedMetric === 'mass'
              ? 'bg-cyan-950/40 border-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.2)]'
              : 'bg-slate-900/60 hover:bg-slate-900 border-slate-800'
          }`}
        >
          <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
            <span>INERTIAL MASS</span>
            <Scale className="w-3.5 h-3.5 text-cyan-400" />
          </div>
          <div className="text-lg font-mono font-bold text-white mt-1 tabular-nums">
            {crew.currentMassKg.toFixed(1)} <span className="text-xs font-normal text-slate-400">kg</span>
          </div>
          <div className="text-[10px] font-mono text-amber-400 mt-0.5">
            Δ {(crew.currentMassKg - crew.baselineMassKg).toFixed(1)} kg from launch
          </div>
        </button>

        <button
          onClick={() => setSelectedMetric('calcium')}
          className={`p-3 rounded-xl border text-left transition-all ${
            selectedMetric === 'calcium'
              ? 'bg-cyan-950/40 border-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.2)]'
              : 'bg-slate-900/60 hover:bg-slate-900 border-slate-800'
          }`}
        >
          <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
            <span>BONE CA2+ TURNOVER</span>
            <Dna className="w-3.5 h-3.5 text-blue-400" />
          </div>
          <div className="text-lg font-mono font-bold text-white mt-1 tabular-nums">
            {currentBlood.ionizedCalcium.toFixed(2)} <span className="text-xs font-normal text-slate-400">mmol/L</span>
          </div>
          <div className="text-[10px] font-mono text-emerald-400 mt-0.5">
            Normal: 1.15 - 1.33 mmol/L
          </div>
        </button>

        <button
          onClick={() => setSelectedMetric('radiation')}
          className={`p-3 rounded-xl border text-left transition-all ${
            selectedMetric === 'radiation'
              ? 'bg-cyan-950/40 border-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.2)]'
              : 'bg-slate-900/60 hover:bg-slate-900 border-slate-800'
          }`}
        >
          <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
            <span>CUMULATIVE DOSIMETRY</span>
            <Radiation className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="text-lg font-mono font-bold text-white mt-1 tabular-nums">
            {crew.radiationCumulativeMsv.toFixed(1)} <span className="text-xs font-normal text-slate-400">mSv</span>
          </div>
          <div className="text-[10px] font-mono text-slate-400 mt-0.5">
            Mission Career Cap: 600 mSv
          </div>
        </button>

        <button
          onClick={() => setSelectedMetric('lactate')}
          className={`p-3 rounded-xl border text-left transition-all ${
            selectedMetric === 'lactate'
              ? 'bg-cyan-950/40 border-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.2)]'
              : 'bg-slate-900/60 hover:bg-slate-900 border-slate-800'
          }`}
        >
          <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
            <span>BLOOD LACTATE</span>
            <Activity className="w-3.5 h-3.5 text-rose-400" />
          </div>
          <div className="text-lg font-mono font-bold text-white mt-1 tabular-nums">
            {currentBlood.bloodLactate.toFixed(1)} <span className="text-xs font-normal text-slate-400">mmol/L</span>
          </div>
          <div className="text-[10px] font-mono text-slate-400 mt-0.5">
            Resting baseline: &lt; 2.2 mmol/L
          </div>
        </button>
      </div>

      {/* Sparkline Visualizer */}
      {renderTrendSvg()}

      {/* Search and Category Filters Row */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        {/* Category Segmented Buttons */}
        <div className="flex flex-wrap items-center gap-1 bg-[#060912] p-1 rounded-xl border border-slate-800">
          {(['ALL', 'MEDICAL_EVENT', 'DIETARY_ADJUSTMENT', 'BIOMARKER_ALERT', 'EVA_OPERATION', 'ROUTINE_CHECK'] as const).map((cat) => {
            const isSelected = selectedFilter === cat;
            const labels: Record<string, string> = {
              ALL: 'All Records',
              MEDICAL_EVENT: 'Medical Events',
              DIETARY_ADJUSTMENT: 'Dietary Adjustments',
              BIOMARKER_ALERT: 'Biomarker Alerts',
              EVA_OPERATION: 'EVA Operations',
              ROUTINE_CHECK: 'Routine Checks'
            };
            return (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-medium transition-all ${
                  isSelected
                    ? 'bg-cyan-600/30 text-cyan-200 border border-cyan-500/50 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
                }`}
              >
                {labels[cat]}
              </button>
            );
          })}
        </div>

        {/* Search input */}
        <div className="relative min-w-[220px]">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Sol, symptoms, packs..."
            className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-[#060912] border border-slate-800 focus:border-cyan-500 text-xs font-mono text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/40"
          />
        </div>
      </div>

      {/* Scrollable Longitudinal Event & Dietary Log */}
      <div className="flex flex-col gap-3 max-h-[560px] overflow-y-auto pr-1">
        {filteredRecords.length === 0 ? (
          <div className="p-8 text-center rounded-xl bg-slate-900/40 border border-slate-800 text-xs font-mono text-slate-500">
            No health history records match the selected filter or search query.
          </div>
        ) : (
          filteredRecords.map((record) => {
            const isExpanded = expandedRecordId === record.id;
            const isCritical = record.severity === 'CRITICAL';
            const isElevated = record.severity === 'ELEVATED';

            return (
              <div
                key={record.id}
                className={`rounded-xl border transition-all overflow-hidden ${
                  isCritical
                    ? 'bg-rose-950/20 border-rose-500/40 hover:border-rose-500/60'
                    : isElevated
                    ? 'bg-amber-950/20 border-amber-500/40 hover:border-amber-500/60'
                    : 'bg-[#070A14] border-slate-800/90 hover:border-slate-700'
                }`}
              >
                {/* Header bar of record */}
                <div
                  onClick={() => toggleExpand(record.id)}
                  className="p-3.5 cursor-pointer flex flex-wrap items-center justify-between gap-3 select-none"
                >
                  <div className="flex items-center gap-3">
                    {/* Sol badge */}
                    <div className="flex flex-col items-center justify-center w-12 h-12 rounded-lg bg-slate-900 border border-slate-800 shrink-0">
                      <span className="text-[9px] font-mono text-cyan-400">SOL</span>
                      <span className="text-base font-bold font-mono text-white tabular-nums leading-none">
                        {record.sol}
                      </span>
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-semibold text-white">
                          {record.title}
                        </h4>
                        <span className={`text-[9px] font-mono px-2 py-0.5 rounded ${
                          record.eventType === 'EVA_OPERATION' ? 'bg-purple-950 text-purple-300 border border-purple-500/40' :
                          record.eventType === 'BIOMARKER_ALERT' ? 'bg-rose-950 text-rose-300 border border-rose-500/40' :
                          record.eventType === 'DIETARY_ADJUSTMENT' ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/40' :
                          record.eventType === 'MEDICAL_EVENT' ? 'bg-amber-950 text-amber-300 border border-amber-500/40' :
                          'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                        }`}>
                          {record.eventType.replace('_', ' ')}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400 mt-1">
                        <span>{record.earthDate} · {record.timestamp}</span>
                        <span>·</span>
                        <span className="line-clamp-1 max-w-[420px] text-slate-300">
                          {record.summary}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {record.dietaryAdjustment && (
                      <div className="hidden sm:flex items-center gap-1 text-[11px] font-mono text-cyan-300 px-2 py-1 rounded bg-cyan-950/40 border border-cyan-500/30">
                        <Utensils className="w-3 h-3 text-cyan-400" />
                        <span>{record.dietaryAdjustment.caloriesTarget} kcal Rx</span>
                      </div>
                    )}

                    <button
                      className="p-1 rounded text-slate-400 hover:text-white"
                      aria-label="Toggle details"
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Expanded Detailed Inspection Drawer */}
                {isExpanded && (
                  <div className="p-4 border-t border-slate-800/80 bg-[#050710] space-y-3.5 text-xs font-mono">
                    {/* Full Summary */}
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-1">
                        CLINICAL PROGRESS NOTE:
                      </span>
                      <p className="text-slate-200 leading-relaxed">
                        {record.summary}
                      </p>
                    </div>

                    {/* Vitals & Biomarkers Snapshot */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {record.vitalsSnapshot && (
                        <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                          <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider block mb-1.5 flex items-center gap-1">
                            <Activity className="w-3.5 h-3.5" />
                            <span>Vitals Telemetry Snapshot</span>
                          </span>
                          <div className="grid grid-cols-2 gap-2 text-[11px]">
                            <div>Heart Rate: <strong className="text-white">{record.vitalsSnapshot.heartRate} bpm</strong></div>
                            <div>Blood Pressure: <strong className="text-white">{record.vitalsSnapshot.bloodPressure} mmHg</strong></div>
                            <div>SpO2: <strong className="text-white">{record.vitalsSnapshot.spo2}%</strong></div>
                            <div>MAP: <strong className="text-cyan-300">{record.vitalsSnapshot.meanArterialPressure} mmHg</strong></div>
                          </div>
                        </div>
                      )}

                      {record.biomarkerHighlights && (
                        <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                          <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider block mb-1.5 flex items-center gap-1">
                            <Dna className="w-3.5 h-3.5" />
                            <span>Biomarker Deviations</span>
                          </span>
                          <div className="space-y-1">
                            {record.biomarkerHighlights.map((bio, bIdx) => (
                              <div key={bIdx} className="flex items-center justify-between text-[11px]">
                                <span className="text-slate-400">{bio.label}:</span>
                                <div className="flex items-center gap-1.5">
                                  <strong className={`${
                                    bio.status === 'WARNING' ? 'text-rose-400' :
                                    bio.status === 'ELEVATED' ? 'text-amber-400' : 'text-slate-200'
                                  }`}>
                                    {bio.value}
                                  </strong>
                                  {bio.trend === 'UP' && <TrendingUp className="w-3 h-3 text-rose-400" />}
                                  {bio.trend === 'DOWN' && <TrendingDown className="w-3 h-3 text-emerald-400" />}
                                  {bio.trend === 'STABLE' && <Minus className="w-3 h-3 text-slate-500" />}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Dietary Adjustment & Ration Dispensation */}
                    {record.dietaryAdjustment && (
                      <div className="p-3 rounded-lg bg-slate-900/60 border border-cyan-500/30">
                        <span className="text-[10px] text-cyan-300 font-bold uppercase tracking-wider block mb-1.5 flex items-center gap-1">
                          <Utensils className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Targeted Dietary Countermeasure Allocation</span>
                        </span>
                        <div className="text-[11px] text-slate-300 space-y-1">
                          <div>
                            Target Caloric Ceiling: <strong className="text-white">{record.dietaryAdjustment.caloriesTarget} kcal/day</strong> · 
                            Hydration Target: <strong className="text-cyan-300">{record.dietaryAdjustment.waterIntakeMl} mL</strong>
                          </div>
                          <div className="pt-1">
                            <span className="text-slate-400">Prescribed Closed-Loop Pantry Packs:</span>
                            <div className="flex flex-wrap gap-1.5 mt-1">
                              {record.dietaryAdjustment.prescribedPacks.map((pack, pIdx) => (
                                <span
                                  key={pIdx}
                                  className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-200 text-[10px]"
                                >
                                  {pack}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="pt-1 text-slate-400">
                            Protocol: <span className="text-slate-200">{record.dietaryAdjustment.specialProtocols}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Countermeasures & Flight Surgeon Signoff */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800 text-[10px] text-slate-400">
                      {record.countermeasuresApplied && (
                        <div>
                          <span>Active Countermeasures:</span>{' '}
                          <span className="text-slate-300">{record.countermeasuresApplied.join(' · ')}</span>
                        </div>
                      )}
                      {record.flightSurgeonDisposition && (
                        <div className="flex items-center gap-1 text-emerald-400">
                          <UserCheck className="w-3 h-3" />
                          <span>Flight Surgeon: {record.flightSurgeonDisposition}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
