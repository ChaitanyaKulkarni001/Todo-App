import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-gray-600 text-gray-300 flex justify-between mx-auto pb-5'>
        <div className="logo mt-5 ml-8 cursor-pointer ">
            <span className='font-bold font-serif text-xl'>TodoApp</span>
        </div>
        <ul className='flex '>
            <li className='mr-16 mt-5 hover:font-bold hover:cursor-pointer transition-all '>Home</li>
            <li className='mr-16 mt-5 hover:font-bold hover:cursor-pointer  transition-all '>My todo</li>
        </ul>
        
      
    </nav>
  )
}

export default Navbar
