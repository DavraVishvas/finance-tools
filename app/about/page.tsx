import React from "react";
import Link from "next/link";
import { ArrowBack } from "@mui/icons-material";

export default function AboutPage() {
    return (
        <div className="mx-auto w-full max-w-[1400px] px-4 py-8 sm:px-6 sm:py-12 lg:px-8 flex-1 flex justify-between gap-8 relative">


            <div className="flex-1 max-w-3xl w-full min-w-0 relative z-10 flex flex-col">
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
                    <div className="h-1 w-12 rounded-full bg-gradient-to-r from-red-500 to-rose-600 mb-4" />
                    <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
                        About Us
                    </h1>
                </div>


            <div className="rounded-2xl sm:rounded-3xl border border-zinc-200 bg-white p-6 sm:p-10 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 transition-all duration-300">
                <div className="prose prose-zinc dark:prose-invert max-w-none">
                    <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-300 mb-6">
                        <strong>Finance Tools</strong> was created with a simple goal: to provide fast, easy-to-use financial calculators that help people understand common loan, investment, and personal finance calculations directly from their browser.
                    </p>

                    <h2 className="text-xl font-bold text-zinc-900 dark:text-white mt-8 mb-4">Our Story</h2>
                    <p className="text-zinc-600 dark:text-zinc-300 mb-4 leading-relaxed">
                        Finance Tools was created to provide a simpler way to explore common financial calculations without unnecessary complexity. The platform focuses on clear interfaces, transparent assumptions, and easy-to-understand results.
                    </p>
                    <p className="text-zinc-600 dark:text-zinc-300 mb-6 leading-relaxed">
                        Many calculations are performed directly in your browser, allowing results to be generated without unnecessary server processing. We believe that educational financial planning tools should be accessible to everyone without hidden costs.
                    </p>

                    <h2 className="text-xl font-bold text-zinc-900 dark:text-white mt-8 mb-4">What We Offer</h2>
                    <p className="text-zinc-600 dark:text-zinc-300 mb-4 leading-relaxed">
                        Finance Tools provides a collection of financial calculators to help you explore different scenarios.
                    </p>
                    <ul className="list-disc pl-5 space-y-3 text-zinc-600 dark:text-zinc-300 mb-6">
                        <li><strong>Loan & EMI Tools:</strong> Calculate your Equated Monthly Installment (EMI), view standard amortization schedules, and estimate loan eligibility.</li>
                        <li><strong>Investment Calculators:</strong> Project the illustrative growth of Systematic Investment Plans (SIPs), which allow investors to invest a fixed amount at regular intervals, as well as Fixed Deposits (FDs) and general compound interest.</li>
                        <li><strong>Personal Finance:</strong> Estimate the potential impact of inflation over time, evaluate credit utilization, and explore long-term retirement calculations.</li>
                    </ul>

                    <h2 className="text-xl font-bold text-zinc-900 dark:text-white mt-8 mb-4">Our Core Values</h2>
                    <ul className="list-disc pl-5 space-y-3 text-zinc-600 dark:text-zinc-300 mb-6">
                        <li><strong>Privacy Conscious:</strong> Where calculations are performed locally in your browser, the financial values entered into those calculators are not sent to our servers for calculation. Please refer to our Privacy Policy for details about data handling.</li>
                        <li><strong>Accuracy & Transparency:</strong> We use standard mathematical formulas to provide estimates. We clearly state our assumptions and do not make guarantees about market returns or credit scores.</li>
                        <li><strong>Designed for Simplicity:</strong> Our interface is designed to be straightforward, allowing you to visualize financial concepts efficiently.</li>
                        <li><strong>Free to Use:</strong> Our core calculators are free to use.</li>
                    </ul>

                    <h2 className="text-xl font-bold text-zinc-900 dark:text-white mt-8 mb-4">Looking Ahead</h2>
                    <p className="text-zinc-600 dark:text-zinc-300 mb-4 leading-relaxed">
                        Our goal is to continue improving the platform as a useful educational resource for personal finance planning. We are continuously working to improve our existing tools based on user feedback.
                    </p>

                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-10 p-4 bg-zinc-100 dark:bg-zinc-900 rounded-lg">
                        <strong>Disclaimer:</strong> Finance Tools provides calculators and educational information for general informational purposes. Calculator results are estimates based on the inputs and assumptions provided and should not be considered financial, investment, tax, or legal advice.
                    </p>
                </div>
            </div>
            </div>

        </div>
    );
}
