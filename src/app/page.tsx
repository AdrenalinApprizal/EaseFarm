"use client"

import Image from 'next/image'
import { useState } from 'react'
import { Switch } from '@headlessui/react'

export default function Home() {
  const [enabled, setEnabled] = useState(false)
  const [statusText, setStatusText] = useState("Free")

  const handleSwitchChange = () => {
    setEnabled(!enabled)
    setStatusText(enabled ? "Free" : "Busy")
  }
  
  return (
    <div>
      <div className='flex flex-col gap-8'>
        <div className='w-[500px] h-[300px] rounded-b-3xl bg-[#044D3A]'>
          navbar
        </div>

        <div>
          <div className='flex flex-col'>
            <div className='flex flex-col gap-5 ml-5 mr-5 bg-slate-100 h-fit rounded-lg p-3 xl:bg-none'>
              <div className='flex gap-14 text items-center'>
                <Image 
                  src='/gibeh.png'
                  alt='gibeh'
                  width={100}
                  height={100}
                />
                <h2 className='text-xl text-[#044D3A] p-3 rounded-lg opacity-90 font-semibold'>Gijaxx Lobanjica</h2>
              </div>

              <div>
                <h2 className='text-xl'>New Job</h2>
                <div className='h-28 rounded-xl mt-3 xl:bg-slate-200'>
                  <p className='pt-3.5 px-4'>
                    <span className='text-[#044D3A]'>Field 5</span> is <span className='text-[#044D3A]'>ready</span> to harvest now. Can you handle it?
                  </p>
                  <div className='mt-2 flex justify-evenly'>
                    <button className='bg-[#799E29] text-white rounded-xl mt-2 p-2 px-10'>Confirm</button>
                    <button className='bg-[#C92A20] text-white rounded-xl mt-2 p-2 px-10'>Reject</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="py-5 pl-5 flex">
              <Switch
                checked={enabled}
                onChange={handleSwitchChange}
                className={`${enabled ? 'bg-[#C92A20]' : 'bg-[#044D3A]'}
                  relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
              >
                <span
                  aria-hidden="true"
                  className={`${enabled ? 'translate-x-9' : 'translate-x-0'}
                    pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                />
              </Switch>
              <p className={`${enabled ? 'text-[#C92A20]' : 'text-[#044D3A]'} p-1 px-5 text-xl`}>{statusText}</p>
            </div>
          </div> 
        </div>
        
      </div>
    </div>
  )
}
