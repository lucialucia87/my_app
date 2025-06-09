export interface BaseRateInfo {
  rate: number;
  lastUpdated: string;
  change?: number; // Optional: change from previous rate
  effectiveDate?: string; // Optional: date the rate became effective
}

export interface BankDepositRate {
  id: string;
  bankName: string;
  productName:
    | string
    | {
        main: string;
        sub?: string;
      };
  rate: number; // Annual interest rate in percentage
  type: 'commercial' | 'savings';
  minDurationMonths?: number;
  maxAmount?: number;
  conditions?: string; // e.g., "Online only, new customers"
}

export interface SpecialOffer {
  id: string;
  title: string;
  bankName: string;
  rate?: number; // Optional, if the offer is about a specific rate
  description: string;
  link?: string; // Optional link to the offer
  endDate?: string; // Optional offer expiry date
}
