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

  if (error)
    return alert('Something went wrong !')
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
        <Icon name="uil:github" size="20" /> Continue with GitHub
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  height: 100vh;

  > .title {
    text-align: center;
    color: $primary-color;
  }

  > .actions  > .login {
    padding: 8px 16px;
    background-color: $dark-color;
    color: $light-color;
    border-radius: 8px;
    transition: 0.3s ease-in;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;

    &:hover {
      background-color: lighten($dark-color, 10%);
    }
  }
}
</style>
