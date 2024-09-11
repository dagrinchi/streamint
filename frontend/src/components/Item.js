import React from 'react'

import dynamic from "next/dynamic"

const VideoPlayer = dynamic(() => import('streamint/components/VideoPlayer'), { ssr: false })

export default function Item({ data }) {
  return (
    <article className="snap-start grid grid-rows-2 grid-cols-1 lg:grid-cols-2 lg:grid-rows-1 h-[95%] max-h-screen">
      <div className="p-4 flex flex-col justify-end items-end">
        <h2 className="font-blinkmacsystemfont-black text-xl mb-3">{data.title}</h2>
        <p className="text-right mb-3 max-w-lg">{data.description}</p>
        <p>
          {
            data.tags.map((tag, index) => <span key={index}>[{tag.name}] </span>)
          }
        </p>
        <div className="mb-4"></div>
        {
          (data.placements?.length > 0) && (
            <>
              <p className="font-blinkmacsystemfont-black">ArFleet Placements:</p>
              {data.placements.map((p, index) => (
                <>
                  <p key={index}>provider:[{p.provider_connection_strings}] status:[{p.status}] {p.error_was && `error_was:[${p.error_was}]`}</p>
                </>
              ))}              
            </>
          )
        }
        <div className="pb-24"></div>
      </div>
      <div className="p-4 lg:pt-4">
        <div className="h-full relative aspect-9/16 overflow-hidden rounded-lg mx-auto lg:mx-0">
          <VideoPlayer
            url={data.video.url}
            muted
            playing
            loop
            width=""
            height=""
            className="top-0 left-0 absolute"
          />
        </div>
      </div>
    </article>
  )
}
