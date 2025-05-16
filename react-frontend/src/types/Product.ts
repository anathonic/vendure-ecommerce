export interface Product {
    id: number;
    name: string;
    description: string;
    slug: string;
    variants: Array<{
        id: number;
        name: string;
        priceWithTax: number;
        sku: string;
        stockLevel: string;
    }>;
    featuredAsset?: {
        preview: string;
    };
}
