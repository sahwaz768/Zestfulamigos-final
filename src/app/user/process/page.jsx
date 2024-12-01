import React from 'react'
import Link from 'next/link'

const page = () => {
  return (
    <div>
      <h1 className='process-logo'>zestful amigos</h1>
      <div className='flex justify-center '>
        <div className='process-box font-bold text-xl'>
            <h1>Your service request is under review. You will be notified once processed. Thank you for your patience.</h1>
            
            <h1 className='mt-3'>You can look over to other amigos here</h1>
           <Link href={'/user/swipepage'}> <h1 className='mt-3 text-sm text-red-700'>check here</h1> </Link>


        </div>
      </div>
    </div>
  )
}

export default page
