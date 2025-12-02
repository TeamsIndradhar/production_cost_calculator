// ==============================================
// BATCH → PER-PIECE (Page A) - Input types
// ==============================================
export interface BatchInputs {
  productionQuantity: number;
  rawMaterialTotal: number;
  labourTotal: number;
  machineHours: number;
  machineHourRate: number;
  overheadsTotal: number;
  packagingTotal: number;
  adminTotal: number;
  otherCosts: number;
  desiredProfitPercent: number;
}

// ==============================================
// PER-PIECE → TOTALS (Page B) - Input types
// ==============================================
export interface PerPieceInputs {
  productionQuantity: number;
  rawMaterialPerPiece: number;
  labourPerPiece: number;
  machinePerPiece: number;
  overheadPerPiece: number;
  packagingPerPiece: number;
  adminPerPiece: number;
  otherPerPiece: number;
  desiredProfitPercent: number;
}

// Per-piece breakdown (used by both)
export interface CostBreakdown {
  rawMaterialPerPiece: number;
  labourPerPiece: number;
  machinePerPiece: number;
  overheadPerPiece: number;
  packagingPerPiece: number;
  adminPerPiece: number;
  otherPerPiece: number;
  totalCostPerPiece: number;
}

// Batch totals (calculated from per-piece)
export interface BatchTotals {
  rawMaterialTotal: number;
  labourTotal: number;
  machineTotal: number;
  overheadsTotal: number;
  packagingTotal: number;
  adminTotal: number;
  otherTotal: number;
  totalBatchCost: number;
  totalRevenue: number;
  totalBatchProfit: number;
}

// Final results (no gross margin)
export interface CostResults {
  totalCostPerPiece: number;
  desiredProfitPercent: number;
  recommendedSellingPrice: number;
  profitPerPiece: number;
  totalBatchProfit: number;
}

// Warning types
export interface Warning {
  type: 'error' | 'warning' | 'info';
  message: string;
}

// Legacy alias for compatibility
export type CostInputs = BatchInputs;
export type TotalsInputs = BatchInputs;

// Empty inputs for Batch → Per-piece (Page A)
export const EMPTY_BATCH_INPUTS: BatchInputs = {
  productionQuantity: 0,
  rawMaterialTotal: 0,
  labourTotal: 0,
  machineHours: 0,
  machineHourRate: 0,
  overheadsTotal: 0,
  packagingTotal: 0,
  adminTotal: 0,
  otherCosts: 0,
  desiredProfitPercent: 0,
};

// Empty inputs for Per-piece → Totals (Page B)
export const EMPTY_PERPIECE_INPUTS: PerPieceInputs = {
  productionQuantity: 0,
  rawMaterialPerPiece: 0,
  labourPerPiece: 0,
  machinePerPiece: 0,
  overheadPerPiece: 0,
  packagingPerPiece: 0,
  adminPerPiece: 0,
  otherPerPiece: 0,
  desiredProfitPercent: 0,
};

// Legacy aliases
export const DEFAULT_INPUTS = EMPTY_BATCH_INPUTS;
export const EMPTY_INPUTS = EMPTY_BATCH_INPUTS;
export const EMPTY_TOTALS_INPUTS = EMPTY_BATCH_INPUTS;

// Input field configuration
export interface InputFieldConfig {
  key: string;
  label: string;
  placeholder: string;
  prefix?: string;
  suffix?: string;
  tooltip?: string;
}

// ==============================================
// Page A: Batch → Per-piece field configs
// ==============================================
export const BATCH_INPUT_FIELDS: InputFieldConfig[] = [
  {
    key: 'productionQuantity',
    label: 'Quantity',
    placeholder: '1000',
    suffix: 'pcs',
    tooltip: 'Total number of pieces to be produced in this batch',
  },
  {
    key: 'rawMaterialTotal',
    label: 'Raw Material',
    placeholder: '120000',
    prefix: '₹',
    tooltip: 'Total cost of raw materials for the entire batch',
  },
  {
    key: 'labourTotal',
    label: 'Direct Labour',
    placeholder: '30000',
    prefix: '₹',
    tooltip: 'Total labour wages for production',
  },
  {
    key: 'machineHours',
    label: 'Machine Hours',
    placeholder: '120',
    suffix: 'hrs',
    tooltip: 'Total machine hours required for production',
  },
  {
    key: 'machineHourRate',
    label: 'Machine Rate',
    placeholder: '600',
    prefix: '₹',
    suffix: '/hr',
    tooltip: 'Cost per hour of machine operation',
  },
  {
    key: 'overheadsTotal',
    label: 'Overheads',
    placeholder: '20000',
    prefix: '₹',
    tooltip: 'Factory overheads like rent, utilities, maintenance',
  },
  {
    key: 'packagingTotal',
    label: 'Packaging',
    placeholder: '7000',
    prefix: '₹',
    tooltip: 'Total packaging cost for the batch',
  },
  {
    key: 'adminTotal',
    label: 'Admin Costs',
    placeholder: '5000',
    prefix: '₹',
    tooltip: 'Administrative and indirect expenses',
  },
  {
    key: 'otherCosts',
    label: 'Other Costs',
    placeholder: '2000',
    prefix: '₹',
    tooltip: 'Any other miscellaneous costs',
  },
];

// ==============================================
// Page B: Per-piece → Batch field configs (costs only, quantity separate)
// ==============================================
export const PERPIECE_COST_FIELDS: InputFieldConfig[] = [
  {
    key: 'rawMaterialPerPiece',
    label: 'Raw Material',
    placeholder: '120',
    prefix: '₹',
    suffix: '/pc',
    tooltip: 'Raw material cost per piece',
  },
  {
    key: 'labourPerPiece',
    label: 'Direct Labour',
    placeholder: '30',
    prefix: '₹',
    suffix: '/pc',
    tooltip: 'Labour cost per piece',
  },
  {
    key: 'machinePerPiece',
    label: 'Machine Cost',
    placeholder: '72',
    prefix: '₹',
    suffix: '/pc',
    tooltip: 'Machine cost per piece',
  },
  {
    key: 'overheadPerPiece',
    label: 'Overheads',
    placeholder: '20',
    prefix: '₹',
    suffix: '/pc',
    tooltip: 'Overhead cost per piece',
  },
  {
    key: 'packagingPerPiece',
    label: 'Packaging',
    placeholder: '7',
    prefix: '₹',
    suffix: '/pc',
    tooltip: 'Packaging cost per piece',
  },
  {
    key: 'adminPerPiece',
    label: 'Admin Costs',
    placeholder: '5',
    prefix: '₹',
    suffix: '/pc',
    tooltip: 'Admin cost per piece',
  },
  {
    key: 'otherPerPiece',
    label: 'Other Costs',
    placeholder: '2',
    prefix: '₹',
    suffix: '/pc',
    tooltip: 'Other costs per piece',
  },
];

// Profit field config (used by both pages)
export const PROFIT_FIELD: InputFieldConfig = {
  key: 'desiredProfitPercent',
  label: 'Desired Profit Margin',
  placeholder: '25',
  suffix: '%',
  tooltip: 'Target profit margin percentage to add on top of cost',
};

// Quantity field (separate for Per-piece page)
export const QUANTITY_FIELD: InputFieldConfig = {
  key: 'productionQuantity',
  label: 'Batch Quantity',
  placeholder: '1000',
  suffix: 'pcs',
  tooltip: 'Total number of pieces in this batch',
};

// Legacy aliases
export const COST_INPUT_FIELDS = BATCH_INPUT_FIELDS;
export const TOTALS_INPUT_FIELDS = BATCH_INPUT_FIELDS;
export const PERPIECE_INPUT_FIELDS = PERPIECE_COST_FIELDS;
