import React, { useState } from "react";
import { formatCurrency } from "@/app/utils/formatCurrency";
import { ExpandMore, ExpandLess } from "@mui/icons-material";

interface AmortizationTableProps {
    principal: number;
    rate: number;
    months: number;
    emi: number;
}

export default function AmortizationTable({ principal, rate, months, emi }: AmortizationTableProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    if (principal <= 0 || rate <= 0 || months <= 0 || emi <= 0) {
        return null;
    }

    // Calculate amortization schedule
    const schedule = [];
    let balance = principal;
    const monthlyRate = rate / 12 / 100;

    for (let i = 1; i <= months; i++) {
        const interest = balance * monthlyRate;
        let principalPayment = emi - interest;
        
        // Handle rounding issues on the last month
        if (i === months || balance < principalPayment) {
            principalPayment = balance;
        }

        balance -= principalPayment;
        
        // Safety net to prevent negative balance
        if (balance < 0) balance = 0;

        schedule.push({
            month: i,
            principal: principalPayment,
            interest: interest,
            balance: balance
        });
    }

    return (
        <div className="w-full mt-6">
            <button 
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold transition-colors"
            >
                {isExpanded ? (
                    <>Hide Amortization Schedule <ExpandLess className="w-5 h-5" /></>
                ) : (
                    <>Show Amortization Schedule <ExpandMore className="w-5 h-5" /></>
                )}
            </button>

            {isExpanded && (
                <div className="mt-4 overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="overflow-x-auto max-h-[400px]">
                        <table className="w-full text-sm text-left text-zinc-600 dark:text-zinc-400">
                            <thead className="sticky top-0 text-xs text-zinc-700 uppercase bg-zinc-50 dark:bg-zinc-900 dark:text-zinc-300 border-b border-zinc-200 dark:border-zinc-800">
                                <tr>
                                    <th className="px-6 py-4 font-semibold">Month</th>
                                    <th className="px-6 py-4 font-semibold text-right">Principal</th>
                                    <th className="px-6 py-4 font-semibold text-right">Interest</th>
                                    <th className="px-6 py-4 font-semibold text-right">Balance</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                                {schedule.map((row) => (
                                    <tr key={row.month} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
                                        <td className="px-6 py-3 font-medium text-zinc-900 dark:text-white">{row.month}</td>
                                        <td className="px-6 py-3 text-right">{formatCurrency(row.principal)}</td>
                                        <td className="px-6 py-3 text-right">{formatCurrency(row.interest)}</td>
                                        <td className="px-6 py-3 text-right font-medium">{formatCurrency(row.balance)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
