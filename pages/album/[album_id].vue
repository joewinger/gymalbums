<script setup lang="ts">
const client = useSupabaseClient();

const route = useRoute();
const { album_id } = route.params;

const { data: album, pending: albumPending } = await useAsyncData('album', async () => {
  const { data } = await client.from('Albums').select('*').eq('spotify_url', `https://open.spotify.com/album/${album_id}`).single();
  return data
});
</script>
<template>
  <main class="container mx-auto my-8 px-1">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div class="md:col-span-1">
        <img :src="album.album_cover_url" :alt="album.album_name" class="w-64 object-cover rounded-lg shadow-lg">

        <BaseHeading
          as="h1"
          size="2xl"
          weight="bold"
          class="text-muted-800 mb-2 mt-4 dark:text-white"
        >
          {{ album.album_name }}
        </BaseHeading>
        <BaseHeading
          as="h2"
          size="lg"
          weight="medium"
          class="text-muted-600 mb-2 mt-2 dark:text-white"
        >
          {{ album.artists.join(', ') }}
        </BaseHeading>
      </div>


      <!-- Album Details -->
      <div class="md:col-span-2">
        <!-- Album Rating -->

        <BaseHeading
            as="h3"
            size="lg"
            weight="bold"
            class="text-muted-800 mb-2 dark:text-white"
          >
          Avg. Rating
        </BaseHeading>
        <div class="mt-2 text-yellow-500">
            <span v-if="album.rating">
              {{ '★'.repeat(album.rating) }}{{ '☆'.repeat(5 - album.rating) }}
              <span class="text-sm">({{ album.num_ratings || '0' }})</span>
            </span>
            <span v-else class="text-sm">
              No ratings yet
            </span>
          </div>
      </div>
    </div>
  </main>
</template>