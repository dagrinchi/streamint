/** @jsxRuntime classic */
/** @jsx jsx */

import React from 'react'

import { Button } from '@keystone-ui/button'
import { FlagIcon } from '@keystone-ui/icons'

import { jsx, useTheme } from '@keystone-ui/core'

import { ListNavItems, NavItem, NavigationContainer } from '@keystone-6/core/admin-ui/components'
import { NavigationProps } from '@keystone-6/core/types'

export default function Navigation({ lists, authenticatedItem }: NavigationProps) {
  const { colors, palette, spacing, radii, typography } = useTheme()
  return (
    <NavigationContainer authenticatedItem={authenticatedItem}>
      <NavItem href="/">Dashboard</NavItem>
      <ListNavItems lists={lists} />
      <li css={{
        background: 'transparent',
        display: 'block',
        padding: `${spacing.small}px ${spacing.xlarge}px`
      }}>
        <Button
          as="a"
          href="/wallet"
          tone="positive"
          css={{
            textDecoration: 'none'
          }}>
          <span css={{ marginRight: `${spacing.small}px` }}>Connect Wallet</span>
          <FlagIcon size="small" />
        </Button>
      </li>
    </NavigationContainer>
  )
}