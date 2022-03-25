import React from 'react'
import { FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';

export const Footer = () => {
  return (
    <div className='footer'>
      Created By: Ben Jackson
      <div className='socials'>
        <a className='socialLink' href='https://twitter.com/Benjacksonse' target="_blank" rel="noreferrer"><FaTwitter/></a>
        <a className='socialLink' href='https://github.com/BenjacksonSE' target="_blank" rel="noreferrer"><FaGithub/></a>
        <a className='socialLink' href='https://www.linkedin.com/in/benjamin-jackson-864148225/' target="_blank" rel="noreferrer"><FaLinkedin/></a>
      </div> 
    </div>
  )
}
