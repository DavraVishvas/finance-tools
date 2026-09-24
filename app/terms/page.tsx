import React from "react";
import Link from "next/link";
import { ArrowBack } from "@mui/icons-material";

export default function TermsPage() {
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
                <div className="h-1 w-12 rounded-full bg-gradient-to-r from-purple-500 to-violet-600 mb-4" />
                <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
                    Terms & Conditions
                </h1>
                <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                    Effective Date: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </p>
            </div>

            <div className="rounded-2xl sm:rounded-3xl border border-zinc-200 bg-white p-6 sm:p-10 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 transition-all duration-300">
                <div className="prose prose-zinc dark:prose-invert max-w-none">
                    <p className="text-zinc-600 dark:text-zinc-300 mb-6 leading-relaxed">
                        Welcome to Finance Tools. By accessing or using our website and tools, you agree to be bound by these Terms & Conditions. If you disagree with any part of these terms, please do not use the service.
                    </p>

                    <h2 className="text-xl font-bold text-zinc-900 dark:text-white mt-8 mb-4">1. Use of Service and User Responsibilities</h2>
                    <p className="text-zinc-600 dark:text-zinc-300 mb-4 leading-relaxed">
                        Finance Tools provides a suite of online financial calculators. You agree to use these tools responsibly and in compliance with all applicable laws.
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-zinc-600 dark:text-zinc-300 mb-6">
                        <li>You must use our financial calculators for their intended purpose.</li>
                        <li>You agree not to attempt to disrupt, misuse, or gain unauthorized access to our servers or infrastructure.</li>
                    </ul>

                    <h2 className="text-xl font-bold text-zinc-900 dark:text-white mt-8 mb-4">2. Privacy and Cookies</h2>
                    <p className="text-zinc-600 dark:text-zinc-300 mb-6 leading-relaxed">
                        Your use of Finance Tools is also governed by our <Link href="/privacy" className="text-blue-600 hover:underline dark:text-blue-400">Privacy Policy</Link>. Our use of cookies, analytics, and other website data practices is described in our Privacy Policy.
                    </p>

                    <h2 className="text-xl font-bold text-zinc-900 dark:text-white mt-8 mb-4">3. Intellectual Property</h2>
                    <p className="text-zinc-600 dark:text-zinc-300 mb-6 leading-relaxed">
                        The website, its original content, design, branding, features, and functionality are owned by or licensed to Finance Tools and are protected by applicable intellectual property laws.
                    </p>

                    <h2 className="text-xl font-bold text-zinc-900 dark:text-white mt-8 mb-4">4. Termination</h2>
                    <p className="text-zinc-600 dark:text-zinc-300 mb-6 leading-relaxed">
                        We may suspend or terminate access to our service where reasonably necessary, including if you breach these Terms or misuse the service. Upon termination or suspension, your right to use the affected service may cease.
                    </p>

                    <h2 className="text-xl font-bold text-zinc-900 dark:text-white mt-8 mb-4">5. Disclaimer of Warranties</h2>
                    <p className="text-zinc-600 dark:text-zinc-300 mb-4 leading-relaxed">
                        Our service is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis. Finance Tools makes no representations or warranties, express or implied, regarding the availability, operation, or error-free performance of the service.
                    </p>
                    <p className="text-zinc-600 dark:text-zinc-300 mb-6 leading-relaxed">
                        The calculators provide estimates based on the information, assumptions, and methodology used by each tool. Results should not be treated as guaranteed outcomes. The calculators are provided for educational and estimation purposes only and do not constitute professional financial, investment, tax, or legal advice.
                    </p>

                    <h2 className="text-xl font-bold text-zinc-900 dark:text-white mt-8 mb-4">6. Limitation of Liability</h2>
                    <p className="text-zinc-600 dark:text-zinc-300 mb-6 leading-relaxed">
                        To the extent permitted by applicable law, Finance Tools, including its directors, employees, partners, agents, suppliers, and affiliates, will not be liable for indirect, incidental, special, consequential, or punitive damages arising from or related to your access to, use of, or inability to use the service.
                    </p>

                    <h2 className="text-xl font-bold text-zinc-900 dark:text-white mt-8 mb-4">7. Governing Law</h2>
                    <p className="text-zinc-600 dark:text-zinc-300 mb-4 leading-relaxed">
                        These Terms shall be governed and construed in accordance with applicable laws, without regard to conflict of law provisions. Any dispute arising from or relating to these Terms or the service will be subject to the jurisdiction of the appropriate courts, as applicable.
                    </p>
                    <p className="text-zinc-600 dark:text-zinc-300 mb-6 leading-relaxed">
                        Our failure to enforce any right or provision of these Terms will not constitute a waiver of that right or provision.
                    </p>

                    <h2 className="text-xl font-bold text-zinc-900 dark:text-white mt-8 mb-4">8. Changes to Terms</h2>
                    <p className="text-zinc-600 dark:text-zinc-300 mb-4 leading-relaxed">
                        We may update these Terms &amp; Conditions from time to time. Any changes will be posted on this page with an updated revision date.
                    </p>
                    <p className="text-zinc-600 dark:text-zinc-300 mb-6 leading-relaxed">
                        Your continued use of the service after changes are posted constitutes acceptance of the updated Terms, where permitted by applicable law.
                    </p>

                    <h2 className="text-xl font-bold text-zinc-900 dark:text-white mt-8 mb-4">Contact Us</h2>
                    <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
                        If you have any questions about these Terms, please <Link href="/contact" className="text-blue-600 hover:underline dark:text-blue-400">contact us</Link>.
                    </p>
                </div>
            </div>
</div>
    );
}
