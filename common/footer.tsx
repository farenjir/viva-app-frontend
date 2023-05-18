import type { NextPage } from 'next'
import { useState, useEffect } from 'react';
import UserService from '../Infrastructure/Services/user.service';
const Footer: NextPage = () => {
  const [listmenu, setlist] = useState([])
  const [listsummenu, setlistsubmenu] = useState([])
  useEffect(() => {
    UserService.listfooter().then(p => {
      setlist(p.data)
      UserService.listfootersubmenu().then(o => {
        setlistsubmenu(o.data)
      })
    })
  }, [])
  return (
    <div className='lg:h-[460px] h-auto w-full  lg:grid lg:grid-cols-5  2xl:mt-[70px] xl:mt-[30px]' >
      {
        listmenu.map((input, index) => {
          return (
            <>
              <div className='flex-1 ' key={index}>
                <div className='font-[700] text-[20px]   pl-[32px] pt-[32px]'>
                  {input['name']}
                </div>
                <ul className='font-bold text-[16px] pl-[34px] text-[#05040A] leading-[47px] pt-[25px] dark:text-white'>
                  
                  <li className="ml-[16px]">
                    {
                      listsummenu.filter(y => y['parentid'] == input['_id']).map((input1, index1) => {
                        return (
                          <>
                            <ul className='transition duration-300 ease-in-out delay-150 cursor-pointer hover:-translate-y-1 hover:scale-110'>
                              <a target="_blank" href={input1['url']}>
                                {input1['name']}
                              </a>
                            </ul>
                          </>
                        )
                      })
                    }


                  </li>
                  </ul>
              </div>
            </>
          );
        })
      }


      <div className='flex-1 pt-[4%] pr-[8px]'>
        <img src='../img/slideimag.svg' className='w-[100%] ' />

      </div>
    </div>
  )
}
export default Footer;