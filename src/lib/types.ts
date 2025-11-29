// Core input types for the calculator
export interface CostInputs {
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

// Per-piece breakdown
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

// Final results
export interface CostResults {
  totalCostPerPiece: number;
  desiredProfitPercent: number;
  recommendedSellingPrice: number;
  grossMarginPercent: number;
  profitPerPiece: number;
  totalBatchProfit: number;
}

// Warning types
export interface Warning {
  type: 'error' | 'warning' | 'info';
  message: string;
}

// Default input values (for initial load)
export const DEFAULT_INPUTS: CostInputs = {
  productionQuantity: 1000,
  rawMaterialTotal: 120000,
  labourTotal: 30000,
  machineHours: 120,
  machineHourRate: 600,
  overheadsTotal: 20000,
  packagingTotal: 7000,
  adminTotal: 5000,
  otherCosts: 2000,
  desiredProfitPercent: 25,
};

// Empty inputs (for reset)
export const EMPTY_INPUTS: CostInputs = {
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

// Input field configuration
export interface InputFieldConfig {
  key: keyof CostInputs;
  label: string;
  placeholder: string;
  prefix?: string;
  suffix?: string;
  tooltip?: string;
}

// Cost input fields (without profit - that goes in pricing section)
export const COST_INPUT_FIELDS: InputFieldConfig[] = [
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

// Profit field config (separate for pricing section)
export const PROFIT_FIELD: InputFieldConfig = {
  key: 'desiredProfitPercent',
  label: 'Desired Profit Margin',
  placeholder: '25',
  suffix: '%',
  tooltip: 'Target profit margin percentage to add on top of cost',
};
