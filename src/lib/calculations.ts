import { BatchInputs, PerPieceInputs, CostBreakdown, BatchTotals, CostResults, Warning } from './types';

// Legacy alias
export type CostInputs = BatchInputs;
export type TotalsInputs = BatchInputs;

// ==============================================
// PAGE A: BATCH → PER-PIECE CALCULATIONS
// ==============================================

/**
 * Calculate per-piece cost breakdown from batch totals
 */
export function calculateBreakdown(inputs: BatchInputs): CostBreakdown | null {
  const { productionQuantity } = inputs;

  // Cannot calculate if quantity is 0 or negative
  if (productionQuantity <= 0) {
    return null;
  }

  const rawMaterialPerPiece = round(inputs.rawMaterialTotal / productionQuantity);
  const labourPerPiece = round(inputs.labourTotal / productionQuantity);
  const machinePerPiece = round((inputs.machineHours * inputs.machineHourRate) / productionQuantity);
  const overheadPerPiece = round(inputs.overheadsTotal / productionQuantity);
  const packagingPerPiece = round(inputs.packagingTotal / productionQuantity);
  const adminPerPiece = round(inputs.adminTotal / productionQuantity);
  const otherPerPiece = round(inputs.otherCosts / productionQuantity);

  const totalCostPerPiece = round(
    rawMaterialPerPiece +
    labourPerPiece +
    machinePerPiece +
    overheadPerPiece +
    packagingPerPiece +
    adminPerPiece +
    otherPerPiece
  );

  return {
    rawMaterialPerPiece,
    labourPerPiece,
    machinePerPiece,
    overheadPerPiece,
    packagingPerPiece,
    adminPerPiece,
    otherPerPiece,
    totalCostPerPiece,
  };
}

/**
 * Calculate final results including selling price and profit (for Batch → Per-piece)
 */
export function calculateResults(inputs: BatchInputs, breakdown: CostBreakdown | null): CostResults | null {
  if (!breakdown) {
    return null;
  }

  const { totalCostPerPiece } = breakdown;
  const { desiredProfitPercent, productionQuantity } = inputs;

  // Selling Price = Cost × (1 + Profit%)
  const recommendedSellingPrice = round(totalCostPerPiece * (1 + desiredProfitPercent / 100));

  // Profit per piece
  const profitPerPiece = round(recommendedSellingPrice - totalCostPerPiece);

  // Total batch profit
  const totalBatchProfit = round(profitPerPiece * productionQuantity);

  return {
    totalCostPerPiece,
    desiredProfitPercent,
    recommendedSellingPrice,
    profitPerPiece,
    totalBatchProfit,
  };
}

// ==============================================
// PAGE B: PER-PIECE → BATCH CALCULATIONS
// ==============================================

/**
 * Calculate total cost per piece from per-piece inputs (sum of all per-piece costs)
 * This does NOT require quantity - it's just summing the per-piece costs
 */
export function calculatePerPieceCost(inputs: PerPieceInputs): CostBreakdown {
  const totalCostPerPiece = round(
    inputs.rawMaterialPerPiece +
    inputs.labourPerPiece +
    inputs.machinePerPiece +
    inputs.overheadPerPiece +
    inputs.packagingPerPiece +
    inputs.adminPerPiece +
    inputs.otherPerPiece
  );

  return {
    rawMaterialPerPiece: inputs.rawMaterialPerPiece,
    labourPerPiece: inputs.labourPerPiece,
    machinePerPiece: inputs.machinePerPiece,
    overheadPerPiece: inputs.overheadPerPiece,
    packagingPerPiece: inputs.packagingPerPiece,
    adminPerPiece: inputs.adminPerPiece,
    otherPerPiece: inputs.otherPerPiece,
    totalCostPerPiece,
  };
}

/**
 * Calculate selling price from per-piece cost and profit margin
 * This does NOT require quantity
 */
export function calculateSellingPrice(totalCostPerPiece: number, desiredProfitPercent: number): {
  sellingPrice: number;
  profitPerPiece: number;
} {
  const sellingPrice = round(totalCostPerPiece * (1 + desiredProfitPercent / 100));
  const profitPerPiece = round(sellingPrice - totalCostPerPiece);
  return { sellingPrice, profitPerPiece };
}

/**
 * Calculate batch totals from per-piece inputs and quantity
 * This is the final step after user enters quantity
 */
export function calculateBatchTotals(inputs: PerPieceInputs, sellingPrice: number): BatchTotals | null {
  const { productionQuantity } = inputs;

  if (productionQuantity <= 0) {
    return null;
  }

  const rawMaterialTotal = round(inputs.rawMaterialPerPiece * productionQuantity);
  const labourTotal = round(inputs.labourPerPiece * productionQuantity);
  const machineTotal = round(inputs.machinePerPiece * productionQuantity);
  const overheadsTotal = round(inputs.overheadPerPiece * productionQuantity);
  const packagingTotal = round(inputs.packagingPerPiece * productionQuantity);
  const adminTotal = round(inputs.adminPerPiece * productionQuantity);
  const otherTotal = round(inputs.otherPerPiece * productionQuantity);

  const totalBatchCost = round(
    rawMaterialTotal +
    labourTotal +
    machineTotal +
    overheadsTotal +
    packagingTotal +
    adminTotal +
    otherTotal
  );

  const totalRevenue = round(sellingPrice * productionQuantity);
  const totalBatchProfit = round(totalRevenue - totalBatchCost);

  return {
    rawMaterialTotal,
    labourTotal,
    machineTotal,
    overheadsTotal,
    packagingTotal,
    adminTotal,
    otherTotal,
    totalBatchCost,
    totalRevenue,
    totalBatchProfit,
  };
}

// Legacy function for compatibility
export function calculateBreakdownFromPerPiece(inputs: PerPieceInputs): CostBreakdown | null {
  if (inputs.productionQuantity <= 0) return null;
  return calculatePerPieceCost(inputs);
}

// Legacy function for compatibility
export function calculateResultsFromPerPiece(inputs: PerPieceInputs, breakdown: CostBreakdown | null): CostResults | null {
  if (!breakdown) return null;
  
  const { totalCostPerPiece } = breakdown;
  const { desiredProfitPercent, productionQuantity } = inputs;
  const { sellingPrice, profitPerPiece } = calculateSellingPrice(totalCostPerPiece, desiredProfitPercent);
  const totalBatchProfit = round(profitPerPiece * productionQuantity);

  return {
    totalCostPerPiece,
    desiredProfitPercent,
    recommendedSellingPrice: sellingPrice,
    profitPerPiece,
    totalBatchProfit,
  };
}

// ==============================================
// WARNINGS
// ==============================================

/**
 * Generate warnings for Batch → Per-piece
 */
export function generateWarnings(inputs: BatchInputs): Warning[] {
  const warnings: Warning[] = [];

  const negativeFields: string[] = [];
  if (inputs.rawMaterialTotal < 0) negativeFields.push('Raw Material');
  if (inputs.labourTotal < 0) negativeFields.push('Labour');
  if (inputs.machineHours < 0) negativeFields.push('Machine Hours');
  if (inputs.machineHourRate < 0) negativeFields.push('Machine Hour Rate');
  if (inputs.overheadsTotal < 0) negativeFields.push('Overheads');
  if (inputs.packagingTotal < 0) negativeFields.push('Packaging');
  if (inputs.adminTotal < 0) negativeFields.push('Admin');
  if (inputs.otherCosts < 0) negativeFields.push('Other Costs');
  if (inputs.desiredProfitPercent < 0) negativeFields.push('Profit %');

  if (negativeFields.length > 0) {
    warnings.push({
      type: 'error',
      message: `Negative values not allowed: ${negativeFields.join(', ')}`,
    });
  }

  return warnings;
}

/**
 * Generate warnings for Per-piece → Batch
 */
export function generateWarningsPerPiece(inputs: PerPieceInputs): Warning[] {
  const warnings: Warning[] = [];

  const negativeFields: string[] = [];
  if (inputs.rawMaterialPerPiece < 0) negativeFields.push('Raw Material');
  if (inputs.labourPerPiece < 0) negativeFields.push('Labour');
  if (inputs.machinePerPiece < 0) negativeFields.push('Machine Cost');
  if (inputs.overheadPerPiece < 0) negativeFields.push('Overheads');
  if (inputs.packagingPerPiece < 0) negativeFields.push('Packaging');
  if (inputs.adminPerPiece < 0) negativeFields.push('Admin');
  if (inputs.otherPerPiece < 0) negativeFields.push('Other Costs');
  if (inputs.desiredProfitPercent < 0) negativeFields.push('Profit %');

  if (negativeFields.length > 0) {
    warnings.push({
      type: 'error',
      message: `Negative values not allowed: ${negativeFields.join(', ')}`,
    });
  }

  return warnings;
}

/**
 * Round to 2 decimal places
 */
function round(value: number): number {
  return Math.round(value * 100) / 100;
}

/**
 * Format currency for display
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * Format number with commas
 */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-IN').format(value);
}

/**
 * Format percentage
 */
export function formatPercent(value: number): string {
  return `${value.toFixed(2)}%`;
}
