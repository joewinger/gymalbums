<script setup lang="ts">
export interface Album {
  album_name: string,
  spotify_url: string,
  artists: string[],
  album_cover_url: string,
  album_release_date?: Date,
  tags: string[]
  Ratings: {
    rating: number
  }[]
}
const { album } = defineProps<{
  album: Album
}>();

const { album_name, spotify_url, artists, album_cover_url, tags, Ratings } = album;
const hasRatings = Ratings.length;

const avgRating = Ratings.reduce((acc, val) => acc + val.rating, 0) / Ratings.length;
</script>

<template>
  <div class="text-muted-600 dark:text-muted-300 w-full sm:w-64 p-3">
    <!-- Album Cover -->
    <img :src="album_cover_url" :alt="album_name" class="w-fill object-cover rounded-xl" />

    <!-- Title -->
    <h2 class="font-bold text-xl mt-5 dark:text-muted-300">
      {{ album_name }}
    </h2>

    <div class="flex justify-between items-center">
      <div>
        <!-- Artists -->
        <p class="text-sm mt-2">
          {{ artists.join(', ') }}
        </p>
    
        <!-- Rating -->
        <div class="mt-3 text-yellow-500 flex items-center gap-1 text-sm">
          <span v-if="!hasRatings">No ratings yet</span>
          <StarRating v-else :rating="avgRating" :num-ratings="Ratings.length" />
        </div>
      </div>
      
      <!-- Spotify Link -->
      <a :href=spotify_url class="rounded-full text-lime-600">
        <Icon name="bx:play-circle" class="w-9 h-9" />
      </a>
    </div>
  </div>
</template>