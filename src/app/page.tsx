"use client"

import Image from 'next/image'
import { useState } from 'react'
import { Switch } from '@headlessui/react'
import { IoSearch } from "react-icons/io5";
import { FaTemperatureLow } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";

export default function Home() {
  const [enabled, setEnabled] = useState(false)
  const [statusText, setStatusText] = useState("Free")
  const [showNewJob, setShowNewJob] = useState(true)

  const handleSwitchChange = () => {
    // handle switch status farmer logic disini
    setEnabled(!enabled)
    setStatusText(enabled ? "Free" : "Busy")
  }

  const handleConfirm = () => {
    // handle confirm logic disini
    setShowNewJob(false)
  };

  const handleReject = () => {
    // Handle reject logic disini
    setShowNewJob(false)
  };
  
  return (
    <div className='mb-[5%] sm:mb-0'>
      <div className='flex flex-col gap-8 sm:gap-10'>
        <div className='w-full h-[300px] rounded-b-3xl bg-[#044D3A] sm:h-[400px]'>
          navbar
        </div>

        <div className='px-[5%] sm:flex sm:justify-between'>

          <div className='flex flex-col sm:w-1/6'>

            <div className='flex flex-col gap-5 h-fit rounded-lg'>

              <div className='flex gap-14 items-center sm:justify-between sm:gap-3'>
                <Image 
                  src='/gibeh.png'
                  alt='gibeh'
                  width={100}
                  height={100}
                />
                <h2 className='text-xl text-[#044D3A] p-3 rounded-lg opacity-90 font-semibold sm:text-sm lg:text-lg sm:p-0'>Gijaxx Lobanjica</h2>
              </div>

              {showNewJob && (
                <div className='bg-slate-100 rounded-3xl p-4 sm:bg-white sm:p-0'>
                  <h2 className='text-xl px-2 sm:px-0'>New Job</h2>
                  <div className='h-28 shadow-sm rounded-xl mt-3 sm:bg-slate-100 sm:p-4 sm:h-fit lg:p-5'>
                    <p className='pt-3 px-2 sm:px-0 sm:pt-0'>
                      <span className='text-[#044D3A]'>Field 5</span> is <span className='text-[#044D3A]'>ready</span> to harvest now. Can you handle it?
                    </p>
                    <div className='mt-6 flex justify-evenly sm:flex-col sm:mt-2'>
                      <button className='bg-[#799E29] text-white rounded-xl mt-2 p-2 px-10 sm:px-0 sm:p-1' onClick={handleConfirm}>Confirm</button>
                      <button className='bg-[#C92A20] text-white rounded-xl mt-2 p-2 px-10 sm:px-0 sm:p-1' onClick={handleReject}>Reject</button>
                    </div>
                  </div>
                </div>
              )}

            </div>

            <div className="py-5 flex sm:pt-8">
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
              <p className={`${enabled ? 'text-[#C92A20]' : 'text-[#044D3A]'} p-1 px-5 text-xl font-semibold`}>{statusText}</p>
            </div>

          </div> 

          <div className='flex flex-col gap-10 2xl:w-[1300px]'>

            <form method="GET" className="w-full">
                <div className="border border-slate-300 mt-4 flex justify-between overflow-hidden rounded-3xl shadow-md lg:w-[1030px] 2xl:w-[1300px]">
                    <input 
                        type="text"
                        name="q"
                        className="focus:outline-none w-[400px] sm:w-[620px] h-12 pl-3 lg:w-[1030px] 2xl:w-[1300px]"
                        placeholder="Cari Lahan..."
                    />
                    <div className="bg-white h-12 pt-2">
                        <button 
                            type="submit" className="px-3"
                        >
                            <IoSearch size={30} />
                        </button>
                    </div>
                </div>
            </form>

            <div className='flex flex-col gap-10 sm:flex-row sm:gap-0 sm:justify-between'>

              <div className='bg-[#C92A20] shadow-sm rounded-3xl h-48 flex sm:py-12 sm:h-[310px] sm:pr-3 lg:w-[600px] lg:pr-0 2xl:w-[800px]'>
                <Image 
                  src='/sun.png'
                  alt='sun'
                  width={225}
                  height={50}
                  className='sm:-ml-5 lg:mx-12 2xl:mx-20'
                />
                <div className='my-8 flex flex-col gap-4 text-white sm:-ml-8 sm:w-40 sm:px-3 sm:my-0 lg:ml-0 lg:w-fit lg:my-8'>
                  <h1 className='text-[#FFF386] text-4xl'>Hello, Gijaxx</h1>
                  <p className='text-sm'>One of your field's condition</p>
                  <h1 className='text-6xl'>Bad!</h1>
                </div>
              </div>

              <div className='flex flex-col gap-4 sm:gap-9'>

                <div className='relative lg:flex'>
                  <div className='absolute top-1.5 z-10 lg:static lg:mr-64 2xl:mr-80'>
                    <Image 
                      src='/danger.png'
                      alt='danger'
                      width={120}
                      height={50}
                    />
                  </div>
                  <div className='bg-[#C92A20] shadow-sm  w-[380px] h-32 rounded-3xl absolute right-0 sm:w-[280px] lg:w-[300px] 2xl:w-[380px]'>
                    <div className='flex flex-col p-3 pl-16 gap-3 text-white sm:pl-7 lg:pl-12 2xl:pl-20'>
                      <h1 className='text-2xl font-medium sm:text-xl'>Dangerous!!!</h1>     
                      <div className='flex'>
                        <div className='flex flex-col gap-2'>
                          <p>Field 1</p>
                          <p>Pest</p>
                        </div>
                        <div className='border border-white mx-16 sm:mx-14 lg:mx-12 2xl:mx-16'></div>
                        <div className='flex flex-col gap-1'>
                          <div className='flex'>
                            <FaTemperatureLow size={20} />
                            <p className='ml-4'>22 C</p>
                          </div>
                          <div className='flex'>
                            <div className='-ml-2'>
                              <WiHumidity size={30} />
                            </div>
                            <p className='ml-3 py-1'>80 %</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='relative my-36 lg:my-6'>
                  <div className='absolute z-10'>
                    <Image 
                      src='/harvest.png'
                      alt='harvest'
                      width={140}
                      height={50}
                    />
                  </div>
                  <div className='bg-[#799E29] shadow-sm w-[380px] h-32 rounded-3xl absolute right-0 sm:w-[280px] lg:w-[300px] 2xl:w-[380px]'>
                    <div className='flex flex-col p-3 pl-16 gap-3 text-white sm:pl-7 lg:pl-12 2xl:pl-20'>
                      <h1 className='text-2xl font-medium sm:text-xl'>Nearest Harvest</h1>     
                      <div className='flex'>
                        <div className='flex flex-col gap-2'>
                          <p>Field 5</p>
                          <p>Now!!</p>
                        </div>
                        <div className='border border-white mx-16 sm:mx-14 lg:mx-12 2xl:mx-16'></div>
                        <div className='flex flex-col gap-1'>
                          <div className='flex'>
                            <FaTemperatureLow size={20} />
                            <p className='ml-4'>31 C</p>
                          </div>
                          <div className='flex'>
                            <div className='-ml-2'>
                              <WiHumidity size={30} />
                            </div>
                            <p className='ml-3 py-1'>80 %</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  )
}
