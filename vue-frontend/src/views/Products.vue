<template>
  <div v-if="loading" class="text-center text-gray-500 py-10">Loading...</div>
  <ul v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
    <li v-for="product in products" :key="product.id" class="bg-white rounded shadow hover:shadow-lg transition p-4">
      <img
          @click="goToProduct(product)"
          :src="product.featuredAsset?.preview"
          alt=""
          class="w-full h-48 object-cover mb-4 rounded"
      />
      <h3 class="text-lg font-semibold text-gray-800">{{ product.name }}</h3>
      <h3 class="text-lg font-semibold text-gray-800">
        {{ (product.variants?.[0]?.priceWithTax / 100).toFixed(2) }} USD
      </h3>
    </li>
  </ul>
  <div class="flex justify-between p-5 m-2">
    <button
        v-show="page!=1"
        type="button"
        @click="previousPage"
        class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
    >
      Previous
    </button>
    <p class="flex-grow text-center font-semibold">Page {{ page }}/{{ pagesCount }}</p>

    <button
        v-show="page != pagesCount"
        type="button"
        @click="nextPage"
        class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
    >
      Next
    </button>
  </div>
</template>


<script setup lang="ts">
import router from "../router";
import { computed, ref } from 'vue'
import { getProducts } from '../services/productService'

const page = ref(1)
const productsPerPage = 36

const {
  products,
  totalCount,
  loading,
  hasMore,
  refetchPage,
} = getProducts(0, productsPerPage)

const pagesCount = computed(() => Math.ceil(totalCount.value / productsPerPage));

const nextPage = () => {
  if (hasMore.value) {
    page.value++
    refetchPage((page.value - 1) * productsPerPage)
  }
}

const previousPage = () => {
  if (page.value > 1) {
    page.value--
    refetchPage((page.value - 1) * productsPerPage)
  }
}

const goToProduct = (product: any) => {
  router.push({ name: 'Product',
    params: { slug: product.slug}
  });
};

</script>
