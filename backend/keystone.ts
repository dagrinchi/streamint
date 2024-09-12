import { config } from '@keystone-6/core'
import { lists } from './schema'
import path from 'path'
import dotenv from 'dotenv'

import { withAuth, session } from './auth'

dotenv.config()

const BASE_BACKEND_URL = process.env.BASE_BACKEND_URL
const BASE_FRONTEND_URL = process.env.BASE_FRONTEND_URL

export default withAuth(
  config({
    db: {
      provider: 'sqlite',
      url: 'file:./keystone.db',
    },
    lists,
    session,
    server: { cors: { origin: [BASE_BACKEND_URL, BASE_FRONTEND_URL], credentials: true } },
    storage: {
      local_files_storage: {
        kind: 'local',
        type: 'file',
        generateUrl: path => `${BASE_BACKEND_URL}/files/${path}`,
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
