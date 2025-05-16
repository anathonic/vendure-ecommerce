import { useQuery } from '@apollo/client';
import { Product } from "../types/Product.ts";
import { GET_PRODUCT_BY_SLUG } from '../graphql/queries/products.ts';


export function useProduct(slug: string) {
    const { data, loading, error } = useQuery<{ product: Product }>(GET_PRODUCT_BY_SLUG, {
        variables: { slug },
    });

    return {
        product: data?.product,
        loading,
        error,
    };
}
