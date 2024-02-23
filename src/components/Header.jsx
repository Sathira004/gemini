import { React, useContext } from 'react'

const Header = () => {
  return (
    <div className='flex flex-row justify-between items-center'>
      <img src="src/assets/logo.png" alt="Gemini ai logo" width={80} height={30} />
    </div>
  )
}

export default Header