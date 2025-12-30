import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-64px)]">
      <SignIn
        appearance={{
          variables: {
            colorPrimary: '#014745',
          },
        }}
      />
    </div>
  )
}
