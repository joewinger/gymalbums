<script setup>
const user = useSupabaseUser()
const client = useSupabaseAuthClient()

async function login() {
  const { error } = await client.auth.signInWithOAuth({ provider: 'spotify' })
  if (error) {
    return alert('Something went wrong!');
  }
}

useHead({
  title: 'Gym Albums'
});
</script>

<template>
  <div>
    <header class="bg-blue-500 text-white py-4 px-6">
      <div class="container mx-auto flex items-center justify-between">
        <h1 class="text-2xl font-bold"><a href="/">Gym Albums</a></h1>
        <nav>
          <ul class="flex space-x-4">
            <li><BaseButton to="/submit" :color="user ? 'default' : 'muted'" :disabled="!user">Submit an Album</BaseButton></li>
            <li v-if="user"><BaseButton @click="client.auth.signOut()">Log Out</BaseButton></li>
            <li v-else><BaseButton @click="login">Log In</BaseButton></li>
          </ul>
        </nav>
      </div>
    </header>
    <slot />
    <footer class="bg-blue-500 text-white py-4 px-6 mt-8">
        <p class="text-center text-sm">&copy; 2023 Gym Albums. All rights reserved.</p>
    </footer>
  </div>
</template>