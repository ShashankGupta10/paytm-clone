'use server'
import axios from 'axios'

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
  if (!data.data.success) {
    console.log('Invalid fields')
    return { success: false }
  } else {
    return { success: true }
  }
}
