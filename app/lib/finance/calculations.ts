export interface EMIResult {
    emi: number;
    totalInterest: number;
    totalPayment: number;
}

/**
 * Calculate EMI and breakdown
 */
export function calculateEMI(principal: number, rateAnnual: number, tenureMonths: number): EMIResult {
    if (principal <= 0 || tenureMonths <= 0 || isNaN(rateAnnual) || rateAnnual < 0) {
        return { emi: 0, totalInterest: 0, totalPayment: 0 };
    }

    const r = rateAnnual / 12 / 100;
    const n = tenureMonths;
    
    let emi = 0;
    let totalPayment = 0;
    let totalInterest = 0;

    if (r === 0) {
        emi = principal / n;
        totalPayment = principal;
        totalInterest = 0;
    } else {
        emi = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        totalPayment = emi * n;
        totalInterest = totalPayment - principal;
    }

    return {
        emi: isNaN(emi) || !isFinite(emi) ? 0 : Math.round(emi),
        totalInterest: isNaN(totalInterest) || !isFinite(totalInterest) || totalInterest < 0 ? 0 : Math.round(totalInterest),
        totalPayment: isNaN(totalPayment) || !isFinite(totalPayment) ? 0 : Math.round(totalPayment),
    };
}

export interface SIPResult {
    investedAmount: number;
    estimatedReturns: number;
    totalValue: number;
}

/**
 * Calculate SIP Returns
 */
export function calculateSIP(monthlyInvestment: number, rateAnnual: number, tenureMonths: number): SIPResult {
    if (monthlyInvestment <= 0 || tenureMonths <= 0 || isNaN(rateAnnual) || rateAnnual < 0) {
        return { investedAmount: 0, estimatedReturns: 0, totalValue: 0 };
    }

    const i = rateAnnual / 12 / 100;
    const n = tenureMonths;
    
    let totalValue = 0;
    const investedAmount = monthlyInvestment * n;

    if (i === 0) {
        totalValue = investedAmount;
    } else {
        totalValue = monthlyInvestment * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
    }
    
    const estimatedReturns = totalValue - investedAmount;

    return {
        investedAmount: isNaN(investedAmount) || !isFinite(investedAmount) ? 0 : Math.round(investedAmount),
        estimatedReturns: isNaN(estimatedReturns) || !isFinite(estimatedReturns) || estimatedReturns < 0 ? 0 : Math.round(estimatedReturns),
        totalValue: isNaN(totalValue) || !isFinite(totalValue) ? 0 : Math.round(totalValue),
    };
}

export interface CompoundInterestResult {
    principalAmount: number;
    totalInterest: number;
    totalValue: number;
}

/**
 * Calculate Compound Interest
 */
export function calculateCompoundInterest(principal: number, rateAnnual: number, tenureYears: number, compoundingFrequency: number = 1): CompoundInterestResult {
    if (principal <= 0 || tenureYears <= 0 || isNaN(rateAnnual) || rateAnnual < 0 || compoundingFrequency <= 0) {
        return { principalAmount: 0, totalInterest: 0, totalValue: 0 };
    }

    const r = rateAnnual / 100;
    const n = compoundingFrequency;
    const t = tenureYears;
    
    let amount = 0;
    if (r === 0) {
        amount = principal;
    } else {
        amount = principal * Math.pow(1 + r / n, n * t);
    }
    
    const totalInterest = amount - principal;

    return {
        principalAmount: isNaN(principal) || !isFinite(principal) ? 0 : Math.round(principal),
        totalInterest: isNaN(totalInterest) || !isFinite(totalInterest) || totalInterest < 0 ? 0 : Math.round(totalInterest),
        totalValue: isNaN(amount) || !isFinite(amount) ? 0 : Math.round(amount),
    };
}

export interface AmortizationRow {
    month: number;
    payment: number;
    principal: number;
    interest: number;
    balance: number;
}

/**
 * Generate an Amortization Schedule
 */
export function calculateAmortizationSchedule(principal: number, rateAnnual: number, tenureMonths: number): AmortizationRow[] {
    if (principal <= 0 || tenureMonths <= 0 || isNaN(rateAnnual) || rateAnnual < 0) return [];
    
    const emiResult = calculateEMI(principal, rateAnnual, tenureMonths);
    const emi = emiResult.emi;
    const r = rateAnnual / 12 / 100;
    
    const schedule: AmortizationRow[] = [];
    let balance = principal;

    for (let month = 1; month <= tenureMonths; month++) {
        let interest = 0;
        let principalPayment = 0;

        if (r === 0) {
            interest = 0;
            principalPayment = emi;
        } else {
            interest = balance * r;
            principalPayment = emi - interest;
        }

        if (month === tenureMonths) {
            principalPayment = balance; // Adjust last payment to close exact balance
        }

        balance -= principalPayment;
        if (balance < 0 || Math.abs(balance) < 0.1) balance = 0;

        schedule.push({
            month,
            payment: month === tenureMonths ? principalPayment + interest : emi,
            principal: principalPayment,
            interest: interest,
            balance: balance
        });
    }

    return schedule;
}

/**
 * Calculate Max Eligible Loan Amount based on EMI
 */
export function calculateLoanEligibility(affordableEmi: number, rateAnnual: number, tenureMonths: number): number {
    if (affordableEmi <= 0 || tenureMonths <= 0 || isNaN(rateAnnual) || rateAnnual < 0) return 0;
    
    const r = rateAnnual / 12 / 100;
    const n = tenureMonths;
    let maxLoan = 0;

    if (r === 0) {
        maxLoan = affordableEmi * n;
    } else {
        maxLoan = affordableEmi * (Math.pow(1 + r, n) - 1) / (r * Math.pow(1 + r, n));
    }
    
    return isNaN(maxLoan) || !isFinite(maxLoan) ? 0 : Math.round(maxLoan);
}

export interface CreditUtilizationResult {
    utilizationRatio: number;
    status: "Excellent" | "Good" | "Fair" | "Poor";
    statusColor: string;
}

/**
 * Calculate Credit Utilization Ratio
 */
export function calculateCreditUtilization(totalLimit: number, totalBalance: number): CreditUtilizationResult {
    if (totalLimit <= 0 || isNaN(totalLimit) || isNaN(totalBalance)) {
        return { utilizationRatio: 0, status: "Excellent", statusColor: "text-green-500" };
    }
    if (totalBalance < 0) totalBalance = 0; // Prevent negative balance logically
    
    const ratio = (totalBalance / totalLimit) * 100;
    let status: "Excellent" | "Good" | "Fair" | "Poor" = "Poor";
    let statusColor = "text-red-500";

    if (ratio <= 10) {
        status = "Excellent";
        statusColor = "text-green-500";
    } else if (ratio <= 30) {
        status = "Good";
        statusColor = "text-blue-500";
    } else if (ratio <= 50) {
        status = "Fair";
        statusColor = "text-yellow-500";
    }

    return {
        utilizationRatio: isNaN(ratio) || !isFinite(ratio) ? 0 : parseFloat(ratio.toFixed(2)),
        status,
        statusColor
    };
}

export interface RetirementResult {
    totalCorpus: number;
    totalInvested: number;
    wealthGained: number;
}

/**
 * Calculate Retirement Corpus
 */
export function calculateRetirementCorpus(
    currentAge: number, 
    retirementAge: number, 
    currentSavings: number, 
    monthlyInvestment: number, 
    expectedReturnRate: number
): RetirementResult {
    if (currentAge <= 0 || retirementAge <= currentAge || isNaN(expectedReturnRate) || expectedReturnRate < 0) {
        return { totalCorpus: 0, totalInvested: 0, wealthGained: 0 };
    }
    
    const years = retirementAge - currentAge;
    const months = years * 12;
    const rAnnual = expectedReturnRate / 100;
    const rMonthly = rAnnual / 12;

    const savings = currentSavings >= 0 ? currentSavings : 0;
    const sip = monthlyInvestment >= 0 ? monthlyInvestment : 0;

    let fvSavings = 0;
    if (rAnnual === 0) {
        fvSavings = savings;
    } else {
        fvSavings = savings * Math.pow(1 + rAnnual, years);
    }

    let fvSip = 0;
    if (sip > 0) {
        if (rMonthly === 0) {
            fvSip = sip * months;
        } else {
            fvSip = sip * (Math.pow(1 + rMonthly, months) - 1) * (1 + rMonthly) / rMonthly;
        }
    }

    const totalCorpus = fvSavings + fvSip;
    const totalInvested = savings + (sip * months);
    const wealthGained = totalCorpus - totalInvested;

    return {
        totalCorpus: isNaN(totalCorpus) || !isFinite(totalCorpus) ? 0 : Math.round(totalCorpus),
        totalInvested: isNaN(totalInvested) || !isFinite(totalInvested) ? 0 : Math.round(totalInvested),
        wealthGained: isNaN(wealthGained) || !isFinite(wealthGained) ? 0 : Math.round(wealthGained)
    };
}

export interface NetWorthResult {
    totalAssets: number;
    totalLiabilities: number;
    netWorth: number;
}

/**
 * Calculate Net Worth
 */
export function calculateNetWorth(assets: number[], liabilities: number[]): NetWorthResult {
    const sumValid = (arr: number[]) => arr.reduce((sum, val) => sum + (isNaN(val) || val < 0 ? 0 : val), 0);
    
    const totalAssets = sumValid(assets);
    const totalLiabilities = sumValid(liabilities);
    
    return {
        totalAssets,
        totalLiabilities,
        netWorth: totalAssets - totalLiabilities
    };
}

export interface InflationResult {
    futureValue: number;
    degradedValue: number;
}

/**
 * Calculate Inflation Impact
 */
export function calculateInflation(amount: number, inflationRate: number, years: number): InflationResult {
    if (amount <= 0 || isNaN(inflationRate) || inflationRate < 0 || years <= 0) {
        return { futureValue: 0, degradedValue: 0 };
    }

    const r = inflationRate / 100;
    
    let futureValue = amount;
    let degradedValue = amount;

    if (r > 0) {
        futureValue = amount * Math.pow(1 + r, years);
        degradedValue = amount / Math.pow(1 + r, years);
    }

    return {
        futureValue: isNaN(futureValue) || !isFinite(futureValue) ? 0 : Math.round(futureValue),
        degradedValue: isNaN(degradedValue) || !isFinite(degradedValue) ? 0 : Math.round(degradedValue)
    };
}

export interface FDResult {
    maturityAmount: number;
    totalInterest: number;
}

/**
 * Calculate Fixed Deposit Maturity
 */
export function calculateFixedDeposit(principal: number, rateAnnual: number, tenureYears: number, compoundingFrequency: number = 4): FDResult {
    if (principal <= 0 || isNaN(rateAnnual) || rateAnnual < 0 || tenureYears <= 0 || compoundingFrequency <= 0) {
        return { maturityAmount: 0, totalInterest: 0 };
    }

    const r = rateAnnual / 100;
    const n = compoundingFrequency;
    const t = tenureYears;
    
    let maturityAmount = principal;
    if (r > 0) {
        maturityAmount = principal * Math.pow(1 + r / n, n * t);
    }
    
    const totalInterest = maturityAmount - principal;

    return {
        maturityAmount: isNaN(maturityAmount) || !isFinite(maturityAmount) ? 0 : Math.round(maturityAmount),
        totalInterest: isNaN(totalInterest) || !isFinite(totalInterest) ? 0 : Math.round(totalInterest)
    };
}
