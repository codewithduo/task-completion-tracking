<script setup lang="ts">
const user = useSupabaseUser()
const username = computed(() => user.value?.user_metadata.full_name)
const avatar = computed(() => user.value?.user_metadata.avatar_url)

const supabase = useSupabaseClient()
async function logout() {
  const { error } = await supabase.auth.signOut()

  if (error)
    return alert('Something went wrong !')

  await navigateTo('/login')
}
</script>

<template>
  <div class="default-layout">
    <header class="header">
      <h1 class="title">
        Task Completion Tracking
      </h1>
      <div class="user-card">
        <img class="avatar" :src="avatar" alt="user-avatar">
        <div class="content">
          <h5 class="username">
            {{ username }}
          </h5>
          <div class="actions">
            <button class="logout" @click="logout">
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
    <main class="main-content">
      <slot />
    </main>
    <footer class="footer">
      <p class="copyright">
        CodewithDuo ©2023 Created by trankhacbinhduong
      </p>
      <div class="socials">
        <NuxtLink to="https:/codewithduo.vercel.app" target="_blank">
          <Icon name="uil:globe" size="20" />
        </NuxtLink>
        <NuxtLink to="https://facebook.com/trankhacbinhduong" target="_blank">
          <Icon name="uil:facebook" size="20" color="#3b5998" />
        </NuxtLink>
        <NuxtLink to="https://github.com/trankhacbinhduong" target="_blank">
          <Icon name="uil:github" size="20" />
        </NuxtLink>
      </div>
    </footer>
  </div>
</template>

<style scoped lang="scss">
.default-layout {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;

  > .header {
    width: 100%;
    padding: 16px 20px;
    display: flex;
    justify-content: space-between;
    box-shadow: $box-shadow-large;
  }

  > .header > .title {
    color: $primary-color;
  }

  > .header > .user-card {
    display: flex;
    justify-content: space-between;
  }

  > .header > .user-card {
    display: flex;
    gap: 8px;
  }

  > .header > .user-card > .avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
  }

  > .header > .user-card > .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
  }

  > .header > .user-card > .content > .actions > .logout {
    font-size: 12px;
    padding: 0;
    color: $secondary-color;
    text-decoration: underline;
  }

  > .main-content {
    flex-grow: 1;
    padding: 20px;
    background-color: $background-color;
  }

  > .footer {
    padding: 20px;
    display: flex;
    justify-content: space-between;
  }

  > .footer > .socials {
    display: flex;
    gap: 8px;
  }
}
</style>
