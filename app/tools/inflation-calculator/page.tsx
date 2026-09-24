"use client";

import React, { useState, useEffect } from "react";
import ToolWrapper from "@/app/components/ToolWrapper";
import { ShowChart as ShowChartIcon } from "@mui/icons-material";
import { calculateInflation, InflationResult } from "@/app/lib/finance/calculations";
import { formatCurrency } from "@/app/utils/formatCurrency";
import { validateAmount, validateRate, validateTenure } from "@/app/utils/validation";

export default function InflationCalculator() {
    const [amount, setAmount] = useState<number | "">(100000);
    const [amountText, setAmountText] = useState<string>("1,00,000");
    const [rate, setRate] = useState<number | "">(6);
    const [rateText, setRateText] = useState<string>("6");
    const [tenure, setTenure] = useState<number | "">(10);

    const [result, setResult] = useState<InflationResult>({
        futureValue: 0,
        degradedValue: 0
    });

    const [errors, setErrors] = useState<{ amount?: string; rate?: string; tenure?: string }>({});

    useEffect(() => {
        let hasError = false;
        const newErrors: { amount?: string; rate?: string; tenure?: string } = {};

        const numAmount = Number(amount);
        const numRate = Number(rate);
        const numTenure = Number(tenure);

        if (amount !== "") {
            const amountValidation = validateAmount(numAmount, "Current Amount", 100, 1000000000, false);
            if (!amountValidation.isValid) {
                newErrors.amount = amountValidation.error;
                hasError = true;
            }
        }
        
        if (rate !== "") {
            const rateValidation = validateRate(numRate, 0.1, 100, "Inflation Rate"); // Inflation can be high
            if (!rateValidation.isValid) {
                newErrors.rate = rateValidation.error;
                hasError = true;
            }
        }
        
        if (tenure !== "") {
            const tenureValidation = validateTenure(numTenure, 1, 100, "years", "Years in Future");
            if (!tenureValidation.isValid) {
                newErrors.tenure = tenureValidation.error;
                hasError = true;
            }
        }

        setErrors(newErrors);

        if (!hasError && amount !== "" && rate !== "" && tenure !== "") {
            setResult(calculateInflation(numAmount, numRate, numTenure));
        } else {
            setResult({ futureValue: 0, degradedValue: 0 });
        }
    }, [amount, rate, tenure]);

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value.replace(/[^0-9]/g, '');
        if (rawValue === '') {
            setAmount("");
            setAmountText("");
            return;
        }
        if (rawValue.length > 10) return;
        
        const numValue = Number(rawValue);
        setAmount(numValue);
        setAmountText(numValue.toLocaleString('en-IN'));
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

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Inflation Calculator",
        "applicationCategory": "FinanceApplication",
        "description": "See how inflation degrades the purchasing power of your money over time."
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
                title="Inflation Calculator"
                description="See how inflation degrades the purchasing power of your money over time."
            >
                <div className="flex flex-col lg:flex-row gap-8 w-full max-w-5xl mx-auto py-4">
                    {/* Input Section */}
                    <div className="w-full lg:w-1/2 space-y-6 bg-zinc-50 dark:bg-zinc-900/50 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800">
                        <div>
                            <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                                Current Amount / Expense
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 font-medium">₹</span>
                                <input
                                    suppressHydrationWarning
                                    type="text"
                                    value={amountText}
                                    onChange={handleAmountChange}
                                    placeholder="1,00,000"
                                    className={`w-full pl-8 pr-4 py-3 rounded-xl border ${errors.amount ? 'border-red-500 focus:ring-red-500' : 'border-zinc-200 dark:border-zinc-800 focus:ring-rose-500'} bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:ring-2 outline-none transition-all`}
                                />
                            </div>
                            {errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount}</p>}
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                                    Inflation Rate
                                </label>
                                <div className="relative">
                                    <input
                                        suppressHydrationWarning
                                        type="text"
                                        value={rateText}
                                        onChange={handleRateChange}
                                        placeholder="6"
                                        className={`w-full pl-4 pr-10 py-3 rounded-xl border ${errors.rate ? 'border-red-500 focus:ring-red-500' : 'border-zinc-200 dark:border-zinc-800 focus:ring-rose-500'} bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:ring-2 outline-none transition-all`}
                                    />
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 font-medium">%</span>
                                </div>
                                {errors.rate && <p className="text-red-500 text-xs mt-1">{errors.rate}</p>}
                            </div>

                            <div className="flex-1">
                                <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                                    Years in Future
                                </label>
                                <div>
                                    <input
                                        suppressHydrationWarning
                                        type="text"
                                        value={tenure}
                                        onChange={handleTenureChange}
                                        placeholder="10"
                                        className={`w-full px-4 py-3 rounded-xl border ${errors.tenure ? 'border-red-500 focus:ring-red-500' : 'border-zinc-200 dark:border-zinc-800 focus:ring-rose-500'} bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:ring-2 outline-none transition-all`}
                                    />
                                </div>
                                {errors.tenure && <p className="text-red-500 text-xs mt-1">{errors.tenure}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Result Section */}
                    <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 bg-rose-50 dark:bg-rose-950/20 rounded-2xl border border-rose-100 dark:border-rose-900/30 overflow-hidden">
                        
                        <div className="flex flex-col items-center mb-8 pb-8 border-b border-rose-100 dark:border-rose-900/30">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-rose-100 text-rose-600 dark:bg-rose-900/50 dark:text-rose-400 mb-4">
                                <ShowChartIcon className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-medium text-zinc-600 dark:text-zinc-400 mb-2">Future Cost</h3>
                            <p className="text-5xl font-bold text-zinc-900 dark:text-white break-all text-center">
                                {formatCurrency(result.futureValue)}
                            </p>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-3 text-center max-w-sm">
                                To buy something that costs <strong>{formatCurrency(Number(amount))}</strong> today, you will need <strong>{formatCurrency(result.futureValue)}</strong> in {Number(tenure)} years.
                            </p>
                        </div>

                        <div className="w-full text-center">
                            <h3 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">Purchasing Power Loss</h3>
                            <p className="text-rose-600 dark:text-rose-400 text-2xl font-bold">
                                {formatCurrency(result.degradedValue)}
                            </p>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 max-w-sm mx-auto">
                                If you keep <strong>{formatCurrency(Number(amount))}</strong> in cash for {Number(tenure)} years, its real value (buying power) will drop to just <strong>{formatCurrency(result.degradedValue)}</strong>.
                            </p>
                        </div>
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
