import type { NextPage } from 'next'
import footer from '../common/footer'
import Head from "next/head";
import Image from 'next/image'
import logo from '../public/img/logo.png'
import Footer from '../common/footer'
import Link from 'next/link';
import Menu from '../common/menu';
import React, { useState, useEffect } from 'react';
import Modal from '../commponent/Modal';
import Btn from '../common/btn';
import ModalLogin from '../commponent/Modallogin';
import Boxup from '../commponent/box-up';
import { useRouter } from "next/router";
import proj from '../Domain/Dto/project';
import KycService from '../Infrastructure/Services/kyc.service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollar, faDollarSign, faMoneyBill } from '@fortawesome/free-solid-svg-icons';
const Ditail: NextPage = () => {
    const router = useRouter();
    const [showtype, settype] = useState(1)
    const [open, setOpen] = useState(1);
    const [openlogin, setOpenlogin] = useState(1);
    const [name, setname] = useState('');
    const [projectdetail, setdetail] = useState<proj>()
    useEffect(() => {
        const query = router.query;
        const name = query.pid;
        KycService.prodetail(name).then(p => {
            setdetail(p.data)
        })
    }, [])



    const handleClick = () => {
        if (open == 1) {
            setOpen(0)
        } else {
            setOpen(1);
        }
    }
    const handleClicklogout = () => {
        // localStorage.clear();
        // router.push('/')
    }
    const handleClicklogin = () => {
        if (openlogin == 1) {
            setOpenlogin(0)
        } else {
            setOpenlogin(1);
        }
    }
    return (
        <div className='bg-amir dark:bg-[#16142E]  '>
            <div className='container h-auto mx-auto'>
                <Head>
                    <title>   ProjectDetail  </title>
                    <meta name="description" content="Generated by create next app" />
                    <link rel="icon" href="/lo.png" />
                </Head>
                <Modal ch={open} ></Modal>
                <ModalLogin ch={openlogin} />
                <div className='  w-full lg:flex h-auto col-span-2 bg-[#D3D3D3] dark:bg-[#16142E]'>
                    <div className='w-[15%] hidden lg:block   h-auto '>
                        <div className='md:h-[126px] xl:h-[80px] w-[100%]   lg:block md:pl-[33px] xl:pl-[16px]  dark:text-[#7AFDD6] dark:bg-[#211F41] xl:pt-[16px] md:pt-[40px] font-[900] md:text-[35px] xl:text-[16px] border-b-[1px] bg-[#F0EEFF] border-r-[1px] border-[#e4e2eff5] '>
                            <img src='../img/final/l2.png' className='w-[40px] h-[41px] mt-[5px] mx-auto' />

                        </div>
                        <Menu />


                    </div>
                    <div className='w-full h-auto '>
                        <div className='md:h-[126px] xl:h-[80px]  text-right w-full flex  dark:bg-[#211F41] bg-[#F0EEFF] border-b-[1px] border-gray-600'>
                            <div className='w-[68%]'>
                                <div className='w-[201px] md:h-[126px] xl:h-[80px] border-r-[0.5px] border-[#9b9999] text-left flex md:pt-[53px] xl:pt-[26px] pl-[16px] md:text-[16px] xl:text-[16px]' >
                                    {/* {inputFields[0]['startdate'].year()+'/'+inputFields[0]['startdate'].month()+'/'+inputFields[0]['startdate'].day()}    connected     <img src='../img/leak.svg' className='md:w-[48px] xl:w-[38px] md:h-[48px] xl:h-[38px] mt-[-10px] ml-[10px]' /> */}
                                </div>
                            </div>
                            <div className='w-[31%] flex gap-[10px]' style={{ direction: 'rtl' }}>
                                {
                                    typeof window != "undefined" ? localStorage.getItem('token') == null ?
                                        <>
                                            <Btn text={'Sign in '} handleClick={handleClicklogin}></Btn>
                                            <Btn text={'Create Account '} handleClick={handleClick} ></Btn><p className='w-[30px]'></p>

                                        </> :
                                        <>
                                            <Btn text={'logout '} handleClick={handleClicklogout}></Btn>
                                        </>
                                        : ''

                                }
                            </div>



                        </div>


                        <div className='bg-[#E5E1FF] bg-gradient-to-br from-[#3816c2] to-[#2c2c2c] pl-[1px] pt-[1px] w-[96%] mx-auto ml-[30px] h-[136px] mt-[46px] rounded-[20px]  font-bold text-gray-700'>
                            <div className='bg-gradient-to-tl to-[#1a1644] from-[#242333]   w-[100%]  h-[132px]  rounded-[20px] grid grid-cols-4'>
                                <div className=' items-center pl-[10px] text-white pt-[30px] leading-[40px]'>
                                    <p>
                                        Project Name:<span className='text-[#ffe346]'> {projectdetail?.tokenname}</span>
                                    </p>
                                    <p className='text-[#ffe346] flex'>
                                        <FontAwesomeIcon icon={faDollarSign} className='w-[20px] h-[20px] mt-[10px]' />   Price: {projectdetail?.tokentotall} $
                                    </p>

                                </div>
                                {
                                    projectdetail?.rounds.slice(0, 3).map((input, index) => {
                                        return (
                                            <>
                                                <div className=' items-center pl-[10px] pt-[47px]'>
                                                    {
                                                        input.status == 0 ?
                                                            <button className='bg-[#7afdd6] w-[120px] h-[40px] rounded-[10px]'>
                                                                Round {index + 1}
                                                            </button>
                                                            : input.status == 1 ?
                                                                <button className='bg-[#207e0e] text-white w-[120px] h-[40px] rounded-[10px]'>
                                                                    Round {index + 1}
                                                                </button>
                                                                : <button className='bg-[#6e0b0b] text-white w-[120px] h-[40px] rounded-[10px]'>
                                                                    Round {index + 1}
                                                                </button>

                                                    }

                                                    <p className='text-[#ffe346] mt-[6px]'>
                                                        Price: {input.price} $
                                                    </p>

                                                </div>
                                            </>
                                        )
                                    })
                                }

                            </div>
                        </div>

                        <div className='   w-[96%] mx-auto ml-[30px] h-[400px] mt-[50px]   font-bold text-gray-500'>
                            <img src={process.env.REACT_APP_Bse_Url+'/uploads/' + projectdetail?.imglist.find(p => p.id == 4)?.name} className='w-[100%] h-[400px] mx-auto' />

                        </div>
                        <div className='bg-[#E5E1FF] flex dark:bg-[#211F41]  w-[96%] mx-auto ml-[30px] h-[70px] mt-[0px]   font-bold text-gray-500 rounded-br-[20px]  rounded-bl-[20px]'>

                        </div>
                        <div className=' grid grid-cols-5 gap-[35px]  w-[96%] mx-auto ml-[30px] h-[215px] mt-[50px]   font-bold text-gray-500 '>
                            {
                                projectdetail?.imglist.map((input, index) => {
                                    return (
                                        <>
                                            {
                                                input.name != null && input.name != "" ?
                                                    <img src={process.env.REACT_APP_Bse_Url+'/uploads/' + input.name} className='w-[70%] h-[170px]  cursor-pointer' />
                                                    : ''
                                            }

                                        </>
                                    )
                                })

                            }


                        </div>
                        <div className='dark:bg-[#211F41] rounded-tl-[20px] rounded-tr-[20px] gap-[26px] w-[96%] mx-auto ml-[30px] h-[373px] mt-[50px]   font-bold text-gray-500 '>
                            <div className='h-[53px] bg-[#16142E] grid grid-cols-5 gap-[20px] w-[98%]'>
                                <div onClick={() => settype(1)} className='w-[100%] cursor-pointer h-[53px] bg-[#211F41] rounded-tl-[20px] rounded-tr-[20px] pt-[17px] pl-[97px] text-[19px] font-[700] text-white'>
                                    About
                                </div>
                                <div onClick={() => settype(2)} className='w-[100%] cursor-pointer active:bg-[#211F41] h-[53px] bg-[#32304E] rounded-tl-[20px] rounded-tr-[20px] pt-[17px] pl-[97px] ml-[22px] text-[19px] font-[700] text-white'>
                                    Token Sale
                                </div>
                                <div onClick={() => settype(4)} className='w-[100%] cursor-pointer h-[53px] active:bg-[#211F41] bg-[#32304E] rounded-tl-[20px] rounded-tr-[20px] pt-[17px] pl-[97px] ml-[22px] text-[19px] font-[700] text-white'>
                                    Token Info
                                </div>
                                <div onClick={() => settype(3)} className='w-[100%] cursor-pointer h-[53px] active:bg-[#211F41] bg-[#32304E] rounded-tl-[20px] rounded-tr-[20px] pt-[17px] pl-[97px] ml-[22px] text-[19px] font-[700] text-white'>
                                    Scheduling
                                </div>
                                <div onClick={() => settype(5)} className='w-[100%] cursor-pointer h-[53px] active:bg-[#211F41] bg-[#32304E] rounded-tl-[20px] rounded-tr-[20px] pt-[17px] pl-[97px] ml-[22px] text-[19px] font-[700] text-white'>
                                    chains
                                </div>
                            </div>
                            <p className='w-[100%] leading-[30px] h-[255px] mx-[100%] mt-[10px] ml-[28px] text-white text-[17px] font-[500]'>
                                {
                                    showtype == 1 ?
                                        <>
                                            {projectdetail?.des}
                                        </> : showtype == 2 ?
                                            <>
                                                <table className='w-[93%] mx-auto text-center border-collapse border border-slate-400 '>
                                                    <tr className='bottom-1'>
                                                        <th className='border border-gray-700'> Start Date</th>
                                                        <th className='border border-gray-700'> End Date</th>
                                                        <th className='border border-gray-700'>Suggested price</th>
                                                    </tr>
                                                    {
                                                        projectdetail?.rounds.map((input1, index1) => {
                                                            return (
                                                                <>
                                                                    <tr>
                                                                        <td className='border border-gray-700'>{input1.startdate}</td>
                                                                        <td className='border border-gray-700'>{input1.enddate}</td>
                                                                        <td className='border border-gray-700'>{input1.price} $</td>
                                                                    </tr>
                                                                </>
                                                            )
                                                        })
                                                    }
                                                </table>
                                            </> : showtype == 3 ?
                                                <>
                                                    <table className='w-[93%] mx-auto text-center border-collapse border border-slate-400 '>
                                                        <tr className='bottom-1'>
                                                            <th className='border border-gray-700'> Start Date</th>
                                                            <th className='border border-gray-700'> End Date</th>
                                                        </tr>
                                                        {
                                                            projectdetail?.vesting.map((input1, index1) => {
                                                                return (
                                                                    <>
                                                                        <tr>
                                                                            <td className='border border-gray-700'>{input1.startdate}</td>
                                                                            <td className='border border-gray-700'>{input1.enddate}</td>
                                                                        </tr>
                                                                    </>
                                                                )
                                                            })
                                                        }
                                                    </table>
                                                </> : showtype == 4 ?
                                                    <>
                                                        {projectdetail?.info}
                                                    </> : showtype == 5 ?
                                                        <>
                                                            <div className='text-center text-[33px] '>
                                                                {
                                                                    projectdetail?.sc.replaceAll('-','   ')
                                                                }
                                                            </div>

                                                        </> : ''
                                }

                            </p>
                        </div>
                        {/* <div className='flex gap-[26px]  w-[1205px] m-0 m-auto ml-[30px] h-[695px] mt-[50px]  p-[10px] font-bold text-gray-500 '>
                            <Boxup></Boxup>
                            <Boxup></Boxup>
                        </div> */}
                        <div className='flex'>
                            <div className='bg-[#E5E1FF] bg-gradient-to-br from-[#3f1dc4] via-[#3d3a3a] to-[#524f4f] rounded-[20px] pt-[1px]  w-[47%]  ml-[30px] h-[406px] mt-[50px]  pl-[1px]  font-bold text-gray-500 '>
                                <div className='bg-gradient-to-tl to-[#1a1644] from-[#242333]   w-[46%px]  h-[404px]  rounded-[20px] '>
                                    <div className='h-[129px] w-full border-b-[2px] border-[#3B28CC] pt-[20px]'>
                                        <img src='../img/icon/stak.png' className='w-[45%] h-[85px]  ml-[29px] cursor-pointer' />
                                    </div>
                                    <p className='mt-[20px] ml-[35px] font-[700] text-[18px] text-white'>Connect wallet to view</p>
                                    <img src='../img/icon/ch.png' className='w-[93%] h-[69px]  mt-[29px] ml-[29px] cursor-pointer' />
                                    <p className='mt-[20px] ml-[35px] font-[500] text-[17px] text-white'>

                                        If you have funded this project we will be in touch to let you know when thr rewars have started distributing and when you can claim them.


                                    </p>
                                </div>


                            </div>
                            <div className='bg-[#E5E1FF] bg-gradient-to-br from-[#3f1dc4] via-[#3d3a3a] to-[#524f4f] rounded-[20px]   w-[47%]  ml-[29px] h-[406px] mt-[50px]  pl-[1px] pt-[1px] font-bold text-gray-500 '>
                                <div className='bg-gradient-to-tl to-[#1a1644] from-[#242333]   w-[99.7%] pt-[23px] h-[404px]  rounded-[20px] '>
                                    <p className=' ml-[35px] font-[700] text-[17px] text-white'>STAKING REQUIREMENTS</p>
                                    <p className='mt-[20px] ml-[35px] font-[500] text-[16px] text-white'>
                                        To get involved in project staking place make sure you<br /> have complate the following requirements.

                                    </p>
                                    <p className='mt-[20px] ml-[35px] font-[500] text-[16px] text-white'>
                                        . Connect your wallet have the required network.<br />
                                        Binance smart chain. selected.

                                    </p>
                                    <p className='mt-[20px] ml-[35px] font-[500] text-[16px] text-white'>
                                        . Connect your wallet have the required network.<br />
                                        Binance smart chain. selected.

                                    </p>
                                    <div className='flex'>
                                        <button className={'w-[160px] ml-[29px] h-[40px] text-white rounded-full mt-[28px] text-[18px]  font-[500] bg-gradient-to-r  from-[#3B28CC] to-[#E83151] bg-no-repeat '} >
                                            Connect
                                        </button>
                                        <button className={'w-[160px] ml-[29px] h-[40px] text-white rounded-full mt-[28px] text-[18px]  font-[500]  bg-no-repeat border-[2px] border-blue-900 '} >
                                            Switch
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>



                    </div>


                </div>
                <div className='w-full h-[2px] bg-[#7AFDD6] mt-[50px]'>

                </div>

                <Footer></Footer>
            </div>

        </div>
    )
}
export default Ditail;