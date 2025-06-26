export interface HtmlToJsonOptions {
    includeTitle?: boolean;
    title?: string;
}
export declare class HtmlToJsonConverter {
    /**
     * Convert HTML content to structured JSON format
     */
    static convert(html: string, options?: HtmlToJsonOptions): string;
}
