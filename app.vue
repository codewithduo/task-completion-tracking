<template>
  <Suspense>
    <template #default>
      <div>
        <NuxtLayout>
          <NuxtLoadingIndicator />
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
