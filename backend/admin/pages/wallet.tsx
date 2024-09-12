/** @jsxRuntime classic */
/** @jsx jsx */

import React from 'react'

import dynamic from 'next/dynamic'

import { PageContainer } from '@keystone-6/core/admin-ui/components'
import { jsx, Heading } from '@keystone-ui/core'
import { ArweaveWalletKit, ConnectButton, useConnection } from 'arweave-wallet-kit'

const BASE_BACKEND_URL = process.env.BASE_BACKEND_URL || 'http://localhost:3000'

const ConnectWallet = dynamic(() => import('../components/ConnectWallet'), { ssr: false })
const StoreWallet = dynamic(() => import('../components/StoreWallet'), { ssr: false })

export default function Wallet() {
  return (
    <PageContainer header={<Heading type="h3">Connect Wallet</Heading>}>
      <h1 css={{ width: '100%', textAlign: 'center' }}>
        Wallet Connect
      </h1>
      <ArweaveWalletKit config={{
        permissions: ['ACCESS_ADDRESS', 'ACCESS_ALL_ADDRESSES', 'ACCESS_ARWEAVE_CONFIG', 'ACCESS_PUBLIC_KEY', 'SIGN_TRANSACTION'],
        ensurePermissions: true,
        appInfo: {
          name: 'Streamint',
          logo: `${BASE_BACKEND_URL}/icon.png`
        }
      }}>
        <ConnectWallet />
        <StoreWallet />
      </ArweaveWalletKit>
    </PageContainer>
  )
}
