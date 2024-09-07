/** @jsxRuntime classic */
/** @jsx jsx */

"use client"

import React from 'react'

import { jsx } from '@keystone-ui/core'
import { ConnectButton, useConnection } from 'arweave-wallet-kit'

export default function ConnectWallet() {
  const { connected } = useConnection()
  return (
    <>
      {!connected && <p css={{ textAlign: 'center' }}      >
        First, we need to connect to your ArConnect wallet to access all features.
      </p>}
      <div css={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', textAlign: 'center' }}>
        <ConnectButton />{/* TODO: Should be awesome callback events to automatically store data */}
      </div>
    </>
  )
}