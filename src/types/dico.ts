export type CrewMemberId = 'crew-1' | 'crew-2' | 'crew-3';

export interface AstronautProfile {
  id: CrewMemberId;
  name: string;
  callsign: string;
  role: string;
  age: number;
  avatarUrl: string;
  missionDay: number;
  baselineMassKg: number;
  currentMassKg: number;
  bloodType: string;
  radiationCumulativeMsv: number;
  status: 'NOMINAL' | 'ELEVATED' | 'CRITICAL';
  specialization: string;
  medicalNotes: string;
}

export interface VitalsReading {
  heartRate: number; // bpm
  spo2: number; // %
  systolicBp: number; // mmHg
  diastolicBp: number; // mmHg
  meanArterialPressure: number; // mmHg
  respirationRate: number; // rpm
  coreTempC: number; // Celsius
  hrvSdnn: number; // ms
  perfusionIndex: number; // %
  vascularElasticity: number; // 0-100 index
  stressIndex: number; // 0-100 index
  dailyRadiationMsv: number; // mSv/day
}

export interface MicroBloodReading {
  hemoglobin: number; // g/dL (normal: 13.8 - 17.2)
  hematocrit: number; // % (normal: 41 - 50)
  ionizedCalcium: number; // mmol/L (normal: 1.15 - 1.33)
  sodium: number; // mmol/L (normal: 135 - 145)
  potassium: number; // mmol/L (normal: 3.5 - 5.1)
  bloodGlucose: number; // mg/dL (normal: 70 - 100)
  bloodLactate: number; // mmol/L (normal: 0.5 - 2.2)
  serumCortisol: number; // nmol/L (normal: 140 - 550)
  dnaOxidativeStress8OHdG: number; // ng/mL (normal: < 5.0)
  bloodOsmolarity: number; // mOsm/kg (normal: 275 - 295)
}

export interface MassReading {
  measuredMassKg: number;
  baselineMassKg: number;
  deltaKg: number;
  harmonicFreqHz: number;
  springConstantNm: number;
  estimatedMuscleLossKg: number;
  fluidShiftFractionPct: number;
  lastMeasuredTimestamp: string;
}

export interface FoodPantryItem {
  id: string;
  name: string;
  code: string;
  category: 'REHYDRATABLE' | 'ALGAL_BIOACTIVE' | 'ELECTROLYTE' | 'ANTIOXIDANT' | 'BONE_DENSITY';
  stockUnits: number;
  caloriesPerUnit: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
  sodiumMg: number;
  potassiumMg: number;
  calciumMg: number;
  activeNutrients: string;
  spaceflightRationale: string;
}

export interface PrescribedRation {
  item: FoodPantryItem;
  quantityUnits: number;
  specificIndication: string;
}

export interface DietaryPrescription {
  id: string;
  astronautId: CrewMemberId;
  timestamp: string;
  totalCalories: number;
  rations: PrescribedRation[];
  waterIntakeMl: number;
  sodiumRestrictionMg: number;
  clinicalRationale: string;
  exerciseCountermeasureMin: number;
}

export interface TelemetryPacket {
  packetId: string;
  timestamp: string;
  astronautId: CrewMemberId;
  astronautName: string;
  uplinkFrequencyGhz: number;
  latencySeconds: number;
  packetHash: string;
  vitalsSummary: string;
  bloodSummary: string;
  nutritionSummary: string;
  groundStatus: 'TRANSMITTING' | 'RECEIVED' | 'REVIEWED_BY_FLIGHT_SURGEON';
  flightSurgeonNote?: string;
  severity: 'NOMINAL' | 'ELEVATED' | 'CRITICAL';
}

export interface SimulationScenario {
  id: string;
  title: string;
  kicker: string;
  description: string;
  physiologicalEvent: string;
  vitals: VitalsReading;
  blood: MicroBloodReading;
  massDeltaKg: number;
  pantryPrescriptionFocus: string;
  flightSurgeonRecommendation: string;
}

export type HealthEventType = 'MEDICAL_EVENT' | 'DIETARY_ADJUSTMENT' | 'BIOMARKER_ALERT' | 'EVA_OPERATION' | 'ROUTINE_CHECK';

export interface HealthHistoryRecord {
  id: string;
  astronautId: CrewMemberId;
  sol: number; // Mission Sol day
  timestamp: string;
  earthDate: string;
  eventType: HealthEventType;
  title: string;
  summary: string;
  severity: 'NOMINAL' | 'ELEVATED' | 'CRITICAL';
  vitalsSnapshot?: {
    heartRate: number;
    bloodPressure: string;
    spo2: number;
    meanArterialPressure: number;
  };
  biomarkerHighlights?: {
    label: string;
    value: string;
    trend: 'UP' | 'DOWN' | 'STABLE';
    status: 'NOMINAL' | 'ELEVATED' | 'WARNING';
  }[];
  dietaryAdjustment?: {
    caloriesTarget: number;
    prescribedPacks: string[];
    specialProtocols: string;
    waterIntakeMl: number;
  };
  flightSurgeonDisposition?: string;
  countermeasuresApplied?: string[];
}

export interface LongitudinalTrendPoint {
  sol: number;
  massKg: number;
  calciumMmol: number;
  lactateMmol: number;
  radiationMsvCumulative: number;
  heartRate: number;
  stressIndex: number;
}

