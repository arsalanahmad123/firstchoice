import React from 'react'
import '../App.css'
const Add_Invoice = () => {
  return (
      <div className='bg-black flex justify-center items-center min-h-screen '>
      <div className='w-1/2 bg-[#2F2F2F] m-auto  flex items-center justify-center   flex-col  py-8 rounded-xl'>
        <form class="max-w-sm mx-auto">
          <div class="mb-5">
            <label for="email" class="block mb-2 text-sm font-medium text-white">Company Name</label>
            <input type="email"  class=" border-2 bg-bgLight  required placeholder-white text-sm text-white rounded-lg w-96 py-1  px-5 focus:outline-none    border-amber-500" placeholder="Soriic" required />
          </div>
          <div class="mb-5">
            <label for="email" class="block mb-2 text-sm font-medium text-white">Service</label>
            <input type="email"  class=" border-2 bg-bgLight required   placeholder-white text-sm text-white rounded-lg w-96 py-1  px-5 focus:outline-none    border-amber-500" placeholder="Economy Service" required />
          </div>
          <div class="mb-5">
            <label for="email" class="block mb-2 text-sm font-medium text-white">Quantity</label>
            <input type="number"  class=" border-2 bg-bgLight required  placeholder-white text-sm text-white rounded-lg w-96 py-1  px-5 focus:outline-none    border-amber-500" placeholder="00" required />
          </div>
          <div class="mb-5">
            <label for="email" class="block mb-2 text-sm font-medium text-white">Cost Price</label>
            <input type="number"  class=" border-2 bg-bgLight  required placeholder-white text-sm text-white rounded-lg w-96 py-1  px-5 focus:outline-none    border-amber-500" placeholder="$ 00.00" required />
          </div>
          <div class="mb-5">
            <label for="email" class="block mb-2 text-sm font-medium text-white">Date</label>
            <input type="date"  class=" border-2 bg-bgLight required  placeholder-white text-sm text-white rounded-lg w-96 py-1  px-5 focus:outline-none    border-amber-500" placeholder="01/01/2024" required />
          </div>




        </form>




      </div>
    </div>
  )
}

export default Add_Invoice