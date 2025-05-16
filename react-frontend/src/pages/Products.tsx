import {JSX} from "react";
import { useProducts } from '../hooks/useProducts';
import { useNavigate } from 'react-router-dom';
function Products(): JSX.Element {
    const {
        products,
        loading,
        page,
        pagesCount,
        nextPage,
        previousPage,
    } = useProducts();

    const navigate = useNavigate();

    const goToProduct = (slug: string) => {
        navigate(`/product/${slug}`);
    };

    if (loading) {
        return <div className="text-center text-gray-500 py-10">Loading...</div>;
    }

    return (
        <>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
                {products.map(product => (
                    <li
                        key={product.id}
                        className="bg-white rounded shadow hover:shadow-lg transition p-4"
                    >
                        <img
                            onClick={() => goToProduct(product.slug)}
                            src={product.featuredAsset?.preview}
                            alt={product.name}
                            className="w-full h-48 object-cover mb-4 rounded cursor-pointer"
                        />
                        <h3 className="text-lg font-semibold text-gray-800">
                            {product.name}
                        </h3>
                        <h3 className="text-lg font-semibold text-gray-800">
                            {(product.variants?.[0]?.priceWithTax / 100).toFixed(2)} USD
                        </h3>
                    </li>
                ))}
            </ul>

            <div className="flex justify-between p-5 m-2">
                <button
                    onClick={previousPage}
                    disabled={page === 1}
                    className="text-white bg-gray-800 hover:bg-gray-900 px-5 py-2.5 rounded disabled:opacity-50"
                >
                    Previous
                </button>
                <p className="flex-grow text-center font-semibold">
                    Page {page} / {pagesCount}
                </p>
                <button
                    onClick={nextPage}
                    disabled={page === pagesCount}
                    className="text-white bg-gray-800 hover:bg-gray-900 px-5 py-2.5 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </>
    );
}

export default Products;