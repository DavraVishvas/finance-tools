"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { ArrowBack, Search, ExpandMore, ContentCopy, ThumbUp, ThumbDown, CheckCircle } from "@mui/icons-material";
import { faqs, FAQ } from "../data/faqs";

export default function FAQPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");
    const [expandedFaqs, setExpandedFaqs] = useState<Set<string>>(new Set());
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [votes, setVotes] = useState<Record<string, 'up' | 'down'>>({});

    // Load votes from local storage on mount
    useEffect(() => {
        const savedVotes = localStorage.getItem('faqVotes');
        if (savedVotes) {
            try {
                setVotes(JSON.parse(savedVotes));
            } catch (e) {
                console.error("Failed to parse saved votes");
            }
        }
    }, []);

    // Save votes to local storage
    const handleVote = (question: string, type: 'up' | 'down') => {
        const newVotes = { ...votes, [question]: type };
        setVotes(newVotes);
        localStorage.setItem('faqVotes', JSON.stringify(newVotes));
    };

    const categories = ["All", ...Array.from(new Set(faqs.map(f => f.category)))];

    const filteredFaqs = useMemo(() => {
        return faqs.filter(faq => {
            const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = activeCategory === "All" || faq.category === activeCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, activeCategory]);

    const groupedFaqs = useMemo(() => {
        const groups: Record<string, FAQ[]> = {};
        filteredFaqs.forEach(faq => {
            if (!groups[faq.category]) groups[faq.category] = [];
            groups[faq.category].push(faq);
        });
        return groups;
    }, [filteredFaqs]);

    const toggleFaq = (question: string) => {
        const newExpanded = new Set(expandedFaqs);
        if (newExpanded.has(question)) {
            newExpanded.delete(question);
        } else {
            newExpanded.add(question);
        }
        setExpandedFaqs(newExpanded);
    };

    const expandAll = () => {
        setExpandedFaqs(new Set(filteredFaqs.map(f => f.question)));
    };

    const collapseAll = () => {
        setExpandedFaqs(new Set());
    };

    const copyLink = (question: string) => {
        // Create a URL-friendly slug from the question
        const slug = question.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        const url = `${window.location.origin}/faq#${slug}`;
        navigator.clipboard.writeText(url);
        setCopiedId(question);
        setTimeout(() => setCopiedId(null), 2000);
    };

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

            <div className="mb-12 text-center">
                <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-5xl mb-4">
                    Help Center & FAQ
                </h1>
                <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto">
                    Find answers to common questions about our tools, privacy policies, and troubleshooting.
                </p>
            </div>

            {/* Search Bar */}
            <div className="relative mb-10 max-w-2xl mx-auto w-full">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-zinc-400" />
                </div>
                <input
                    type="text"
                    className="block w-full pl-11 pr-4 py-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-shadow"
                    placeholder="Search for answers (e.g., 'compress', 'privacy', 'limit')..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
                {categories.map(category => (
                    <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === category
                                ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                                : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800"
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-200 dark:border-zinc-800">
                <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                    Showing {filteredFaqs.length} results
                </span>
                <div className="flex items-center gap-4">
                    <button onClick={expandAll} className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">
                        Expand All
                    </button>
                    <button onClick={collapseAll} className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">
                        Collapse All
                    </button>
                </div>
            </div>

            {/* FAQ List */}
            <div className="space-y-12">
                {Object.keys(groupedFaqs).length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-zinc-500 dark:text-zinc-400 text-lg">No results found for &quot;{searchQuery}&quot;.</p>
                        <button
                            onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
                            className="mt-4 text-blue-600 dark:text-blue-400 hover:underline font-medium"
                        >
                            Clear search
                        </button>
                    </div>
                ) : (
                    Object.entries(groupedFaqs).map(([category, categoryFaqs]) => (
                        <div key={category} className="space-y-4">
                            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">{category}</h2>
                            <div className="space-y-4">
                                {categoryFaqs.map((faq) => {
                                    const isExpanded = expandedFaqs.has(faq.question);
                                    const slug = faq.question.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

                                    return (
                                        <div
                                            key={faq.question}
                                            id={slug}
                                            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden transition-shadow hover:shadow-sm"
                                        >
                                            <button
                                                onClick={() => toggleFaq(faq.question)}
                                                className="w-full flex items-center justify-between p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                                                aria-expanded={isExpanded}
                                                aria-controls={`faq-answer-${slug}`}
                                            >
                                                <span className="text-lg font-semibold text-zinc-900 dark:text-white pr-8">
                                                    {faq.question}
                                                </span>
                                                <ExpandMore
                                                    className={`w-6 h-6 text-zinc-400 transition-transform duration-300 flex-shrink-0 ${isExpanded ? "rotate-180" : ""}`}
                                                />
                                            </button>

                                            <div
                                                id={`faq-answer-${slug}`}
                                                className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? "max-h-96 pb-6 opacity-100" : "max-h-0 opacity-0"}`}
                                            >
                                                <div
                                                    className="text-zinc-600 dark:text-zinc-400 leading-relaxed prose prose-zinc dark:prose-invert max-w-none"
                                                    dangerouslySetInnerHTML={{ __html: faq.answer }}
                                                />

                                                {/* Interactive Footer */}
                                                <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800/50 flex items-center justify-between">
                                                    <div className="flex items-center gap-4">
                                                        <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Helpful?</span>
                                                        <button
                                                            onClick={() => handleVote(faq.question, 'up')}
                                                            className={`p-1.5 rounded-md transition-colors ${votes[faq.question] === 'up' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}
                                                            aria-label="Yes, this was helpful"
                                                        >
                                                            <ThumbUp className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleVote(faq.question, 'down')}
                                                            className={`p-1.5 rounded-md transition-colors ${votes[faq.question] === 'down' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : 'text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}
                                                            aria-label="No, this was not helpful"
                                                        >
                                                            <ThumbDown className="w-4 h-4" />
                                                        </button>
                                                    </div>

                                                    <button
                                                        onClick={() => copyLink(faq.question)}
                                                        className="flex items-center gap-1.5 text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
                                                    >
                                                        {copiedId === faq.question ? (
                                                            <><CheckCircle className="w-4 h-4 text-green-500" /> Copied</>
                                                        ) : (
                                                            <><ContentCopy className="w-4 h-4" /> Copy Link</>
                                                        )}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))
                )}
            </div>
</div>
    );
}
