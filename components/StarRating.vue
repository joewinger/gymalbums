<script setup lang="ts">
import { start } from 'repl';

const { rating, maxStars = 3, numRatings } = defineProps<{
  rating: number,
  maxStars?: number,
  numRatings?: number
}>();

const fullStars: number = Math.floor(rating);
const halfStar: boolean = rating % 1 >= 0.5;
const emptyStars: number = maxStars - fullStars - (halfStar ? 1 : 0);

</script>

<template>
  <span class="flex flex-row items-center text-yellow-400">
    <Icon name="material-symbols:star-rounded" class="w-6 h-6" v-for="star of fullStars" />
    <Icon name="material-symbols:star-half-rounded" class="w-6 h-6" v-if="halfStar" />
    <Icon name="material-symbols:star-outline-rounded" class="w-6 h-6" v-for="star of emptyStars" />
    <span class="text-sm font-bold ml-1" v-if="numRatings">({{ numRatings }})</span>
  </span>
</template>