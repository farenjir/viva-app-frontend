export default function Boxone(props: any) {
    return (
        <div className=' w-[100%] 2xl:h-[209px] xl:h-[170px] lg:h-[170px] bg-gradient-to-l from-gray-900 to-gray-500 lg:rounded-[15px] dark:bg-[#4F4D4D] rounded-[8px] pl-[2px] '>
            <div className='w-[98%] 2xl:h-[203px] xl:h-[165px] lg:h-[165px] text-center bg-gradient-to-r from-[#37364b] 2xl:pt-[59px] xl:pt-[39px] lg:pt-[36px] to-[#1E1C34] xl:mt-[2px] lg:mt-[2px] 2xl:mt-[3px]  lg:rounded-[15px] '>

                <p className='2xl:text-[40px] xl:text-[30px] lg:text-[30px] font-[900] dark:text-white'>{props.flag} {props.number}</p>
                <p className='mt-1 2xl:text-[20px] xl:text-[20px] lg:text-[16px] font-[500] text-[#7AFDD6]'>{props.text}</p>
            </div>
        </div>
    );
}