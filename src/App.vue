<script setup lang="ts">
// Remove the Tutor import since it's now handled by the router
</script>

<template>
  <div class="flex flex-col h-screen max-w-3xl mx-auto border border-base-200 bg-base-200">
    <div class="drawer">
      <input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content flex flex-col">
        <!-- Navbar -->
        <div class="navbar bg-base-300 w-full">
          <div class="flex-none lg:hidden">
            <label for="my-drawer-3" aria-label="open sidebar" class="btn btn-square btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                class="inline-block h-6 w-6 stroke-current">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16">
                </path>
              </svg>
            </label>
          </div>
          <div class="mx-2 flex-1 px-2">Study Buddy</div>
          <div class="hidden flex-none lg:block">
            <ul class="menu menu-horizontal">
              <li><router-link to="/">Home</router-link></li>
              <li><router-link to="/cards">Study Cards</router-link></li>
              <li><router-link to="/tutor">Tutor</router-link></li>
            </ul>
          </div>
        </div>

        <!-- Router view for page content -->
        <div class="flex-1 min-h-[90dvh] max-h-[90dvh]">
          <router-view />
        </div>
      </div>

      <div class="drawer-side">
        <label for="my-drawer-3" aria-label="close sidebar" class="drawer-overlay"></label>
        <ul class="menu bg-base-200 min-h-full w-80 p-4">
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/cards">Study Cards</router-link></li>
          <li><router-link to="/tutor">Tutor</router-link></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style>
/* Remove the scoped styles and add global styles if needed, for example: */
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}

.prose {
  max-width: none;
}
</style>
