<script setup lang='ts'>
import { SignInWithOAuthCredentials } from '@supabase/gotrue-js';

const user = useSupabaseUser();
const client = useSupabaseAuthClient();

const { public: { nodeEnv } } = useRuntimeConfig();

async function login() {
  const options: SignInWithOAuthCredentials = nodeEnv === 'development' ?
    { provider: 'spotify', options: { redirectTo: 'http://localhost:3000' } }
    : { provider: 'spotify' };
  const { error } = await client.auth.signInWithOAuth(options);
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
            <li><BaseButton to="/submit" :color="user ? 'default' : 'muted'" :disabled="!user">Submit&nbsp;Album</BaseButton></li>
            <li v-if="user"><BaseButton @click="client.auth.signOut()">Log&nbsp;Out</BaseButton></li>
            <li v-else><BaseButton @click="login">Log&nbsp;In</BaseButton></li>
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