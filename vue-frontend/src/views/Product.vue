<template>
  <div class="max-w-6xl mx-auto p-6">
    <div v-if="product" class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <img :src="product.featuredAsset?.preview" :alt="product.name" class="w-full h-auto rounded-lg shadow" />
      </div>
      <div>
        <h1 class="text-3xl font-bold mb-4">{{ product.name }}</h1>
        <p class="text-gray-700 mb-6">{{ product.description }}</p>
        <div class="space-y-4">
          <div v-for="variant in product.variants" :key="variant.id" class="border p-4 rounded-lg shadow-sm">
            <div class="flex items-center justify-between">
              <div>
                <h2 class="text-xl font-semibold">{{ variant.name }}</h2>
                <p class="text-gray-500 text-sm">SKU: {{ variant.sku }}</p>
              </div>
              <div class="text-right">
                <p class="text-lg font-bold text-indigo-600">₹{{ (variant.priceWithTax / 100).toFixed(2) }}</p>
                <p class="text-sm text-green-600">{{ variant.stockLevel.replace('_', ' ') }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="text-center py-20 text-gray-500">
      <p v-if="error">Error loading product: {{ error }}</p>
      <p v-else-if="loading">Loading product details...</p>
    </div>
    <div class="m-2 p-5">
      <h1 class="text-center font-semibold mt-5"> See other products </h1>
      <ViewOtherProductsCard />
    </div>
  </div>
</template>

<script  setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { getProduct } from '../services/productService.ts';
import type { Product } from '../services/productService.ts';

import ViewOtherProductsCard from "@/components/cards/ViewOtherProductsCard.vue";

const route = useRoute();

const product = ref<Product>({
  id: 0,
  name: '',
  description: '',
  slug: '',
  variants: [],
  featuredAsset: { preview: '' }
});

const loading = ref(true);
const error = ref<string | null>(null);

const loadProduct = (slug: string) => {
  const { result, loading: isLoading, error: loadError } = getProduct(slug);

  loading.value = true;
  error.value = null;

  watch(
      () => result.value,
      (data) => {
        if (data?.product) {
          product.value = data.product;
        }

        loading.value = isLoading.value;
        error.value = loadError.value || null;
      },
      { immediate: true }
  );
};

watch(
    () => route.params.slug,
    (newSlug) => {
      if (typeof newSlug === 'string') {
        loadProduct(newSlug);
      }
    },
    { immediate: true }
);
</script>

