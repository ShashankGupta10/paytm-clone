'use client'
import { Button } from '@repo/ui/button'
import { Card } from '@repo/ui/card'
import { TextInput } from '@repo/ui/input'
import { useState } from 'react'
import { sendMoney } from '../../../lib/actions/sendMoney'

const page = () => {
  const [contact, setContact] = useState('')
  const [amount, setAmount] = useState(0)
  return (
    <div className="w-full">
      <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
        Add Money
      </div>
      <Card title="Add Money">
        <div className="w-full">
          <TextInput
            label={'Contact Number'}
            placeholder={'Contact'}
            onChange={(e: any) => {
              setContact(e)
            }}
          />
          <TextInput
            label={'Amount'}
            placeholder={'Amount'}
            onChange={(e: any) => {
              setAmount(Number(e))
            }}
          />
          <div className="flex justify-center pt-4">
            <Button
              onClick={async () => {
                await sendMoney(contact, amount)
              }}
            >
              Add Money
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default page
