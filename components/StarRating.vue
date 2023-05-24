<script setup lang="ts">
import { start } from 'repl';

const { rating, maxStars = 3 } = defineProps<{
  rating: number,
  maxStars?: number
}>();

const fullStars: number = Math.floor(rating);
const halfStar: boolean = rating % 1 >= 0.5;
const emptyStars: number = maxStars - fullStars - (halfStar ? 1 : 0);

const classes = 'text-yellow-400 w-6 h-6';
</script>

<template>
  <Icon name="material-symbols:star-rounded" :class=classes v-for="star of fullStars" />
  <Icon name="material-symbols:star-half-rounded" :class=classes v-if="halfStar" />
  <Icon name="material-symbols:star-outline-rounded" :class=classes v-for="star of emptyStars" />
</template>