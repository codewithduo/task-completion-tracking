<template>
  <Suspense>
    <template #default>
      <div>
        <NuxtLayout>
          <NuxtPage />
        </NuxtLayout>
        <AppNotificationContainer />
      </div>
    </template>
    <template #fallback>
      Loading...
    </template>
  </Suspense>
</template>
