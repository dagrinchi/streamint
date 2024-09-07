/** @jsxRuntime classic */
/** @jsx jsx */

import React from 'react'

import { PageContainer } from '@keystone-6/core/admin-ui/components'
import { jsx, Heading } from '@keystone-ui/core'
import { ArweaveWalletKit, ConnectButton } from 'arweave-wallet-kit'

export default function Wallet() {
  return (
    <PageContainer header={<Heading type="h3">Connect Wallet</Heading>}>
      <h1 css={{ width: '100%', textAlign: 'center' }}      >
        Wallet Connect
      </h1>
      <p css={{ textAlign: 'center' }}      >
        We need to connect to your ArConnect wallet to access all features.
      </p>
      <div css={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', textAlign: 'center' }}>
        <ArweaveWalletKit config={{
          permissions: ['ACCESS_ADDRESS', 'ACCESS_ALL_ADDRESSES', 'ACCESS_ARWEAVE_CONFIG', 'ACCESS_PUBLIC_KEY', 'SIGN_TRANSACTION'],
          ensurePermissions: true,
          appInfo: {
            name: 'Streamint',
            logo: 'http://localhost:3000/icon.png'
          }
        }}>
          <ConnectButton />
        </ArweaveWalletKit>
      </div>
    </PageContainer>
  )
}
