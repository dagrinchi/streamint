/** @jsxRuntime classic */
/** @jsx jsx */

"use client"

import React from 'react'

import { Button } from '@keystone-ui/button'
import { SaveIcon } from '@keystone-ui/icons'

import { jsx, useTheme } from '@keystone-ui/core'
import { useActiveAddress, usePublicKey } from 'arweave-wallet-kit'

export default function StoreWallet() {
  const [loading, setLoading] = React.useState(false)
  const [walletStored, setWalletStored] = React.useState(-1)
  const [userEmail, setUserEmail] = React.useState<string | undefined>()

  React.useEffect(() => {
    (async () => {
      const wres = await fetch('/api/graphql', {
        method: 'POST',
        body: JSON.stringify({ "query": "query Wallets {\n  walletsCount\n}\n", "variables": {}, "operationName": "Wallets" }),
        headers: { 'Content-Type': 'application/json' }
      })
      const wjson = await wres.json()
      setWalletStored(wjson.data.walletsCount)

      const ures = await fetch('/api/graphql', {
        method: 'POST',
        body: JSON.stringify({ "query": "query Query {\r\n  authenticatedItem {\r\n    ... on User {\r\n      email\r\n    }\r\n  }\r\n}", "variables": {}, "operationName": "Query" }),
        headers: { 'Content-Type': 'application/json' }
      })
      const ujson = await ures.json()
      setUserEmail(ujson.data.authenticatedItem.email)
    })()
  }, [])

  const { spacing } = useTheme()
  const address = useActiveAddress()
  const publicKey = usePublicKey()

  if (!Boolean(address) || !Boolean(publicKey)) return <></>

  const handleSaveButton = async () => {
    setLoading(true)
    const res = await fetch('/api/graphql', {
      method: 'POST',
      body: JSON.stringify({ "query": "mutation Mutation($data: WalletCreateInput!) {\r\n  createWallet(data: $data) {\r\n    id\r\n    address\r\n  }\r\n}\r\n", "variables": { "data": { "address": address, "publickey": publicKey, "user": { "connect": { "email": userEmail } } } }, "operationName": "Mutation" }),
      headers: { 'Content-Type': 'application/json' }
    })
    await res.json()
    setLoading(false)
    setWalletStored(1)
  }

  if (walletStored < 0 || !Boolean(userEmail)) return <p css={{ textAlign: 'center' }}>Loading...</p>

  if (walletStored > 0) return <p css={{ textAlign: 'center' }}>You are all set!</p>

  return (
    <>
      <p css={{ textAlign: 'center' }}>
        Now we need to store your wallet, click on save button.
      </p>
      <div css={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', textAlign: 'center' }}>
        <Button
          tone="active"
          isLoading={loading}
          css={{
            textDecoration: 'none'
          }}
          onClick={() => handleSaveButton()}
        >
          <span css={{ marginRight: `${spacing.small}px` }}>Save</span>
          <SaveIcon size="small" />
        </Button>
      </div>
    </>
  )
}