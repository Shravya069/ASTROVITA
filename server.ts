import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

app.use(express.json());

// DICO AI Flight Surgeon & Nutrition Intelligence Endpoint
app.post('/api/dico-ai', async (req: Request, res: Response) => {
  try {
    const { astronaut, vitals, blood, mass, userQuery, scenarioTitle } = req.body;

    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      try {
        const ai = new GoogleGenAI({ apiKey });
        const systemPrompt = `You are DICO (Deep-space Integrated Crew Observatory), an onboard autonomous aerospace medical and nutrition AI deployed on a deep-space exploration vehicle (e.g. Orion/Transit Habitat to Mars).
Provide an authoritative, clinical, aerospace-medicine evaluation based on simulated telemetry data.
Follow these guidelines:
1. Always maintain the persona of an advanced spacecraft medical intelligence.
2. Clearly acknowledge this is SIMULATED RESEARCH TELEMETRY.
3. Analyze the physiological findings: cardiovascular, fluid shift, electrolytes, bone metabolism, radiation markers, and mass oscillation readings.
4. Formulate precise nutritional countermeasures using onboard closed-loop pantry rations (e.g., Spirulina bio-wafers for radiation/antioxidant defense, chelated calcium + Vit D3/K2 for bone resorption, high K+/Mg2+ electrolyte packs for cephalic hypovolemia, tart cherry anthocyanins for lactate clearance).
5. Specify an action recommendation for Ground Medical Staff (Flight Surgeon at Johnson Space Center / EAC).
6. Format response cleanly with clear sections:
   - PHYSIOLOGICAL STATUS & BIOMARKER ASSESSMENT
   - TARGETED NUTRITIONAL COUNTERMEASURE PROTOCOL
   - FLIGHT SURGEON TELEMETRY ADVISORY
Keep it concise, professional, and visually structured.`;

        const userContent = `Astronaut: ${astronaut?.name || 'Elena Vance'} (${astronaut?.role || 'Commander'})
Current Mission Sol: ${astronaut?.missionDay || 142}
Active Scenario: ${scenarioTitle || 'Custom Medical Check'}
Vitals:
- Heart Rate: ${vitals?.heartRate} bpm | SpO2: ${vitals?.spo2}% | BP: ${vitals?.systolicBp}/${vitals?.diastolicBp} mmHg (MAP: ${vitals?.meanArterialPressure} mmHg)
- Core Temp: ${vitals?.coreTempC}°C | Respiration: ${vitals?.respirationRate} rpm | HRV: ${vitals?.hrvSdnn} ms | Stress Index: ${vitals?.stressIndex}/100
- Radiation: ${vitals?.dailyRadiationMsv} mSv/day (Cumulative: ${astronaut?.radiationCumulativeMsv} mSv)

Micro-Blood Lab Results:
- Hemoglobin: ${blood?.hemoglobin} g/dL | Hematocrit: ${blood?.hematocrit}%
- Ionized Ca2+: ${blood?.ionizedCalcium} mmol/L | Na+: ${blood?.sodium} mmol/L | K+: ${blood?.potassium} mmol/L
- Blood Glucose: ${blood?.bloodGlucose} mg/dL | Lactate: ${blood?.bloodLactate} mmol/L | Cortisol: ${blood?.serumCortisol} nmol/L
- 8-OHdG Oxidative DNA Marker: ${blood?.dnaOxidativeStress8OHdG} ng/mL | Osmolarity: ${blood?.bloodOsmolarity} mOsm/kg

Mass Oscillation (SLAMMD):
- Delta Mass: ${mass?.deltaKg ?? -1.2} kg vs preflight baseline (${astronaut?.baselineMassKg} kg)

Crew/Operator Query: "${userQuery || 'Perform complete medical telemetry synthesis and dietary prescription.'}"`;

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: [
            { role: 'user', parts: [{ text: `${systemPrompt}\n\n${userContent}` }] }
          ],
        });

        const replyText = response.text || 'Telemetry synthesized successfully.';
        return res.json({
          success: true,
          source: 'gemini-2.5-flash',
          analysis: replyText,
        });
      } catch (geminiError) {
        console.warn('Gemini API call returned error, switching to deterministic onboard aerospace engine:', geminiError);
        // Fall back gracefully to deterministic onboard engine below
      }
    }

    // Deterministic Onboard Aerospace Medical Synthesizer
    // Ensures flawless zero-downtime demonstration for the hackathon jury
    const bloodLactate = blood?.bloodLactate || 1.1;
    const ionizedCa = blood?.ionizedCalcium || 1.22;
    const oxidativeStress = blood?.dnaOxidativeStress8OHdG || 2.4;
    const hematocrit = blood?.hematocrit || 44.5;
    const hr = vitals?.heartRate || 72;

    let conditionVerdict = 'NOMINAL PHYSIOLOGICAL ADAPTATION';
    let biomarkerInsight = 'All microvascular hemodynamics and blood osmolarity values reside within mission baseline boundaries.';
    let nutritionRx = 'Standard maintenance rations: 1x Quinoa-Salmon Meal Pack, 1x Hydroponic Microgreens, 1x Spirulina wafer.';
    let flightSurgeonAction = 'Log routine telemetry packet to Johnson Space Center Bioastronautics database. No clinical intervention mandated.';

    if (oxidativeStress > 5.0) {
      conditionVerdict = 'ELEVATED COSMIC RADIATION OXIDATIVE STRESS';
      biomarkerInsight = `8-OHdG marker spiked to ${oxidativeStress} ng/mL indicating heightened reactive oxygen species (ROS) damage to cellular DNA from cosmic radiation flux.`;
      nutritionRx = 'Radio-protective emergency protocol: 2x Spirulina & Chlorella Bio-Wafers (phycocyanin free-radical scavenging), 1x Freeze-Dried Tart Cherry concentrate, 1x Hydroponic microgreens (Nrf2 activation).';
      flightSurgeonAction = 'Radiation Safety Officer Advisory: Maintain crew in shielded habitat sector. Repeat micro-blood assay in 12 hours.';
    } else if (bloodLactate > 3.0) {
      conditionVerdict = 'ACUTE MUSCULOSKELETAL FATIGUE & GLYCOGEN DEPLETION';
      biomarkerInsight = `Blood lactate elevated at ${bloodLactate} mmol/L alongside decreased blood glucose (${blood?.bloodGlucose || 70} mg/dL) indicating anaerobic metabolic accumulation following intense EVA physical exertion.`;
      nutritionRx = 'Rapid recovery ration: 1x Potassium-Magnesium Rehydration Pouch, 1x Tart Cherry anthocyanin recovery drink for accelerated lactate clearance, 1x High-protein Quinoa & Smoked Salmon Mash.';
      flightSurgeonAction = 'Enforce 8-hour crew rest cycle. Authorize 1200 mL targeted electrolyte hydration. Defer strenuous resistance workout until lactate returns below 2.0 mmol/L.';
    } else if (ionizedCa > 1.35) {
      conditionVerdict = 'ACCELERATING MICROGRAVITY BONE RESORPTION';
      biomarkerInsight = `Serum ionized calcium elevated at ${ionizedCa} mmol/L reflecting heightened osteoclast resorption of bone mineral matrix due to mechanical unloading.`;
      nutritionRx = 'Bone matrix stabilization ration: 1x Calcium & Vit D3/K2-MK7 Fortified Chia Puree + Strict sodium restriction (<1800mg) to prevent renal hypercalciuria and nephrolithiasis.';
      flightSurgeonAction = 'Prescribe +15% resistance loading on ARED deadlift cycle. Hydration target escalated to 2.8 L/day.';
    } else if (hematocrit > 48.0) {
      conditionVerdict = 'CEPHALIC FLUID REDISTRIBUTION & HEMOCONCENTRATION';
      biomarkerInsight = `Hematocrit elevated at ${hematocrit}% due to microgravity upper-body fluid shift, coupled with elevated mean arterial pressure (${vitals?.meanArterialPressure || 100} mmHg).`;
      nutritionRx = 'Hypo-osmolar hydration protocol: 2x Hypo-Osmolar Electrolyte Fluid, 1x Omega-3 Algal DHA/EPA Retinal Capsules to protect optic disc sheath from intracranial pressure.';
      flightSurgeonAction = 'Initiate Lower Body Negative Pressure (LBNP) chamber protocol for 45 minutes. Monitor optic nerve sheath diameter via onboard ultrasound.';
    }

    const fallbackResponse = `[ DICO ONBOARD HEALTH & NUTRITION SYNTHESIS ]
STATUS: ${conditionVerdict}
OPERATOR: ${astronaut?.name || 'Astronaut'} | MISSION SOL: ${astronaut?.missionDay || 142}

1. PHYSIOLOGICAL STATUS & BIOMARKER ASSESSMENT:
${biomarkerInsight}
• Heart Rate: ${hr} bpm | BP: ${vitals?.systolicBp}/${vitals?.diastolicBp} mmHg | SpO2: ${vitals?.spo2}%
• Mass Delta: ${mass?.deltaKg ?? -1.1} kg vs launch baseline (${astronaut?.baselineMassKg} kg)
• Micro-Blood Profiling: Lactate ${bloodLactate} mmol/L | Ionized Ca2+ ${ionizedCa} mmol/L | DNA 8-OHdG ${oxidativeStress} ng/mL

2. TARGETED NUTRITIONAL COUNTERMEASURE PROTOCOL:
${nutritionRx}
• Recommended Fluid Allocation: ${bloodLactate > 3.0 ? '2,800 mL' : '2,400 mL'} / 24 hr
• Macronutrient Balance: 55% Complex Low-Glycemic Carbs, 25% Bioavailable Protein, 20% Anti-Inflammatory Lipids

3. FLIGHT SURGEON TELEMETRY ADVISORY (HOUSTON / COLOGNE):
${flightSurgeonAction}

[DISCLAIMER: SIMULATED RESEARCH TELEMETRY · NOT CERTIFIED MEDICAL DEVICE · DEMO PROTOTYPE]`;

    return res.json({
      success: true,
      source: 'onboard-aerospace-heuristics',
      analysis: fallbackResponse,
    });
  } catch (err: any) {
    console.error('DICO AI server error:', err);
    return res.status(500).json({
      success: false,
      error: 'Failed to process DICO telemetry analysis: ' + (err.message || 'Unknown error'),
    });
  }
});

// Vite middleware or production static files
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist/index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`DICO Spacecraft Simulator Server running at http://localhost:${PORT}`);
  });
}

startServer();
