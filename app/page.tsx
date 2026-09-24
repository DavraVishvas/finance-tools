"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowForward,
  ArrowBack,
  Search,
  Calculate,
  TrendingUp,
  ShowChart,
  AccountBalanceWallet,
  HealthAndSafety,
} from "@mui/icons-material";

import { tools } from "./data/tools";
import { categories } from "./data/categories";

const iconMap: Record<string, React.ElementType> = {
  Calculate: Calculate,
  TrendingUp: TrendingUp,
  ShowChart: ShowChart,
  AccountBalanceWallet: AccountBalanceWallet,
  HealthAndSafety: HealthAndSafety,
};

const categoryColorMap: Record<string, string> = {
  calculators: "bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400",
  insurance: "bg-green-50 text-green-600 dark:bg-green-950/30 dark:text-green-400",
  "personal-finance": "bg-purple-50 text-purple-600 dark:bg-purple-950/30 dark:text-purple-400",
};

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [faqIndex, setFaqIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    setTouchEnd(null);
    setTouchStart(clientX);
  };

  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!touchStart) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    setTouchEnd(clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    if (isLeftSwipe) {
      setFaqIndex((prev) => (prev + 1) % 6);
    }
    if (isRightSwipe) {
      setFaqIndex((prev) => (prev - 1 + 6) % 6);
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  const filteredTools = tools.filter((tool) => {
    const matchesSearch =
      tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || tool.categoryId === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "Finance Tools",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Any",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "description": "Free online financial calculators. Calculate EMI, SIP, and compound interest."
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Is my data secure?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Absolutely. We prioritize your privacy. All calculations happen locally directly on your device (in your browser). Your data is never uploaded to our servers, meaning no one else can ever access it."
            }
          },
          {
            "@type": "Question",
            "name": "Is it really free?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, our tool is 100% free to use. There are no hidden fees and no registration required to access the core features."
            }
          },
          {
            "@type": "Question",
            "name": "Does it work on mobile?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes! Our website is fully responsive and works seamlessly on smartphones and tablets (iOS and Android)."
            }
          }
        ]
      }
    ]
  };

  return (
    <div className="flex-1 bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        suppressHydrationWarning
      />
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white px-4 pt-8 pb-4 sm:px-6 sm:pt-12 sm:pb-8 lg:px-8 dark:bg-zinc-950">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-blue-500/10 to-transparent rounded-full blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left Column: Text & CTA */}
            <div className="text-center lg:text-left">
              <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-5xl lg:text-6xl leading-tight">
                Empower Your Financial Journey
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Discover our collection of free, reliable calculators and tools designed to help you plan your investments, manage loans, and grow your wealth. Fast, accurate, and 100% local processing.
              </p>
            </div>

            {/* Right Column: Visual Composition */}
            <div className="relative h-[300px] sm:h-[350px] w-full mt-4 lg:mt-0 flex items-center justify-center">
              <div className="relative w-[500px] h-[350px] scale-[0.65] sm:scale-75 md:scale-90 lg:scale-100 origin-center">
                {/* Main Card */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-80 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-400 dark:border-zinc-800 shadow-2xl dark:shadow-none z-10 flex flex-col items-center justify-center p-6 transform -rotate-6 hover:rotate-0 transition-transform duration-500">
                  <Calculate className="h-24 w-24 text-blue-500 mb-6" />
                  <div className="w-3/4 h-3 bg-zinc-200 dark:bg-zinc-800 rounded-full mb-4"></div>
                  <div className="w-full h-3 bg-zinc-200 dark:bg-zinc-800 rounded-full mb-4"></div>
                  <div className="w-5/6 h-3 bg-zinc-200 dark:bg-zinc-800 rounded-full"></div>
                </div>

                {/* Sub Card 1 */}
                <div className="absolute top-[15%] right-[5%] w-36 h-36 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-400 dark:border-zinc-800 shadow-xl dark:shadow-none z-20 flex flex-col items-center justify-center p-4 transform rotate-12 hover:rotate-0 transition-transform duration-500 hover:scale-110">
                  <TrendingUp className="h-12 w-12 text-green-500 mb-3" />
                  <span className="font-bold text-zinc-900 dark:text-white">SIP</span>
                </div>

                {/* Sub Card 2 */}
                <div className="absolute bottom-[15%] left-[5%] w-36 h-36 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-400 dark:border-zinc-800 shadow-xl dark:shadow-none z-20 flex flex-col items-center justify-center p-4 transform -rotate-12 hover:rotate-0 transition-transform duration-500 hover:scale-110">
                  <ShowChart className="h-12 w-12 text-purple-500 mb-3" />
                  <span className="font-bold text-zinc-900 dark:text-white">Growth</span>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-1/2 right-[15%] w-24 h-24 border-t-2 border-r-2 border-dashed border-zinc-400 dark:border-zinc-700 rounded-tr-3xl -z-10 opacity-50"></div>
                <div className="absolute bottom-1/2 left-[15%] w-24 h-24 border-b-2 border-l-2 border-dashed border-zinc-400 dark:border-zinc-700 rounded-bl-3xl -z-10 opacity-50"></div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="bg-white dark:bg-zinc-950 px-4 py-16 sm:px-6 lg:px-8 border-b border-zinc-200 dark:border-zinc-800">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-6">Your Complete Local Financial Toolkit</h2>
              <p className="mb-6 text-lg">
                Our platform provides a comprehensive suite of tools to manage and calculate your finances. Whether you need to calculate an EMI for a loan, estimate SIP returns, or check compound interest, our platform offers fast, reliable, and completely free solutions.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">Why Choose Our Tools?</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong className="text-zinc-900 dark:text-white">100% Free:</strong> No hidden fees or subscriptions.</li>
                    <li><strong className="text-zinc-900 dark:text-white">Accurate:</strong> We use industry-standard formulas.</li>
                    <li><strong className="text-zinc-900 dark:text-white">No Registration:</strong> Start using the tools immediately.</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">Uncompromising Privacy</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong className="text-zinc-900 dark:text-white">Local Processing:</strong> All calculations happen in your browser.</li>
                    <li><strong className="text-zinc-900 dark:text-white">No Uploads:</strong> Your data never leaves your device.</li>
                    <li><strong className="text-zinc-900 dark:text-white">No Server Storage:</strong> Your data is processed locally and is not uploaded to our servers.</li>
                  </ul>
                </div>
              </div>
              <p>
                Explore our collection of calculators below. Use the search bar or category filters to quickly find exactly what you need.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Search & Categories Section */}
      <section id="tools" className="scroll-mt-20 bg-zinc-50 dark:bg-zinc-950 px-4 py-12 sm:px-6 lg:px-8 border-b border-zinc-200 dark:border-zinc-800">
        <div className="mx-auto max-w-5xl">
          {/* Search Bar */}
          <div className="mx-auto max-w-lg">
            <div className="relative flex items-center rounded-2xl border border-zinc-200 bg-white px-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 focus-within:border-blue-400 focus-within:ring-1 focus-within:ring-blue-400 transition-all duration-200">
              <Search className="h-5 w-5 flex-shrink-0 text-zinc-400" />
              <input
                id="search-input"
                name="search-input"
                aria-label="Search tools"
                type="text"
                placeholder="Search tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border-0 bg-transparent py-3.5 pl-3 pr-2 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-0 dark:text-white text-sm"
              />
            </div>
          </div>

          {/* Category Filters */}
          <div className="mt-6 flex items-center justify-start sm:justify-center gap-2 overflow-x-auto scrollbar-hide pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`flex-shrink-0 flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 whitespace-nowrap ${selectedCategory === "all"
                  ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-sm"
                  : "bg-white text-zinc-600 hover:bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800"
                }`}
            >
              All Tools
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex-shrink-0 flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 whitespace-nowrap ${selectedCategory === category.id
                    ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-sm"
                    : "bg-white text-zinc-600 hover:bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800"
                  }`}
              >
                {category.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Sections */}
      <section className="mx-auto max-w-[1600px] px-4 pt-8 pb-24 sm:px-6 lg:px-8 flex flex-col gap-16">
        {filteredTools.length > 0 && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
                Financial Utilities
              </h2>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                Calculate loans, investments, and compounding interest.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 sm:gap-8">
              {filteredTools.map((tool) => {
                const Icon = iconMap[tool.icon] || Calculate;
                return (
                  <Link
                    key={tool.id}
                    href={tool.href}
                    className="group relative flex flex-col rounded-2xl sm:rounded-3xl border border-zinc-200 bg-white p-5 sm:p-6 shadow-sm hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                  >
                    <div className="relative">
                      <div className="flex items-start justify-between">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 transition-transform group-hover:scale-110 duration-300">
                          <Icon className="h-6 w-6" />
                        </div>
                        <span className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${categoryColorMap[tool.categoryId] || categoryColorMap['calculators']}`}>
                          {tool.categoryId.replace("-", " ")}
                        </span>
                      </div>
                      <h3 className="mt-5 text-lg font-bold text-zinc-900 dark:text-white group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-200">
                        {tool.title}
                      </h3>
                      <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed flex-1">
                        {tool.description}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {filteredTools.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-800 mb-4">
              <Search className="h-8 w-8 text-zinc-400" />
            </div>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">No tools found</h3>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              Try a different search term or select another category.
            </p>
            <button
              onClick={() => { setSearchQuery(""); setSelectedCategory("all"); }}
              className="mt-4 rounded-xl bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 transition-colors"
            >
              Show all tools
            </button>
          </div>
        )}
      </section>



      {/* How It Works */}
      <section className="bg-zinc-50 dark:bg-zinc-900/50 px-4 py-16 sm:px-6 lg:px-8 border-b border-zinc-200 dark:border-zinc-800">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl mb-4">
                How It Works
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-12">
                Calculate your financials accurately in three simple steps.
              </p>
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 font-bold text-xl">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">Select a Calculator</h3>
                    <p className="mt-2 text-zinc-600 dark:text-zinc-400">Choose the specific tool you need from our collection (e.g., EMI Calculator, SIP Calculator).</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 font-bold text-xl">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">Enter Your Details</h3>
                    <p className="mt-2 text-zinc-600 dark:text-zinc-400">Provide the required inputs like loan amount, interest rate, or investment duration.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 font-bold text-xl">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">View Results</h3>
                    <p className="mt-2 text-zinc-600 dark:text-zinc-400">Instantly see the breakdown, graphs, and complete schedule.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white dark:bg-zinc-950 py-16 sm:py-24 border-t border-zinc-200 dark:border-zinc-800">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4">
            <h3 className="text-2xl font-semibold text-zinc-900 dark:text-white m-0">
              Most people ask about
            </h3>
            <div className="flex items-center gap-2">
              <button
                suppressHydrationWarning
                onClick={() => setFaqIndex((prev) => (prev - 1 + 6) % 6)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                aria-label="Previous FAQ"
              >
                <ArrowBack className="h-5 w-5" />
              </button>
              <button
                suppressHydrationWarning
                onClick={() => setFaqIndex((prev) => (prev + 1) % 6)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                aria-label="Next FAQ"
              >
                <ArrowForward className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div
            className="relative h-[380px] w-full flex items-center justify-center py-4 cursor-grab active:cursor-grabbing select-none"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleTouchStart}
            onMouseMove={handleTouchMove}
            onMouseUp={handleTouchEnd}
            onMouseLeave={handleTouchEnd}
          >
            {[
              {
                q: "Is my data secure?",
                a: "Absolutely. We prioritize your privacy. All calculations happen locally directly on your device (in your browser). Your data is never uploaded to our servers, meaning no one else can ever access it."
              },
              {
                q: "Is it really free?",
                a: "Yes, our tool is 100% free to use. There are no hidden fees and no registration required to access the core features."
              },
              {
                q: "Does it work on mobile?",
                a: "Yes! Our website is fully responsive and works seamlessly on smartphones and tablets (iOS and Android)."
              },
              {
                q: "What is an EMI?",
                a: "EMI stands for Equated Monthly Installment. It is a fixed payment amount made by a borrower to a lender at a specified date each calendar month to pay off both interest and principal."
              },
              {
                q: "What is a SIP?",
                a: "SIP stands for Systematic Investment Plan. It is an investment strategy where you invest a fixed amount of money at regular intervals in a mutual fund or other investment vehicle."
              },
              {
                q: "How accurate are the calculators?",
                a: "Our calculators use standard financial formulas to provide accurate estimates. However, actual bank figures may vary slightly due to processing fees or exact days in a month."
              }
            ].map((faq, idx) => {
              const diff = (idx - faqIndex + 6) % 6;
              let positionClass = "";
              if (diff === 0) positionClass = "z-30 translate-x-0 scale-100 opacity-100";
              else if (diff === 1) positionClass = "z-20 translate-x-[40%] scale-90 opacity-100 brightness-75";
              else if (diff === 5) positionClass = "z-20 -translate-x-[40%] scale-90 opacity-100 brightness-75";
              else if (diff === 2) positionClass = "z-10 translate-x-[70%] scale-75 opacity-100 brightness-50";
              else if (diff === 4) positionClass = "z-10 -translate-x-[70%] scale-75 opacity-100 brightness-50";
              else positionClass = "z-0 translate-x-0 scale-50 opacity-0";

              return (
                <div
                  key={idx}
                  className={`absolute w-full max-w-lg rounded-3xl bg-white p-8 sm:p-10 shadow-2xl transition-all duration-500 border border-zinc-200 dark:border-zinc-800 dark:bg-zinc-900 ${positionClass}`}
                >
                  <h4 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white mb-6">
                    {faq.q}
                  </h4>
                  <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Bottom section with Pagination */}
          <div className="mt-12 flex justify-center">
            {/* Pagination Dots */}
            <div className="flex gap-2">
              {[0, 1, 2, 3, 4, 5].map((idx) => (
                <button
                  key={idx}
                  suppressHydrationWarning
                  onClick={() => setFaqIndex(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${faqIndex === idx ? "w-8 bg-blue-600" : "w-2.5 bg-zinc-300 dark:bg-zinc-700"}`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>


    </div>
  );
}
