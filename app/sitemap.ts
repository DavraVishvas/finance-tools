import { MetadataRoute } from 'next'
import { articles } from './data/articles'
import { tools } from './data/tools'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://pdfimageconvert.com'

    // Base routes
    const routes = [
        '',
        '/about',
        '/blog',
        '/contact',
        '/faq',
        '/legal',
        '/privacy',
        '/terms',
        '/tools',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }))

    // Tool routes
    const toolRoutes = tools.map((tool) => ({
        url: `${baseUrl}${tool.href}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
    }))

    // Blog article routes
    const articleRoutes = articles.map((article) => ({
        url: `${baseUrl}/blog/${article.slug}`,
        lastModified: new Date(article.date),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }))

    return [...routes, ...toolRoutes, ...articleRoutes]
}
