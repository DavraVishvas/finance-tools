export type CategoryId = 'calculators' | 'insurance' | 'personal-finance';

export interface Category {
    id: CategoryId;
    title: string;
    description: string;
    icon: string;
}

export const categories: Category[] = [
    {
        id: 'calculators',
        title: 'Financial Calculators',
        description: 'Plan your finances with precision using our calculators.',
        icon: 'Calculate',
    },
    {
        id: 'insurance',
        title: 'Insurance Guides',
        description: 'Understand term, health, and general insurance policies.',
        icon: 'HealthAndSafety',
    },
    {
        id: 'personal-finance',
        title: 'Personal Finance',
        description: 'Guides on credit scores, investing, and wealth building.',
        icon: 'AccountBalanceWallet',
    }
];
