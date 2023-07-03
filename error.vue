<template>
  <section class="not-found-page">
    <div class="not-found">
      <div class="content">
        <h1 class="title">
          404
        </h1>
        <p class="error">
          Something's missing.
        </p>
        <p class="description">
          Sorry, we can't find that page. You'll find lots to explore on the home page.
        </p>
        <NuxtLink to="/" class="redirect">
          Back to Homepage
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.not-found-page {
  @apply bg-white;

  > .not-found {
    @apply py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6;
  }

  > .not-found > .content {
    @apply mx-auto max-w-screen-sm text-center;
  }

  > .not-found > .content > .title {
    @apply mb-4 text-8xl tracking-tight font-extrabold lg:text-9xl text-blue-600;
  }

  > .not-found > .content > .error {
    @apply mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl;
  }

  > .not-found > .content > .description {
    @apply mb-4 text-lg font-light text-gray-500
  }

  > .not-found > .content > .redirect {
    @apply inline-flex text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center my-4
  }
}
</style>
