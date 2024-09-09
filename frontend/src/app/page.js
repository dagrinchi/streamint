import dynamic from "next/dynamic"

const LoginModal = dynamic(() => import('streamint/components/LoginModal'), { ssr: false })
const List = dynamic(() => import('streamint/components/List'), { ssr: false })

export default function Page() {
  return (
    <main className="h-screen snap-mandatory snap-y overflow-y-auto relative">
      <LoginModal>
        <div className="hidden bottom-0 lg:grid fixed pointer-events-none grid-cols-2 grid-rows-1 w-full">
          <div className="p-6 flex flex-col justify-end items-end">
            <h1 className="font-blinkmacsystemfont-black font-bold text-5xl mb-4">Streamint</h1>
          </div>
        </div>
        <h1 className="block lg:hidden fixed top-[10%] right-8 font-blinkmacsystemfont-black font-bold text-4xl mb-4">Streamint</h1>
        <List />
        <p className="fixed bottom-3 right-12">[scroll down]</p>
      </LoginModal>
    </main>
  )
}
