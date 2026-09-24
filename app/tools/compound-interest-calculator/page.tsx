"use client";

import React, { useState, useEffect } from "react";
import ToolWrapper from "@/app/components/ToolWrapper";
import Button from "@/app/components/Button";
import { ShowChart as ShowChartIcon } from "@mui/icons-material";
import { calculateCompoundInterest } from "@/app/lib/finance/calculations";
import { formatCurrency } from "@/app/utils/formatCurrency";
import { validateAmount, validateRate, validateTenure } from "@/app/utils/validation";

type CompoundingFrequency = 1 | 2 | 4 | 12;

const frequencyLabels: Record<CompoundingFrequency, string> = {
    1: "Annually",
    2: "Semi-Annually",
    4: "Quarterly",
    12: "Monthly"
};

export default function CompoundInterestCalculator() {
    const [amount, setAmount] = useState<number | "">(10000);
    const [amountText, setAmountText] = useState<string>("10,000");
    const [rate, setRate] = useState<number | "">(10);
    const [rateText, setRateText] = useState<string>("10");
    const [tenure, setTenure] = useState<number | "">(10);
    const [frequency, setFrequency] = useState<CompoundingFrequency>(1);
    
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const [principalAmount, setPrincipalAmount] = useState<number>(0);
    const [totalInterest, setTotalInterest] = useState<number>(0);
    const [totalValue, setTotalValue] = useState<number>(0);

    const [errors, setErrors] = useState<{ amount?: string; rate?: string; tenure?: string }>({});

    useEffect(() => {
        let hasError = false;
        const newErrors: { amount?: string; rate?: string; tenure?: string } = {};

        const numAmount = Number(amount);
        const numRate = Number(rate);
        const numTenure = Number(tenure);

        if (amount !== "") {
            const amountValidation = validateAmount(numAmount, "Principal Amount", 100, 1000000000, false);
            if (!amountValidation.isValid) {
                newErrors.amount = amountValidation.error;
                hasError = true;
            }
        }
        
        if (rate !== "") {
            const rateValidation = validateRate(numRate, 0, 50, "Annual Interest Rate");
            if (!rateValidation.isValid) {
                newErrors.rate = rateValidation.error;
                hasError = true;
            }
        }
        
        if (tenure !== "") {
            const tenureValidation = validateTenure(numTenure, 1, 100, "years", "Time Period");
            if (!tenureValidation.isValid) {
                newErrors.tenure = tenureValidation.error;
                hasError = true;
            }
        }

        setErrors(newErrors);

        if (!hasError && amount !== "" && rate !== "" && tenure !== "") {
            const result = calculateCompoundInterest(numAmount, numRate, numTenure, frequency);
            setPrincipalAmount(result.principalAmount);
            setTotalInterest(result.totalInterest);
            setTotalValue(result.totalValue);
        } else {
            setPrincipalAmount(0);
            setTotalInterest(0);
            setTotalValue(0);
        }
    }, [amount, rate, tenure, frequency]);

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

    const principalPercent = totalValue > 0 ? (principalAmount / totalValue) * 100 : 0;
    const interestPercent = totalValue > 0 ? (totalInterest / totalValue) * 100 : 0;

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Compound Interest Calculator",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Any",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        },
        "description": "Calculate the power of compounding on your investments over time."
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                suppressHydrationWarning
            />
                        <div className="w-full max-w-[1600px] mx-auto flex flex-col xl:flex-row justify-center items-start gap-8 px-4 relative">

                <div className="hidden xl:flex flex-col w-[300px] shrink-0 sticky top-24 gap-6">



                </div>

                {/* Main Content */}
                <div className="flex-1 w-full max-w-5xl min-w-0 flex flex-col gap-8">
                    <ToolWrapper
                title="Compound Interest Calculator"
                description="Calculate the power of compounding on your investments over time."
            >
                <div className="flex flex-col lg:flex-row gap-8 w-full max-w-5xl mx-auto py-4">
                    {/* Input Section */}
                    <div className="w-full lg:w-1/2 space-y-6 bg-zinc-50 dark:bg-zinc-900/50 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800">
                        <div>
                            <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                                Principal Amount
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 font-medium">₹</span>
                                <input
                                    suppressHydrationWarning
                                    type="text"
                                    value={amountText}
                                    onChange={handleAmountChange}
                                    placeholder="10,000"
                                    className={`w-full pl-8 pr-4 py-3 rounded-xl border ${errors.amount ? 'border-red-500 focus:ring-red-500' : 'border-zinc-200 dark:border-zinc-800 focus:ring-blue-500'} bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:ring-2 outline-none transition-all`}
                                />
                            </div>
                            {errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount}</p>}
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                                    Annual Interest Rate
                                </label>
                                <div className="relative">
                                    <input
                                        suppressHydrationWarning
                                        type="text"
                                        value={rateText}
                                        onChange={handleRateChange}
                                        placeholder="10"
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
                                        placeholder="10"
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
                                            {([1, 2, 4, 12] as CompoundingFrequency[]).map((f) => (
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
                        </div>
                    </div>

                    {/* Result Section */}
                    <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 bg-zinc-100 dark:bg-zinc-900/50 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
                        <div className="flex flex-col items-center mb-6">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400 mb-4">
                                <ShowChartIcon className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-medium text-zinc-600 dark:text-zinc-400 mb-2">Total Value</h3>
                            <p className="text-4xl font-bold text-zinc-900 dark:text-white break-all text-center">
                                {formatCurrency(totalValue)}
                            </p>
                        </div>

                        <div className="w-full space-y-4 mb-6">
                            <div className="flex justify-between items-start py-2 border-b border-zinc-200 dark:border-zinc-800">
                                <span className="text-zinc-600 dark:text-zinc-400 shrink-0">Principal Amount</span>
                                <span className="font-semibold text-zinc-900 dark:text-white break-all text-right ml-4">{formatCurrency(principalAmount)}</span>
                            </div>
                            <div className="flex justify-between items-start py-2 border-b border-zinc-200 dark:border-zinc-800">
                                <span className="text-zinc-600 dark:text-zinc-400 shrink-0">Total Interest</span>
                                <span className="font-semibold text-purple-600 dark:text-purple-400 break-all text-right ml-4">{formatCurrency(totalInterest)}</span>
                            </div>
                        </div>

                        {/* Progress Bar / Breakdown */}
                        {totalValue > 0 && (
                            <div className="w-full mt-2">
                                <div className="w-full h-3 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden flex">
                                    <div className="bg-blue-500 h-full transition-all duration-500" style={{ width: `${principalPercent}%` }} title="Principal Amount" />
                                    <div className="bg-purple-500 h-full transition-all duration-500" style={{ width: `${interestPercent}%` }} title="Total Interest Earned" />
                                </div>
                                <div className="flex justify-between text-xs mt-3 px-1">
                                    <span className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400 font-medium">
                                        <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div> Principal Amount
                                    </span>
                                    <span className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400 font-medium">
                                        <div className="w-2.5 h-2.5 rounded-full bg-purple-500"></div> Total Interest
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </ToolWrapper>

            {/* SEO Content Section */}
            <div className="mx-auto w-full max-w-4xl px-4 pb-16 sm:px-6 lg:px-8">
                <div className="prose prose-zinc dark:prose-invert max-w-none text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mt-12 mb-6">Free Compound Interest Calculator</h2>
                    <p className="text-lg mb-8">
                        Albert Einstein is reputed to have said, &quot;Compound interest is the eighth wonder of the world. He who understands it, earns it... he who doesn&apos;t... pays it.&quot; Our free compound interest calculator helps you discover how your investments can grow over time through the power of compounding.
                    </p>

                    <h3 className="text-2xl font-semibold text-zinc-900 dark:text-white mt-10 mb-4">What is Compound Interest?</h3>
                    <p className="mb-6">
                        Compound interest is the interest on a deposit or loan calculated based on both the initial principal and the accumulated interest from previous periods. In simple terms, it is &quot;interest on interest,&quot; which makes a sum grow at a faster rate than simple interest, which is calculated only on the principal amount.
                    </p>

                    <h3 className="text-2xl font-semibold text-zinc-900 dark:text-white mt-10 mb-4">How to use this calculator</h3>
                    <p className="mb-4">Follow these simple steps to calculate your returns:</p>
                    <ol className="list-decimal pl-6 space-y-4 mb-8">
                        <li><strong>Principal Amount:</strong> Enter your initial investment or deposit amount.</li>
                        <li><strong>Annual Interest Rate:</strong> Enter the yearly interest rate you expect to earn.</li>
                        <li><strong>Time Period:</strong> Specify how many years you plan to keep the money invested.</li>
                        <li><strong>Compounding Frequency:</strong> Choose how often the interest is added to your principal (Annually, Semi-Annually, Quarterly, or Monthly). More frequent compounding leads to slightly higher total returns.</li>
                    </ol>

                    <h3 className="text-2xl font-semibold text-zinc-900 dark:text-white mt-10 mb-4">Why Compounding Frequency Matters</h3>
                    <p className="mb-4">
                        The frequency of compounding refers to the number of times interest is calculated and added to the principal in a year. The more frequently interest is compounded, the higher the total amount will be at the end of the term.
                    </p>
                    <ul className="list-disc pl-6 space-y-3 mb-8">
                        <li><strong>Annually:</strong> Interest is calculated once a year (1 time).</li>
                        <li><strong>Semi-Annually:</strong> Interest is calculated twice a year (2 times).</li>
                        <li><strong>Quarterly:</strong> Interest is calculated every three months (4 times).</li>
                        <li><strong>Monthly:</strong> Interest is calculated every month (12 times).</li>
                    </ul>
                </div>
            </div>

                </div> {/* End Main Content Area */}
            

                <div className="hidden xl:flex flex-col w-[300px] shrink-0 sticky top-24 gap-6">



                </div>
            </div>
        </>
    );
}
