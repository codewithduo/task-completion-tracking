<script setup lang="ts">
definePageMeta({
  layout: 'blank',
})

const supabase = useSupabaseAuthClient()
const user = useSupabaseUser()
const route = useRoute()

async function handleLogin() {
  const redirectTo = `${window.location.origin}/${route.query.redirectTo || 'tasks'}`
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo,
    },
  })

  if (error) {
    return useNotification({
      message: 'Something went wrong!',
      type: 'error',
    })
  }
}

watchEffect(async () => {
  if (user.value) {
    await navigateTo(route.query.redirectTo as string, {
      replace: true,
    })
  }
})
</script>

<template>
  <div class="login-page">
    <h1 class="title">
      Task Completion Tracking
    </h1>
    <div class="actions">
      <button type="button" class="login" @click="handleLogin">
        <Icon name="uil:github" size="20" class="mr-2" />
        Sign in with Github
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-page {
  @apply flex flex-col items-center justify-center w-full h-[100vh];

  > .title {
    @apply text-5xl text-blue-600 font-extrabold mb-4;
  }

  > .actions  > .login {
    @apply text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 mb-2;
  }
}
</style>
