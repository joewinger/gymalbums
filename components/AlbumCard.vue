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

const avgRating = Ratings.reduce((acc, val) => acc + val.rating, 0) / Ratings.length;
</script>

<template>
  <BaseCard shape="rounded" elevated class="p-4 w-full">
    <div class="flex items-start">
      <!-- Album Cover -->
      <img :src="album_cover_url" :alt="album_name" class="w-28 h-28 object-cover">

      <div class="ms-3 grow">
        <!-- Title -->
        <BaseHeading
          as="h4"
          size="sm"
          weight="semibold"
          lead="tight"
          class="text-muted-800 mb-2 dark:text-white"
        >
          {{ album_name }}
        </BaseHeading>

        <!-- Artists -->
        <p class="text-sm text-gray-600 dark:text-gray-300">{{ artists.join(', ') }}</p>

        <!-- Tags -->
        <div v-if="tags?.length" class="mt-2 flex flex-wrap items-start gap-1">
          <BaseTag
            shape="full"
            condensed
            v-for="(tag, index) in tags" :key="index"
          >
            {{ tag }}
          </BaseTag>
        </div>

        <!-- Rating -->
        <div class="mt-2 text-yellow-500 flex items-center gap-1">
          <span v-if="Ratings.length">
            <StarRating :rating="avgRating" :num-ratings="Ratings.length" />
          </span>
          <span v-else class="text-sm">
            No ratings yet
          </span>
        </div>

        <!-- Button Group -->
        <div class="mt-2 flex flex-wrap items-end gap-2">
          <BaseButton :to="spotify_url" color="primary" shadow="hover" condensed>
            <Icon name="bxl:spotify" class="-ms-1 h-4 w-4" />
            <span>Listen</span>
          </BaseButton>
          <BaseButton :to="`/album/${getAlbumIDFromSpotifyURL(spotify_url)}`" color="default" shadow="hover" condensed>
            <Icon name="carbon:star" class="-ms-1 h-4 w-4" />
            <span>Rate</span>
          </BaseButton>
        </div>
      </div>
    </div>
  </BaseCard>
</template>