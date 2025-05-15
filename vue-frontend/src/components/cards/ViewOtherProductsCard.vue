<template>
  <div v-if="loading" class="text-center text-gray-500 py-10">Loading...</div>
  <div v-else-if="error" class="text-center text-red-500 py-10">{{ error }}</div>
  <ul v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
    <li v-for="product in products" :key="product.id" class="bg-white rounded shadow hover:shadow-lg transition p-4">
      <img
          @click="goToProduct(product)"
          :src="product.featuredAsset?.preview"
          alt=""
          class="w-full h-48 object-cover mb-4 rounded"
      />
      <h3 class="text-lg font-semibold text-gray-800">{{ product.name }}</h3>
    </li>
  </ul>
</template>

<script setup lang="ts">
import router from "../../router";
import { getProducts } from '../../services/productService.ts'

const { products, loading, error } = getProducts(0,4)

const goToProduct = (product: any) => {
  router.push({ name: 'Product',
    params: { slug: product.slug}
  });
};

</script>