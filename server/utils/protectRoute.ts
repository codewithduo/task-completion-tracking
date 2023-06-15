import type { H3Event } from 'h3'
import { REQUEST_USER_KEY } from '../constants'

export default (event: H3Event) => {
  if (!event.context[REQUEST_USER_KEY]) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized',
    })
  }
}
