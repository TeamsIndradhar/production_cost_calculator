import { CostInputs, CostBreakdown, CostResults, Warning } from './types';

/**
 * Calculate per-piece cost breakdown
 */
export function calculateBreakdown(inputs: CostInputs): CostBreakdown | null {
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
 * Calculate final results including selling price and profit
 */
export function calculateResults(inputs: CostInputs, breakdown: CostBreakdown | null): CostResults | null {
  if (!breakdown) {
    return null;
  }

  const { totalCostPerPiece } = breakdown;
  const { desiredProfitPercent, productionQuantity } = inputs;

  // Selling Price = Cost × (1 + Profit%)
  const recommendedSellingPrice = round(totalCostPerPiece * (1 + desiredProfitPercent / 100));

  // Gross Margin = (Selling Price - Cost) / Selling Price × 100
  const grossMarginPercent = recommendedSellingPrice > 0
    ? round(((recommendedSellingPrice - totalCostPerPiece) / recommendedSellingPrice) * 100)
    : 0;

  // Profit per piece
  const profitPerPiece = round(recommendedSellingPrice - totalCostPerPiece);

  // Total batch profit
  const totalBatchProfit = round(profitPerPiece * productionQuantity);

  return {
    totalCostPerPiece,
    desiredProfitPercent,
    recommendedSellingPrice,
    grossMarginPercent,
    profitPerPiece,
    totalBatchProfit,
  };
}

/**
 * Generate warnings based on inputs and calculations
 * Only shows critical errors (negative values)
 */
export function generateWarnings(inputs: CostInputs): Warning[] {
  const warnings: Warning[] = [];

  // Check for negative values only
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
