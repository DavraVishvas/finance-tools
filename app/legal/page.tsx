"use client";

import React from "react";
import Link from "next/link";
import { ArrowBack, Security, Delete, VisibilityOff } from "@mui/icons-material";

export default function LegalPage() {
    return (
        <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 flex-1 flex flex-col">
            <div className="mb-6">
                <Link
                    href="/"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-white transition-colors group"
                >
                    <ArrowBack className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
                    Back to Home
                </Link>
            </div>

            <div className="mb-8">
                <div className="h-1 w-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 mb-4" />
                <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
                    Legal & Privacy Policy
                </h1>
                <p className="mt-2 text-base text-zinc-500 dark:text-zinc-400 max-w-2xl">
                    Your privacy is our priority. Learn how we handle your data and keep your files secure.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400 mb-4">
                        <Security className="h-6 w-6" />
                    </div>
                    <h3 className="font-semibold text-zinc-900 dark:text-white mb-2">Secure & Local</h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">All calculations happen locally in your browser.</p>
                </div>
                <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400 mb-4">
                        <VisibilityOff className="h-6 w-6" />
                    </div>
                    <h3 className="font-semibold text-zinc-900 dark:text-white mb-2">No Tracking</h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">We don&apos;t track your financial data or sell it to third parties.</p>
                </div>
            </div>

            <div className="prose prose-zinc dark:prose-invert max-w-none">
                <div className="rounded-2xl sm:rounded-3xl border border-zinc-200 bg-white p-6 sm:p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
                    <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">1. Data Collection and Usage</h2>
                    <p className="text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed">
                        When you use Finance Tools, we only collect the minimum amount of data necessary to provide our services.
                        Calculator inputs are processed locally in your browser and are not uploaded to our servers for calculation.
                        We do not collect or store your personal financial data.
                    </p>

                    <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">2. Financial Disclaimer</h2>
                    <p className="text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed">
                        Financial calculators and articles on this website are provided for educational and informational purposes only. Results are estimates and should not be considered financial, investment, tax, or legal advice. Actual results may vary depending on individual circumstances, rates, fees, taxes, and applicable rules.
                    </p>

                    <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">3. Cookies and Analytics</h2>
                    <p className="text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed">
                        We use essential cookies to ensure the basic functionality of the website. We may also use privacy-friendly analytics tools to understand how our website is used and to improve our services.
                        These tools do not track you across other websites or collect personally identifiable information.
                    </p>

                    <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">4. Terms of Service</h2>
                    <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        By using our services, you agree not to use Finance Tools for any illegal activities.
                        We provide our tools &quot;as is&quot; without any warranties. We reserve the right to block access to our services if we detect abuse or violations of these terms.
                    </p>
                </div>
            </div>
</div>
    );
}
