"use client"

import Link from 'next/link'
import Image from 'next/image'
import {signIn, signOut, useSession, getProviders} from 'next-auth/react'
import { useEffect, useState } from 'react'

const Nav = () => {
  const {data: session} = useSession();

  const [providers, setproviders] = useState(null);
  const [toggleDropDown, settoggleDropDown] = useState(false);

  useEffect(()=>{
    const setprovidersFun = (async ()=>{
      const response = await getProviders();
      setproviders(response);
    })
    setprovidersFun();
  },[]);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image src="/assets/images/logo.svg" alt='logo' width={30} height={30} className='object-contain'/>
      </Link>
      <div className="sm:flex hidden">
        { session?.user ? (<div className='flex gap-3 md:gap-5'> 
          <Link href={"/create-prompt"} className='black_btn'>
            Create prompt
          </Link>
          <button type='button' onClick={signOut} className='outline_btn'>
            Sign out
          </button>
          <Link href={"/profile"}>
            <Image 
              src={session?.user?.image}
              width={37}
              height={37}
              className='rounded-full'
              alt="profile"
              >
            </Image>
          </Link>
        </div>) : 
        (<> 
          {providers && Object.values(providers).map(provider=>(
            <button 
            type='button' 
            key='provider.name' 
            className='black_btn'
            onClick={()=>signIn(provider.id)}>
                Sign in
            </button>
          ))}
        </>)}
      </div>

      {console.log("Here: ",session)}

      {/* Mobile navigation */}

      <div className="sm:hidden flex relative">
        { session?.user ? (
          <div className="flex">
            <Image src={session?.user?.image}
              width={37}
              height={37}
              className='rounded-full'
              alt='profile'
              onClick={()=>settoggleDropDown((prevState)=>!prevState)}
            />
              {
                toggleDropDown  && (
                  <div className="dropdown">
                    <Link
                      href="/profile"
                      className='dropdown_link'
                      onClick={()=>settoggleDropDown(false)}
                    >
                      My Profile
                    </Link>
                    <Link
                      href="/create-prompt"
                      className='dropdown_link'
                      onClick={()=>settoggleDropDown(false)}
                    >
                      Create Prompt
                    </Link>
                    <button
                      type='button'
                      onClick={()=>{
                        settoggleDropDown(false);
                        signOut();
                      }}
                      className='mt-5 w-full black_btn'
                    >
                      Sign out
                    </button>
                  </div>
                )}
          </div>
        ) : 
        (<> 
          {providers && Object.values(providers).map(provider=>(
            <button 
            type='button' 
            key='provider.name' 
            className='black_btn'
            onClick={()=>signIn(provider.id)}>
                Sign in
            </button>
          ))}
        </>)
        }
      </div>
    </nav>
  )
}

export default Nav