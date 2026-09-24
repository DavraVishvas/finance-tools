"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowBack, Search, Article, Security, TrendingUp } from "@mui/icons-material";
import { articles } from "../data/articles";

export default function BlogPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");
    const [visibleCount, setVisibleCount] = useState(4);

    const categories = ["All", ...Array.from(new Set(articles.map(a => a.category)))];

    // Mock data generation for features not in the original articles array
    const enhancedArticles = useMemo(() => {
        return articles.map((article, index) => {
            const tagsList = [["Loans", "EMI"], ["Investment", "SIP"], ["Retirement", "Planning"], ["Taxes", "Savings"]];

            return {
                ...article,
                views: 1000 + (index * 1234) % 9000,
                tags: tagsList[index % tagsList.length],
                isFeatured: index === 0,
                isPopular: index === 1 || index === 2
            };
        });
    }, []);

    const filteredArticles = useMemo(() => {
        return enhancedArticles.filter(article => {
            const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                article.description.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = activeCategory === "All" || article.category === activeCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, activeCategory, enhancedArticles]);

    // Reset visible count when search or category changes
    React.useEffect(() => {
        setVisibleCount(4);
    }, [searchQuery, activeCategory]);

    const featuredArticle = enhancedArticles.find(a => a.isFeatured);
    const popularArticles = enhancedArticles.filter(a => a.isPopular);
    const trendingTopics = ["EMI Calculation", "SIP Investment", "Retirement Planning", "Home Loans"];

    const getCategoryIcon = (category: string, className: string = "") => {
        switch (category) {
            case "Finance Tools": return <TrendingUp className={className} />;
            case "Investment Tools": return <TrendingUp className={className} />;
            case "Security": return <Security className={className} />;
            default: return <Article className={className} />;
        }
    };

    return (
        <div className="bg-zinc-50 dark:bg-zinc-950 min-h-screen flex-1 flex flex-col pb-24">

            {/* Hero Section */}
            <section className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 pt-12 pb-20">
                <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8 relative">
                    <div className="mb-8">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors group"
                        >
                            <ArrowBack className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
                            Back to Home
                        </Link>
                    </div>

                    <div className="relative">
                        <div className="text-center max-w-3xl mx-auto mb-12 relative z-10">
                            <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-6">
                                Insights & Guides
                            </h1>
                            <p className="text-lg text-zinc-600 dark:text-zinc-400">
                                Master your personal finances with our comprehensive guides, expert tips, and tutorials on loans, investments, and retirement planning.
                            </p>
                        </div>

                        {/* Search Bar */}
                        <div className="relative max-w-2xl mx-auto w-full mb-16 z-10">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-zinc-400" />
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-11 pr-4 py-4 bg-zinc-100 dark:bg-zinc-800 border-transparent rounded-2xl text-zinc-900 dark:text-white placeholder-zinc-500 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all"
                                placeholder="Search articles, guides, and tutorials..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        {}

                    </div>
                </div>
            </section>

            {/* Main Content Area */}
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-16 flex flex-col-reverse lg:flex-row gap-12">

                {/* Left Column: Articles Grid */}
                <div className="lg:w-2/3">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
                            {searchQuery ? "Search Results" : activeCategory === "All" ? "Latest Articles" : `${activeCategory} Guides`}
                        </h2>
                        <span className="text-sm text-zinc-500 dark:text-zinc-400">{filteredArticles.length} articles</span>
                    </div>

                    {filteredArticles.length === 0 ? (
                        <div className="text-center py-20 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800">
                            <Search className="w-12 h-12 text-zinc-300 dark:text-zinc-700 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">No articles found</h3>
                            <p className="text-zinc-500 dark:text-zinc-400">Try adjusting your search or category filter.</p>
                            <button
                                onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
                                className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors"
                            >
                                Clear Filters
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {filteredArticles.slice(0, visibleCount).map((article) => (
                                    <Link key={article.slug} href={`/blog/${article.slug}`} className="group flex flex-col h-full bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                        <div className="h-40 w-full bg-zinc-50 dark:bg-zinc-800/50 relative flex items-center justify-center overflow-hidden border-b border-zinc-100 dark:border-zinc-800">
                                            {getCategoryIcon(article.category, "!w-32 !h-32 text-zinc-300 dark:text-zinc-600 group-hover:scale-110 transition-transform duration-500")}
                                            <div className="absolute top-4 left-4 bg-white/90 dark:bg-black/80 backdrop-blur-sm text-zinc-900 dark:text-white text-xs font-bold px-3 py-1 rounded-full border border-zinc-200 dark:border-zinc-700">
                                                {article.category}
                                            </div>
                                        </div>
                                        <div className="p-6 flex flex-col flex-grow">
                                            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight line-clamp-2">
                                                {article.title}
                                            </h3>
                                            <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-6 flex-grow line-clamp-3">
                                                {article.description}
                                            </p>
                                            <div className="flex items-center justify-end mt-auto pt-4 border-t border-zinc-100 dark:border-zinc-800">
                                                <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform">
                                                    Read Guide &rarr;
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            {filteredArticles.length > visibleCount && (
                                <div className="flex justify-center mt-4">
                                    <button
                                        onClick={() => setVisibleCount(prev => prev + 8)}
                                        className="px-8 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white rounded-full font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors shadow-sm"
                                    >
                                        Load More Articles
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Right Column: Sidebar */}
                <aside className="lg:w-1/3 space-y-10">

                    {/* Categories Widget */}
                    <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800">
                        <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
                            Categories
                        </h3>
                        <div className="flex flex-col gap-2">
                            {categories.map(category => (
                                <button
                                    key={category}
                                    onClick={() => setActiveCategory(category)}
                                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeCategory === category
                                        ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400"
                                        : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                                        }`}
                                >
                                    <span>{category}</span>
                                    <span className="bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 px-2 py-0.5 rounded-full text-xs">
                                        {category === "All" ? enhancedArticles.length : enhancedArticles.filter(a => a.category === category).length}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Popular Guides Widget */}
                    <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800">
                        <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-orange-500" /> Popular Guides
                        </h3>
                        <div className="flex flex-col gap-4">
                            {popularArticles.map((article, index) => (
                                <Link key={article.slug} href={`/blog/${article.slug}`} className="group flex gap-4 items-center">
                                    <div className="text-2xl font-black text-zinc-200 dark:text-zinc-800">
                                        0{index + 1}
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                                            {article.title}
                                        </h4>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Trending Topics (Tags) */}
                    <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800">
                        <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-4">Trending Topics</h3>
                        <div className="flex flex-wrap gap-2">
                            {trendingTopics.map(topic => (
                                <span key={topic} className="px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-xs font-medium rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 cursor-pointer transition-colors">
                                    #{topic}
                                </span>
                            ))}
                        </div>
                    </div>

                </aside>
            </div>
        </div>
    );
}
