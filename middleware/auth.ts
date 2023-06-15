export default defineNuxtRouteMiddleware(async (to, _from) => {
  const user = useSupabaseUser()

  const fallbackRoute = to.path === '/' ? 'login' : `login?redirectTo=${to.fullPath}`
  if (!user.value)
    return navigateTo(fallbackRoute)
})
