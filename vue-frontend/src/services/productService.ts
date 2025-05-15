import {computed, ref, watch} from 'vue'
import { useQuery } from '@vue/apollo-composable'
import {GET_PRODUCT_BY_SLUG, GET_PRODUCTS} from '../graphql/queries/products'

export interface Product {
    id: number
    name: string
    description: string
    slug: string
    variants: Array<{
        id: number
        name: string
        priceWithTax: number
        sku: string
        stockLevel: string
    }>
    featuredAsset?: {
        preview: string
    }
}

export function getProduct(slug: string) {
    const { result, loading, error } = useQuery<{ product: Product }>(
        GET_PRODUCT_BY_SLUG,
        {
            slug,
        }
    )
    const errorMessage = computed(() => error.value?.message || '')
    return {
        result,
        loading,
        error: errorMessage,
    }
}

export function getProducts(skip: number, take: number) {
    const takeRef = ref(take)
    const skipRef = ref(skip)
    const products = ref<Product[]>([])

    const { result, loading, error, refetch } = useQuery<{ products: { items: Product[], totalItems: number } }>(
        GET_PRODUCTS,
        {
            take: takeRef.value,
            skip: skipRef.value,
        },
        {
            fetchPolicy: 'no-cache',
        }
    )

    const errorMessage = computed(() => error.value?.message || '')
    const totalCount = computed(() => result.value?.products.totalItems ?? 0)
    const hasMore = computed(() => skipRef.value + takeRef.value < totalCount.value)

    watch(
        result,
        (newResult) => {
            if (newResult) {
                products.value = newResult.products.items
            }
        },
        { immediate: true }
    )

    const loadMore = () => {
        if (hasMore.value) {
            skipRef.value += takeRef.value
            refetch({ take: takeRef.value, skip: skipRef.value })
        }
    }

    const refetchPage = (newSkip: number) => {
        skipRef.value = newSkip
        refetch({ take: takeRef.value, skip: skipRef.value })
    }

    return {
        products,
        totalCount,
        loading,
        error: errorMessage,
        loadMore,
        hasMore,
        refetchPage,
        skip: skipRef,
        take: takeRef,
    }
}




