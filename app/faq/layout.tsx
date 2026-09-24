import type { Metadata } from "next";
import { faqs } from "../data/faqs";

export const metadata: Metadata = {
    title: "Help Center & FAQ | Finance Tools",
    description: "Find answers to frequently asked questions about our free financial calculators and tools. Learn about our privacy policies, supported formats, and troubleshooting.",
    alternates: {
        canonical: "https://pdfimageconvert.com/faq",
    },
    openGraph: {
        title: "Help Center & FAQ | Finance Tools",
        description: "Find answers to frequently asked questions about our free financial calculators and tools.",
        url: "https://pdfimageconvert.com/faq",
        siteName: "Finance Tools",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Help Center & FAQ | Finance Tools",
        description: "Find answers to frequently asked questions about our free financial calculators and tools.",
    },
};

export default function FAQLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Generate FAQPage JSON-LD Schema
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map((faq) => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer.replace(/<[^>]*>?/gm, '') // Strip HTML tags for schema
            }
        }))
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
                suppressHydrationWarning
            />
            {children}
        </>
    );
}
