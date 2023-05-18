import moment from 'moment-jalaali';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link';

export default function BoxCard(props:any){
  const router = useRouter()
  const [nowdate,setnow]=useState(new Date())
   useEffect(() => {
     var start=moment("2023-02-09");
     var end =moment(props.enddate);
    
   }, )
   const gotodetail = (id:any) => {
    
    router.push({
      pathname: '/Detail/[pid]',
      query: { pid: id },
    })
 }
    return (
        <div className='  m-0 p-0 w-[100%] 2xl:h-[674px] xl:h-[574px] border-[3px] dark:bg-gradient-to-t to-[#211F41] from-[#020113] dark:border-[#E83151]    rounded-[20px] '>
        <div className='w-[100%] 2xl:h-[626px] xl:h-[526px]  2xl:p-[26px]  xl:p-[16px]'>
          <div className='w-[98%] 2xl:h-[316px] xl:h-[266px] mx-auto '>
            <img src={process.env.REACT_APP_Bse_Url+ '/uploads/'+props.imgasli} alt='ftr' className="w-[100%] h-[262.73px]" />
            <div className='w-full h-[50px] flex grid-cols-3 bg-[#E83151]  rounded-br-[20px] rounded-bl-[20px] mt-[-15px]'>
              <div className='flex-1 grid-cols-1 h-[50px]  text-left p-0'>
                <img src={process.env.REACT_APP_Bse_Url+ '/uploads/'+props.logo} alt='ftr' className='absolute ml-[-28px] mt-[-37px] w-[90px] h-[90px]' />
                
              </div>
              <div className='flex-1 grid-cols-1 h-[50px] text-left pt-[18px] font-[500] text-[14px]'>
                Ended on
              </div>
              <div className='flex-1 grid-cols-1 h-[50px]-400 text-left pt-[20px] font-[500] text-[14px] pr-3px '>
               {props.enddate}
              </div>
            </div>
          </div>
          <div className=' lg:mt-[45px] 2xl:mt-[50px] xl:mt-[45px] font-[900] 2xl:text-[20px] xl:text-[18px]  lg:text-[18px]  '>{props.name}</div>
          <div className='  2xl:mt-[10px] xl:mt-[5px] lg:mt-[5px]  font-[500] text-[16px] text-[#7AFDD6] '></div>
          <div className='  mt-[26px] 2xl:mt-[26px] xl:mt-[20px]    font-[500] 2xl:text-[18px] xl:text-[16px]'>{props.des}</div>

          <div className='  2xl:mt-[32px] xl:mt-[20px]  font-[500] 2xl:text-[18px] xl:text-[16px] text-[#7AFDD6] '>Total raised ............................................... ${props.total}</div>
          <div className='  2xl:mt-[18px]  xl:mt-[10px] font-[500] 2xl:text-[18px] xl:text-[16px] text-[#7AFDD6]'>Participants .................................................. 0</div>

        </div>
        <div  className='w-[100%] h-[44px] mt-[2px]  font-[500] text-[16px] text-x bg-[#E83151] rounded-br-[20px] rounded-bl-[20px] text-center pt-[8px] cursor-pointer'>
          
          <Link href={{
             pathname: '/Detail',
             query:{pid:props.pid}, // the data
          }} >
            Token Sale
          </Link>
        </div>
      </div>
    );
}