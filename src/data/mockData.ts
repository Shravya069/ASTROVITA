import { AstronautProfile, FoodPantryItem, SimulationScenario } from '../types/dico';

export const CREW_MEMBERS: AstronautProfile[] = [
  {
    id: 'crew-1',
    name: 'Dr. Elena Vance',
    callsign: 'ARES-LEAD',
    role: 'Commander & Aerospace Physician',
    age: 38,
    avatarUrl: '/src/assets/images/astronaut_elena_vance_1791437652566.jpg',
    missionDay: 142,
    baselineMassKg: 64.5,
    currentMassKg: 63.8,
    bloodType: 'O Rh-positive',
    radiationCumulativeMsv: 38.4,
    status: 'NOMINAL',
    specialization: 'Cardiovascular Physiology & EVA Systems',
    medicalNotes: 'Mild cephalic fluid redistribution noted on Day 120; well-adapted to microgravity ARED resistance regimen.'
  },
  {
    id: 'crew-2',
    name: 'Dr. Marcus Chen',
    callsign: 'ORION-TECH',
    role: 'Flight Engineer & Life Support Lead',
    age: 35,
    avatarUrl: '/src/assets/images/astronaut_marcus_chen_1791437666424.jpg',
    missionDay: 142,
    baselineMassKg: 74.0,
    currentMassKg: 72.4,
    bloodType: 'A Rh-positive',
    radiationCumulativeMsv: 41.2,
    status: 'ELEVATED',
    specialization: 'ECLSS Closed-Loop Systems & Avionics',
    medicalNotes: 'Completed 6.5 hr EVA repair on radiator loop yesterday. Post-activity muscle fatigue and electrolyte redistribution observed.'
  },
  {
    id: 'crew-3',
    name: 'Sarah Kim, Ph.D.',
    callsign: 'STELLAR-BIO',
    role: 'Mission Specialist & Astrobiologist',
    age: 32,
    avatarUrl: '', // Will use fallback UI
    missionDay: 142,
    baselineMassKg: 58.0,
    currentMassKg: 57.1,
    bloodType: 'B Rh-positive',
    radiationCumulativeMsv: 36.9,
    status: 'NOMINAL',
    specialization: 'Hydroponics & Cellular Radiobiology',
    medicalNotes: 'Participating in deep-space circadian lighting protocol; baseline calcium turnover within monitored range.'
  }
];

export const INITIAL_PANTRY: FoodPantryItem[] = [
  {
    id: 'pantry-1',
    name: 'Spirulina & Chlorella Bio-Wafers',
    code: 'BIO-ALG-04',
    category: 'ALGAL_BIOACTIVE',
    stockUnits: 48,
    caloriesPerUnit: 240,
    proteinG: 32,
    carbsG: 14,
    fatG: 4,
    sodiumMg: 120,
    potassiumMg: 680,
    calciumMg: 180,
    activeNutrients: 'Phycocyanin (450mg), Beta-Carotene, Chlorophyll-A',
    spaceflightRationale: 'Potent cellular antioxidant and free-radical scavenger to protect stem cell DNA against galactic cosmic radiation (GCR).'
  },
  {
    id: 'pantry-2',
    name: 'Calcium & Vit D3 Fortified Chia Puree',
    code: 'OST-MIN-12',
    category: 'BONE_DENSITY',
    stockUnits: 36,
    caloriesPerUnit: 310,
    proteinG: 12,
    carbsG: 38,
    fatG: 11,
    sodiumMg: 90,
    potassiumMg: 450,
    calciumMg: 850,
    activeNutrients: 'Chelated Calcium Bisglycinate, Vit D3 (2000 IU), Vit K2 (MK-7)',
    spaceflightRationale: 'Targeted countermeasure against osteoclast-driven bone demineralization and microgravity calcium leaching.'
  },
  {
    id: 'pantry-3',
    name: 'Potassium-Magnesium Rehydration Pouch',
    code: 'ELYT-HYD-07',
    category: 'ELECTROLYTE',
    stockUnits: 64,
    caloriesPerUnit: 65,
    proteinG: 0,
    carbsG: 16,
    fatG: 0,
    sodiumMg: 180,
    potassiumMg: 820,
    calciumMg: 40,
    activeNutrients: 'Potassium Citrate, Magnesium Glycinate, Trace Zinc & Selenium',
    spaceflightRationale: 'Corrects microgravity-induced cephalic hypovolemia and cardiac repolarization drift without excessive sodium loading.'
  },
  {
    id: 'pantry-4',
    name: 'Quinoa, Lentil & Smoked Salmon Mash',
    code: 'PRO-MEAL-01',
    category: 'REHYDRATABLE',
    stockUnits: 52,
    caloriesPerUnit: 580,
    proteinG: 44,
    carbsG: 62,
    fatG: 14,
    sodiumMg: 380,
    potassiumMg: 740,
    calciumMg: 120,
    activeNutrients: 'Complete Leucine-rich EAAs, Marine Omega-3 (EPA/DHA 1200mg)',
    spaceflightRationale: 'Stimulates muscle protein synthesis (MPS) to attenuate soleus and gastrocnemius microgravity atrophy.'
  },
  {
    id: 'pantry-5',
    name: 'Omega-3 Algal DHA/EPA Retinal Capsules',
    code: 'SANS-LIP-09',
    category: 'ALGAL_BIOACTIVE',
    stockUnits: 75,
    caloriesPerUnit: 90,
    proteinG: 2,
    carbsG: 0,
    fatG: 10,
    sodiumMg: 5,
    potassiumMg: 15,
    calciumMg: 5,
    activeNutrients: 'Docosahexaenoic Acid (DHA 800mg), Lutein, Zeaxanthin',
    spaceflightRationale: 'Protects optic nerve myelin sheath and microvascular perfusion against Spaceflight-Associated Neuro-ocular Syndrome (SANS).'
  },
  {
    id: 'pantry-6',
    name: 'Freeze-Dried Tart Cherry & Aronia Concentrate',
    code: 'ANTI-OX-15',
    category: 'ANTIOXIDANT',
    stockUnits: 42,
    caloriesPerUnit: 180,
    proteinG: 2,
    carbsG: 42,
    fatG: 1,
    sodiumMg: 20,
    potassiumMg: 510,
    calciumMg: 65,
    activeNutrients: 'Anthocyanins (800mg), Melatonin Precursors, Polyphenols',
    spaceflightRationale: 'Accelerates systemic lactate clearance, reduces exercise-induced muscle soreness, and promotes restorative slow-wave sleep in orbit.'
  },
  {
    id: 'pantry-7',
    name: 'Hydroponic Microgreens & Radish Crisp',
    code: 'FRESH-HYD-02',
    category: 'ANTIOXIDANT',
    stockUnits: 18,
    caloriesPerUnit: 85,
    proteinG: 4,
    carbsG: 15,
    fatG: 1,
    sodiumMg: 45,
    potassiumMg: 390,
    calciumMg: 95,
    activeNutrients: 'Bioactive Sulforaphane, Fresh Vit C (110mg), Folate',
    spaceflightRationale: 'Fresh onboard crop harvest stimulating endogenous Nrf2 antioxidant gene pathways.'
  },
  {
    id: 'pantry-8',
    name: 'Hypo-Osmolar Electrolyte Hydration Fluid',
    code: 'HYPO-H2O-03',
    category: 'ELECTROLYTE',
    stockUnits: 80,
    caloriesPerUnit: 30,
    proteinG: 0,
    carbsG: 7,
    fatG: 0,
    sodiumMg: 110,
    potassiumMg: 320,
    calciumMg: 20,
    activeNutrients: 'Balanced Osmolytes (240 mOsm/L), Citric Acid buffer',
    spaceflightRationale: 'Rapid cellular hydration without creating intracranial interstitial fluid pooling.'
  }
];

export const SIMULATION_SCENARIOS: SimulationScenario[] = [
  {
    id: 'scenario-nominal',
    title: 'Nominal Orbital Operations',
    kicker: 'Standard Baseline Routine',
    description: 'Physiological parameters within optimal deep-space flight envelope. Routine adaptation with balanced hydration and bone turnover.',
    physiologicalEvent: 'Stationary microgravity cruising state. Full circadian synchrony. Resistance exercise cycle completed 4 hours prior.',
    vitals: {
      heartRate: 68,
      spo2: 98,
      systolicBp: 118,
      diastolicBp: 76,
      meanArterialPressure: 90,
      respirationRate: 13,
      coreTempC: 36.8,
      hrvSdnn: 64,
      perfusionIndex: 4.8,
      vascularElasticity: 88,
      stressIndex: 22,
      dailyRadiationMsv: 0.38
    },
    blood: {
      hemoglobin: 14.9,
      hematocrit: 44.5,
      ionizedCalcium: 1.22,
      sodium: 139,
      potassium: 4.2,
      bloodGlucose: 88,
      bloodLactate: 1.1,
      serumCortisol: 280,
      dnaOxidativeStress8OHdG: 2.4,
      bloodOsmolarity: 286
    },
    massDeltaKg: -0.7,
    pantryPrescriptionFocus: 'Balanced macronutrient maintenance with standard prophylactic bone & antioxidant support.',
    flightSurgeonRecommendation: 'Status Nominal. Continue scheduled exercise and standard caloric ration. Next full biomarker telemetry check in 24 hours.'
  },
  {
    id: 'scenario-fluid-shift',
    title: 'Cephalic Fluid Shift & SANS Risk',
    kicker: 'Intracranial Pressure Warning',
    description: 'Venous engorgement and upward fluid shift from lower extremities causing elevated jugular venous pressure, facial edema, and ocular strain.',
    physiologicalEvent: 'Loss of hydrostatic pressure gradient causing ~1.5L interstitial fluid redistribution into upper torso and cranium.',
    vitals: {
      heartRate: 74,
      spo2: 97,
      systolicBp: 136,
      diastolicBp: 88,
      meanArterialPressure: 104,
      respirationRate: 15,
      coreTempC: 37.0,
      hrvSdnn: 41,
      perfusionIndex: 3.2,
      vascularElasticity: 62,
      stressIndex: 58,
      dailyRadiationMsv: 0.41
    },
    blood: {
      hemoglobin: 16.4,
      hematocrit: 49.2, // Hemoconcentration
      ionizedCalcium: 1.27,
      sodium: 144,
      potassium: 3.7,
      bloodGlucose: 94,
      bloodLactate: 1.6,
      serumCortisol: 460,
      dnaOxidativeStress8OHdG: 3.8,
      bloodOsmolarity: 298 // Mild hyperosmolarity
    },
    massDeltaKg: -1.2,
    pantryPrescriptionFocus: 'Strict sodium restriction (<1800mg/day) to mitigate intracranial fluid retention + High-potassium hydration pouch + High DHA/EPA algal lipids for optic disc preservation.',
    flightSurgeonRecommendation: 'Advisory to Flight Surgeon: Initiate Lower Body Negative Pressure (LBNP) chamber protocol for 60 min. Restrict dietary sodium. Recheck jugular ultrasound and visual acuity at 1800 UTC.'
  },
  {
    id: 'scenario-eva-fatigue',
    title: 'Post-EVA Exertion & Electrolyte Depletion',
    kicker: 'Metabolic & Musculoskeletal Stress',
    description: 'Following a 6.5-hour pressurized Extravehicular Activity (EVA), telemetry indicates acute muscular glycogen depletion, elevated blood lactate, and significant sweat electrolyte loss.',
    physiologicalEvent: 'High physical metabolic output inside pressurized EMU spacesuit (4.3 psi). Thermal load and sweat evaporative deficit.',
    vitals: {
      heartRate: 88,
      spo2: 96,
      systolicBp: 110,
      diastolicBp: 70,
      meanArterialPressure: 83,
      respirationRate: 19,
      coreTempC: 37.4,
      hrvSdnn: 32,
      perfusionIndex: 2.8,
      vascularElasticity: 70,
      stressIndex: 74,
      dailyRadiationMsv: 0.62
    },
    blood: {
      hemoglobin: 15.6,
      hematocrit: 47.8,
      ionizedCalcium: 1.18,
      sodium: 133, // Mild hyponatremia
      potassium: 3.4, // Low potassium
      bloodGlucose: 68, // Hypoglycemic dip
      bloodLactate: 4.8, // Significant lactate accumulation
      serumCortisol: 590, // Acute physical stress spike
      dnaOxidativeStress8OHdG: 4.2,
      bloodOsmolarity: 279
    },
    massDeltaKg: -2.3, // Acute fluid/glycogen loss
    pantryPrescriptionFocus: 'Immediate rehydration with K+/Mg2+ electrolyte salts + Rapid-acting complex carbohydrate & protein pouch + Tart cherry anthocyanin recovery drink for lactate clearance.',
    flightSurgeonRecommendation: 'Medical Directive: Enforce 8-hour crew rest cycle. Authorize 1200 mL targeted electrolyte hydration. Defer strenuous resistance workout until lactate returns below 2.0 mmol/L.'
  },
  {
    id: 'scenario-solar-radiation',
    title: 'Solar Particle Event (SPE) Radiation Surge',
    kicker: 'Cosmic Radiation Exposure',
    description: 'Cabin dosimeters detect an SPE coronal mass ejection transit. Biological assays reveal marked increase in free radicals and 8-OHdG oxidative DNA degradation markers.',
    physiologicalEvent: 'Space radiation flux elevation. Increased ionizing particle tracks through habitat radiation storm shelter.',
    vitals: {
      heartRate: 76,
      spo2: 97,
      systolicBp: 124,
      diastolicBp: 80,
      meanArterialPressure: 94,
      respirationRate: 14,
      coreTempC: 37.1,
      hrvSdnn: 48,
      perfusionIndex: 4.1,
      vascularElasticity: 79,
      stressIndex: 65,
      dailyRadiationMsv: 3.45 // Radiation spike
    },
    blood: {
      hemoglobin: 14.2,
      hematocrit: 43.1,
      ionizedCalcium: 1.25,
      sodium: 140,
      potassium: 4.1,
      bloodGlucose: 86,
      bloodLactate: 1.3,
      serumCortisol: 490,
      dnaOxidativeStress8OHdG: 8.9, // High oxidative DNA marker!
      bloodOsmolarity: 288
    },
    massDeltaKg: -0.4,
    pantryPrescriptionFocus: 'Mega-dose Spirulina-Chlorella phycocyanin wafers (antioxidant radio-protection) + Fresh hydroponic microgreens (sulforaphane & vit C) + Hydroxytyrosol polyphenol concentrate.',
    flightSurgeonRecommendation: 'Radiation Health Officer Alert: Maintain crew in water-wall shielded quarters until flux subsides below 0.5 mSv/hr. Administer radioprotective bioactive nutrition protocol immediately.'
  },
  {
    id: 'scenario-bone-resorption',
    title: 'Microgravity Bone Resorption & Calcium Drift',
    kicker: 'Osteoclast Hyperactivity Risk',
    description: 'Longitudinal analysis shows accelerating trabecular bone loss and elevated serum ionized calcium from disuse osteoclast remodeling in zero gravity.',
    physiologicalEvent: 'Absence of gravitational axial skeletal mechanical loading leads to 1-1.5% bone mineral density reduction per month.',
    vitals: {
      heartRate: 70,
      spo2: 98,
      systolicBp: 122,
      diastolicBp: 78,
      meanArterialPressure: 92,
      respirationRate: 13,
      coreTempC: 36.9,
      hrvSdnn: 58,
      perfusionIndex: 4.5,
      vascularElasticity: 82,
      stressIndex: 35,
      dailyRadiationMsv: 0.40
    },
    blood: {
      hemoglobin: 14.5,
      hematocrit: 43.8,
      ionizedCalcium: 1.41, // Elevated serum calcium
      sodium: 141,
      potassium: 4.3,
      bloodGlucose: 84,
      bloodLactate: 1.0,
      serumCortisol: 310,
      dnaOxidativeStress8OHdG: 2.8,
      bloodOsmolarity: 290
    },
    massDeltaKg: -1.6,
    pantryPrescriptionFocus: 'Calcium-Chelated Chia Puree fortified with Vitamin D3 and K2-MK7 + Low sodium to prevent renal hypercalciuria (kidney stone risk) + Increase hydration target by +500 mL.',
    flightSurgeonRecommendation: 'Flight Surgeon Note: High risk of nephrolithiasis due to hypercalciuria. Increase water intake to 2.8L/day. Elevate ARED deadlift and heel-strike loading reps by 15%.'
  }
];

export const HISTORICAL_HEALTH_RECORDS: import('../types/dico').HealthHistoryRecord[] = [
  // Elena Vance
  {
    id: 'hist-vance-142',
    astronautId: 'crew-1',
    sol: 142,
    timestamp: '14:20 UTC',
    earthDate: '2026-10-08',
    eventType: 'ROUTINE_CHECK',
    title: 'Sol 142 Autonomous Multi-Bay Diagnostic',
    summary: 'Full biometric cycle completed nominal. Optical PPG shows regular sinus rhythm (68 bpm, SpO2 98%). SLAMMD inertial mass measured at 63.80 kg.',
    severity: 'NOMINAL',
    vitalsSnapshot: { heartRate: 68, bloodPressure: '118/76', spo2: 98, meanArterialPressure: 90 },
    biomarkerHighlights: [
      { label: 'Ionized Ca2+', value: '1.22 mmol/L', trend: 'STABLE', status: 'NOMINAL' },
      { label: 'Lactate', value: '1.1 mmol/L', trend: 'DOWN', status: 'NOMINAL' },
      { label: 'DNA 8-OHdG', value: '2.4 ng/mL', trend: 'STABLE', status: 'NOMINAL' },
    ],
    dietaryAdjustment: {
      caloriesTarget: 2420,
      prescribedPacks: ['Quinoa & Smoked Salmon Mash', 'Spirulina Bio-Wafers', 'Hydroponic Microgreens'],
      specialProtocols: 'Standard prophylactic nutrient maintenance. Maintain baseline 2.4L hydration.',
      waterIntakeMl: 2400
    },
    flightSurgeonDisposition: 'Nominal baseline maintained. Approved for scheduled orbital cycle.',
    countermeasuresApplied: ['ARED deadlift 4x10 reps', 'T2 treadmill 30 min']
  },
  {
    id: 'hist-vance-128',
    astronautId: 'crew-1',
    sol: 128,
    timestamp: '09:45 UTC',
    earthDate: '2026-09-24',
    eventType: 'DIETARY_ADJUSTMENT',
    title: 'Pre-emptive Osteoprotective Nutrition Intervention',
    summary: 'Longitudinal telemetry indicated upward drift in bone calcium turnover (1.31 mmol/L). DICO automatically adjusted the closed-loop pantry allocation to increase chelated calcium and Vit D3/K2-MK7.',
    severity: 'ELEVATED',
    vitalsSnapshot: { heartRate: 71, bloodPressure: '120/78', spo2: 98, meanArterialPressure: 92 },
    biomarkerHighlights: [
      { label: 'Ionized Ca2+', value: '1.31 mmol/L', trend: 'UP', status: 'ELEVATED' },
      { label: 'Cortisol', value: '340 nmol/L', trend: 'STABLE', status: 'NOMINAL' }
    ],
    dietaryAdjustment: {
      caloriesTarget: 2480,
      prescribedPacks: ['Calcium-Fortified Chia Puree (2x)', 'Hypo-Osmolar Electrolyte Fluid', 'Smoked Salmon Mash'],
      specialProtocols: 'Added 850mg chelated calcium + 2000 IU Vit D3 daily ration. Sodium restricted below 2,000 mg/day.',
      waterIntakeMl: 2700
    },
    flightSurgeonDisposition: 'Flight Surgeon endorsed automated nutrition prescription. Requested 14-day bone follow-up.',
    countermeasuresApplied: ['Bone loading cycle +10% resistance', 'Axial heel strikes']
  },
  {
    id: 'hist-vance-110',
    astronautId: 'crew-1',
    sol: 110,
    timestamp: '16:15 UTC',
    earthDate: '2026-09-06',
    eventType: 'MEDICAL_EVENT',
    title: 'Cephalic Fluid Shift & Optic Nerve (SANS) Screen',
    summary: 'Mild facial puffiness and upward interstitial fluid migration noted. Mean arterial pressure transiently reached 98 mmHg. Micro-blood hematocrit measured 48.4% (plasma volume reduction).',
    severity: 'ELEVATED',
    vitalsSnapshot: { heartRate: 74, bloodPressure: '132/84', spo2: 97, meanArterialPressure: 98 },
    biomarkerHighlights: [
      { label: 'Hematocrit', value: '48.4%', trend: 'UP', status: 'ELEVATED' },
      { label: 'Osmolarity', value: '295 mOsm/kg', trend: 'UP', status: 'NOMINAL' }
    ],
    dietaryAdjustment: {
      caloriesTarget: 2350,
      prescribedPacks: ['Omega-3 Algal DHA Retinal Capsules (2x)', 'Hypo-Osmolar Hydration Fluid', 'Spirulina Wafers'],
      specialProtocols: 'Strict sodium restriction (<1800mg) to prevent intracranial pressure spikes. Enforce 60 min LBNP protocol.',
      waterIntakeMl: 2600
    },
    flightSurgeonDisposition: 'LBNP Lower Body Negative Pressure chamber completed with complete symptom resolution.',
    countermeasuresApplied: ['Chibis-M LBNP suit 45 min', 'Ultrasound optic nerve sheath scan']
  },
  {
    id: 'hist-vance-84',
    astronautId: 'crew-1',
    sol: 84,
    timestamp: '11:00 UTC',
    earthDate: '2026-08-11',
    eventType: 'ROUTINE_CHECK',
    title: 'Mid-Mission Biomarker Re-calibration',
    summary: 'Comprehensive multi-channel assay. All 10 micro-blood indices aligned within microgravity reference boundaries. Mass stabilized at 63.9 kg.',
    severity: 'NOMINAL',
    vitalsSnapshot: { heartRate: 67, bloodPressure: '116/74', spo2: 99, meanArterialPressure: 88 },
    biomarkerHighlights: [
      { label: 'Hemoglobin', value: '14.8 g/dL', trend: 'STABLE', status: 'NOMINAL' },
      { label: 'Blood Glucose', value: '86 mg/dL', trend: 'STABLE', status: 'NOMINAL' }
    ],
    dietaryAdjustment: {
      caloriesTarget: 2400,
      prescribedPacks: ['Smoked Salmon Mash', 'Hydroponic Microgreens', 'Tart Cherry Concentrate'],
      specialProtocols: 'Nominal mid-flight ration balance.',
      waterIntakeMl: 2400
    },
    flightSurgeonDisposition: 'Telemetry verified nominal by Johnson Space Center Bioastronautics.',
    countermeasuresApplied: ['Resistance workout', 'Cycle ergometer']
  },
  {
    id: 'hist-vance-45',
    astronautId: 'crew-1',
    sol: 45,
    timestamp: '18:30 UTC',
    earthDate: '2026-07-03',
    eventType: 'DIETARY_ADJUSTMENT',
    title: 'Sleep Architecture & Tart Cherry Recovery Prescription',
    summary: 'Subject reported mild circadian sleep fragmentation due to lunar flyby orbital lighting schedule. DICO added tart cherry anthocyanin & natural phytomelatonin ration.',
    severity: 'NOMINAL',
    vitalsSnapshot: { heartRate: 72, bloodPressure: '118/76', spo2: 98, meanArterialPressure: 90 },
    biomarkerHighlights: [
      { label: 'Cortisol', value: '410 nmol/L', trend: 'UP', status: 'NOMINAL' }
    ],
    dietaryAdjustment: {
      caloriesTarget: 2400,
      prescribedPacks: ['Freeze-Dried Tart Cherry & Aronia Concentrate', 'Algal Bio-Wafers'],
      specialProtocols: 'Administer cherry concentrate 45 minutes prior to sleep mask donning.',
      waterIntakeMl: 2400
    },
    flightSurgeonDisposition: 'Sleep onset latency improved from 42 min to 14 min following protocol.',
    countermeasuresApplied: ['Cabin circadian dynamic spectrum shifting to 480nm red-rich light']
  },
  {
    id: 'hist-vance-01',
    astronautId: 'crew-1',
    sol: 1,
    timestamp: '06:00 UTC',
    earthDate: '2026-05-19',
    eventType: 'MEDICAL_EVENT',
    title: 'Launch Baseline & Microgravity Insertion Check',
    summary: 'Translunar injection baseline acquired. Launch mass verified at 64.5 kg. Normal vestibular adaptation without acute neuro-vestibular sickness.',
    severity: 'NOMINAL',
    vitalsSnapshot: { heartRate: 78, bloodPressure: '124/80', spo2: 99, meanArterialPressure: 94 },
    biomarkerHighlights: [
      { label: 'Baseline Mass', value: '64.5 kg', trend: 'STABLE', status: 'NOMINAL' },
      { label: 'Lactate', value: '0.9 mmol/L', trend: 'STABLE', status: 'NOMINAL' }
    ],
    dietaryAdjustment: {
      caloriesTarget: 2500,
      prescribedPacks: ['Hypo-Osmolar Electrolyte Fluid', 'Smoked Salmon Mash'],
      specialProtocols: 'Launch adaptation fluid protocol.',
      waterIntakeMl: 2500
    },
    flightSurgeonDisposition: 'Flight Surgeon signoff: Commander Vance fit for deep space cruise.',
    countermeasuresApplied: ['Initial neuro-vestibular head movement calibration']
  },

  // Marcus Chen
  {
    id: 'hist-chen-141',
    astronautId: 'crew-2',
    sol: 141,
    timestamp: '19:40 UTC',
    earthDate: '2026-10-07',
    eventType: 'EVA_OPERATION',
    title: 'Radiator Loop Repair EVA-02 (6.5 hr Exertion)',
    summary: 'Extravehicular activity completed successfully. High metabolic workload inside pressurized suit resulted in acute muscle fatigue, significant sweat electrolyte loss, and lactate surge to 4.8 mmol/L.',
    severity: 'CRITICAL',
    vitalsSnapshot: { heartRate: 92, bloodPressure: '112/68', spo2: 96, meanArterialPressure: 82 },
    biomarkerHighlights: [
      { label: 'Blood Lactate', value: '4.8 mmol/L', trend: 'UP', status: 'WARNING' },
      { label: 'Serum Potassium', value: '3.4 mmol/L', trend: 'DOWN', status: 'WARNING' },
      { label: 'Serum Cortisol', value: '590 nmol/L', trend: 'UP', status: 'WARNING' },
      { label: 'Mass Delta', value: '-2.3 kg', trend: 'DOWN', status: 'ELEVATED' }
    ],
    dietaryAdjustment: {
      caloriesTarget: 3100,
      prescribedPacks: ['Potassium-Magnesium Rehydration Pouch (2x)', 'Tart Cherry Concentrate (2x)', 'High-Protein Quinoa Mash'],
      specialProtocols: 'Immediate emergency electrolyte repletion + 1200 mL oral hydration. Restrict physical load for 12 hours.',
      waterIntakeMl: 3400
    },
    flightSurgeonDisposition: 'Flight Surgeon Directive: Enforce mandatory 8-hour sleep period. Recheck serum potassium in 6 hours.',
    countermeasuresApplied: ['Post-EVA thermal re-warming', 'Passive pneumatic calf compression']
  },
  {
    id: 'hist-chen-135',
    astronautId: 'crew-2',
    sol: 135,
    timestamp: '10:15 UTC',
    earthDate: '2026-10-01',
    eventType: 'ROUTINE_CHECK',
    title: 'Pre-EVA Medical Qualification & Suit Sizing',
    summary: 'Candidate cleared for EVA operations. Resting cardiopulmonary fitness confirmed nominal. Nitrogen washout pre-breathe profile loaded into suit avionics.',
    severity: 'NOMINAL',
    vitalsSnapshot: { heartRate: 64, bloodPressure: '118/74', spo2: 99, meanArterialPressure: 88 },
    biomarkerHighlights: [
      { label: 'Hematocrit', value: '44.0%', trend: 'STABLE', status: 'NOMINAL' },
      { label: 'Lactate', value: '1.0 mmol/L', trend: 'STABLE', status: 'NOMINAL' }
    ],
    dietaryAdjustment: {
      caloriesTarget: 2650,
      prescribedPacks: ['Quinoa Smoked Salmon Mash', 'Algal Bio-Wafers'],
      specialProtocols: 'Carbohydrate loading in advance of 6.5hr spacewalk.',
      waterIntakeMl: 2600
    },
    flightSurgeonDisposition: 'Flight Surgeon approved EVA operational qualification.',
    countermeasuresApplied: ['Suit joint range of motion check', 'Nitrogen hyperbaric pre-breathe']
  },
  {
    id: 'hist-chen-98',
    astronautId: 'crew-2',
    sol: 98,
    timestamp: '04:10 UTC',
    earthDate: '2026-08-25',
    eventType: 'BIOMARKER_ALERT',
    title: 'Solar Particle Event (SPE) Radioprotective Intervention',
    summary: 'HAB storm shelter occupied during Coronal Mass Ejection transit. Blood assay revealed elevated 8-OHdG oxidative DNA marker (8.9 ng/mL). DICO initiated mega-dose Spirulina phycocyanin protocol.',
    severity: 'CRITICAL',
    vitalsSnapshot: { heartRate: 76, bloodPressure: '124/80', spo2: 97, meanArterialPressure: 94 },
    biomarkerHighlights: [
      { label: 'DNA 8-OHdG', value: '8.9 ng/mL', trend: 'UP', status: 'WARNING' },
      { label: 'Radiation Flux', value: '3.45 mSv/d', trend: 'UP', status: 'WARNING' }
    ],
    dietaryAdjustment: {
      caloriesTarget: 2600,
      prescribedPacks: ['Spirulina Bio-Wafers (3x)', 'Hydroponic Microgreens (2x)', 'Tart Cherry Concentrate'],
      specialProtocols: 'Mega-dose phycocyanin (900mg) for radical scavenging + bioactive sulforaphane to trigger Nrf2 pathways.',
      waterIntakeMl: 2800
    },
    flightSurgeonDisposition: 'Radiation Health Officer sign-off: Crew shielded successfully. DNA repair indicators normalizing.',
    countermeasuresApplied: ['Storm shelter water-wall enclosure', 'Dosimeter badge re-zeroing']
  },
  {
    id: 'hist-chen-55',
    astronautId: 'crew-2',
    sol: 55,
    timestamp: '14:00 UTC',
    earthDate: '2026-07-13',
    eventType: 'DIETARY_ADJUSTMENT',
    title: 'Microgravity Muscular Sparing & Leucine Enrichment',
    summary: 'SLAMMD inertial mass recorded 72.8 kg (-1.2 kg delta). Lean muscle retention algorithm triggered an increase in branched-chain amino acids and complete proteins.',
    severity: 'NOMINAL',
    vitalsSnapshot: { heartRate: 66, bloodPressure: '116/72', spo2: 98, meanArterialPressure: 86 },
    biomarkerHighlights: [
      { label: 'Mass Delta', value: '-1.2 kg', trend: 'DOWN', status: 'NOMINAL' }
    ],
    dietaryAdjustment: {
      caloriesTarget: 2750,
      prescribedPacks: ['Smoked Salmon Mash (2x)', 'Spirulina Wafers'],
      specialProtocols: 'Elevated leucine intake to 3.2g per meal to stimulate muscle protein synthesis.',
      waterIntakeMl: 2500
    },
    flightSurgeonDisposition: 'Exercise and nutrition adjustments confirmed adequate.',
    countermeasuresApplied: ['ARED squat 5x8 reps', 'Rowing ergometer 20 min']
  },

  // Sarah Kim
  {
    id: 'hist-kim-140',
    astronautId: 'crew-3',
    sol: 140,
    timestamp: '15:20 UTC',
    earthDate: '2026-10-06',
    eventType: 'DIETARY_ADJUSTMENT',
    title: 'Hydroponic Biomass Integration & Fresh Phytonutrient Log',
    summary: 'First harvest of radish microgreens and dwarf peas from closed-loop chamber. Fresh Vitamin C and active sulforaphane integrated into crew rations.',
    severity: 'NOMINAL',
    vitalsSnapshot: { heartRate: 65, bloodPressure: '112/70', spo2: 99, meanArterialPressure: 84 },
    biomarkerHighlights: [
      { label: '8-OHdG', value: '1.9 ng/mL', trend: 'DOWN', status: 'NOMINAL' },
      { label: 'Serum Ca2+', value: '1.20 mmol/L', trend: 'STABLE', status: 'NOMINAL' }
    ],
    dietaryAdjustment: {
      caloriesTarget: 2200,
      prescribedPacks: ['Hydroponic Microgreens & Radish Crisp (2x)', 'Chia Puree', 'Smoked Salmon Mash'],
      specialProtocols: 'Integration of 100g fresh live biomass. Zero sodium addition.',
      waterIntakeMl: 2200
    },
    flightSurgeonDisposition: 'Fresh food psychological and immunological boost verified.',
    countermeasuresApplied: ['Closed-loop ECLSS bio-harvest', 'Circadian light synchrony']
  },
  {
    id: 'hist-kim-102',
    astronautId: 'crew-3',
    sol: 102,
    timestamp: '11:45 UTC',
    earthDate: '2026-08-29',
    eventType: 'MEDICAL_EVENT',
    title: 'Bone Mineral Density & Trabecular Turnover Screening',
    summary: 'Routine 100-sol bone marker checkup. Serum calcium within safe bracket (1.23 mmol/L). Resistance adherence at 96%.',
    severity: 'NOMINAL',
    vitalsSnapshot: { heartRate: 68, bloodPressure: '114/72', spo2: 98, meanArterialPressure: 86 },
    biomarkerHighlights: [
      { label: 'Ionized Ca2+', value: '1.23 mmol/L', trend: 'STABLE', status: 'NOMINAL' }
    ],
    dietaryAdjustment: {
      caloriesTarget: 2250,
      prescribedPacks: ['Chia Puree', 'Algal Bio-Wafers', 'Smoked Salmon Mash'],
      specialProtocols: 'Prophylactic calcium & Vit D3/K2 support.',
      waterIntakeMl: 2300
    },
    flightSurgeonDisposition: 'Excellent musculoskeletal maintenance noted by ground medical team.',
    countermeasuresApplied: ['ARED deadlift', 'Vibration plate stimulation']
  }
];

export const LONGITUDINAL_TRENDS: Record<import('../types/dico').CrewMemberId, import('../types/dico').LongitudinalTrendPoint[]> = {
  'crew-1': [
    { sol: 0, massKg: 64.5, calciumMmol: 1.18, lactateMmol: 0.9, radiationMsvCumulative: 0.1, heartRate: 66, stressIndex: 20 },
    { sol: 20, massKg: 64.1, calciumMmol: 1.20, lactateMmol: 1.0, radiationMsvCumulative: 5.2, heartRate: 67, stressIndex: 25 },
    { sol: 45, massKg: 63.9, calciumMmol: 1.22, lactateMmol: 1.1, radiationMsvCumulative: 11.8, heartRate: 69, stressIndex: 28 },
    { sol: 70, massKg: 63.8, calciumMmol: 1.24, lactateMmol: 1.0, radiationMsvCumulative: 18.5, heartRate: 68, stressIndex: 22 },
    { sol: 95, massKg: 63.7, calciumMmol: 1.26, lactateMmol: 1.2, radiationMsvCumulative: 25.4, heartRate: 70, stressIndex: 30 },
    { sol: 115, massKg: 63.6, calciumMmol: 1.29, lactateMmol: 1.1, radiationMsvCumulative: 31.0, heartRate: 72, stressIndex: 42 },
    { sol: 128, massKg: 63.7, calciumMmol: 1.31, lactateMmol: 1.3, radiationMsvCumulative: 34.6, heartRate: 71, stressIndex: 35 },
    { sol: 142, massKg: 63.8, calciumMmol: 1.22, lactateMmol: 1.1, radiationMsvCumulative: 38.4, heartRate: 68, stressIndex: 22 }
  ],
  'crew-2': [
    { sol: 0, massKg: 74.0, calciumMmol: 1.19, lactateMmol: 1.0, radiationMsvCumulative: 0.1, heartRate: 64, stressIndex: 22 },
    { sol: 25, massKg: 73.4, calciumMmol: 1.21, lactateMmol: 1.1, radiationMsvCumulative: 6.8, heartRate: 65, stressIndex: 26 },
    { sol: 55, massKg: 72.8, calciumMmol: 1.23, lactateMmol: 1.2, radiationMsvCumulative: 15.2, heartRate: 66, stressIndex: 28 },
    { sol: 85, massKg: 72.5, calciumMmol: 1.25, lactateMmol: 1.3, radiationMsvCumulative: 23.4, heartRate: 68, stressIndex: 32 },
    { sol: 98, massKg: 72.4, calciumMmol: 1.26, lactateMmol: 1.4, radiationMsvCumulative: 28.5, heartRate: 76, stressIndex: 65 },
    { sol: 120, massKg: 72.3, calciumMmol: 1.27, lactateMmol: 1.2, radiationMsvCumulative: 34.8, heartRate: 67, stressIndex: 30 },
    { sol: 135, massKg: 72.4, calciumMmol: 1.26, lactateMmol: 1.1, radiationMsvCumulative: 39.1, heartRate: 64, stressIndex: 24 },
    { sol: 141, massKg: 71.7, calciumMmol: 1.25, lactateMmol: 4.8, radiationMsvCumulative: 40.8, heartRate: 92, stressIndex: 78 },
    { sol: 142, massKg: 72.4, calciumMmol: 1.25, lactateMmol: 1.8, radiationMsvCumulative: 41.2, heartRate: 74, stressIndex: 45 }
  ],
  'crew-3': [
    { sol: 0, massKg: 58.0, calciumMmol: 1.16, lactateMmol: 0.8, radiationMsvCumulative: 0.1, heartRate: 62, stressIndex: 18 },
    { sol: 30, massKg: 57.6, calciumMmol: 1.18, lactateMmol: 0.9, radiationMsvCumulative: 7.5, heartRate: 63, stressIndex: 20 },
    { sol: 65, massKg: 57.3, calciumMmol: 1.20, lactateMmol: 1.0, radiationMsvCumulative: 16.8, heartRate: 64, stressIndex: 22 },
    { sol: 100, massKg: 57.1, calciumMmol: 1.22, lactateMmol: 0.9, radiationMsvCumulative: 26.0, heartRate: 65, stressIndex: 25 },
    { sol: 125, massKg: 57.0, calciumMmol: 1.21, lactateMmol: 0.9, radiationMsvCumulative: 32.4, heartRate: 64, stressIndex: 21 },
    { sol: 142, massKg: 57.1, calciumMmol: 1.20, lactateMmol: 0.8, radiationMsvCumulative: 36.9, heartRate: 63, stressIndex: 19 }
  ]
};

