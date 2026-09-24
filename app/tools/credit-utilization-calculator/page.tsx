"use client";

import React, { useState, useEffect } from "react";
import ToolWrapper from "@/app/components/ToolWrapper";
import { Calculate as CalculateIcon } from "@mui/icons-material";
import { calculateCreditUtilization, CreditUtilizationResult } from "@/app/lib/finance/calculations";
import { formatCurrency } from "@/app/utils/formatCurrency";
import { validateAmount } from "@/app/utils/validation";

export default function CreditUtilizationCalculator() {
    const [limit, setLimit] = useState<number | "">(100000);
    const [limitText, setLimitText] = useState<string>("1,00,000");
    const [balance, setBalance] = useState<number | "">(25000);
    const [balanceText, setBalanceText] = useState<string>("25,000");

    const [result, setResult] = useState<CreditUtilizationResult>({
        utilizationRatio: 0,
        status: "Excellent",
        statusColor: "text-green-500"
    });

    const [errors, setErrors] = useState<{ limit?: string; balance?: string }>({});

    useEffect(() => {
        let hasError = false;
        const newErrors: { limit?: string; balance?: string } = {};

        const numLimit = Number(limit);
        const numBalance = Number(balance);

        if (limit !== "") {
            const limitValidation = validateAmount(numLimit, "Total Credit Limit", 1000, 10000000, false);
            if (!limitValidation.isValid) {
                newErrors.limit = limitValidation.error;
                hasError = true;
            }
        }
        
        if (balance !== "") {
            const balanceValidation = validateAmount(numBalance, "Outstanding Balance", 0, 10000000, true);
            if (!balanceValidation.isValid) {
                newErrors.balance = balanceValidation.error;
                hasError = true;
            }
        }

        setErrors(newErrors);

        if (!hasError && limit !== "" && balance !== "") {
            setResult(calculateCreditUtilization(numLimit, numBalance));
        } else {
            setResult({ utilizationRatio: 0, status: "Excellent", statusColor: "text-green-500" });
        }
    }, [limit, balance]);

    const handleLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value.replace(/[^0-9]/g, '');
        if (rawValue === '') {
            setLimit("");
            setLimitText("");
            return;
        }
        if (rawValue.length > 10) return;
        
        const numValue = Number(rawValue);
        setLimit(numValue);
        setLimitText(numValue.toLocaleString('en-IN'));
    };

    const handleBalanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value.replace(/[^0-9]/g, '');
        if (rawValue === '') {
            setBalance("");
            setBalanceText("");
            return;
        }
        if (rawValue.length > 10) return;
        
        const numValue = Number(rawValue);
        setBalance(numValue);
        setBalanceText(numValue.toLocaleString('en-IN'));
    };

    // Calculate rotation for the gauge needle (-90deg to +90deg)
    // 0% = -90deg, 100% = +90deg
    const needleRotation = Math.min(Math.max((result.utilizationRatio / 100) * 180 - 90, -90), 90);

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Credit Utilization Calculator",
        "applicationCategory": "FinanceApplication",
        "description": "Calculate your credit utilization ratio to understand and improve your credit score health."
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
                title="Credit Utilization Calculator"
                description="Calculate your credit utilization ratio to understand and improve your credit score health."
            >
                <div className="flex flex-col lg:flex-row gap-8 w-full max-w-5xl mx-auto py-4">
                    {/* Input Section */}
                    <div className="w-full lg:w-1/2 space-y-6 bg-zinc-50 dark:bg-zinc-900/50 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800">
                        <div>
                            <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                                Total Credit Limit
                            </label>
                            <p className="text-xs text-zinc-500 mb-2">Combined limit of all your credit cards</p>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 font-medium">₹</span>
                                <input
                                    suppressHydrationWarning
                                    type="text"
                                    value={limitText}
                                    onChange={handleLimitChange}
                                    placeholder="1,00,000"
                                    className={`w-full pl-8 pr-4 py-3 rounded-xl border ${errors.limit ? 'border-red-500 focus:ring-red-500' : 'border-zinc-200 dark:border-zinc-800 focus:ring-teal-500'} bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:ring-2 outline-none transition-all`}
                                />
                            </div>
                            {errors.limit && <p className="text-red-500 text-xs mt-1">{errors.limit}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                                Total Outstanding Balance
                            </label>
                            <p className="text-xs text-zinc-500 mb-2">Total amount currently owed across all cards</p>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 font-medium">₹</span>
                                <input
                                    suppressHydrationWarning
                                    type="text"
                                    value={balanceText}
                                    onChange={handleBalanceChange}
                                    placeholder="25,000"
                                    className={`w-full pl-8 pr-4 py-3 rounded-xl border ${errors.balance ? 'border-red-500 focus:ring-red-500' : 'border-zinc-200 dark:border-zinc-800 focus:ring-teal-500'} bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:ring-2 outline-none transition-all`}
                                />
                            </div>
                            {errors.balance && <p className="text-red-500 text-xs mt-1">{errors.balance}</p>}
                        </div>
                    </div>

                    {/* Result Section */}
                    <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 bg-teal-50 dark:bg-teal-950/20 rounded-2xl border border-teal-100 dark:border-teal-900/30 overflow-hidden text-center">
                        
                        <div className="relative w-64 h-32 mb-8 overflow-hidden">
                            {/* Gauge Background */}
                            <div className="absolute top-0 left-0 w-full h-64 rounded-full border-[24px] border-zinc-200 dark:border-zinc-800 box-border"></div>
                            {/* Gauge Color Segments */}
                            <div className="absolute top-0 left-0 w-full h-64 rounded-full border-[24px] border-transparent border-t-green-500 border-r-blue-500 border-b-yellow-500 border-l-red-500 box-border transform -rotate-45 opacity-80"></div>
                            
                            {/* Mask bottom half */}
                            <div className="absolute bottom-0 left-0 w-full h-32 bg-teal-50 dark:bg-zinc-950/50"></div>

                            {/* Needle */}
                            <div 
                                className="absolute bottom-0 left-1/2 w-1 h-32 bg-zinc-800 dark:bg-zinc-200 origin-bottom transition-transform duration-1000 ease-out z-10 rounded-t-full shadow-lg"
                                style={{ transform: `translateX(-50%) rotate(${needleRotation}deg)` }}
                            >
                                <div className="absolute -bottom-2 -left-1.5 w-4 h-4 rounded-full bg-zinc-900 dark:bg-zinc-100"></div>
                            </div>
                        </div>

                        <h3 className="text-xl font-medium text-zinc-600 dark:text-zinc-400 mb-2">Utilization Ratio</h3>
                        <div className="flex items-baseline gap-2 mb-2">
                            <p className="text-5xl font-bold text-zinc-900 dark:text-white">
                                {result.utilizationRatio}%
                            </p>
                        </div>
                        <p className={`text-xl font-bold ${result.statusColor}`}>
                            {result.status}
                        </p>
                        
                        <div className="mt-6 text-sm text-zinc-500 dark:text-zinc-400">
                            <p>0-10% (Excellent), 11-30% (Good), 31-50% (Fair), 51%+ (Poor)</p>
                        </div>
                    </div>
                </div>
            </ToolWrapper>

            <div className="mx-auto w-full max-w-4xl px-4 pb-16 sm:px-6 lg:px-8 mt-12">
                <div className="prose prose-zinc dark:prose-invert max-w-none text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-6">Why Credit Utilization Matters</h2>
                    <p className="text-lg mb-8">
                        Your credit utilization ratio is one of the most important factors in determining your credit score. It measures how much of your available credit you are currently using.
                    </p>
                    
                    <h3 className="text-2xl font-semibold text-zinc-900 dark:text-white mt-10 mb-4">The 30% Rule</h3>
                    <p className="mb-4">
                        Financial experts universally recommend keeping your credit utilization ratio below 30%. For example, if you have a total credit limit of ₹1,00,000, you should try to keep your outstanding balances below ₹30,000 at all times.
                    </p>
                    <p className="mb-6">
                        Those with the highest credit scores often keep their utilization below 10%. High utilization indicates to lenders that you might be relying too heavily on borrowed money and could be a higher risk for default.
                    </p>

                    <h3 className="text-2xl font-semibold text-zinc-900 dark:text-white mt-10 mb-4">How to Improve Your Ratio</h3>
                    <ul className="list-disc pl-6 space-y-3 mb-8">
                        <li><strong>Pay down balances:</strong> The most direct way is to pay off your credit card debt.</li>
                        <li><strong>Request a limit increase:</strong> Ask your credit card issuer for a higher limit (but don&apos;t increase your spending).</li>
                        <li><strong>Keep cards open:</strong> Don&apos;t close old credit cards, as closing them reduces your total available credit limit and increases your utilization ratio.</li>
                    </ul>
                </div>
            </div>

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
