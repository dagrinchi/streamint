"use client"

import React from 'react'
import ReactPlayer from 'react-player'

export default function VideoPlayer({ url, ...props }) {
  return (
    <ReactPlayer url={url} {...props} />
  )
}
