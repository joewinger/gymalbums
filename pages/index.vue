<script setup lang="ts">
import Album from '../components/AlbumCard.vue';

let currentPage = 1;
let resultsPerPage = 50;

const client = useSupabaseClient()
const { data: albums, error } = await useAsyncData('albums', async () => {
  const { data } = await client.from('Albums').select('*, Ratings( rating )').order('created_at', { ascending: false }).range((currentPage-1)*resultsPerPage, currentPage*resultsPerPage);
  return data
})
</script>

<template>
  <main class="py-8 px-3 sm:px-8">
    <h2 class="text-3xl font-bold text-muted-800 dark:text-muted-200">
      Recently Added
    </h2>
    <div class="mt-8 mx-auto flex flex-wrap justify-center items-start gap-11">
      <a v-for="(album, index) in albums" :key="index" :href="`/album/${(album as typeof Album).spotify_id}`">
        <AlbumCard :album="album" />
      </a>
    </div>
  </main>
</template>