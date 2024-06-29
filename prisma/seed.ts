import bcrypt from 'bcrypt'

import { prisma } from '@/libs/prisma'

async function seed() {
  await prisma.users.deleteMany()

  const hash = await bcrypt.hash('Teste123!@#', 12)

  await prisma.users.create({
    data: {
      name: 'Artur Schincariol Rossi',
      email: 'artur@gmail.com',
      password: hash,
      role: 'ADMIN',
    },
  })

  await prisma.$disconnect()
}

seed()
  .then(() => {
    console.warn({ message: 'Database Seeded!' })
  })
  .catch((error) => console.error({ error }))
