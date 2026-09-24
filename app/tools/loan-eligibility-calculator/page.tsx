"use client";

import React, { useState, useEffect } from "react";
import ToolWrapper from "@/app/components/ToolWrapper";
import { TrendingUp as TrendingUpIcon } from "@mui/icons-material";
import { calculateLoanEligibility } from "@/app/lib/finance/calculations";
import { formatCurrency } from "@/app/utils/formatCurrency";
import { validateAmount, validateRate, validateTenure } from "@/app/utils/validation";
import Button from "@/app/components/Button";

export default function LoanEligibilityCalculator() {
    const [emi, setEmi] = useState<number | "">(15000);
    const [emiText, setEmiText] = useState<string>("15,000");
    const [rate, setRate] = useState<number | "">(9);
    const [rateText, setRateText] = useState<string>("9");
    const [tenure, setTenure] = useState<number | "">(10);
    const [tenureType, setTenureType] = useState<"years" | "months">("years");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const [maxLoan, setMaxLoan] = useState<number>(0);
    const [errors, setErrors] = useState<{ emi?: string; rate?: string; tenure?: string }>({});

    useEffect(() => {
        let hasError = false;
        const newErrors: { emi?: string; rate?: string; tenure?: string } = {};

        const numEmi = Number(emi);
        const numRate = Number(rate);
        const numTenure = Number(tenure);

        if (emi !== "") {
            const emiValidation = validateAmount(numEmi, "Affordable Monthly EMI", 500, 10000000, false);
            if (!emiValidation.isValid) {
                newErrors.emi = emiValidation.error;
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
        
        const totalMonths = tenureType === "years" ? numTenure * 12 : numTenure;
        if (tenure !== "") {
            const tenureValidation = validateTenure(totalMonths, 1, 600, "months", "Loan Tenure");
            if (!tenureValidation.isValid) {
                newErrors.tenure = tenureValidation.error;
                hasError = true;
            }
        }

        setErrors(newErrors);

        if (!hasError && emi !== "" && rate !== "" && tenure !== "") {
            const eligibleLoan = calculateLoanEligibility(numEmi, numRate, totalMonths);
            setMaxLoan(eligibleLoan);
        } else {
            setMaxLoan(0);
        }
    }, [emi, rate, tenure, tenureType]);

    const handleEmiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value.replace(/[^0-9]/g, '');
        if (rawValue === '') {
            setEmi("");
            setEmiText("");
            return;
        }
        if (rawValue.length > 8) return; // max emi 9.9 cr
        
        const numValue = Number(rawValue);
        setEmi(numValue);
        setEmiText(numValue.toLocaleString('en-IN'));
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

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Loan Eligibility Calculator",
        "applicationCategory": "FinanceApplication",
        "description": "Find out the maximum loan amount you can afford based on your monthly EMI capacity."
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
                title="Loan Eligibility Calculator"
                description="Find out the maximum loan amount you can afford based on your monthly EMI capacity."
            >
                <div className="flex flex-col lg:flex-row gap-8 w-full max-w-5xl mx-auto py-4">
                    {/* Input Section */}
                    <div className="w-full lg:w-1/2 space-y-6 bg-zinc-50 dark:bg-zinc-900/50 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800">
                        <div>
                            <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                                Affordable Monthly EMI
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 font-medium">₹</span>
                                <input
                                    suppressHydrationWarning
                                    type="text"
                                    value={emiText}
                                    onChange={handleEmiChange}
                                    placeholder="15,000"
                                    className={`w-full pl-8 pr-4 py-3 rounded-xl border ${errors.emi ? 'border-red-500 focus:ring-red-500' : 'border-zinc-200 dark:border-zinc-800 focus:ring-blue-500'} bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:ring-2 outline-none transition-all`}
                                />
                            </div>
                            {errors.emi && <p className="text-red-500 text-xs mt-1">{errors.emi}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                                Interest Rate (p.a)
                            </label>
                            <div className="relative">
                                <input
                                    suppressHydrationWarning
                                    type="text"
                                    value={rateText}
                                    onChange={handleRateChange}
                                    placeholder="9"
                                    className={`w-full pl-4 pr-10 py-3 rounded-xl border ${errors.rate ? 'border-red-500 focus:ring-red-500' : 'border-zinc-200 dark:border-zinc-800 focus:ring-blue-500'} bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:ring-2 outline-none transition-all`}
                                />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 font-medium">%</span>
                            </div>
                            {errors.rate && <p className="text-red-500 text-xs mt-1">{errors.rate}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                                Loan Tenure
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
                    <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 bg-zinc-100 dark:bg-zinc-900/50 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden text-center">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400 mb-6">
                            <TrendingUpIcon className="h-10 w-10" />
                        </div>
                        <h3 className="text-xl font-medium text-zinc-600 dark:text-zinc-400 mb-2">Maximum Eligible Loan</h3>
                        <p className="text-5xl font-bold text-zinc-900 dark:text-white break-all mb-4">
                            {formatCurrency(maxLoan)}
                        </p>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-sm mt-4">
                            Based on a monthly payment of <strong>{formatCurrency(Number(emi))}</strong> at <strong>{Number(rate)}%</strong> interest over <strong>{Number(tenure)} {tenureType}</strong>.
                        </p>
                    </div>
                </div>
            </ToolWrapper>

            <div className="mx-auto w-full max-w-4xl px-4 pb-16 sm:px-6 lg:px-8 mt-12">
                <div className="prose prose-zinc dark:prose-invert max-w-none text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-6">How Loan Eligibility is Calculated</h2>
                    <p className="text-lg mb-8">
                        Often, borrowers know exactly how much they can afford to pay each month (their EMI), but they aren&apos;t sure how large of a loan that translates to. This calculator works backwards from your affordable EMI to determine the maximum loan amount you can qualify for.
                    </p>
                    <p>
                        Keep in mind that banks and financial institutions also consider your income, existing debts, credit score, and other factors before approving a loan. This calculator provides a mathematical estimate based purely on the EMI capacity you provide.
                    </p>
                </div>
            </div>

                </div> {/* End Main Content Area */}
            

                <div className="hidden xl:flex flex-col w-[300px] shrink-0 sticky top-24 gap-6">



                </div>
            </div>
        </>
    );
}
