export interface StructuredContent {
    headings: Array<{
        level: number;
        text: string;
    }>;
    paragraphs: string[];
    links: Array<{
        text: string;
        url: string;
    }>;
    images: Array<{
        alt: string;
        src: string;
    }>;
    lists: Array<{
        type: 'ordered' | 'unordered';
        items: string[];
    }>;
}
export interface HtmlToJsonOptions {
    includeTitle?: boolean;
    title?: string;
}
export declare class HtmlToJsonConverter {
    /**
     * Convert HTML content to structured JSON format
     */
    static convert(html: string, options?: HtmlToJsonOptions): string;
    /**
     * Extract structured content from HTML
     */
    private static extractStructuredContent;
}
