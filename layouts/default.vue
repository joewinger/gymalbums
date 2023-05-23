<template>
  <div>
    <header class="bg-blue-500 text-white py-4 px-6">
      <div class="container mx-auto flex items-center justify-between">
        <h1 class="text-2xl font-bold"><a href="/">Gym Albums</a></h1>
        <nav>
          <ul class="flex space-x-4">
            <li><BaseButton to="/submit">Submit an Album</BaseButton></li>
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