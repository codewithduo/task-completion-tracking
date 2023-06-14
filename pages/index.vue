<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})

const user = useSupabaseUser()
const username = computed(() =>
  user.value?.user_metadata.full_name,
)
const avatar = computed(() =>
  user.value?.user_metadata.avatar_url,
)

const supabase = useSupabaseClient()
async function logout() {
  const { error } = await supabase.auth.signOut()

  if (error)
    return alert('Something went wrong !')

  await navigateTo('login')
}
</script>

<template>
  <div class="home-page">
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
  </div>
</template>

<style scoped lang="scss">
.home-page {
  > .header {
    width: 100%;
    padding: 8px 20px;
    display: flex;
    justify-content: space-between;
    box-shadow: $box-shadow-medium;
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
}
</style>
