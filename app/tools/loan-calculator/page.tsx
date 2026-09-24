"use client";

import React, { useState, useEffect } from "react";
import ToolWrapper from "@/app/components/ToolWrapper";
import Button from "@/app/components/Button";
import { AccountBalanceWallet as AccountBalanceWalletIcon } from "@mui/icons-material";
import { calculateEMI, calculateAmortizationSchedule, AmortizationRow } from "@/app/lib/finance/calculations";
import { formatCurrency } from "@/app/utils/formatCurrency";
import { validateAmount, validateRate, validateTenure } from "@/app/utils/validation";

export default function AdvancedLoanCalculator() {
    const [amount, setAmount] = useState<number | "">(500000);
    const [amountText, setAmountText] = useState<string>("5,00,000");
    const [rate, setRate] = useState<number | "">(9);
    const [rateText, setRateText] = useState<string>("9");
    const [tenure, setTenure] = useState<number | "">(5);
    const [tenureType, setTenureType] = useState<"years" | "months">("years");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [showAmortization, setShowAmortization] = useState(false);

    const [emi, setEmi] = useState<number>(0);
    const [totalInterest, setTotalInterest] = useState<number>(0);
    const [totalPayment, setTotalPayment] = useState<number>(0);
    const [schedule, setSchedule] = useState<AmortizationRow[]>([]);

    const [errors, setErrors] = useState<{ amount?: string; rate?: string; tenure?: string }>({});

    useEffect(() => {
        let hasError = false;
        const newErrors: { amount?: string; rate?: string; tenure?: string } = {};

        const numAmount = Number(amount);
        const numRate = Number(rate);
        const numTenure = Number(tenure);

        if (amount !== "") {
            const amountValidation = validateAmount(numAmount, "Loan Amount", 1000, 100000000, false);
            if (!amountValidation.isValid) {
                newErrors.amount = amountValidation.error;
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

        if (!hasError && amount !== "" && rate !== "" && tenure !== "") {
            const result = calculateEMI(numAmount, numRate, totalMonths);
            setEmi(result.emi);
            setTotalInterest(result.totalInterest);
            setTotalPayment(result.totalPayment);
            
            if (showAmortization) {
                setSchedule(calculateAmortizationSchedule(numAmount, numRate, totalMonths));
            }
        } else {
            setEmi(0);
            setTotalInterest(0);
            setTotalPayment(0);
            setSchedule([]);
        }
    }, [amount, rate, tenure, tenureType, showAmortization]);

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

    const principalPercent = totalPayment > 0 ? ((totalPayment - totalInterest) / totalPayment) * 100 : 0;
    const interestPercent = totalPayment > 0 ? (totalInterest / totalPayment) * 100 : 0;

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Advanced Loan Calculator",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Any",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        },
        "description": "Calculate EMI and view a detailed month-by-month amortization schedule."
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
                title="Advanced Loan Calculator"
                description="Calculate EMI and view a detailed month-by-month amortization schedule."
            >
                <div className="flex flex-col lg:flex-row gap-8 w-full max-w-5xl mx-auto py-4">
                    {/* Input Section */}
                    <div className="w-full lg:w-1/2 space-y-6 bg-zinc-50 dark:bg-zinc-900/50 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800">
                        <div>
                            <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                                Loan Amount
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 font-medium">₹</span>
                                <input
                                    suppressHydrationWarning
                                    type="text"
                                    value={amountText}
                                    onChange={handleAmountChange}
                                    placeholder="5,00,000"
                                    className={`w-full pl-8 pr-4 py-3 rounded-xl border ${errors.amount ? 'border-red-500 focus:ring-red-500' : 'border-zinc-200 dark:border-zinc-800 focus:ring-blue-500'} bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:ring-2 outline-none transition-all`}
                                />
                            </div>
                            {errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount}</p>}
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
                                        placeholder="5"
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
                                <AccountBalanceWalletIcon className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-medium text-zinc-600 dark:text-zinc-400 mb-2">Monthly EMI</h3>
                            <p className="text-4xl font-bold text-zinc-900 dark:text-white break-all text-center">
                                {formatCurrency(emi)}
                            </p>
                        </div>

                        <div className="w-full space-y-4 mb-6">
                            <div className="flex justify-between items-start py-2 border-b border-zinc-200 dark:border-zinc-800">
                                <span className="text-zinc-600 dark:text-zinc-400 shrink-0">Total Interest</span>
                                <span className="font-semibold text-zinc-900 dark:text-white break-all text-right ml-4">{formatCurrency(totalInterest)}</span>
                            </div>
                            <div className="flex justify-between items-start py-2 border-b border-zinc-200 dark:border-zinc-800">
                                <span className="text-zinc-600 dark:text-zinc-400 shrink-0">Total Payment</span>
                                <span className="font-semibold text-blue-600 dark:text-blue-400 break-all text-right ml-4">{formatCurrency(totalPayment)}</span>
                            </div>
                        </div>

                        {/* Progress Bar / Breakdown */}
                        {totalPayment > 0 && (
                            <div className="w-full mt-2">
                                <div className="w-full h-3 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden flex">
                                    <div className="bg-blue-500 h-full transition-all duration-500" style={{ width: `${principalPercent}%` }} title="Principal Amount" />
                                    <div className="bg-orange-400 h-full transition-all duration-500" style={{ width: `${interestPercent}%` }} title="Total Interest" />
                                </div>
                                <div className="flex justify-between text-xs mt-3 px-1">
                                    <span className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400 font-medium">
                                        <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div> Principal
                                    </span>
                                    <span className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400 font-medium">
                                        <div className="w-2.5 h-2.5 rounded-full bg-orange-400"></div> Interest
                                    </span>
                                </div>
                            </div>
                        )}
                        
                        {emi > 0 && (
                            <div className="mt-8 pt-4 border-t border-blue-200 dark:border-blue-900/50 flex justify-center">
                                <Button 
                                    onClick={() => setShowAmortization(!showAmortization)}
                                    variant="outline"
                                >
                                    {showAmortization ? "Hide Amortization Schedule" : "Show Amortization Schedule"}
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
                
                {/* Amortization Schedule Table */}
                {showAmortization && schedule.length > 0 && (
                    <div className="w-full max-w-5xl mx-auto mt-12 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm">
                        <div className="px-6 py-5 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 flex justify-between items-center">
                            <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Amortization Schedule</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm whitespace-nowrap">
                                <thead className="bg-zinc-50 dark:bg-zinc-800/50 text-zinc-600 dark:text-zinc-300">
                                    <tr>
                                        <th className="px-6 py-4 font-semibold border-b border-zinc-200 dark:border-zinc-700">Month</th>
                                        <th className="px-6 py-4 font-semibold border-b border-zinc-200 dark:border-zinc-700">EMI</th>
                                        <th className="px-6 py-4 font-semibold border-b border-zinc-200 dark:border-zinc-700">Principal</th>
                                        <th className="px-6 py-4 font-semibold border-b border-zinc-200 dark:border-zinc-700">Interest</th>
                                        <th className="px-6 py-4 font-semibold border-b border-zinc-200 dark:border-zinc-700">Balance</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 text-zinc-700 dark:text-zinc-300">
                                    {schedule.map((row) => (
                                        <tr key={row.month} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors">
                                            <td className="px-6 py-4 font-medium">{row.month}</td>
                                            <td className="px-6 py-4">{formatCurrency(row.payment)}</td>
                                            <td className="px-6 py-4 text-blue-600 dark:text-blue-400">{formatCurrency(row.principal)}</td>
                                            <td className="px-6 py-4 text-orange-600 dark:text-orange-400">{formatCurrency(row.interest)}</td>
                                            <td className="px-6 py-4 font-semibold">{formatCurrency(row.balance)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </ToolWrapper>

            {/* SEO Content Section */}
            <div className="mx-auto w-full max-w-4xl px-4 pb-16 sm:px-6 lg:px-8 mt-12">
                <div className="prose prose-zinc dark:prose-invert max-w-none text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-6">Advanced Loan Calculator with Amortization</h2>
                    <p className="text-lg mb-8">
                        Our advanced loan calculator helps you determine your monthly Equated Monthly Installment (EMI) and provides a detailed month-by-month amortization schedule, breaking down exactly how much of your payment goes towards the principal and how much towards interest.
                    </p>

                    <h3 className="text-2xl font-semibold text-zinc-900 dark:text-white mt-10 mb-4">What is an Amortization Schedule?</h3>
                    <p className="mb-6">
                        An amortization schedule is a complete table of periodic loan payments, showing the amount of principal and the amount of interest that comprise each payment until the loan is paid off at the end of its term. While each periodic payment is the same, early in the schedule, the majority of each payment is interest; later in the schedule, the majority of each payment is put toward the principal.
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
