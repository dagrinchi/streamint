import dynamic from "next/dynamic"

const LoginModal = dynamic(() => import('streamint/components/LoginModal'), { ssr: false })
const List = dynamic(() => import('streamint/components/List'), { ssr: false })

export default function Page() {
  return (
    <main className="lg:container lg:mx-auto h-screen snap-mandatory snap-y overflow-y-auto">
      <LoginModal>
        <List />
      </LoginModal>
    </main>
  )
}
