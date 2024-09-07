import { config } from '@keystone-6/core'
import { lists } from './schema'

import { withAuth, session } from './auth'

export default withAuth(
  config({
    db: {
      provider: 'sqlite',
      url: 'file:./keystone.db',
    },
    lists,
    session,
    storage: {
      local_files_storage: {
        kind: 'local',
        type: 'file',
        generateUrl: path => `http://localhost:3000/files/${path}`,
        serverRoute: {
          path: '/files'
        },
        storagePath: 'public/files'
      }
    }
  })
)
