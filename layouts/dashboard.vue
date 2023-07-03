<script lang="ts" setup>
const user = useSupabaseUser()
const username = computed(() => user.value?.user_metadata.full_name)
const avatar = computed(() => user.value?.user_metadata.avatar_url)

const supabase = useSupabaseClient()
async function logout() {
  const { error } = await supabase.auth.signOut()

  if (error) {
    return useNotification({
      message: 'Something went wrong!',
      type: 'error',
    })
  }

  await navigateTo('login')
}

const isCollapsed = ref(true)
function toggleSidebar() {
  isCollapsed.value = !isCollapsed.value
}
</script>

<template>
  <div class="dashboard-layout">
    <aside class="sidebar">
      <div class="app-info">
        <Icon v-if="isCollapsed" class="logo" name="logos:nuxt" size="50" />
        <h1 v-else class="title">
          Task Completion Tracking
        </h1>
      </div>
    </aside>
    <div class="main-content">
      <header class="header">
        <Icon
          class="toggle"
          name="uil:align"
          size="30"
          @click="toggleSidebar"
        />
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
      <main class="content">
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
  </div>
</template>

<style lang="scss" scoped>
.dashboard-layout {
  height: 100vh;
  width: 100%;
  display: flex;

  > .sidebar {
    height: 100vh;
    padding: 8px 16px;
    min-width: 4%;
  }

  > .sidebar > .app-info {
    display: flex;
    align-items: center;
    gap: 16px;
    justify-content: center;
    height: 40px;
  }

  > .sidebar > .app-info > .title {
    font-size: 20px;
  }

  > .main-content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  > .main-content > .header {
    width: 100%;
    padding: 8px 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  > .main-content > .header > .toggle {
    cursor: pointer;
  }

  > .main-content > .header > .title {
    color: $primary-color;
  }

  > .main-content > .header > .user-card {
    display: flex;
    justify-content: space-between;
  }

  > .main-content > .header > .user-card {
    display: flex;
    gap: 8px;
  }

  > .main-content > .header > .user-card > .avatar {
    width: 42px;
    height: 42px;
    border-radius: 50%;
  }

  > .main-content > .header > .user-card > .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
  }

  > .main-content > .header > .user-card > .content > .actions > .logout {
    font-size: 12px;
    padding: 0;
    color: $secondary-color;
    text-decoration: underline;
  }

  .main-content > .content {
    flex-grow: 1;
    padding: 20px;
    background-color: $background-color;
  }

  > .main-content > .footer {
    padding: 20px;
    font-size: 12px;
    display: flex;
    justify-content: space-between;
  }

  > .main-content > .footer > .socials {
    display: flex;
    gap: 8px;
  }
}
</style>
