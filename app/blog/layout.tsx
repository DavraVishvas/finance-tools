import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Insights & Guides | Finance Tools",
    description: "Discover expert tips, comprehensive guides, and actionable insights on managing your finances, calculating loans, and planning for retirement.",
    alternates: {
        canonical: "https://pdfimageconvert.com/blog",
    },
    openGraph: {
        title: "Insights & Guides | Finance Tools",
        description: "Expert tips and guides on managing finances and loans.",
        url: "https://pdfimageconvert.com/blog",
        siteName: "Finance Tools",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Insights & Guides | Finance Tools",
        description: "Expert tips and guides on managing finances and loans.",
    },
};

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Generate CollectionPage JSON-LD Schema for the blog index
    const blogSchema = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Insights & Guides | Finance Tools",
        "description": "Discover expert tips, comprehensive guides, and actionable insights on managing your finances, calculating loans, and planning for retirement.",
        "url": "https://pdfimageconvert.com/blog"
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
                suppressHydrationWarning
            />
            {children}
        </>
    );
}
