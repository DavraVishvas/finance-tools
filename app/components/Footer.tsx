import React from "react";
import Link from "next/link";

const quickLinks = [
    { label: "EMI Calculator", href: "/tools/emi-calculator" },
    { label: "SIP Calculator", href: "/tools/sip-calculator" },
    { label: "Compound Interest", href: "/tools/compound-interest-calculator" },
    { label: "FD Calculator", href: "/tools/fd-calculator" },
    { label: "Retirement Calculator", href: "/tools/retirement-calculator" },
];

const moreLinks = [
    { label: "Loan Eligibility", href: "/tools/loan-eligibility-calculator" },
    { label: "Loan Calculator", href: "/tools/loan-calculator" },
    { label: "Inflation Calculator", href: "/tools/inflation-calculator" },
    { label: "Net Worth", href: "/tools/net-worth-calculator" },
    { label: "Credit Utilization", href: "/tools/credit-utilization-calculator" },
];

export default function Footer() {
    return (
        <footer className="w-full border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950 transition-colors duration-300">
            <div className="mx-auto max-w-[1600px] px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-5">
                    {/* Brand */}
                    <div className="flex flex-col gap-4 items-center sm:items-start text-center sm:text-left md:col-span-2">
                        <Link href="/" className="flex items-center gap-2 group w-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg">
                            <div className="flex h-20 w-52 items-center justify-start transition-transform group-hover:scale-105">
                                <img src="/logo.png" alt="Finance Tools Logo" className="h-full w-full object-contain" />
                            </div>
                        </Link>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                            Free, fast, and easy-to-use financial calculators. Plan your loans, investments, and personal finances directly in your browser.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                        <h3 className="text-sm font-semibold text-zinc-900 dark:text-white mb-4">Popular Tools</h3>
                        <ul className="flex flex-col gap-2">
                            {quickLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* More Tools */}
                    <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                        <h3 className="text-sm font-semibold text-zinc-900 dark:text-white mb-4">More Tools</h3>
                        <ul className="flex flex-col gap-2">
                            {moreLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/* Company */}
                    <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                        <h3 className="text-sm font-semibold text-zinc-900 dark:text-white mb-4">Company</h3>
                        <ul className="flex flex-col gap-2">
                            <li>
                                <Link href="/blog" className="text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors">Insights</Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors">About Us</Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors">Contact Us</Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-10 pt-6 border-t border-zinc-100 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
                    <p className="text-xs text-zinc-400 dark:text-zinc-500 max-w-2xl">
                        Disclaimer: The calculators and articles on Finance Tools are provided for educational and informational purposes only. Results are estimates and should not be considered financial, investment, tax, or legal advice. Actual results may vary.
                        <br />
                        <br />
                        © {new Date().getFullYear()} Finance Tools. All rights reserved.
                    </p>
                    <div className="flex gap-5 text-xs text-zinc-400 dark:text-zinc-500 justify-center sm:justify-start">
                        <Link href="/privacy" className="hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
