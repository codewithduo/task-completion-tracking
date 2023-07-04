export default defineNuxtRouteMiddleware(async (to, _from) => {
  const user = useSupabaseUser()

  const fallbackRoute = `/login?redirectTo=${to.fullPath}`
  if (!user.value)
    return navigateTo(fallbackRoute)
})
