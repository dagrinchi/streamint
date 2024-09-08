import React from 'react'

import dynamic from "next/dynamic"

const VideoPlayer = dynamic(() => import('streamint/components/VideoPlayer'), { ssr: false })

export default function Item() {
  return (
    <article className="snap-start grid grid-rows-2 grid-cols-1 lg:grid-cols-2 lg:grid-rows-1 h-[95%] max-h-screen">
      <div className="p-4 flex flex-col justify-end items-end">
        <h1 className="font-blinkmacsystemfont-black font-bold text-4xl mb-4">Streamint</h1>
        <h2 className="font-helveticaneue font-medium text-xl">Lorem ipsum lorem ipsum</h2>
        <p></p>
        <p></p>
        <p>[scroll down]</p>
      </div>
      <div className="p-4 lg:pt-4">
        <div className="h-full relative aspect-9/16 overflow-hidden rounded-lg mx-auto lg:mx-0">
          <VideoPlayer
            url="https://p1.arfleet.io/explore/b2fa08a578779aad2f8112ea3705e373af7a9f03f1eb843e90710af6f53c8738?filename=test.mp4"
            muted
            playing
            loop
            width="100%"
            height="100%"
            className="top-0 left-0 absolute"
          />
        </div>
      </div>
    </article>
  )
}
