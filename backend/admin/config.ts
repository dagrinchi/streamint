import { type AdminConfig } from '@keystone-6/core/types'

import CustomLogo from './components/CustomLogo'
import Navigation from './components/Navigation'

export const components: AdminConfig['components'] = {
  Logo: CustomLogo,
  Navigation: Navigation
}