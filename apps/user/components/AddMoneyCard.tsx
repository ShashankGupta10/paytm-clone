'use client'
import { Button } from '@repo/ui/button'
import { Card } from '@repo/ui/card'
import { Select } from '@repo/ui/select'
import { useState } from 'react'
import { TextInput } from '@repo/ui/input'
import { onRampTxn } from '../lib/actions/onRampTxn'

const SUPPORTED_BANKS = [
  {
    name: 'HDFC Bank',
    redirectUrl: 'https://netbanking.hdfcbank.com',
  },
  {
    name: 'Axis Bank',
    redirectUrl: 'https://www.axisbank.com/',
  },
  {
    name: 'ICICI Bank',
    redirectUrl: 'https://www.icicibank.com/',
  },
]

export const AddMoney = () => {
  const [amount, setAmount] = useState<number>(0)
  const [provider, setProvider] = useState<string>('')
  return (
    <Card title="Add Money">
      <div className="w-full">
        <TextInput
          label={'Amount'}
          placeholder={'Amount'}
          onChange={(e: any) => {
            setAmount(Number(e))
          }}
        />
        <div className="py-4 text-left">Bank</div>
        <Select
          onSelect={(value: any) => {
            setProvider(value)
          }}
          options={SUPPORTED_BANKS.map((x) => ({
            key: x.name,
            value: x.name,
          }))}
        />
        <div className="flex justify-center pt-4">
          <Button
            onClick={async () => {
              await onRampTxn(amount, provider)
            }}
          >
            Add Money
          </Button>
        </div>
      </div>
    </Card>
  )
}
