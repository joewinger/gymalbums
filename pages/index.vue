<script setup lang="ts">
const albums = [
  {
    album_name: 'Like Water For Chocolate',
    spotify_url: 'https://open.spotify.com/album/0ZSwTSaR9VUe3uYsXNQgub',
    artists: ['Common', 'Artist 2'],
    album_cover_url: 'https://i.scdn.co/image/ab67616d00001e02e42803c3943b6b0b5481caeb',
    tags: ['Rap', 'Lyrical'],
    rating: 4
  }
];
</script>

<template>
  <header class="bg-blue-500 text-white py-4 px-6">
    <div class="container mx-auto flex items-center justify-between">

      <h1 class="text-2xl font-bold">Gym Albums</h1>
      <nav>
        <ul class="flex space-x-4">
          <li><BaseButton to="/submit">Submit an Album</BaseButton></li>
        </ul>
      </nav>
    </div>
  </header>
  <main class="py-8 px-6">
    <BaseHeading as="h2" size="3xl" weight="extrabold" class="text-muted-800 dark:text-white">
      Newest Additions
    </BaseHeading>
    <div class="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
      <AlbumCard v-for="(album, index) in albums" :key="index" :album="album" />
    </div>
  </main>
</template>