import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowBack } from "@mui/icons-material";
import { articles } from "../../data/articles";

export async function generateStaticParams() {
    return articles.map((article) => ({
        slug: article.slug,
    }));
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const article = articles.find((a) => a.slug === slug);

    if (!article) {
        notFound();
    }

    return (
        <div className="mx-auto w-full max-w-[1600px] px-4 py-8 sm:px-6 sm:py-12 lg:px-8 flex-1 flex flex-col xl:flex-row gap-8 items-start justify-center">


            {/* Main Article Content */}
            <div className="flex-1 w-full max-w-4xl flex flex-col min-w-0">
                <div className="mb-8">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-white transition-colors group"
                    >
                        <ArrowBack className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
                        Back to Insights
                    </Link>
                </div>

                <article className="rounded-2xl sm:rounded-3xl border border-zinc-200 bg-white p-6 sm:p-10 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 transition-all duration-300">
                    <header className="mb-8 border-b border-zinc-100 dark:border-zinc-800/50 pb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600 dark:bg-blue-950/30 dark:text-blue-400">
                                {article.category}
                            </span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-tight">
                            {article.title}
                        </h1>
                    </header>

                    <div
                        className="max-w-none text-lg leading-relaxed text-zinc-700 dark:text-zinc-300 [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-zinc-900 dark:[&>h2]:text-white [&>h2]:mt-10 [&>h2]:mb-4 [&>p]:mb-6 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-6 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-6 [&>li]:mb-2 [&_strong]:font-semibold [&_strong]:text-zinc-900 dark:[&_strong]:text-white"
                        dangerouslySetInnerHTML={{ __html: article.content }}
                    />
                </article>
            </div>

        </div>
    );
}
