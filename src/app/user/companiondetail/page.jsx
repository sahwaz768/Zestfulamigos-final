import React from 'react'
import { CiShoppingBasket } from "react-icons/ci";
import { FaPersonHiking } from "react-icons/fa6";
import { FaRoad } from "react-icons/fa";
import { GiCampingTent } from "react-icons/gi";
import { MdOutlineSubdirectoryArrowRight } from "react-icons/md";

const page = () => {
  return (
    <>
    <h1 className='text-2xl font-semibold mx-32 my-4'>Full Profile detail</h1>
    <div className='detailbox '>
      <div className='detail'>
       
      <div className=' flex'>
        <div className='horizontalimg flex gap-2'>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRISmJ3wr4IfIf6Y8r22sRa072YxjfXJdu1WQ&s" alt="" />
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRISmJ3wr4IfIf6Y8r22sRa072YxjfXJdu1WQ&s" alt="" />
        </div>
        <div className='vertical img ml-2'>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRISmJ3wr4IfIf6Y8r22sRa072YxjfXJdu1WQ&s" alt="" />
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRISmJ3wr4IfIf6Y8r22sRa072YxjfXJdu1WQ&s" alt="" className='mt-2' />
        </div>

      </div>
      <div className='flex mt-10'>
        <div className='tag'>
        <p >charge: <span>2000 per hour</span></p>
        </div>
        <div className='tag'>
        <p >My age / height: <span>27 / 5.8 feet</span></p>
        </div>
      </div>
      <div className='mt-8'>
        <h1 className='text-3xl font-bold'>My self Intro</h1>
        <div className='toppr mt-5'>
        <div className='prtag flex'>
        <CiShoppingBasket  size={20} color='black'/>
           <p>Shopping Buddy</p>
        </div>
        <div className='prtag flex'>
        <FaPersonHiking  color='black' size={20}/>
           <p>Hiking buddy</p>
        </div>
        <div className='prtag flex'>
        <FaRoad  color='black' size={20}/>
           <p>Road trip</p>
        </div>
        <div className='prtag flex'>
        <GiCampingTent color='black' size={20}/>
           <p>Camping</p>
        </div>
        </div>
        <h1 className='text-center text-2xl font-bold my-8'>If she is your favourite then</h1>
        <div className=' cntbtn2'>
          
            <div>
                Countinue 
            </div>
            
            

        </div>
      </div>
      </div>
    </div>
    </>
  )
}

export default page