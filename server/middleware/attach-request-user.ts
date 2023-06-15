import { REQUEST_USER_KEY } from '../constants'
import { serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  event.context[REQUEST_USER_KEY] = user
})
