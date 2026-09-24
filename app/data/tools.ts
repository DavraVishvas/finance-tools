import { CategoryId } from './categories';

export interface Tool {
    id: string;
    title: string;
    description: string;
    categoryId: CategoryId;
    href: string;
    icon: string;
}

export const tools: Tool[] = [
    {
        id: 'emi-calculator',
        title: 'EMI Calculator',
        description: 'Calculate your Equated Monthly Installment (EMI) for home, car, and personal loans.',
        categoryId: 'calculators',
        href: '/tools/emi-calculator',
        icon: 'Calculate',
    },
    {
        id: 'sip-calculator',
        title: 'SIP Calculator',
        description: 'Estimate returns on your Systematic Investment Plan mutual fund investments.',
        categoryId: 'calculators',
        href: '/tools/sip-calculator',
        icon: 'TrendingUp',
    },
    {
        id: 'compound-interest-calculator',
        title: 'Compound Interest Calculator',
        description: 'Calculate the power of compounding on your investments over time.',
        categoryId: 'calculators',
        href: '/tools/compound-interest-calculator',
        icon: 'ShowChart',
    },
    {
        id: 'loan-calculator',
        title: 'Advanced Loan Calculator',
        description: 'Calculate EMI and view a detailed month-by-month amortization schedule.',
        categoryId: 'calculators',
        href: '/tools/loan-calculator',
        icon: 'AccountBalanceWallet',
    },
    {
        id: 'loan-eligibility-calculator',
        title: 'Loan Eligibility Calculator',
        description: 'Find out the maximum loan amount you can afford based on your EMI capacity.',
        categoryId: 'calculators',
        href: '/tools/loan-eligibility-calculator',
        icon: 'TrendingUp',
    },
    {
        id: 'credit-utilization-calculator',
        title: 'Credit Utilization Calculator',
        description: 'Check your credit utilization ratio to maintain a healthy credit score.',
        categoryId: 'personal-finance',
        href: '/tools/credit-utilization-calculator',
        icon: 'Calculate',
    },
    {
        id: 'retirement-calculator',
        title: 'Retirement Calculator',
        description: 'Plan for your golden years by estimating your retirement corpus.',
        categoryId: 'personal-finance',
        href: '/tools/retirement-calculator',
        icon: 'TrendingUp',
    },
    {
        id: 'net-worth-calculator',
        title: 'Net Worth Calculator',
        description: 'Calculate your true net worth by balancing your assets and liabilities.',
        categoryId: 'personal-finance',
        href: '/tools/net-worth-calculator',
        icon: 'AccountBalanceWallet',
    },
    {
        id: 'inflation-calculator',
        title: 'Inflation Calculator',
        description: 'See how inflation degrades the purchasing power of your money over time.',
        categoryId: 'calculators',
        href: '/tools/inflation-calculator',
        icon: 'ShowChart',
    },
    {
        id: 'fd-calculator',
        title: 'Fixed Deposit (FD) Calculator',
        description: 'Calculate maturity amount and interest earned on your fixed deposits.',
        categoryId: 'calculators',
        href: '/tools/fd-calculator',
        icon: 'Calculate',
    }
];
