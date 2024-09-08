"use client"

import React from 'react'
import LoginForm from 'streamint/components/LoginForm'

export default function LoginModal({ children }) {
  const [user, setUser] = React.useState()
  const [loading, setLoading] = React.useState(true)
  
  React.useEffect(() => {
    (async () => {
      const ures = await fetch('http://localhost:3000/api/graphql', {
        method: 'POST',
        body: JSON.stringify({ "query": "query Query {authenticatedItem {... on User {  email id name }}}", "variables": {}, "operationName": "Query" }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      })
      const ujson = await ures.json()
      setUser(ujson.data.authenticatedItem)
      setLoading(false)
    })()
  }, [])

  if (loading) return <p className="text-center">Loading...</p>

  if (user) return <>{children}</>

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      
      <h1 className="font-blinkmacsystemfont-black font-bold text-4xl mb-4">Streamint</h1>
      <LoginForm onLogin={setUser} />
    </div>
  )
}


