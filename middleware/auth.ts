export default defineNuxtRouteMiddleware((to, _from) => {
  const user = useSupabaseUser()

  if (!user.value)
    return navigateTo(to.path === '/' ? 'login' : `login?redirectTo=${to.fullPath}`)
})
