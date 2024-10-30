'use client'
import React, { useState } from "react";
import { MdOutlineSubdirectoryArrowRight } from "react-icons/md";

const page = () => {


    const times = [
        "11:00 AM - 12:00 PM",
        "12:00 PM - 1:00 PM",
        "1:00 PM - 2:00 PM",
        "2:00 PM - 3:00 PM",
        "3:00 PM - 4:00 PM",
        "4:00 PM - 5:00 PM",
        "5:00 PM - 6:00 PM",
        "6:00 PM - 7:00 PM",
        "7:00 PM - 8:00 PM",
        "8.00 PM - 9.00PM"
      ];
    
      const [selectedSlots, setSelectedSlots] = useState([]); // Track multiple selected slots
    
      // Function to handle consecutive selection and deselection of time slots
      const handleTimeSlotClick = (index) => {
        // If the clicked slot is already selected, deselect it and all following slots
        if (selectedSlots.includes(index)) {
          const updatedSlots = selectedSlots.filter(slotIndex => slotIndex < index);
          setSelectedSlots(updatedSlots);
        } 
        // If no slots are selected or the clicked slot is the next consecutive one, select it
        else if (selectedSlots.length === 0 || index === selectedSlots[selectedSlots.length - 1] + 1) {
          setSelectedSlots([...selectedSlots, index]);
        }
      };
    
      // Generate an array of the next 3 days with separate month and day
      const getNextThreeDays = () => {
        const today = new Date();
        return Array.from({ length: 4 }, (_, i) => {
          const nextDay = new Date(today);
          nextDay.setDate(today.getDate() + i);
          // Extract month and day separately
          const optionsMonth = { month: 'short' };
          const optionsDay = { day: 'numeric' };
          return {
            month: nextDay.toLocaleDateString('en-US', optionsMonth),
            day: nextDay.toLocaleDateString('en-US', optionsDay)
          };
        });
      };
    
      const dates = getNextThreeDays();
      const [selectedDateIndex, setSelectedDateIndex] = useState(null);
    
      // Function to handle date selection
      const handleDateClick = (index) => {
        setSelectedDateIndex(index);
      };
  return (
    <>
    <div className="flex">
    <div className="timeslotebox">
      <div className="slotebox">
    <h1 className="text-black text-2xl font-semibold my-4">time slote and date avaliabilty</h1>
      <div className="flex">
        
        {dates.map((date, index) => (
          <div
            key={index}
            className={`divStyle ${selectedDateIndex === index ? 'toggled' : ''}`}
            onClick={() => handleDateClick(index)} // Fixed the date click handler
          >
            <p>{date.month}</p>
            <p >{date.day}</p>
          </div>
        ))}
      </div>
      
      <div className="time-slots-container mt-4">
        {times.map((time, index) => (
          <div
            key={index}
            onClick={() => handleTimeSlotClick(index)} // Fixed the time slot click handler
            className={`time-slot ${selectedSlots.includes(index) ? "selected" : ""}`}
          >
            {time}
          </div>
        ))}
      </div>
      </div>
    </div>
    <div className="timeslotebox">
<div className="slotebox">
    <h1 className="text-black text-2xl font-semibold my-4">
              Purpose of Engegment
            </h1>

            <div className="mt-6 flex justify-center items-center">
              <textarea
                placeholder="Purpose..."
                className="purposeinput"
              ></textarea>
            </div>
            <div className="mt-10">
            <div className=' cntbtn3'>
          
            <div>
                Countinue 
            </div>
            <div className='arrowbtn3'>
            <MdOutlineSubdirectoryArrowRight  color='white' size={20}/>
            </div>
            

        </div>
        </div>


           
            </div>
    </div>
    </div>
    </>
  )
}

export default page