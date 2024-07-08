'use client'
import React, { useEffect, useState } from 'react'
import { Button } from '@repo/ui/button'
import { respondToWebhook } from '../lib/actions/request'
import { getTTL } from '../lib/actions/getTTL'
import { deleteToken } from '../lib/actions/deleteToken'

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
    await respondToWebhook(status, params.token, amount, userId)
    await deleteToken(params.token)
    setValid(false) // Set valid to false to show "Token not found" message
    window.location.href = 'http://localhost:3001/transfer'
  }

  return !valid ? (
    <div>Token not found</div>
  ) : (
    <div>
      <Button onClick={() => handleButtonClick('success')}>
        Simulate a Successful Request to the Bank
      </Button>
      <Button onClick={() => handleButtonClick('failure')}>
        Simulate a Failed Request to the Bank
      </Button>
    </div>
  )
}

export default Token
