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
import KycService from '../Infrastructure/Services/kyc.service';
import swal from 'sweetalert';
const Kyc: NextPage = () => {
    const [open, setOpen] = useState(1);
    const [imgname, setimg] = useState('');
    const [formData, setFormData] = useState({
        country: '',
        city: '',
        address: '',
        filename: '',
        mobail: '',
        walletadress: '',
        isaccept: 0,
        fullname: '',
        Email: ''
    });
    const handleChange = (e: any) => {

        setFormData({ ...formData, [e.target.name]: e.target.value });

    };
    const handleClick = () => {
        if (open == 1) {
            setOpen(0)
        } else {
            setOpen(1);
        }
    }
    useEffect(() => {
        KycService.kycinfo().then(p => {
            let list = p.data;
            if (list) {
                setFormData({
                    country: p.data ? p.data['country'] : '',
                    city: p.data['city'],
                    address: p.data['address'],
                    filename: p.data['filename'],
                    mobail: p.data['mobail'],
                    walletadress: p.data['walletadress'],
                    isaccept: p.data['isaccept'],
                    fullname: p.data['fullname'],
                    Email: p.data['Email']
                })
            }

        })
    }, [])
    const save = () => {
        formData.filename = imgname;
        KycService.addkyc(formData).then(p => {
            swal({

                text: 'The information has been registered successfully. Wait for confirmation from the site administration',
                className: 'boxshow'
            })
        })
    }
    const upload = (e: any) => {
        KycService.upload(e.target.files[0]).then(p => {

            setimg(p.data);
        })
    }
    return (
        <div className='bg-amir dark:bg-[#16142E]    '>
            <div className='container h-auto mx-auto'>
                <Head>
                    <title>   KYC </title>
                    <meta name="description" content="Generated by create next app" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <div className=' w-full lg:flex h-auto col-span-2 bg-[#D3D3D3] dark:bg-[#16142E]'>
                    <div className='w-[15%] hidden lg:block   h-auto '>
                        <div className='md:h-[126px] xl:h-[80px] w-[100%]   lg:block md:pl-[33px] xl:pl-[16px]  dark:text-[#7AFDD6] dark:bg-[#211F41] xl:pt-[16px] md:pt-[40px] font-[900] md:text-[35px] xl:text-[16px] border-b-[1px] bg-[#F0EEFF] border-r-[1px] border-[#e4e2eff5] '>
                            Vivastarter
                        </div>
                        <Menu />


                    </div>
                    <div className='w-full h-auto '>
                        <div className='md:h-[126px] xl:h-[80px]  text-right w-full flex  dark:bg-[#211F41] bg-[#F0EEFF] border-b-[1px] border-gray-600'>
                            {/* <div className='w-[68%]'>
                            <div className='w-[201px] md:h-[126px] xl:h-[80px] border-r-[0.5px] border-[#9b9999] text-left flex md:pt-[53px] xl:pt-[26px] pl-[16px] md:text-[16px] xl:text-[16px]' >
                                connected     <img src='./img/leak.svg' className='md:w-[48px] xl:w-[38px] md:h-[48px] xl:h-[38px] mt-[-10px] ml-[10px]' />
                            </div>
                        </div>
                        {
                            typeof window != "undefined" ? localStorage.getItem('token') == null ?
                                <>
                                    <Btn text={'Create Account '} handleClick={handleClick} ></Btn><p className='w-[30px]'></p>
                                    <Btn text={'Sign in '} handleClick={handleClicklogin}></Btn>
                                </> :
                                <>
                                    <Btn text={'logout '} handleClick={handleClicklogout}></Btn>
                                </>
                                : ''

                        } */}


                        </div>

                        {
                            formData.isaccept == 1 ?
                                <>
                                    <>
                                        <br />
                                        <div className='w-[90%]  h-[40px] bg-gray-700 mx-auto mt-[8px] rounded-[10px] pl-[30px] pt-[10px]'>
                                            Checking information

                                        </div>
                                    </>
                                </> : formData.isaccept == 2?
                                <>
                                  <div className='w-[90%]  h-[40px] bg-[#0a6d3f] mx-auto mt-[8px] rounded-[10px] pl-[30px] pt-[10px]'>
                                            Accept information And Active Account

                                        </div>
                                </>:formData.isaccept == 3?
                                 <>
                                 <div className='w-[90%]  h-[40px] bg-[#8d1818] mx-auto mt-[8px] rounded-[10px] pl-[30px] pt-[10px]'>
                                           Reject information And not  Active Account

                                       </div>
                               </>:''
                        }

                        <div className='w-[93%]  h-auto text-center lg:flex mt-[30px]  ml-[42px] mx-auto gap-[20px]'>
                            <div className=''>
                                <input name="fullname" value={formData.fullname} onChange={(e) => handleChange(e)} type='text' placeholder='fullname' className='w-[90%] pl-3 h-[60px] font-[500] border-[1px] border-white dark:bg-[#211F41] text-[17px] text-left p-1 bg-white rounded-[10px]' />
                                <input name="mobail" value={formData.mobail} onChange={(e) => handleChange(e)} placeholder='Mobile' className='w-[90%]  pl-3 mt-[30px] h-[60px] font-[500] border-[1px] border-white dark:bg-[#211F41] text-[17px] text-left p-1 bg-white rounded-[10px]' />
                                {/* <select className='w-[90%] pl-3 mt-[30px] h-[60px] font-[500] border-[1px] border-white dark:bg-[#211F41] text-[17px] text-left p-1 bg-white rounded-[10px]' >
                                    <option>Country</option>
                                </select> */}
                                <input name="country" value={formData.country} onChange={(e) => handleChange(e)} placeholder='Country' className='w-[90%]  pl-3 mt-[30px] h-[60px] font-[500] border-[1px] border-white dark:bg-[#211F41] text-[17px] text-left p-1 bg-white rounded-[10px]' />


                            </div>
                            <div className=''>
                                <input name="Email" value={formData.Email} onChange={(e) => handleChange(e)} type='text' placeholder='Email' className='w-[90%]  pl-3  h-[60px] font-[500] border-[1px] border-white dark:bg-[#211F41] text-[17px] text-left p-1 bg-white rounded-[10px]' />
                                <input name="walletadress" value={formData.walletadress} onChange={(e) => handleChange(e)} type='text' placeholder='wallet address' className='w-[90%]  pl-3 mt-[30px] h-[60px] font-[500] border-[1px] border-white dark:bg-[#211F41] text-[17px] text-left p-1 bg-white rounded-[10px]' />
                                {/* <select className='w-[90%]  pl-3 mt-[30px] h-[60px] font-[500] border-[1px] border-white dark:bg-[#211F41] text-[17px] text-left p-1 bg-white rounded-[10px]' >
                                    <option>City</option>
                                </select> */}
                                <input name="city" value={formData.city} onChange={(e) => handleChange(e)} type='text' placeholder='City' className='w-[90%]  pl-3 mt-[30px] h-[60px] font-[500] border-[1px] border-white dark:bg-[#211F41] text-[17px] text-left p-1 bg-white rounded-[10px]' />



                            </div>
                        </div>
                        <div className=' w-[90%] h-[215px] bg-gradient-to-r  from-blue-900 to-gray-800 rounded-[12px] pt-[2px] mt-[50px] mx-auto '>
                            <div className='bg-[#E5E1FF] dark:bg-[#241E4B] w-[99.5%] h-[211px]  mx-auto   rounded-[12px]  font-bold text-white'>
                                <textarea name="address" value={formData.address} onChange={(e) => handleChange(e)} className='w-full h-[211px] bg-transparent p-[8px] resize-none rounded-[12px] ' placeholder='Adress'>

                                </textarea>
                            </div>
                        </div>



                        <div className='lg:flex h-[214px] w-[90%] mx-auto mt-[35px] '>
                            <div className='w-[79%] font-[700] text-[17px]'>
                                You should take a picture of yourself while you are holding one of the documents in front of your face to be clearly visible as described below. (make note that you first check samples brought down below to take a correct KYC image)
                                <br />
                                <button onClick={() => save()} className='lg:w-w-[90%]  w-full h-[50px] rounded-full bg-send  bg-contain bg-no-repeat mt-[30px]'>

                                </button>
                            </div>

                            <div className='w-[10%] ml-[10px]'>
                                <div className='lg:w-[200px] mt-3 lg:mt-0 w-full h-[200px] text-center dark:bg-[#241E4B] bg-[#E5E1FF] border-gray-300 border-[2px] pt-[30%] rounded-[12px]'>
                                    <button className='bg-upload w-[60px] h-[60px] bg-no-repeat'></button>

                                    <div className='font-bold text-[20px] text-white'>
                                        Upload file
                                    </div>
                                    <label className="custom-file-input file-blue">
                                        <input onChange={upload} type="file" />
                                    </label>
                                </div>
                            </div>
                        </div>
                        {/* <div className=' w-[93%] m-0 m-auto h-[100px] mt-[10px] lg:flex rounded-[12px] p-[10px] font-bold text-gray-500'>

                    </div> */}
                    </div>

                </div>
                <div className='w-full h-[2px] bg-[#7AFDD6] mt-[50px]'>

                </div>
            </div>

            <Footer></Footer>
        </div>
    )
}
export default Kyc;