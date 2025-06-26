import * as cheerio from 'cheerio';
export class HtmlToJsonConverter {
    /**
     * Convert HTML content to structured JSON format
     */
    static convert(html, options = {}) {
        const $ = cheerio.load(html);
        const structured = this.extractStructuredContent($);
        const result = {
            title: options.includeTitle && options.title ? options.title : null,
            content: structured
        };
        return JSON.stringify(result, null, 2);
    }
    /**
     * Extract structured content from HTML
     */
    static extractStructuredContent($) {
        const headings = [];
        const paragraphs = [];
        const links = [];
        const images = [];
        const lists = [];
        // Extract headings
        $('h1, h2, h3, h4, h5, h6').each((_, element) => {
            const $el = $(element);
            const level = parseInt(element.tagName.substring(1));
            const text = $el.text().trim();
            if (text) {
                headings.push({ level, text });
            }
        });
        // Extract paragraphs
        $('p').each((_, element) => {
            const text = $(element).text().trim();
            if (text) {
                paragraphs.push(text);
            }
        });
        // Extract links
        $('a[href]').each((_, element) => {
            const $el = $(element);
            const href = $el.attr('href');
            const text = $el.text().trim();
            if (href && text) {
                links.push({ text, url: href });
            }
        });
        // Extract images
        $('img[src]').each((_, element) => {
            const $el = $(element);
            const src = $el.attr('src');
            const alt = $el.attr('alt') || '';
            if (src) {
                images.push({ alt, src });
            }
        });
        // Extract unordered lists
        $('ul').each((_, element) => {
            const items = [];
            $(element).find('li').each((_, li) => {
                const text = $(li).text().trim();
                if (text) {
                    items.push(text);
                }
            });
            if (items.length > 0) {
                lists.push({ type: 'unordered', items });
            }
        });
        // Extract ordered lists
        $('ol').each((_, element) => {
            const items = [];
            $(element).find('li').each((_, li) => {
                const text = $(li).text().trim();
                if (text) {
                    items.push(text);
                }
            });
            if (items.length > 0) {
                lists.push({ type: 'ordered', items });
            }
        });
        return { headings, paragraphs, links, images, lists };
    }
}
