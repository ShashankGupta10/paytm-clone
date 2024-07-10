'use client'
import React, { useEffect, useState } from 'react'
import { Button } from '@repo/ui/button'
import { respondToWebhook } from '@/lib/actions/respondToWebhook'
import { getTTL } from '@/lib/actions/getTTL'
import { deleteToken } from '@/lib/actions/deleteToken'
import Link from 'next/link'

const Token = ({
  params,
}: {
  params: {
    token: string
  }
}) => {
  const [valid, setValid] = useState(false)
  const [amount, setAmount] = useState(0)
  const [userId, setUserId] = useState(0)

  useEffect(() => {
    getTTL(params.token).then((res) => {
      setValid(res.valid)
      setAmount(res.amount)
      setUserId(res.userId)
    })
  }, [params.token])

  const handleButtonClick = async (status: string) => {
    const { success } = await respondToWebhook(
      status,
      params.token,
      amount,
      userId
    )
    if (success) {
      await deleteToken(params.token)
      setValid(false) // Set valid to false to show "Token not found" message
      window.location.href = 'http://localhost:3001/transfer'
    } else {
      // retry the request again since the paytm server might be down
      await new Promise((resolve) =>
        setTimeout(
          () => resolve(respondToWebhook(status, params.token, amount, userId)),
          5000
        )
      )
    }
  }

  return !valid ? (
    <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-start h-screen md:px-8">
      <div className="max-w-lg mx-auto space-y-3 text-center">
        <h3 className="text-indigo-600 font-semibold">404 Error</h3>
        <p className="text-gray-800 text-4xl font-semibold sm:text-5xl">
          Page not found
        </p>
        <p className="text-gray-600">
          Sorry, the page you are looking for could not be found or has been
          removed.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="block py-2 px-4 text-white font-medium bg-indigo-600 duration-150 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg"
          >
            Go back
          </Link>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex flex-col gap-4 justify-center items-center p-64">
      <p className="max-w-xl text-3xl font-bold block mx-auto">
        This is a mock bank server where you will actually pay the money to
        PayTM
      </p>
      <div className="">Amount: {amount}</div>
      <div>User Id: {userId}</div>
      <div>
        <Button onClick={() => handleButtonClick('success')}>
          Simulate a Successful Request to the Bank
        </Button>
        <Button onClick={() => handleButtonClick('failure')}>
          Simulate a Failed Request to the Bank
        </Button>
      </div>
    </div>
  )
}

export default Token
