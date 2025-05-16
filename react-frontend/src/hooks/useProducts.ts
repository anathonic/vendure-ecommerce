import { useQuery } from '@apollo/client';
import { GET_PRODUCTS } from '../graphql/queries/products';
import { useMemo, useState } from 'react';
import { Product } from '../types/Product';

interface UseProductsResult {
    products: Product[];
    loading: boolean;
    error: string | null;
    totalCount: number;
    page: number;
    pagesCount: number;
    nextPage: () => void;
    previousPage: () => void;
}

const PRODUCTS_PER_PAGE = 36;

export function useProducts(): UseProductsResult {
    const [page, setPage] = useState(1);

    const skip = (page - 1) * PRODUCTS_PER_PAGE;

    const { data, loading, error, refetch } = useQuery(GET_PRODUCTS, {
        variables: { skip, take: PRODUCTS_PER_PAGE },
        fetchPolicy: 'no-cache',
    });

    const products = useMemo(() => data?.products.items ?? [], [data]);
    const totalCount = data?.products.totalItems ?? 0;

    const pagesCount = useMemo(
        () => Math.ceil(totalCount / PRODUCTS_PER_PAGE),
        [totalCount]
    );

    const nextPage = () => {
        if (page < pagesCount) {
            setPage(prev => prev + 1);
            refetch({ skip: skip + PRODUCTS_PER_PAGE, take: PRODUCTS_PER_PAGE });
        }
    };

    const previousPage = () => {
        if (page > 1) {
            setPage(prev => prev - 1);
            refetch({ skip: skip - PRODUCTS_PER_PAGE, take: PRODUCTS_PER_PAGE });
        }
    };

    return {
        products,
        loading,
        error: error?.message ?? null,
        totalCount,
        page,
        pagesCount,
        nextPage,
        previousPage,
    };
}
