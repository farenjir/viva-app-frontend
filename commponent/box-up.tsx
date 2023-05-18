export default function Boxup(props:any){
    return (
        <div className='  m-0 p-0 w-[100%] h-[674px] border-[3px] dark:bg-gradient-to-t to-[#211F41] from-[#020113] dark:border-[#3B28CC]    rounded-[20px] '>
        <div className='w-[100%] h-[626px]  p-[26px]'>
          <div className='w-[99%] h-[316px] m-0 m-auto '>
            <img src='./img/img.png' alt='ftr' />
            <div className='w-full h-[50px] flex grid-cols-3 bg-[#3B28CC]  rounded-br-[20px] rounded-bl-[20px] mt-[-15px]'>
              <div className='flex-1 grid-cols-1 h-[50px]  text-left p-0'>
                <img src='./img/small.svg' alt='ftr' className='absolute ml-[-38px] mt-[-51px] ' />
              </div>
              <div className='flex-1 grid-cols-1 h-[50px] text-left pt-[18px] font-[500] text-[14px]'>
                Ended on
              </div>
              <div className='flex-1 grid-cols-1 h-[50px]-400 text-left pt-[20px] font-[500] text-[14px] pr-3px '>
                January 7 .2022
              </div>
            </div>
          </div>
          <div className=' lg:mt-[50px] font-[900] text-[20px] '>Cryptoverse</div>
          <div className='  mt-[10px]  font-[500] text-[16px] text-[#7AFDD6] '>9911 NFTS</div>
          <div className='  mt-[26px]  font-[500] text-[18px] '>A 3D Metaverse of Everything</div>

          <div className='  mt-[32px]  font-[500] text-[18px] text-[#7AFDD6] '>Total raised ................................ $3.150.525</div>
          <div className='  mt-[18px]  font-[500] text-[18px]  text-[#7AFDD6]'>Participants ............................................ 358</div>

        </div>
        <div className='w-[100%] h-[44px] mt-[1px]  font-[500] text-[16px] text-x bg-[#3B28CC] rounded-br-[20px] rounded-bl-[20px] text-center pt-[8px] '>
          Token Sale
        </div>
      </div>
    );
}