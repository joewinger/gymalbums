<script setup lang="ts">
const album_url = ref<string>();
const tags = ref<string[]>();

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
        placeholder="https://open.spotify.com/album/0ZSwTSaR9VUe3uYsXNQgub?si=isW0WtwpQjKYhYLFNiGx-w"
      />
      <!-- <BaseListbox
        v-model="tags"
        label="Tags"
        :items="possible_tags"
        multiple
        :multiple-label=tags_label
      /> -->
      <BaseButton color="primary" class="mt-3">Submit Album</BaseButton>
    </div>
  </main>
</template>