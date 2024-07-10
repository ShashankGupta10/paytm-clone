'use server'
import { redis } from '../redis'

export const deleteToken = async (token: string) => {
  await redis.del(token)
}
