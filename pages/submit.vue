<script setup lang="ts">
const album_url = ref<string>('');
const album_id = computed(() => {
  const regex = /album\/([^?]+)/;
  const match = album_url.value.match(regex);
  return match ? match[1] : null;
})
const tags = ref<string[]>();
const pending = ref<boolean>(false);

const possible_tags = ['tag 1', 'tag 2', 'tag 3', 'tag4', 'tag5', 'tag6', 'tag7', 'tag8', 'tag9'];

const tags_label = (value: any[], labelProperty?: string): string => {
  if (value.length === 0) {
      return "No elements selected";
  }
  else if (value.length > 1) {
      if (value.length > 6) {
        return value.slice(0, 6).join(', ') + ` and ${value.length - 6 } more.`
      }
      return value.join(', ');
  }
  return labelProperty ? String(value[0][labelProperty]) : String(value[0]);
}

async function submitAlbum() {
  pending.value = true;

  const album_data = await $fetch(`/api/v1/getAlbumData?album_id=${album_id.value}`);

  const client = useSupabaseClient();
  // @ts-expect-error
  const { error } = await client.from('Albums').insert(album_data);
  pending.value = false;

  if (error) {
    if (error.code == '23505') alert(`Album "${album_data.album_name}" has already been added`);
    else console.error(error);
  }
  else alert(`Album "${album_data.album_name}" added successfully.`)
}

const checkLink = computed<boolean|string>(() => {
  const url = album_url.value;
  if (url == '') return false;
  if (!url.includes('spotify')) return 'Must be a Spotify link';
  if (!url.includes('album')) return 'Link must be for an album';
  return false;
});
</script>

<template>
  <main class="py-8 px-6">
    <BaseHeading as="h2" size="3xl" weight="extrabold" class="text-muted-800 dark:text-white">
      Submit an Album
    </BaseHeading>
    <div class="mt-5 max-w-lg">
      <BaseInput
        v-model="album_url"
        label="Album URL"
        placeholder="Ex: https://open.spotify.com/album/0ZSwTSaR9VUe3uYsXNQgub?si=isW0WtwpQjKYhYLFNiGx-w"
        :error="checkLink"
      />
      <!-- <BaseListbox
        v-model="tags"
        label="Tags"
        :items="possible_tags"
        multiple
        :multiple-label=tags_label
      /> -->
      <BaseButton
        color="primary"
        class="mt-3"
        @click="submitAlbum"
        :loading="pending"
        :disabled="!album_url.includes('album') && !album_url.includes('spotify')"
      >
        Submit Album
      </BaseButton>
    </div>
  </main>
</template>