export type RiskLevel = "Low" | "Medium" | "High";
export type TransactionType = "Capital Call" | "Distribution" | "Direct Equity" | "Commitment" | "ACH Transfer" | "Platform Fee";
export type TransactionStatus = "Completed" | "Pending" | "Settled" | "Failed";
export type UserRole = "Investor" | "Seller" | "Admin";
export type KYCStatus = "Verified" | "Pending" | "Rejected" | "Not Started";
export type MarketType = "primary" | "secondary";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  tier: "Gold" | "Silver" | "Platinum";
  avatar?: string;
  kycStatus: KYCStatus;
  joinedAt: string;
}

export interface Company {
  id: string;
  name: string;
  industry: string;
  description: string;
  valuation: number;
  pricePerShare: number;
  availableShares: number;
  totalShares: number;
  roi: number;
  riskLevel: RiskLevel;
  logo: string;
  founded: string;
  headquarters: string;
  employees: string;
  revenue: number;
  growth: number;
  marketType: MarketType;
  documents: Document[];
  chartData: ChartPoint[];
}

export interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedAt: string;
}

export interface ChartPoint {
  month: string;
  value: number;
}

export interface Investment {
  id: string;
  companyId: string;
  companyName: string;
  industry: string;
  sharesOwned: number;
  purchasePrice: number;
  currentPrice: number;
  investedAmount: number;
  currentValue: number;
  pnl: number;
  pnlPercent: number;
  purchasedAt: string;
}

export interface Transaction {
  id: string;
  date: string;
  assetClass: string;
  entity: string;
  type: TransactionType;
  amount: number;
  status: TransactionStatus;
  description?: string;
}

export interface WalletStats {
  totalLiquidity: number;
  inTransit: number;
  committedCapital: number;
  reservedForFees: number;
  currency: string;
  yieldYTD: number;
}

export interface StatsCard {
  label: string;
  value: string;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  subtitle?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  read: boolean;
  createdAt: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  kycStatus: KYCStatus;
  joinedAt: string;
  totalInvested: number;
  status: "Active" | "Suspended" | "Pending";
}
