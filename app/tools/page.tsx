"use client";

import React from "react";
import Link from "next/link";
import { ArrowBack } from "@mui/icons-material";
import { tools } from "../data/tools";

const categories = [
    { id: "personal-finance", name: "Personal Finance", description: "Tools for managing your personal wealth and loans." },
    { id: "calculators", name: "Financial Calculators", description: "General purpose calculators for interest and returns." },
];

export default function ToolsPage() {
    return (
        <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 flex-1 flex flex-col">
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
                    All Tools
                </h1>
                <p className="mt-2 text-base text-zinc-500 dark:text-zinc-400 max-w-2xl">
                    Explore our comprehensive suite of financial calculators to plan your wealth, loans, and investments.
                </p>
            </div>

            <div className="flex flex-col gap-12">
                {categories.map(category => {
                    const categoryTools = tools.filter(t => t.categoryId === category.id);
                    if (categoryTools.length === 0) return null;

                    return (
                        <div key={category.id}>
                            <div className="mb-6">
                                <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">{category.name}</h2>
                                <p className="text-zinc-500 dark:text-zinc-400 mt-1">{category.description}</p>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {categoryTools.map((tool) => {
                                    const IconName = tool.icon as keyof typeof import('@mui/icons-material');
                                    // We can just use a simple generic icon here if we don't want to import all dynamically, 
                                    // but since it's just a page, let's use a standard div or import the same mapped icons.
                                    // For simplicity, we'll just remove the dynamic icon and use a generic one or none, 
                                    // actually let's just render the title directly.
                                    return (
                                        <Link href={tool.href} key={tool.id} className="group flex flex-col h-full rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-700">
                                            <div className="flex items-center gap-4 mb-4">
                                                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-500 text-white shadow-md shadow-blue-500/20 transition-transform duration-300 group-hover:rotate-3`}>
                                                    <span className="font-bold">{tool.title.charAt(0)}</span>
                                                </div>
                                                <h3 className="font-semibold text-lg text-zinc-900 dark:text-white transition-colors duration-300 group-hover:text-zinc-700 dark:group-hover:text-zinc-300">
                                                    {tool.title}
                                                </h3>
                                            </div>
                                            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed flex-1">
                                                {tool.description}
                                            </p>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
