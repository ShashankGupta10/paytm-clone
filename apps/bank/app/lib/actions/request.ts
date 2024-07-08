'use server'
import axios from 'axios'
import { redis } from '../redis'

export const respondToWebhook = async (
  status: string,
  token: string,
  amount: number,
  userId: number
) => {
  const data = await axios.post('http://localhost:3001/api/bankTxn', {
    status,
    token: token,
    amount: amount,
    userId: userId,
    secret: process.env.SECRET,
  })
  console.log(data.data)
  await redis.set(token, null)
}
