import { config } from '@keystone-6/core'
import { lists } from './schema'
import path from 'path'

import { withAuth, session } from './auth'

export default withAuth(
  config({
    db: {
      provider: 'sqlite',
      url: 'file:./keystone.db',
    },
    lists,
    session,
    server: { cors: { origin: ['http://localhost:3000', 'http://localhost:8080'], credentials: true } },
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
    },
    ui: {
      getAdditionalFiles: [
        async () => [{
          mode: 'copy',
          inputPath: path.join(path.resolve(__dirname, '..'), 'public/favicon.ico'),
          outputPath: 'public/favicon.ico'
        },{
          mode: 'copy',
          inputPath: path.join(path.resolve(__dirname, '..'), 'public/icon.png'),
          outputPath: 'public/icon.png'
        }]
      ],
    }
  })
)
