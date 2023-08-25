import React from 'react'
import {FaGithub,FaLinkedin} from 'react-icons/fa'
import {AiOutlineMail} from 'react-icons/ai'

const Endbar = () => {
    const links=[
        {
            id:1,
            child:(
                <>
                LinkedIn <FaLinkedin size={30}/>
                </>
            ),
            href:'https://www.linkedin.com/in/sagarkonada/',
            style:'rounded-tr-md'

        },
        {
            id:2,
            child:(
                <>
                GitHub <FaGithub size={30}/>
                </>
            ),
            href:'https://github.com/iamsagarkonada',

        },
        {
            id:3,
            child:(
                <>
                Mail <AiOutlineMail size={30}/>
                </>
            ),
            href:'mailto:sagarkonada2002@gmail.com',

        }
    ]
  return (
    <div className='hidden sm:block'>
        <div className='bg-black py-3 flex justify-between items-center text-white'>
            <div>
                <h4 className='font-medium mx-3'>Developed by Sagar</h4>
            </div>
            <div>
                <ul className='flex gap-6 mx-5'>
                    {links.map(({id,child,href,style})=>(
                        <li id={id} className='hover:text-gray-400 items-center'><a href={href}>{child}</a></li>
                    ))}
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Endbar
