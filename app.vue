<template>
  <Suspense>
    <template #default>
      <div>
        <NuxtLayout>
          <NuxtPage />
        </NuxtLayout>
      </div>
    </template>
    <template #fallback>
      Loading...
    </template>
  </Suspense>
</template>
