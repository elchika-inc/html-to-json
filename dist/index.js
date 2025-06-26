import * as cheerio from 'cheerio';
import { ContentExtractor } from '@elchika-inc/shared';
export class HtmlToJsonConverter {
    /**
     * Convert HTML content to structured JSON format
     */
    static convert(html, options = {}) {
        const $ = cheerio.load(html);
        const structured = ContentExtractor.extractStructuredContent($);
        const result = {
            title: options.includeTitle && options.title ? options.title : null,
            content: structured
        };
        return JSON.stringify(result, null, 2);
    }
}
