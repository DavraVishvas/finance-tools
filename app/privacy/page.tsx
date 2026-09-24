import React from "react";
import Link from "next/link";
import { ArrowBack } from "@mui/icons-material";

export default function PrivacyPage() {
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
                <div className="h-1 w-12 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 mb-4" />
                <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
                    Privacy Policy
                </h1>
                <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                    Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </p>
            </div>

            <div className="rounded-2xl sm:rounded-3xl border border-zinc-200 bg-white p-6 sm:p-10 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 transition-all duration-300">
                <div className="prose prose-zinc dark:prose-invert max-w-none">
                    <p className="text-zinc-600 dark:text-zinc-300 mb-6 leading-relaxed">
                        At Finance Tools, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal information and financial inputs when you use our website and services.
                    </p>

                    <h2 className="text-xl font-bold text-zinc-900 dark:text-white mt-8 mb-4">1. Data Processing and Storage</h2>
                    <p className="text-zinc-600 dark:text-zinc-300 mb-4 leading-relaxed">
                        Finance Tools provides web-based financial calculators. The calculations you perform are processed locally in your web browser.
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-zinc-600 dark:text-zinc-300 mb-6">
                        <li><strong>Local Processing:</strong> Our calculators perform their mathematical operations within your browser. We do not transmit your calculator inputs to our servers for calculation processing.</li>
                        <li><strong>No Server Storage:</strong> Because the calculation processing happens locally, we do not store, retain, or back up the numbers you enter into the calculators.</li>
                    </ul>

                    <h2 className="text-xl font-bold text-zinc-900 dark:text-white mt-8 mb-4">2. Information We Collect</h2>
                    <p className="text-zinc-600 dark:text-zinc-300 mb-4 leading-relaxed">
                        We collect minimal information to ensure our service functions correctly and to improve user experience:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-zinc-600 dark:text-zinc-300 mb-6">
                        <li><strong>Usage Data:</strong> We collect anonymous analytics data (such as pages visited, tools used, and browser type) to help us improve our platform.</li>
                        <li><strong>Contact Information:</strong> If you reach out to us via our Contact Us page, we will collect your name and email address solely for the purpose of responding to your inquiry.</li>
                    </ul>

                    <h2 className="text-xl font-bold text-zinc-900 dark:text-white mt-8 mb-4">3. Data Retention</h2>
                    <p className="text-zinc-600 dark:text-zinc-300 mb-6 leading-relaxed">
                        <strong>Contact Retention:</strong> Information submitted through our contact forms is retained only as long as necessary to resolve your inquiry.
                        <br />
                        <strong>Calculator Data:</strong> As stated above, we do not store or retain the financial numbers you enter into our calculators.
                    </p>

                    <h2 className="text-xl font-bold text-zinc-900 dark:text-white mt-8 mb-4">4. Cookies and Tracking</h2>
                    <p className="text-zinc-600 dark:text-zinc-300 mb-6 leading-relaxed">
                        We use essential cookies to remember your preferences (such as dark mode settings). We also use third-party analytics cookies to understand how users interact with our site. You can disable cookies in your browser settings, though some features of the site may not function properly.
                    </p>

                    <h2 className="text-xl font-bold text-zinc-900 dark:text-white mt-8 mb-4">5. Your Rights (GDPR & CCPA)</h2>
                    <p className="text-zinc-600 dark:text-zinc-300 mb-6 leading-relaxed">
                        Depending on your location, you may have specific rights regarding your personal data under regulations like the General Data Protection Regulation (GDPR) or the California Consumer Privacy Act (CCPA). These rights may include the right to access, correct, or delete your personal data. Since we do not create user accounts or store personal financial data, the data we hold is limited to contact inquiries and anonymous analytics. If you wish to exercise your rights regarding any contact information you have provided, please contact us.
                    </p>

                    <h2 className="text-xl font-bold text-zinc-900 dark:text-white mt-8 mb-4">6. Changes to This Policy</h2>
                    <p className="text-zinc-600 dark:text-zinc-300 mb-6 leading-relaxed">
                        We reserve the right to update this Privacy Policy at any time. Any changes will be posted on this page with an updated revision date.
                    </p>

                    <h2 className="text-xl font-bold text-zinc-900 dark:text-white mt-8 mb-4">Contact Us</h2>
                    <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
                        If you have any questions about this Privacy Policy, please <Link href="/contact" className="text-emerald-600 hover:underline dark:text-emerald-400">contact us</Link>.
                    </p>
                </div>
            </div>
</div>
    );
}
