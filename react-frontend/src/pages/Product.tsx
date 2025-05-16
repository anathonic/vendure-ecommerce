import {JSX} from "react";
import { useParams } from 'react-router-dom';
import { useProduct } from '../hooks/useProduct';

function Product(): JSX.Element {
    const { slug } = useParams<{ slug: string }>();
    const { product, loading, error } = useProduct(slug!);

    if (loading) {
        return <div className="text-center text-gray-500 py-20">Loading product details...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500 py-20">Error loading product: {error.message}</div>;
    }

    if (!product) {
        return <div className="text-center text-gray-500 py-20">Product not found</div>;
    }

    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <img
                        src={product.featuredAsset?.preview}
                        alt={product.name}
                        className="w-full h-auto rounded-lg shadow"
                    />
                </div>
                <div>
                    <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                    <p className="text-gray-700 mb-6">{product.description}</p>
                    <div className="space-y-4">
                        {product.variants.map((variant) => (
                            <div
                                key={variant.id}
                                className="border p-4 rounded-lg shadow-sm"
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h2 className="text-xl font-semibold">{variant.name}</h2>
                                        <p className="text-gray-500 text-sm">SKU: {variant.sku}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-lg font-bold text-indigo-600">
                                            ₹{(variant.priceWithTax / 100).toFixed(2)}
                                        </p>
                                        <p className="text-sm text-green-600">
                                            {variant.stockLevel.replace('_', ' ')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Product;
