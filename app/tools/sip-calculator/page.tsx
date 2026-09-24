"use client";

import React, { useState, useEffect } from "react";
import ToolWrapper from "@/app/components/ToolWrapper";
import Button from "@/app/components/Button";
import { TrendingUp as TrendingUpIcon } from "@mui/icons-material";
import { calculateSIP } from "@/app/lib/finance/calculations";
import { formatCurrency } from "@/app/utils/formatCurrency";
import { validateAmount, validateRate, validateTenure } from "@/app/utils/validation";

export default function SIPCalculator() {
    const [amount, setAmount] = useState<number | "">(5000);
    const [amountText, setAmountText] = useState<string>("5,000");
    const [rate, setRate] = useState<number | "">(12);
    const [rateText, setRateText] = useState<string>("12");
    const [tenure, setTenure] = useState<number | "">(10);
    const [tenureType, setTenureType] = useState<"years" | "months">("years");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const [investedAmount, setInvestedAmount] = useState<number>(0);
    const [estimatedReturns, setEstimatedReturns] = useState<number>(0);
    const [totalValue, setTotalValue] = useState<number>(0);

    const [errors, setErrors] = useState<{ amount?: string; rate?: string; tenure?: string }>({});

    useEffect(() => {
        let hasError = false;
        const newErrors: { amount?: string; rate?: string; tenure?: string } = {};

        const numAmount = Number(amount);
        const numRate = Number(rate);
        const numTenure = Number(tenure);

        if (amount !== "") {
            const amountValidation = validateAmount(numAmount, "Monthly Investment", 100, 100000000, false);
            if (!amountValidation.isValid) {
                newErrors.amount = amountValidation.error;
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
        
        const totalMonths = tenureType === "years" ? numTenure * 12 : numTenure;
        if (tenure !== "") {
            const tenureValidation = validateTenure(totalMonths, 1, 600, "months", "Time Period");
            if (!tenureValidation.isValid) {
                newErrors.tenure = tenureValidation.error;
                hasError = true;
            }
        }

        setErrors(newErrors);

        if (!hasError && amount !== "" && rate !== "" && tenure !== "") {
            const result = calculateSIP(numAmount, numRate, totalMonths);
            setInvestedAmount(result.investedAmount);
            setEstimatedReturns(result.estimatedReturns);
            setTotalValue(result.totalValue);
        } else {
            setInvestedAmount(0);
            setEstimatedReturns(0);
            setTotalValue(0);
        }
    }, [amount, rate, tenure, tenureType]);

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
        if (rawValue.length > 3) return;
        setTenure(Number(rawValue));
    };

    const investedPercent = totalValue > 0 ? (investedAmount / totalValue) * 100 : 0;
    const returnsPercent = totalValue > 0 ? (estimatedReturns / totalValue) * 100 : 0;

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "SIP Calculator",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Any",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        },
        "description": "Calculate returns on your Systematic Investment Plan (SIP) mutual fund investments."
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
                title="SIP Calculator"
                description="Estimate returns on your Systematic Investment Plan mutual fund investments."
            >
                <div className="flex flex-col lg:flex-row gap-8 w-full max-w-5xl mx-auto py-4">
                    {/* Input Section */}
                    <div className="w-full lg:w-1/2 space-y-6 bg-zinc-50 dark:bg-zinc-900/50 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800">
                        <div>
                            <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                                Monthly Investment
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 font-medium">₹</span>
                                <input
                                    suppressHydrationWarning
                                    type="text"
                                    value={amountText}
                                    onChange={handleAmountChange}
                                    placeholder="5,000"
                                    className={`w-full pl-8 pr-4 py-3 rounded-xl border ${errors.amount ? 'border-red-500 focus:ring-red-500' : 'border-zinc-200 dark:border-zinc-800 focus:ring-blue-500'} bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:ring-2 outline-none transition-all`}
                                />
                            </div>
                            {errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount}</p>}
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

                        <div>
                            <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                                Time Period
                            </label>
                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <input
                                        suppressHydrationWarning
                                        type="text"
                                        value={tenure}
                                        onChange={handleTenureChange}
                                        placeholder="10"
                                        className={`w-full px-4 py-3 rounded-xl border ${errors.tenure ? 'border-red-500 focus:ring-red-500' : 'border-zinc-200 dark:border-zinc-800 focus:ring-blue-500'} bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:ring-2 outline-none transition-all`}
                                    />
                                </div>
                                <div className="relative w-[120px]">
                                    <button
                                        suppressHydrationWarning
                                        type="button"
                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border ${isDropdownOpen ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-zinc-200 dark:border-zinc-800'} bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all`}
                                    >
                                        <span className="capitalize font-medium">{tenureType}</span>
                                        <svg className={`w-4 h-4 text-zinc-500 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                    </button>

                                    {isDropdownOpen && (
                                        <>
                                            <div className="fixed inset-0 z-10" onClick={() => setIsDropdownOpen(false)}></div>
                                            <div className="absolute z-20 mt-2 w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 shadow-xl overflow-hidden py-1.5 animate-in fade-in zoom-in-95 duration-100">
                                                <Button
                                                    variant="ghost"
                                                    fullWidth
                                                    className={`justify-center !rounded-none py-2.5 text-sm transition-colors ${tenureType === "years" ? "bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold hover:bg-blue-100 dark:hover:bg-blue-500/20" : "text-zinc-700 dark:text-zinc-300 font-medium"}`}
                                                    onClick={() => { setTenureType("years"); setIsDropdownOpen(false); }}
                                                >
                                                    Years
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    fullWidth
                                                    className={`justify-center !rounded-none py-2.5 text-sm transition-colors ${tenureType === "months" ? "bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold hover:bg-blue-100 dark:hover:bg-blue-500/20" : "text-zinc-700 dark:text-zinc-300 font-medium"}`}
                                                    onClick={() => { setTenureType("months"); setIsDropdownOpen(false); }}
                                                >
                                                    Months
                                                </Button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                            {errors.tenure && <p className="text-red-500 text-xs mt-1">{errors.tenure}</p>}
                        </div>
                    </div>

                    {/* Result Section */}
                    <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 bg-zinc-100 dark:bg-zinc-900/50 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
                        <div className="flex flex-col items-center mb-6">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400 mb-4">
                                <TrendingUpIcon className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-medium text-zinc-600 dark:text-zinc-400 mb-2">Total Value</h3>
                            <p className="text-4xl font-bold text-zinc-900 dark:text-white break-all text-center">
                                {formatCurrency(totalValue)}
                            </p>
                        </div>

                        <div className="w-full space-y-4 mb-6">
                            <div className="flex justify-between items-start py-2 border-b border-zinc-200 dark:border-zinc-800">
                                <span className="text-zinc-600 dark:text-zinc-400 shrink-0">Invested Amount</span>
                                <span className="font-semibold text-zinc-900 dark:text-white break-all text-right ml-4">{formatCurrency(investedAmount)}</span>
                            </div>
                            <div className="flex justify-between items-start py-2 border-b border-zinc-200 dark:border-zinc-800">
                                <span className="text-zinc-600 dark:text-zinc-400 shrink-0">Est. Returns</span>
                                <span className="font-semibold text-green-600 dark:text-green-400 break-all text-right ml-4">{formatCurrency(estimatedReturns)}</span>
                            </div>
                        </div>

                        {/* Progress Bar / Breakdown */}
                        {totalValue > 0 && (
                            <div className="w-full mt-2">
                                <div className="w-full h-3 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden flex">
                                    <div className="bg-blue-500 h-full transition-all duration-500" style={{ width: `${investedPercent}%` }} title="Invested Amount" />
                                    <div className="bg-green-500 h-full transition-all duration-500" style={{ width: `${returnsPercent}%` }} title="Estimated Returns" />
                                </div>
                                <div className="flex justify-between text-xs mt-3 px-1">
                                    <span className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400 font-medium">
                                        <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div> Invested Amount
                                    </span>
                                    <span className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400 font-medium">
                                        <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div> Est. Returns
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
                    <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mt-12 mb-6">Free SIP Calculator</h2>
                    <p className="text-lg mb-8">
                        Calculate the future value of your Systematic Investment Plan (SIP) investments. A SIP calculator helps you determine the wealth gain and expected returns for your monthly mutual fund investments. This tool provides a clear breakdown of your invested amount versus your estimated returns over your chosen time period.
                    </p>

                    <h3 className="text-2xl font-semibold text-zinc-900 dark:text-white mt-10 mb-4">What is a SIP?</h3>
                    <p className="mb-6">
                        A Systematic Investment Plan (SIP) is a facility offered by mutual funds to investors to invest in a disciplined manner. It allows an investor to invest a fixed amount of money at pre-defined intervals in the selected mutual fund scheme. SIPs help in averaging out the cost of investment and utilizing the power of compounding.
                    </p>

                    <h3 className="text-2xl font-semibold text-zinc-900 dark:text-white mt-10 mb-4">How to use this SIP Calculator</h3>
                    <p className="mb-4">Using our SIP calculator is simple and takes just a few seconds:</p>
                    <ol className="list-decimal pl-6 space-y-4 mb-8">
                        <li><strong>Monthly Investment:</strong> Enter the amount you plan to invest every month.</li>
                        <li><strong>Expected Return Rate (p.a):</strong> Enter the annual rate of return you expect from your investment. Historically, equity mutual funds have returned around 10-14% over the long term.</li>
                        <li><strong>Time Period:</strong> Specify the duration of your investment in either years or months. The longer you stay invested, the more you benefit from compounding.</li>
                        <li><strong>View Results:</strong> The calculator instantly displays your total invested amount, your estimated returns, and the final total value of your investment.</li>
                    </ol>

                    <h3 className="text-2xl font-semibold text-zinc-900 dark:text-white mt-10 mb-4">Benefits of SIPs</h3>
                    <ul className="list-disc pl-6 space-y-3 mb-8">
                        <li><strong>Disciplined Investing:</strong> Automates your investments, ensuring you save regularly regardless of market conditions.</li>
                        <li><strong>Rupee Cost Averaging:</strong> Because you invest a fixed amount regularly, you buy more units when the market is low and fewer units when the market is high, averaging out your cost per unit.</li>
                        <li><strong>Power of Compounding:</strong> Returns generated on your investments are reinvested, meaning you earn returns on your returns. The earlier you start, the greater the compounding effect.</li>
                        <li><strong>Convenience:</strong> You can start a SIP with an amount as low as ₹100 or ₹500, making it accessible for everyone.</li>
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
