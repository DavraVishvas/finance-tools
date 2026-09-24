"use client";

import React, { useState, useEffect } from "react";
import ToolWrapper from "@/app/components/ToolWrapper";
import Button from "@/app/components/Button";
import { Calculate as CalculateIcon } from "@mui/icons-material";
import { calculateFixedDeposit, FDResult } from "@/app/lib/finance/calculations";
import { formatCurrency } from "@/app/utils/formatCurrency";
import { validateAmount, validateRate, validateTenure } from "@/app/utils/validation";

type FDCompoundingFrequency = 1 | 2 | 4 | 12;

const frequencyLabels: Record<FDCompoundingFrequency, string> = {
    1: "Yearly",
    2: "Half-Yearly",
    4: "Quarterly",
    12: "Monthly"
};

export default function FixedDepositCalculator() {
    const [principal, setPrincipal] = useState<number | "">(100000);
    const [principalText, setPrincipalText] = useState<string>("1,00,000");
    const [rate, setRate] = useState<number | "">(7.5);
    const [rateText, setRateText] = useState<string>("7.5");
    const [tenure, setTenure] = useState<number | "">(5);
    const [frequency, setFrequency] = useState<FDCompoundingFrequency>(4);
    
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const [result, setResult] = useState<FDResult>({
        maturityAmount: 0,
        totalInterest: 0
    });

    const [errors, setErrors] = useState<{ principal?: string; rate?: string; tenure?: string }>({});

    useEffect(() => {
        let hasError = false;
        const newErrors: { principal?: string; rate?: string; tenure?: string } = {};

        const numPrincipal = Number(principal);
        const numRate = Number(rate);
        const numTenure = Number(tenure);

        if (principal !== "") {
            const principalValidation = validateAmount(numPrincipal, "Deposit Amount", 1000, 100000000, false);
            if (!principalValidation.isValid) {
                newErrors.principal = principalValidation.error;
                hasError = true;
            }
        }
        
        if (rate !== "") {
            const rateValidation = validateRate(numRate, 0, 50, "Interest Rate");
            if (!rateValidation.isValid) {
                newErrors.rate = rateValidation.error;
                hasError = true;
            }
        }
        
        if (tenure !== "") {
            const tenureValidation = validateTenure(numTenure, 1, 50, "years", "Time Period");
            if (!tenureValidation.isValid) {
                newErrors.tenure = tenureValidation.error;
                hasError = true;
            }
        }

        setErrors(newErrors);

        if (!hasError && principal !== "" && rate !== "" && tenure !== "") {
            setResult(calculateFixedDeposit(numPrincipal, numRate, numTenure, frequency));
        } else {
            setResult({ maturityAmount: 0, totalInterest: 0 });
        }
    }, [principal, rate, tenure, frequency]);

    const handlePrincipalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value.replace(/[^0-9]/g, '');
        if (rawValue === '') {
            setPrincipal("");
            setPrincipalText("");
            return;
        }
        if (rawValue.length > 10) return;
        
        const numValue = Number(rawValue);
        setPrincipal(numValue);
        setPrincipalText(numValue.toLocaleString('en-IN'));
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

    const handleTenureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value.replace(/[^0-9]/g, '');
        if (rawValue === '') {
            setTenure("");
            return;
        }
        if (rawValue.length > 2) return;
        setTenure(Number(rawValue));
    };

    const principalPercent = result.maturityAmount > 0 ? (Number(principal) / result.maturityAmount) * 100 : 0;
    const interestPercent = result.maturityAmount > 0 ? (result.totalInterest / result.maturityAmount) * 100 : 0;

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Fixed Deposit Calculator",
        "applicationCategory": "FinanceApplication",
        "description": "Calculate maturity amount and interest earned on your fixed deposits."
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
                title="Fixed Deposit (FD) Calculator"
                description="Calculate maturity amount and interest earned on your fixed deposits."
            >
                <div className="flex flex-col lg:flex-row gap-8 w-full max-w-5xl mx-auto py-4">
                    {/* Input Section */}
                    <div className="w-full lg:w-1/2 space-y-6 bg-zinc-50 dark:bg-zinc-900/50 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800">
                        <div>
                            <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                                Deposit Amount
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 font-medium">₹</span>
                                <input
                                    suppressHydrationWarning
                                    type="text"
                                    value={principalText}
                                    onChange={handlePrincipalChange}
                                    placeholder="1,00,000"
                                    className={`w-full pl-8 pr-4 py-3 rounded-xl border ${errors.principal ? 'border-red-500 focus:ring-red-500' : 'border-zinc-200 dark:border-zinc-800 focus:ring-blue-500'} bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:ring-2 outline-none transition-all`}
                                />
                            </div>
                            {errors.principal && <p className="text-red-500 text-xs mt-1">{errors.principal}</p>}
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                                    Interest Rate (p.a)
                                </label>
                                <div className="relative">
                                    <input
                                        suppressHydrationWarning
                                        type="text"
                                        value={rateText}
                                        onChange={handleRateChange}
                                        placeholder="7.5"
                                        className={`w-full pl-4 pr-10 py-3 rounded-xl border ${errors.rate ? 'border-red-500 focus:ring-red-500' : 'border-zinc-200 dark:border-zinc-800 focus:ring-blue-500'} bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:ring-2 outline-none transition-all`}
                                    />
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 font-medium">%</span>
                                </div>
                                {errors.rate && <p className="text-red-500 text-xs mt-1">{errors.rate}</p>}
                            </div>

                            <div className="flex-1">
                                <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                                    Time Period (Years)
                                </label>
                                <div>
                                    <input
                                        suppressHydrationWarning
                                        type="text"
                                        value={tenure}
                                        onChange={handleTenureChange}
                                        placeholder="5"
                                        className={`w-full px-4 py-3 rounded-xl border ${errors.tenure ? 'border-red-500 focus:ring-red-500' : 'border-zinc-200 dark:border-zinc-800 focus:ring-blue-500'} bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:ring-2 outline-none transition-all`}
                                    />
                                </div>
                                {errors.tenure && <p className="text-red-500 text-xs mt-1">{errors.tenure}</p>}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                                Compounding Frequency
                            </label>
                            <div className="relative">
                                <button
                                    suppressHydrationWarning
                                    type="button"
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border ${isDropdownOpen ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-zinc-200 dark:border-zinc-800'} bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all`}
                                >
                                    <span className="capitalize font-medium">{frequencyLabels[frequency]}</span>
                                    <svg className={`w-4 h-4 text-zinc-500 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                </button>

                                {isDropdownOpen && (
                                    <>
                                        <div className="fixed inset-0 z-10" onClick={() => setIsDropdownOpen(false)}></div>
                                        <div className="absolute z-20 mt-2 w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 shadow-xl overflow-hidden py-1.5 animate-in fade-in zoom-in-95 duration-100">
                                            {([1, 2, 4, 12] as FDCompoundingFrequency[]).map((f) => (
                                                <Button
                                                    key={f}
                                                    variant="ghost"
                                                    fullWidth
                                                    className={`justify-center !rounded-none py-2.5 text-sm transition-colors ${frequency === f ? "bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold hover:bg-blue-100 dark:hover:bg-blue-500/20" : "text-zinc-700 dark:text-zinc-300 font-medium"}`}
                                                    onClick={() => { setFrequency(f); setIsDropdownOpen(false); }}
                                                >
                                                    {frequencyLabels[f]}
                                                </Button>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                            <p className="text-xs text-zinc-500 mt-2">Banks typically compound FD interest quarterly.</p>
                        </div>
                    </div>

                    {/* Result Section */}
                    <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 bg-zinc-100 dark:bg-zinc-900/50 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
                        <div className="flex flex-col items-center mb-6">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400 mb-4">
                                <CalculateIcon className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-medium text-zinc-600 dark:text-zinc-400 mb-2">Total Maturity Value</h3>
                            <p className="text-4xl font-bold text-zinc-900 dark:text-white break-all text-center">
                                {formatCurrency(result.maturityAmount)}
                            </p>
                        </div>

                        <div className="w-full space-y-4 mb-6">
                            <div className="flex justify-between items-start py-2 border-b border-zinc-200 dark:border-zinc-800">
                                <span className="text-zinc-600 dark:text-zinc-400 shrink-0">Principal Amount</span>
                                <span className="font-semibold text-zinc-900 dark:text-white break-all text-right ml-4">{formatCurrency(Number(principal))}</span>
                            </div>
                            <div className="flex justify-between items-start py-2 border-b border-zinc-200 dark:border-zinc-800">
                                <span className="text-zinc-600 dark:text-zinc-400 shrink-0">Total Interest Earned</span>
                                <span className="font-semibold text-sky-600 dark:text-sky-400 break-all text-right ml-4">{formatCurrency(result.totalInterest)}</span>
                            </div>
                        </div>

                        {/* Progress Bar / Breakdown */}
                        {result.maturityAmount > 0 && (
                            <div className="w-full mt-2">
                                <div className="w-full h-3 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden flex">
                                    <div className="bg-zinc-400 dark:bg-zinc-600 h-full transition-all duration-500" style={{ width: `${principalPercent}%` }} title="Principal Amount" />
                                    <div className="bg-sky-500 h-full transition-all duration-500" style={{ width: `${interestPercent}%` }} title="Interest Earned" />
                                </div>
                                <div className="flex justify-between text-xs mt-3 px-1">
                                    <span className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400 font-medium">
                                        <div className="w-2.5 h-2.5 rounded-full bg-zinc-400 dark:bg-zinc-600"></div> Principal
                                    </span>
                                    <span className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400 font-medium">
                                        <div className="w-2.5 h-2.5 rounded-full bg-sky-500"></div> Interest
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
