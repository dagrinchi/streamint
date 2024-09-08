import { randomBytes } from 'node:crypto'
import { createAuth } from '@keystone-6/auth'

import { statelessSessions } from '@keystone-6/core/session'

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  sessionData: 'id name email role createdAt',
  secretField: 'password',
  initFirstItem: {
    fields: ['name', 'email', 'password', 'role'],
  },
})

const sessionMaxAge = 60 * 60 * 24 * 30

const session = statelessSessions({
  maxAge: sessionMaxAge,
  secret: process.env.SESSION_SECRET,
})

export { withAuth, session }
