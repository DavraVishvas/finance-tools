import { Metadata } from "next";
import { tools } from "../data/tools";

const siteName = "Finance Tools";
const baseUrl = "https://pdfimageconvert.com";

export function generateToolMetadata(toolId: string): Metadata {
    const tool = tools.find((t) => t.id === toolId);

    if (!tool) {
        return {
            title: "Financial Calculators | Finance Tools",
        };
    }

    const title = `${tool.title} Free Online | ${siteName}`;
    const description = `${tool.description} Fast, secure, and 100% local processing in your browser. No file uploads required.`;
    const url = `${baseUrl}${tool.href}`;

    return {
        title,
        description,
        alternates: {
            canonical: url,
        },
        openGraph: {
            title,
            description,
            url,
            siteName,
            type: "website",
            images: [
                {
                    url: `${baseUrl}/logo.png`,
                    width: 800,
                    height: 600,
                    alt: `${siteName} Logo`,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [`${baseUrl}/logo.png`],
        },
    };
}

export function generateToolSchema(toolId: string) {
    const tool = tools.find((t) => t.id === toolId);
    if (!tool) return null;

    return {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: tool.title,
        description: tool.description,
        applicationCategory: "FinanceApplication",
        operatingSystem: "Any",
        offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
        },
        url: `${baseUrl}${tool.href}`,
    };
}
