"use client";

import React from "react";
import Link from "next/link";
import { ArrowBack } from "@mui/icons-material";

interface ToolWrapperProps {
    title: string;
    description: string;
    children: React.ReactNode;
    accentColor?: string; // e.g. "red", "blue", "green"
    className?: string; // optional additional classes for spacing/layout
}

export default function ToolWrapper({
    title,
    description,
    children,
    accentColor = "red",
    className,
}: ToolWrapperProps) {
    const accentMap: Record<string, string> = {
        red: "from-red-500 to-rose-600",
        blue: "from-blue-500 to-indigo-600",
        green: "from-green-500 to-emerald-600",
        cyan: "from-cyan-500 to-blue-600",
        purple: "from-purple-500 to-violet-600",
        pink: "from-pink-500 to-rose-600",
        orange: "from-orange-500 to-amber-600",
        teal: "from-teal-500 to-emerald-600",
        yellow: "from-yellow-500 to-amber-600",
        gray: "from-gray-600 to-zinc-700",
    };

    const gradient = accentMap[accentColor] ?? accentMap["red"];

    return (
        <div className={`mx-auto w-full max-w-5xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8 flex-1 flex flex-col ${className ? className : ''}`}>
            {/* Header Row */}
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mt-2">
                <Link
                    href="/"
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800/60 dark:hover:bg-zinc-800 text-sm font-medium text-zinc-600 dark:text-zinc-300 transition-colors group shrink-0 w-fit border border-zinc-200 dark:border-zinc-700/50"
                >
                    <ArrowBack className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
                    Back
                </Link>
                
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
                        {title}
                    </h1>
                    <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                        {description}
                    </p>
                </div>
            </div>

                {/* Card */}
                <div className="flex-1 rounded-2xl sm:rounded-3xl border border-zinc-200 bg-white p-5 sm:p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 transition-all duration-300 flex flex-col justify-center min-h-[380px]">
                    {children}
                </div>
        </div>
    );
}
