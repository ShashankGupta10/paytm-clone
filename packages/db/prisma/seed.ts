import { prisma } from '@repo/db/db'

async function main() {
  await prisma.user.upsert({
    where: { number: '9999999999' },
    update: {},
    create: {
      number: '9999999999',
      password: 'alice',
      name: 'alice',
      OnRampTransaction: {
        create: {
          startTime: new Date(),
          status: 'Success',
          amount: 20000,
          token: '122',
          provider: 'HDFC Bank',
          transactionType: 'Deposit',
        },
      },
    },
  })
  await prisma.user.upsert({
    where: { number: '9999999998' },
    update: {},
    create: {
      number: '9999999998',
      password: 'bob',
      name: 'bob',
      OnRampTransaction: {
        create: {
          startTime: new Date(),
          status: 'Failure',
          amount: 2000,
          token: '123',
          provider: 'HDFC Bank',
          transactionType: 'Deposit',
        },
      },
    },
  })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
  })
