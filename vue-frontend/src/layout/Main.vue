<template>
  <div class="flex flex-col min-h-screen">
    <Navigation />
    <main class="flex-grow bg-gray-100">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Footer from "@/layout/Footer.vue";
import Navigation from "@/layout/Navigation.vue";
</script>
