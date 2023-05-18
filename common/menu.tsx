import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import KycService from '../Infrastructure/Services/kyc.service'
import { useRouter } from 'next/router'

export default function Menu() {
    const router = useRouter()
    const [iskyc, setiskyc] = useState(false);
    useEffect(() => {
        if (localStorage.hasOwnProperty('token')) {

            KycService.chekkyc().then(p => {

                if (p.data) {
                    if (p.data.isaccept == 2) {
                        setiskyc(true)

                    }
                }

            })
        }

    }, [])
    const gotodetail = () => {
        router.push('/Detail')
    }
    return (
        iskyc == true ? <ul className='list-none  border-gray-500 leading-7 hidden lg:block font-[700] 2xl:text-[19px] xl:text-[16px] font-arial dark:bg-[#211F41] bg-[#F0EEFF]'>
            <li className='lg:hover:border-l-[9px] lg:hover:border-l-[#E83151] cursor-pointer  dark:border-[#9e9d9d]    h-[80px] border-[#ccc9ddf5]    font-[700] pl-[20px] pt-[27px] transition duration-700 ease-in-out border-b-[1px] border-r-[1px]'><Link href="/">Main site</Link></li>
            <li className='lg:hover:border-l-[9px] lg:hover:border-l-[#E83151] cursor-pointer  dark:border-[#9e9d9d]    h-[80px] border-[#ccc9ddf5]   font-[700] pl-[20px] pt-[27px] transition duration-700 ease-in-out border-b-[1px] border-r-[1px]'>
                <Link href="/Dashbord">Dashbord</Link>
            </li>
            <Link href="/listprojects">
                <li className='lg:hover:border-l-[9px] lg:hover:border-l-[#E83151] cursor-pointer  dark:border-[#9e9d9d]    h-[80px] border-[#ccc9ddf5]   font-[700] pl-[20px] pt-[27px] transition duration-700 ease-in-out border-b-[1px] border-r-[1px]'>

                    All projects
                </li>

            </Link>



            <li className='lg:hover:border-l-[9px] lg:hover:border-l-[#E83151] cursor-pointer  dark:border-[#9e9d9d]    h-[80px] border-[#ccc9ddf5]   font-[700] pl-[20px] pt-[27px] transition duration-700 ease-in-out border-b-[1px] border-r-[1px]'><Link href="/createproject">Create project</Link></li>
            <li className='lg:hover:border-l-[9px] lg:hover:border-l-[#E83151] cursor-pointer  dark:border-[#9e9d9d]    h-[80px] border-[#ccc9ddf5]    font-[700] pl-[20px] pt-[27px] transition duration-700 ease-in-out border-b-[1px] border-r-[1px]'>
                <Link href="/Reffrall">Referral </Link>
            </li>
            <li className='lg:hover:border-l-[9px] lg:hover:border-l-[#E83151] cursor-pointer  dark:border-[#9e9d9d]    h-[80px] border-[#ccc9ddf5]    font-[700] pl-[20px] pt-[27px] transition duration-700 ease-in-out border-b-[1px] border-r-[1px]'>Docs</li>
            {/* <li className='lg:hover:border-l-[9px] lg:hover:border-l-[#E83151] cursor-pointer  dark:border-[#9e9d9d]    h-[80px] border-[#ccc9ddf5]   font-[700] pl-[20px] pt-[27px] transition duration-700 ease-in-out border-b-[1px] border-r-[1px]'>Private project</li>
            <li className='lg:hover:border-l-[9px] lg:hover:border-l-[#E83151] cursor-pointer  dark:border-[#9e9d9d]    h-[80px] border-[#ccc9ddf5]    font-[700] pl-[20px] pt-[27px] transition duration-700 ease-in-out border-b-[1px] border-r-[1px]'>Public project</li> */}
            <li className='lg:hover:border-l-[9px] lg:hover:border-l-[#E83151] cursor-pointer  dark:border-[#9e9d9d]    h-[80px] border-[#ccc9ddf5]   font-[700] pl-[20px] pt-[27px] transition duration-700 ease-in-out border-b-[1px] border-r-[1px]'><Link href="/kyc">KYC</Link></li>
            {/* <li className='lg:hover:border-l-[9px] lg:hover:border-l-[#E83151] cursor-pointer  dark:border-[#9e9d9d]    h-[80px] border-[#ccc9ddf5]    font-[700] pl-[14px] pt-[27px] transition duration-700 ease-in-out border-b-[1px] border-r-[1px] flex'>
                <img src='../img/paid.png' className='w-[48px] h-[48px] mt-[-11px]' />

                <Link href="/Detail">000.000.000</Link>
            </li> */}
            <li className='lg:hover:border-l-[9px] lg:hover:border-l-[#E83151] cursor-pointer  dark:border-[#9e9d9d]    h-[80px] border-[#ccc9ddf5]    font-[700] pl-[14px] pt-[27px] transition duration-700 ease-in-out border-b-[1px] border-r-[1px] flex bg-[#E83151]'>
                <img src='../img/activ.png' className='w-[48px] h-[48px] mt-[-11px]' />
                <Link href="#">
                    Lottery
                </Link>
            </li>
        </ul> :
            <ul className='list-none  border-gray-500 leading-7 hidden lg:block font-[700] 2xl:text-[19px] xl:text-[16px] font-arial dark:bg-[#211F41] bg-[#F0EEFF]'>


                <li className='lg:hover:border-l-[9px] lg:hover:border-l-[#E83151] cursor-pointer  dark:border-[#9e9d9d]    h-[80px] border-[#ccc9ddf5]    font-[700] pl-[20px] pt-[27px] transition duration-700 ease-in-out border-b-[1px] border-r-[1px]'><Link href="/">Main site</Link></li>


                <li className='lg:hover:border-l-[9px] lg:hover:border-l-[#E83151] cursor-pointer  dark:border-[#9e9d9d]    h-[80px] border-[#ccc9ddf5]   font-[700] pl-[20px] pt-[27px] transition duration-700 ease-in-out border-b-[1px] border-r-[1px]'>
                    <Link href="/listprojects">All projects</Link>
                </li>
                {/* <li className='lg:hover:border-l-[9px] lg:hover:border-l-[#E83151] cursor-pointer  dark:border-[#9e9d9d]    h-[80px] border-[#ccc9ddf5]   font-[700] pl-[20px] pt-[27px] transition duration-700 ease-in-out border-b-[1px] border-r-[1px] animate-pulse'>

                    <Link href="/kyc">kyc</Link>
                </li> */}


            </ul>
    );
}