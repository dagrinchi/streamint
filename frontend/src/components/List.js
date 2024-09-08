"use client"

import React from 'react'

export default function List() {
  const [posts, setPosts] = React.useState()

  React.useEffect(() => {
    (async () => {
      const res = await fetch('http://localhost:3000/api/graphql', {
        method: 'POST',
        body: JSON.stringify({"query":"query Query($where: PostWhereInput!) {\r\n  posts(where: $where) {\r\n    id\r\n    title\r\n    description\r\n    author {\r\n      name\r\n    }\r\n    video {\r\n      filename\r\n      url\r\n    }\r\n    tags {\r\n      name\r\n    }\r\n    placements {\r\n      assignment_id\r\n      id\r\n      status\r\n      provider_id\r\n      created_at\r\n      updated_at\r\n      error_was\r\n      provider_connection_strings\r\n    }\r\n  }\r\n}","variables":{"where":{"status":{"equals":"ASSIGNMENT"}}},"operationName":"Query"}),
        headers: { 'Content-Type': 'application/json' }
      })
      const json = await res.json()
      setPosts(json.data.posts)
    })()
  }, []);

  if (!posts) return <p className="text-center">Loading...</p>
  
  return (
    <div>
      
    </div>
  )
}
