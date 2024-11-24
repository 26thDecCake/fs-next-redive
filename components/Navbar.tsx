import { auth, signOut, signIn } from '@/auth';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Navbar = async () => {
  const session = await auth();

  return (
    <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image src="/logo.png" alt='logo' width={144} height={30} className='cursor-pointer'></Image>
        </Link>
        <div className="flex items-center gap-5 text-black">
          {session && session?.user ? (
            <>
              <Link href="/startup/create" className='cursor-pointer'>
                <span>Create</span>
              </Link>

              <form action={async () => {
                "use server";
                await signOut({ redirectTo: '/' });
              }}>
                <button type="submit" className='cursor-pointer'>
                  <span>Logout</span>
                </button>
              </form>

              <Link href={`/user/${session?.id}`} className='cursor-pointer'>
                <span>{session?.user?.name}</span>
              </Link>
            </>
          ) : (
            <>
              <form action={async () => {
                "use server";
                await signIn('github');
              }}>
                <button type="submit" className='cursor-pointer'>
                  <span>Login</span>
                </button>
              </form>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Navbar