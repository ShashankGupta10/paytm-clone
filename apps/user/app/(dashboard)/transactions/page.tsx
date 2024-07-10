import { Card } from '@repo/ui/card'
import { getOnRampTransactions } from '../../../lib/actions/getTransactions'
export default async function Page() {
  const transactions = await getOnRampTransactions()
  return (
    <div className="w-full">
      <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
        Transactions
      </div>
      <Card title="Recent Transactions">
        <div className="pt-2 flex flex-col gap-4">
          {transactions.map((t, idx) => (
            <div key={idx} className="flex justify-between">
              <div>
                <div className="text-sm">
                  {t.transactionType === 'Deposit'
                    ? 'Received INR'
                    : 'Sent INR'}
                </div>
                <div className="text-slate-600 text-xs">
                  {t.time.toDateString()}
                </div>
              </div>
              <div className="flex flex-col justify-center">
                {t.transactionType === 'Deposit' ? '+' : '-'} Rs{' '}
                {t.amount / 100}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
