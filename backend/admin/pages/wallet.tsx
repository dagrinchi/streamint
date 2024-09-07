/** @jsxRuntime classic */
/** @jsx jsx */

import React from 'react'

import { PageContainer } from '@keystone-6/core/admin-ui/components'
import { jsx, Heading } from '@keystone-ui/core'
import Link from 'next/link'

export default function Wallet() {
  return (
    <PageContainer header={<Heading type="h3">Connect Wallet</Heading>}>
      <h1
        css={{
          width: '100%',
          textAlign: 'center',
        }}
      >
        This is a custom Admin UI Page
      </h1>
      <p
        css={{
          textAlign: 'center',
        }}
      >
        It can be accessed via the route <Link href="/wallet">/wallet</Link>
      </p>
    </PageContainer>
  )
}
