<script setup lang="ts">
const supabase = useSupabaseAuthClient()
const user = useSupabaseUser()

async function handleLogin() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
  })

  if (error)
    return alert('Something went wrong !')
}

watchEffect(() => {
  if (user.value)
    navigateTo('/')
})
</script>

<template>
  <div class="login-page">
    <h1 class="title">
      Task Completion Tracking
    </h1>
    <div class="actions">
      <button type="button" class="login" @click="handleLogin">
        Login With Github
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
    background-color: $secondary-color;
    color: $light-color;
    border-radius: 8px;
    transition: 0.3s ease-in;

    &:hover {
      background-color: lighten($secondary-color, 10%);
    }
  }
}
</style>
