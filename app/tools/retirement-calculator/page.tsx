"use client";

import React, { useState, useEffect } from "react";
import ToolWrapper from "@/app/components/ToolWrapper";
import { TrendingUp as TrendingUpIcon } from "@mui/icons-material";
import { calculateRetirementCorpus, RetirementResult } from "@/app/lib/finance/calculations";
import { formatCurrency } from "@/app/utils/formatCurrency";
import { validateAmount, validateRate, validateAge } from "@/app/utils/validation";

export default function RetirementCalculator() {
    const [currentAge, setCurrentAge] = useState<number | "">(30);
    const [retirementAge, setRetirementAge] = useState<number | "">(60);
    const [currentSavings, setCurrentSavings] = useState<number | "">(500000);
    const [currentSavingsText, setCurrentSavingsText] = useState<string>("5,00,000");
    const [monthlyInvestment, setMonthlyInvestment] = useState<number | "">(10000);
    const [monthlyInvestmentText, setMonthlyInvestmentText] = useState<string>("10,000");
    const [rate, setRate] = useState<number | "">(12);
    const [rateText, setRateText] = useState<string>("12");

    const [result, setResult] = useState<RetirementResult>({
        totalCorpus: 0,
        totalInvested: 0,
        wealthGained: 0
    });

    const [errors, setErrors] = useState<{ age?: string; currentSavings?: string; monthlyInvestment?: string; rate?: string }>({});

    useEffect(() => {
        let hasError = false;
        const newErrors: { age?: string; currentSavings?: string; monthlyInvestment?: string; rate?: string } = {};

        const numCurrentAge = Number(currentAge);
        const numRetirementAge = Number(retirementAge);
        const numCurrentSavings = Number(currentSavings);
        const numMonthlyInvestment = Number(monthlyInvestment);
        const numRate = Number(rate);

        if (currentAge !== "" && retirementAge !== "") {
            const ageValidation = validateAge(numCurrentAge, numRetirementAge, 1, 100);
            if (!ageValidation.isValid) {
                newErrors.age = ageValidation.error;
                hasError = true;
            }
        }

        if (currentSavings !== "") {
            const savingsValidation = validateAmount(numCurrentSavings, "Current Savings", 0, 1000000000, true);
            if (!savingsValidation.isValid) {
                newErrors.currentSavings = savingsValidation.error;
                hasError = true;
            }
        }

        if (monthlyInvestment !== "") {
            const sipValidation = validateAmount(numMonthlyInvestment, "Monthly Investment", 0, 100000000, true);
            if (!sipValidation.isValid) {
                newErrors.monthlyInvestment = sipValidation.error;
                hasError = true;
            }
        }
        
        if (rate !== "") {
            const rateValidation = validateRate(numRate, 0, 50, "Expected Return Rate");
            if (!rateValidation.isValid) {
                newErrors.rate = rateValidation.error;
                hasError = true;
            }
        }

        setErrors(newErrors);

        if (!hasError && currentAge !== "" && retirementAge !== "" && rate !== "") {
            setResult(calculateRetirementCorpus(numCurrentAge, numRetirementAge, numCurrentSavings, numMonthlyInvestment, numRate));
        } else {
            setResult({ totalCorpus: 0, totalInvested: 0, wealthGained: 0 });
        }
    }, [currentAge, retirementAge, currentSavings, monthlyInvestment, rate]);

    const handleNumberInput = (setter: any, textSetter: any | null = null, maxLength: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value.replace(/[^0-9]/g, '');
        if (rawValue === '') {
            setter("");
            if (textSetter) textSetter("");
            return;
        }
        if (rawValue.length > maxLength) return;
        
        const numValue = Number(rawValue);
        setter(numValue);
        if (textSetter) textSetter(numValue.toLocaleString('en-IN'));
    };

    const handleRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let val = e.target.value.replace(/[^0-9.]/g, '');
        const parts = val.split('.');
        if (parts.length > 2) {
            val = parts[0] + '.' + parts.slice(1).join('');
        }
        if (val.length > 5) return;
        
        setRateText(val);
        setRate(val === "" || val === "." ? "" : Number(val));
    };

    const principalPercent = result.totalCorpus > 0 ? (result.totalInvested / result.totalCorpus) * 100 : 0;
    const wealthPercent = result.totalCorpus > 0 ? (result.wealthGained / result.totalCorpus) * 100 : 0;

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Retirement Calculator",
        "applicationCategory": "FinanceApplication",
        "description": "Plan for your golden years by estimating your retirement corpus."
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                suppressHydrationWarning
            />
                        <div className="w-full max-w-[1600px] mx-auto flex flex-col xl:flex-row justify-center items-start gap-8 px-4 relative">
                {/* Left Ads (Sticky) */}
                <div className="hidden xl:flex flex-col w-[300px] shrink-0 sticky top-24 gap-6">
                    <div className="w-[300px] min-h-[250px] flex items-center justify-center relative">
                        <iframe src="/ad1.html" width="300" height="250" style={{ border: 'none', overflow: 'hidden' }} scrolling="no" title="Advertisement" />
                    </div>
                    <div className="w-[300px] min-h-[250px] flex items-center justify-center relative">
                        <iframe src="/ad2.html" width="300" height="250" style={{ border: 'none', overflow: 'hidden' }} scrolling="no" title="Advertisement" />
                    </div>
                    <div className="w-[300px] min-h-[250px] flex items-center justify-center relative">
                        <iframe src="/ad1.html" width="300" height="250" style={{ border: 'none', overflow: 'hidden' }} scrolling="no" title="Advertisement" />
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 w-full max-w-5xl min-w-0 flex flex-col gap-8">
                    <ToolWrapper
                title="Retirement Calculator"
                description="Plan for your golden years by estimating your retirement corpus."
            >
                <div className="flex flex-col lg:flex-row gap-8 w-full max-w-5xl mx-auto py-4">
                    {/* Input Section */}
                    <div className="w-full lg:w-1/2 space-y-6 bg-zinc-50 dark:bg-zinc-900/50 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800">
                        
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                                    Current Age
                                </label>
                                <input
                                    suppressHydrationWarning
                                    type="text"
                                    value={currentAge}
                                    onChange={handleNumberInput(setCurrentAge, null, 2)}
                                    placeholder="30"
                                    className={`w-full px-4 py-3 rounded-xl border ${errors.age ? 'border-red-500 focus:ring-red-500' : 'border-zinc-200 dark:border-zinc-800 focus:ring-blue-500'} bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:ring-2 outline-none transition-all`}
                                />
                            </div>
                            <div className="flex-1">
                                <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                                    Retirement Age
                                </label>
                                <input
                                    suppressHydrationWarning
                                    type="text"
                                    value={retirementAge}
                                    onChange={handleNumberInput(setRetirementAge, null, 3)}
                                    placeholder="60"
                                    className={`w-full px-4 py-3 rounded-xl border ${errors.age ? 'border-red-500 focus:ring-red-500' : 'border-zinc-200 dark:border-zinc-800 focus:ring-blue-500'} bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:ring-2 outline-none transition-all`}
                                />
                            </div>
                        </div>
                        {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age}</p>}

                        <div>
                            <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                                Current Savings
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 font-medium">₹</span>
                                <input
                                    suppressHydrationWarning
                                    type="text"
                                    value={currentSavingsText}
                                    onChange={handleNumberInput(setCurrentSavings, setCurrentSavingsText, 10)}
                                    placeholder="5,00,000"
                                    className={`w-full pl-8 pr-4 py-3 rounded-xl border ${errors.currentSavings ? 'border-red-500 focus:ring-red-500' : 'border-zinc-200 dark:border-zinc-800 focus:ring-blue-500'} bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:ring-2 outline-none transition-all`}
                                />
                            </div>
                            {errors.currentSavings && <p className="text-red-500 text-xs mt-1">{errors.currentSavings}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                                Monthly Investment (SIP)
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 font-medium">₹</span>
                                <input
                                    suppressHydrationWarning
                                    type="text"
                                    value={monthlyInvestmentText}
                                    onChange={handleNumberInput(setMonthlyInvestment, setMonthlyInvestmentText, 8)}
                                    placeholder="10,000"
                                    className={`w-full pl-8 pr-4 py-3 rounded-xl border ${errors.monthlyInvestment ? 'border-red-500 focus:ring-red-500' : 'border-zinc-200 dark:border-zinc-800 focus:ring-blue-500'} bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:ring-2 outline-none transition-all`}
                                />
                            </div>
                            {errors.monthlyInvestment && <p className="text-red-500 text-xs mt-1">{errors.monthlyInvestment}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                                Expected Return Rate (p.a)
                            </label>
                            <div className="relative">
                                <input
                                    suppressHydrationWarning
                                    type="text"
                                    value={rateText}
                                    onChange={handleRateChange}
                                    placeholder="12"
                                    className={`w-full pl-4 pr-10 py-3 rounded-xl border ${errors.rate ? 'border-red-500 focus:ring-red-500' : 'border-zinc-200 dark:border-zinc-800 focus:ring-blue-500'} bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:ring-2 outline-none transition-all`}
                                />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 font-medium">%</span>
                            </div>
                            {errors.rate && <p className="text-red-500 text-xs mt-1">{errors.rate}</p>}
                        </div>
                    </div>

                    {/* Result Section */}
                    <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 bg-zinc-100 dark:bg-zinc-900/50 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
                        <div className="flex flex-col items-center mb-6">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400 mb-4">
                                <TrendingUpIcon className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-medium text-zinc-600 dark:text-zinc-400 mb-2">Estimated Retirement Corpus</h3>
                            <p className="text-4xl font-bold text-zinc-900 dark:text-white break-all text-center">
                                {formatCurrency(result.totalCorpus)}
                            </p>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
                                At age {retirementAge}
                            </p>
                        </div>

                        <div className="w-full space-y-4 mb-6">
                            <div className="flex justify-between items-start py-2 border-b border-zinc-200 dark:border-zinc-800">
                                <span className="text-zinc-600 dark:text-zinc-400 shrink-0">Total Invested</span>
                                <span className="font-semibold text-zinc-900 dark:text-white break-all text-right ml-4">{formatCurrency(result.totalInvested)}</span>
                            </div>
                            <div className="flex justify-between items-start py-2 border-b border-zinc-200 dark:border-zinc-800">
                                <span className="text-zinc-600 dark:text-zinc-400 shrink-0">Wealth Gained</span>
                                <span className="font-semibold text-amber-600 dark:text-amber-400 break-all text-right ml-4">{formatCurrency(result.wealthGained)}</span>
                            </div>
                        </div>

                        {/* Progress Bar / Breakdown */}
                        {result.totalCorpus > 0 && (
                            <div className="w-full mt-2">
                                <div className="w-full h-3 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden flex">
                                    <div className="bg-blue-500 h-full transition-all duration-500" style={{ width: `${principalPercent}%` }} title="Total Invested" />
                                    <div className="bg-amber-500 h-full transition-all duration-500" style={{ width: `${wealthPercent}%` }} title="Wealth Gained" />
                                </div>
                                <div className="flex justify-between text-xs mt-3 px-1">
                                    <span className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400 font-medium">
                                        <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div> Invested
                                    </span>
                                    <span className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400 font-medium">
                                        <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div> Returns
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </ToolWrapper>

                </div> {/* End Main Content Area */}
            
                {/* Right Ads (Sticky) */}
                <div className="hidden xl:flex flex-col w-[300px] shrink-0 sticky top-24 gap-6">
                    <div className="w-[300px] min-h-[250px] flex items-center justify-center relative">
                        <iframe src="/ad2.html" width="300" height="250" style={{ border: 'none', overflow: 'hidden' }} scrolling="no" title="Advertisement" />
                    </div>
                    <div className="w-[300px] min-h-[250px] flex items-center justify-center relative">
                        <iframe src="/ad1.html" width="300" height="250" style={{ border: 'none', overflow: 'hidden' }} scrolling="no" title="Advertisement" />
                    </div>
                    <div className="w-[300px] min-h-[250px] flex items-center justify-center relative">
                        <iframe src="/ad2.html" width="300" height="250" style={{ border: 'none', overflow: 'hidden' }} scrolling="no" title="Advertisement" />
                    </div>
                </div>
            </div>
        </>
    );
}
