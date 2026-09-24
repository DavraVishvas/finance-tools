"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowBack } from "@mui/icons-material";
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';

export default function ContactPage() {
    const form = useRef<HTMLFormElement>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!form.current) return;

        setIsSubmitting(true);
        const loadingToast = toast.loading('Sending message...');

        emailjs.sendForm('service_dvqsk8k', 'template_ch61rme', form.current, '0pUENtITdAbPsxr0Y')
            .then((result) => {
                toast.success('Message sent successfully!', { id: loadingToast });
                form.current?.reset();
            }, (error) => {
                toast.error('Failed to send message. Please try again.', { id: loadingToast });
                console.error(error.text);
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    };

    return (
        <div className="mx-auto w-full max-w-[1400px] px-4 py-8 sm:px-6 sm:py-12 lg:px-8 flex-1 flex justify-between gap-8 relative">
            {/* Left Ad Sidebar */}
            <div className="hidden xl:flex flex-col justify-between w-[300px] shrink-0" style={{ minHeight: 'calc(100vh - 200px)' }}>
                <div className="sticky top-12 w-[300px] h-[250px] overflow-hidden rounded-2xl flex justify-center items-center pointer-events-auto">
                    <iframe src="/ad1.html" width="300" height="250" style={{ border: 'none', overflow: 'hidden' }} scrolling="no" title="Advertisement" />
                </div>
                <div className="sticky bottom-12 mt-12 w-[300px] h-[250px] overflow-hidden rounded-2xl flex justify-center items-center pointer-events-auto">
                    <iframe src="/ad1.html" width="300" height="250" style={{ border: 'none', overflow: 'hidden' }} scrolling="no" title="Advertisement" />
                </div>
            </div>

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
                    <div className="h-1 w-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 mb-4" />
                    <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
                        Contact Us
                    </h1>
                    <p className="mt-2 text-base text-zinc-500 dark:text-zinc-400 max-w-2xl">
                        Have a question, feedback, or need support? We&apos;d love to hear from you.
                    </p>
                </div>

            <div className="max-w-6xl">
                <div className="rounded-2xl sm:rounded-3xl border border-zinc-200 bg-white p-6 sm:p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
                    <form ref={form} className="flex flex-col gap-5" onSubmit={sendEmail}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="name" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Your Name</label>
                                <input required type="text" id="name" name="name" autoComplete="name" className="rounded-xl border border-zinc-300 bg-transparent px-4 py-2.5 text-sm text-zinc-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-zinc-700 dark:text-white" placeholder="John Doe" disabled={isSubmitting} />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="email" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Email Address</label>
                                <input required type="email" id="email" name="email" autoComplete="email" pattern="^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$" title="Please enter a valid email address (e.g. name@example.com)" className="rounded-xl border border-zinc-300 bg-transparent px-4 py-2.5 text-sm text-zinc-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-zinc-700 dark:text-white" placeholder="john@example.com" disabled={isSubmitting} />
                            </div>
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="subject" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Subject</label>
                            <select required id="subject" name="subject" defaultValue="" className="rounded-xl border border-zinc-300 bg-transparent px-4 py-2.5 text-sm text-zinc-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-zinc-700 dark:text-white dark:bg-zinc-950" disabled={isSubmitting}>
                                <option value="" disabled>Select a category...</option>
                                <option value="Bug Report">Bug Report</option>
                                <option value="Feature Request">Feature Request</option>
                                <option value="General Feedback">General Feedback</option>
                                <option value="Privacy Questions">Privacy Questions</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="message" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Message</label>
                            <textarea required id="message" name="message" autoComplete="off" rows={5} className="rounded-xl border border-zinc-300 bg-transparent px-4 py-2.5 text-sm text-zinc-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-zinc-700 dark:text-white resize-none" placeholder="Write your message here..." disabled={isSubmitting}></textarea>
                        </div>
                        <button type="submit" disabled={isSubmitting} className="mt-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center">
                            {isSubmitting ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Sending...
                                </>
                            ) : (
                                "Send Message"
                            )}
                        </button>
                    </form>
                </div>
            </div>
            </div>
            
            {/* Empty Right Sidebar for balance */}
            <div className="hidden xl:block w-[300px] shrink-0"></div>
        </div>
    );
}
