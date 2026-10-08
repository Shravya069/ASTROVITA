import React, { useState } from 'react';
import { 
  Utensils, 
  Sparkles, 
  PackageCheck, 
  Droplet, 
  ShieldCheck, 
  AlertCircle, 
  ChevronRight,
  Check,
  Wheat
} from 'lucide-react';
import { FoodPantryItem, PrescribedRation, DietaryPrescription, AstronautProfile, MicroBloodReading, VitalsReading } from '../../types/dico';

interface NutritionEngineProps {
  crew: AstronautProfile;
  blood: MicroBloodReading;
  vitals: VitalsReading;
  pantry: FoodPantryItem[];
  onDispenseFood: (rationItems: { itemId: string; count: number }[]) => void;
  onOpenConsultAI?: () => void;
}

export const NutritionIntelligenceEngine: React.FC<NutritionEngineProps> = ({
  crew,
  blood,
  vitals,
  pantry,
  onDispenseFood,
  onOpenConsultAI,
}) => {
  const [dispensedSuccess, setDispensedSuccess] = useState(false);
  const [selectedPantryItem, setSelectedPantryItem] = useState<FoodPantryItem | null>(null);

  // Derive smart prescription based on measured biomarkers
  const isPostEvaFatigue = blood.bloodLactate > 2.2;
  const isRadiationSurge = blood.dnaOxidativeStress8OHdG > 5.0;
  const isBoneResorption = blood.ionizedCalcium > 1.33;
  const isCephalicFluidShift = blood.hematocrit > 48.0;

  // Compute dynamic caloric requirement: Harris-Benedict adjusted for microgravity + resistance training
  const baseBMR = 10 * crew.currentMassKg + 6.25 * 172 - 5 * crew.age + 5;
  const activityMultiplier = isPostEvaFatigue ? 1.65 : 1.35;
  const targetCalories = Math.round(baseBMR * activityMultiplier);

  // Determine prescribed packs
  let prescribedItems: { item: FoodPantryItem; units: number; reason: string }[] = [];

  const itemSpirulina = pantry.find(p => p.id === 'pantry-1')!;
  const itemChia = pantry.find(p => p.id === 'pantry-2')!;
  const itemElectrolyte = pantry.find(p => p.id === 'pantry-3')!;
  const itemSalmon = pantry.find(p => p.id === 'pantry-4')!;
  const itemOmega3 = pantry.find(p => p.id === 'pantry-5')!;
  const itemCherry = pantry.find(p => p.id === 'pantry-6')!;
  const itemGreens = pantry.find(p => p.id === 'pantry-7')!;
  const itemHypoH2o = pantry.find(p => p.id === 'pantry-8')!;

  if (isRadiationSurge) {
    prescribedItems = [
      { item: itemSpirulina, units: 2, reason: 'High phycocyanin for acute cosmic ray DNA radical scavenging.' },
      { item: itemGreens, units: 1, reason: 'Sulforaphane to stimulate endogenous cellular Nrf2 pathways.' },
      { item: itemCherry, units: 1, reason: 'Polyphenol protection against cellular oxidative stress.' },
      { item: itemSalmon, units: 1, reason: 'Sustained basal protein synthesis & caloric restoration.' },
    ];
  } else if (isPostEvaFatigue) {
    prescribedItems = [
      { item: itemElectrolyte, units: 2, reason: 'Corrects profound sweat K+/Mg2+ deficits from 6.5hr EVA suit.' },
      { item: itemCherry, units: 1, reason: 'Rapid anthocyanin-mediated systemic lactate clearance.' },
      { item: itemSalmon, units: 1, reason: 'High leucine EAAs for damaged muscle fiber reconstruction.' },
      { item: itemHypoH2o, units: 1, reason: 'Hypo-osmolar rehydration without causing fluid pooling.' },
    ];
  } else if (isBoneResorption) {
    prescribedItems = [
      { item: itemChia, units: 2, reason: 'Chelated calcium + D3/K2-MK7 to arrest osteoclastic bone resorption.' },
      { item: itemSpirulina, units: 1, reason: 'Trace mineral cofactors (boron, magnesium, zinc) for bone matrix.' },
      { item: itemSalmon, units: 1, reason: 'Standard amino acid nitrogen balance.' },
      { item: itemHypoH2o, units: 2, reason: 'Escalated fluid throughput to prevent hypercalciuric renal stone formation.' },
    ];
  } else if (isCephalicFluidShift) {
    prescribedItems = [
      { item: itemOmega3, units: 2, reason: 'Neuro-protective DHA/EPA against SANS optic nerve sheath edema.' },
      { item: itemHypoH2o, units: 2, reason: 'Low-sodium hydration avoiding intracranial interstitial pooling.' },
      { item: itemSpirulina, units: 1, reason: 'Potassium-rich, ultra-low sodium nutrient wafer.' },
      { item: itemSalmon, units: 1, reason: 'Lean protein maintenance with zero added salt.' },
    ];
  } else {
    // Nominal Routine
    prescribedItems = [
      { item: itemSalmon, units: 1, reason: 'Complete amino acid profile & microgravity muscular retention.' },
      { item: itemSpirulina, units: 1, reason: 'Baseline prophylactic cosmic radiation antioxidant maintenance.' },
      { item: itemGreens, units: 1, reason: 'Fresh hydroponic phytonutrients and micro-fiber.' },
      { item: itemChia, units: 1, reason: 'Prophylactic daily bone calcium & Vit D3 ration.' },
    ];
  }

  const sodiumLimit = isCephalicFluidShift || isBoneResorption ? 1800 : 2300;
  const targetHydrationMl = isPostEvaFatigue ? 3200 : (isBoneResorption ? 2800 : 2400);

  const handleDispense = () => {
    const deductions = prescribedItems.map(p => ({
      itemId: p.item.id,
      count: p.units,
    }));
    onDispenseFood(deductions);
    setDispensedSuccess(true);
    setTimeout(() => setDispensedSuccess(false), 4000);
  };

  return (
    <div className="bg-[#0B0F19] rounded-xl border border-slate-800 p-4 shadow-lg flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
        <div className="flex items-center gap-2">
          <Utensils className="w-4 h-4 text-cyan-400" />
          <h3 className="text-xs font-mono font-semibold tracking-wider text-slate-200 uppercase">
            AI Spacecraft Nutrition & Pantry Intelligence Engine
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-cyan-400/90">
            METABOLIC ADAPTATION: {targetCalories} KCAL/DAY
          </span>
        </div>
      </div>

      {/* Main Grid: Left Prescription / Right Available Pantry */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left: AI Prescribed Formulation */}
        <div className="lg:col-span-7 flex flex-col justify-between gap-3 bg-[#060912] p-3.5 rounded-xl border border-cyan-500/30">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-mono font-bold text-slate-100 uppercase">
                  Targeted Countermeasure Prescription
                </span>
              </div>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                isRadiationSurge ? 'bg-rose-950 text-rose-300 border border-rose-500/40' :
                isPostEvaFatigue ? 'bg-amber-950 text-amber-300 border border-amber-500/40' :
                isBoneResorption ? 'bg-amber-950 text-amber-300 border border-amber-500/40' :
                'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
              }`}>
                {isRadiationSurge ? 'RADIO-PROTECTIVE RATION' :
                 isPostEvaFatigue ? 'POST-EVA RECOVERY RATION' :
                 isBoneResorption ? 'OSTEOPROTECTIVE RATION' :
                 isCephalicFluidShift ? 'SANS FLUID RESTRICTION' : 'NOMINAL FLIGHT RATION'}
              </span>
            </div>

            {/* Prescribed Items List */}
            <div className="space-y-2 mt-3">
              {prescribedItems.map(({ item, units, reason }, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-lg bg-slate-900/70 border border-slate-800 flex items-start justify-between gap-2"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-slate-200">
                        {item.name}
                      </span>
                      <span className="text-[10px] font-mono text-cyan-400 px-1.5 py-0.2 rounded bg-cyan-950/60 border border-cyan-500/30">
                        {units}x Pack ({item.caloriesPerUnit * units} kcal)
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                      {reason}
                    </p>
                  </div>
                  <div className="text-right text-[10px] font-mono text-slate-500 shrink-0">
                    <div>P: {item.proteinG * units}g</div>
                    <div>Ca: {item.calciumMg * units}mg</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Macro & Hydration Target Badges */}
            <div className="grid grid-cols-3 gap-2 mt-3 text-center text-[10px] font-mono">
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <div className="text-slate-400">HYDRATION TARGET</div>
                <div className="text-sm font-bold text-cyan-300 mt-0.5">{targetHydrationMl} mL</div>
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <div className="text-slate-400">SODIUM CEILING</div>
                <div className="text-sm font-bold text-slate-200 mt-0.5">&lt; {sodiumLimit} mg</div>
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <div className="text-slate-400">CALCIUM RATIO</div>
                <div className="text-sm font-bold text-slate-200 mt-0.5">1,200 mg/d</div>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between gap-3 pt-2 border-t border-slate-800 mt-2">
            <button
              onClick={handleDispense}
              disabled={dispensedSuccess}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg font-mono text-xs font-semibold transition-all ${
                dispensedSuccess
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.3)]'
              }`}
            >
              {dispensedSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Ration Dispensed & Stock Deducted</span>
                </>
              ) : (
                <>
                  <PackageCheck className="w-4 h-4" />
                  <span>Dispense Prescribed Ration Pouch</span>
                </>
              )}
            </button>

            {onOpenConsultAI && (
              <button
                onClick={onOpenConsultAI}
                className="px-3 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-cyan-300 font-mono text-xs flex items-center gap-1.5 transition-colors"
                title="Ask AI for bespoke formulation"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Clinical Rationale</span>
              </button>
            )}
          </div>
        </div>

        {/* Right: Spacecraft Food Inventory Status */}
        <div className="lg:col-span-5 flex flex-col gap-2 bg-[#060912] p-3.5 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between pb-1.5 border-b border-slate-800">
            <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-slate-200">
              <Wheat className="w-3.5 h-3.5 text-amber-400" />
              <span>SPACECRAFT HABITAT PANTRY</span>
            </div>
            <span className="text-[10px] font-mono text-slate-400">
              CLOSED-LOOP STOCK
            </span>
          </div>

          <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1">
            {pantry.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedPantryItem(item)}
                className={`p-2 rounded-lg border cursor-pointer transition-all flex items-center justify-between text-xs ${
                  selectedPantryItem?.id === item.id
                    ? 'bg-cyan-950/40 border-cyan-500/50 text-slate-100'
                    : 'bg-slate-900/50 hover:bg-slate-900 border-slate-800 text-slate-300'
                }`}
              >
                <div>
                  <div className="font-medium text-[11px] truncate max-w-[190px]">
                    {item.name}
                  </div>
                  <div className="text-[9px] font-mono text-slate-500">
                    {item.code} · {item.caloriesPerUnit} kcal
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-[11px] font-mono font-bold ${
                    item.stockUnits < 20 ? 'text-amber-400' : 'text-slate-200'
                  }`}>
                    {item.stockUnits}
                  </span>
                  <span className="text-[9px] font-mono text-slate-500 ml-1">packs</span>
                </div>
              </div>
            ))}
          </div>

          {/* Pantry item detail inspector modal/drawer */}
          {selectedPantryItem && (
            <div className="mt-2 p-2.5 rounded-lg bg-slate-900/90 border border-cyan-500/30 text-[10px] font-mono">
              <div className="flex justify-between items-center text-cyan-300 font-semibold mb-1">
                <span>{selectedPantryItem.name}</span>
                <button
                  onClick={() => setSelectedPantryItem(null)}
                  className="text-slate-400 hover:text-slate-100"
                >
                  ×
                </button>
              </div>
              <p className="text-slate-400 leading-tight">
                {selectedPantryItem.spaceflightRationale}
              </p>
              <div className="mt-1 text-slate-300">
                Active: <strong className="text-cyan-200">{selectedPantryItem.activeNutrients}</strong>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
