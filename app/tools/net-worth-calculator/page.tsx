"use client";

import React, { useState, useEffect } from "react";
import ToolWrapper from "@/app/components/ToolWrapper";
import { AccountBalanceWallet as AccountBalanceWalletIcon } from "@mui/icons-material";
import { calculateNetWorth, NetWorthResult } from "@/app/lib/finance/calculations";
import { formatCurrency } from "@/app/utils/formatCurrency";

export default function NetWorthCalculator() {
    // Assets
    const [cash, setCash] = useState<number | "">(50000);
    const [investments, setInvestments] = useState<number | "">(500000);
    const [realEstate, setRealEstate] = useState<number | "">(2500000);
    const [otherAssets, setOtherAssets] = useState<number | "">(200000);

    // Liabilities
    const [homeLoan, setHomeLoan] = useState<number | "">(1500000);
    const [autoLoan, setAutoLoan] = useState<number | "">(0);
    const [creditCard, setCreditCard] = useState<number | "">(25000);
    const [otherLiabilities, setOtherLiabilities] = useState<number | "">(0);

    const [result, setResult] = useState<NetWorthResult>({
        totalAssets: 0,
        totalLiabilities: 0,
        netWorth: 0
    });

    useEffect(() => {
        const assets = [Number(cash), Number(investments), Number(realEstate), Number(otherAssets)];
        const liabilities = [Number(homeLoan), Number(autoLoan), Number(creditCard), Number(otherLiabilities)];
        
        setResult(calculateNetWorth(assets, liabilities));
    }, [cash, investments, realEstate, otherAssets, homeLoan, autoLoan, creditCard, otherLiabilities]);

    const handleNumberInput = (setter: any) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value.replace(/[^0-9]/g, '');
        if (rawValue === '') {
            setter("");
            return;
        }
        if (rawValue.length > 12) return;
        setter(Number(rawValue));
    };

    const assetsPercent = result.totalAssets > 0 ? (result.totalAssets / (result.totalAssets + result.totalLiabilities)) * 100 : 50;
    const liabilitiesPercent = result.totalLiabilities > 0 ? (result.totalLiabilities / (result.totalAssets + result.totalLiabilities)) * 100 : 50;

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Net Worth Calculator",
        "applicationCategory": "FinanceApplication",
        "description": "Calculate your true net worth by balancing your assets and liabilities."
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
                title="Net Worth Calculator"
                description="Calculate your true net worth by balancing your assets and liabilities."
            >
                <div className="flex flex-col lg:flex-row gap-8 w-full max-w-5xl mx-auto py-4">
                    {/* Input Section */}
                    <div className="w-full lg:w-1/2 space-y-8">
                        {/* Assets */}
                        <div className="bg-emerald-50 dark:bg-emerald-900/10 p-6 rounded-2xl border border-emerald-100 dark:border-emerald-800/30">
                            <h3 className="text-lg font-bold text-emerald-800 dark:text-emerald-400 mb-4 border-b border-emerald-200 dark:border-emerald-800/50 pb-2">Assets (What you own)</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-1">Cash & Bank Accounts</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 font-medium">₹</span>
                                        <input
                                            type="text"
                                            value={cash === "" ? "" : cash.toLocaleString('en-IN')}
                                            onChange={handleNumberInput(setCash)}
                                            placeholder="0"
                                            className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 focus:ring-blue-500 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white outline-none transition-all"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-1">Investments (Stocks, Mutual Funds, PF)</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 font-medium">₹</span>
                                        <input
                                            type="text"
                                            value={investments === "" ? "" : investments.toLocaleString('en-IN')}
                                            onChange={handleNumberInput(setInvestments)}
                                            placeholder="0"
                                            className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 focus:ring-blue-500 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white outline-none transition-all"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-1">Real Estate & Property</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 font-medium">₹</span>
                                        <input
                                            type="text"
                                            value={realEstate === "" ? "" : realEstate.toLocaleString('en-IN')}
                                            onChange={handleNumberInput(setRealEstate)}
                                            placeholder="0"
                                            className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 focus:ring-blue-500 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white outline-none transition-all"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-1">Other Assets (Gold, Vehicles)</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 font-medium">₹</span>
                                        <input
                                            type="text"
                                            value={otherAssets === "" ? "" : otherAssets.toLocaleString('en-IN')}
                                            onChange={handleNumberInput(setOtherAssets)}
                                            placeholder="0"
                                            className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 focus:ring-blue-500 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white outline-none transition-all"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Liabilities */}
                        <div className="bg-red-50 dark:bg-red-900/10 p-6 rounded-2xl border border-red-100 dark:border-red-800/30">
                            <h3 className="text-lg font-bold text-red-800 dark:text-red-400 mb-4 border-b border-red-200 dark:border-red-800/50 pb-2">Liabilities (What you owe)</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-1">Home Loan</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 font-medium">₹</span>
                                        <input
                                            type="text"
                                            value={homeLoan === "" ? "" : homeLoan.toLocaleString('en-IN')}
                                            onChange={handleNumberInput(setHomeLoan)}
                                            placeholder="0"
                                            className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 focus:ring-red-500 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white outline-none transition-all"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-1">Auto / Car Loan</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 font-medium">₹</span>
                                        <input
                                            type="text"
                                            value={autoLoan === "" ? "" : autoLoan.toLocaleString('en-IN')}
                                            onChange={handleNumberInput(setAutoLoan)}
                                            placeholder="0"
                                            className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 focus:ring-red-500 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white outline-none transition-all"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-1">Credit Card Debt</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 font-medium">₹</span>
                                        <input
                                            type="text"
                                            value={creditCard === "" ? "" : creditCard.toLocaleString('en-IN')}
                                            onChange={handleNumberInput(setCreditCard)}
                                            placeholder="0"
                                            className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 focus:ring-red-500 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white outline-none transition-all"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-1">Other Loans (Personal, Education)</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 font-medium">₹</span>
                                        <input
                                            type="text"
                                            value={otherLiabilities === "" ? "" : otherLiabilities.toLocaleString('en-IN')}
                                            onChange={handleNumberInput(setOtherLiabilities)}
                                            placeholder="0"
                                            className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 focus:ring-red-500 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white outline-none transition-all"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Result Section */}
                    <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-200 dark:border-zinc-800">
                        
                        <div className="flex flex-col items-center mb-8 pb-8 border-b border-zinc-200 dark:border-zinc-800">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400 mb-4">
                                <AccountBalanceWalletIcon className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-medium text-zinc-600 dark:text-zinc-400 mb-2">Your Net Worth</h3>
                            <p className={`text-5xl font-bold break-all text-center ${result.netWorth < 0 ? 'text-red-500' : 'text-zinc-900 dark:text-white'}`}>
                                {formatCurrency(result.netWorth)}
                            </p>
                        </div>

                        <div className="w-full space-y-4 mb-8">
                            <div className="flex justify-between items-center">
                                <span className="text-emerald-700 dark:text-emerald-400 font-medium">Total Assets</span>
                                <span className="font-bold text-emerald-700 dark:text-emerald-400 text-xl">{formatCurrency(result.totalAssets)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-red-600 dark:text-red-400 font-medium">Total Liabilities</span>
                                <span className="font-bold text-red-600 dark:text-red-400 text-xl">{formatCurrency(result.totalLiabilities)}</span>
                            </div>
                        </div>

                        {/* Visual Bar */}
                        <div className="w-full">
                            <div className="w-full h-4 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden flex">
                                <div className="bg-emerald-500 h-full transition-all duration-500" style={{ width: `${assetsPercent}%` }} title="Assets" />
                                <div className="bg-red-500 h-full transition-all duration-500" style={{ width: `${liabilitiesPercent}%` }} title="Liabilities" />
                            </div>
                            <div className="flex justify-between text-xs mt-3 px-1">
                                <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
                                    <div className="w-3 h-3 rounded-full bg-emerald-500"></div> Assets
                                </span>
                                <span className="flex items-center gap-1.5 text-red-600 dark:text-red-400 font-medium">
                                    <div className="w-3 h-3 rounded-full bg-red-500"></div> Liabilities
                                </span>
                            </div>
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
