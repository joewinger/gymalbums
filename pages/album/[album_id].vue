<script setup lang="ts">
const client = useSupabaseClient();
const user = useSupabaseUser()
const route = useRoute();
const { album_id } = route.params;

const myReview = reactive({
  rating: null,
  review: null
});

const { data: album, pending, refresh } = await useAsyncData('album', async () => {
  const { data } = await client.from('Albums').select('*, Ratings( review, rating, id )').eq('spotify_id', album_id).single();
  return data
});

const avgRating = computed(() => {
  if (album.value.Ratings.length === 0) return null;
  // @ts-ignore
  return album.value.Ratings.reduce((acc, val) => acc + val.rating, 0) / album.value.Ratings.length;
});

const reviews = computed(() => {
  return album.value.Ratings.filter((rating: any) => rating.review)
});

async function submitRating() {
  const { error } = await client.from('Ratings').insert({
    album_id: album_id,
    rating: myReview.rating,
    review: myReview.review,
    user_id: user.value?.id
  });
  if (error) alert(error.code == '23505' ? 'You\'ve already rated this album.' : error.message);
  else alert('Rating submitted successfully.');

  refresh();
}
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
        <div class="mt-2 text-amber-400">
          <span v-if="avgRating" class="flex items-center">
            <StarRating :rating="avgRating" />
            <span class="text-sm">({{ album.Ratings.length || '0' }})</span>
          </span>
          <span v-else class="text-sm">
            No ratings yet
          </span>
        </div>

        <!-- Ratings -->
        <BaseCard class="p-3 w-fill mt-2">
          <!-- Submit Rating -->
          <BaseCard class="p-3 w-fill">
            <BaseHeading
              as="h3"
              size="md"
              weight="semibold"
              lead="tight"
              class="text-muted-800 mb-2 dark:text-white"
            >
              Rate this album
            </BaseHeading>
            <BaseMessage icon type="info" v-if="!user">Log in to rate & review</BaseMessage>
            <div v-else>
              <div class="flex flex-col gap-2 mb-2">
                <BaseRadio v-model="myReview.rating" name="checkbox_base" label="⭐️" value="1" :disabled="!user"/>
                <BaseRadio v-model="myReview.rating" name="checkbox_base" label="⭐️⭐️" value="2" :disabled="!user"/>
                <BaseRadio v-model="myReview.rating" name="checkbox_base" label="⭐️⭐️⭐️" value="3" :disabled="!user"/>
              </div>
              <BaseTextarea
                v-model="myReview.review"
                label="Review (optional)"
                placeholder="Write a review..."
                rows="2"
                autogrow
                :disabled="!user"
              />
              <BaseButton v-if="!user" condensed color="primary" class="mt-2" disabled>Log In To Rate</BaseButton>
              <BaseButton v-else condensed color="primary" class="mt-2" @click="submitRating">Submit Rating</BaseButton>
            </div>
          </BaseCard>

          <!-- Reviews -->
          <BaseHeading
            as="h3"
            size="md"
            weight="semibold"
            lead="tight"
            class="text-muted-800 mt-2 dark:text-white"
          >
            Reviews
          </BaseHeading>
          <BasePlaceload v-if="pending" class="h-16 w-full rounded mt-2" />
          <div v-else v-for="review in reviews" :key="review.id" class="mt-2">
            <StarRating :rating="review.rating" />
            <p class="text-sm">{{ review.review }}</p>
          </div>
        </BaseCard>
      </div>
    </div>
  </main>
</template>