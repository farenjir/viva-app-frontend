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
import { useRouter } from 'next/router'
import KycService from '../Infrastructure/Services/kyc.service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faCalendar, faCheck, faMoneyCheck, faMultiply, faTrash } from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert';
import moment from 'moment-jalaali'
import Multiselect from 'multiselect-react-dropdown';


// import { DatePicker } from 'react-responsive-datepicker'
import DatePicker from 'react-datepicker2';
//import 'react-responsive-datepicker/dist/index.css'
import Select from 'react-select';
import UserService from '../Infrastructure/Services/user.service';

interface round {
    startdate: string,
    enddate: string,
    pric: string
}
interface listr {
    id: number
}
const Createproject: NextPage = () => {
    const router = useRouter()

    const [listcurency, setcurencylist] = useState([]);

    const [isSSR, setIsSSR] = useState(true);
    const [isOpens, setIsOpens] = React.useState(false)


    const [value, onChange] = useState([{
        date: new Date(), id: 0
    }
    ]);

    const [selectcu, setselect] = useState([
        { value: '', label: '' }
    ])


    const [sst, setsst] = useState(moment())
    const [est, setend] = useState(moment())
    const [rstart, setrstart] = useState(moment())
    const [rend, setrend] = useState(moment())
    const [vstart, setvstart] = useState(moment())
    const [vend, setvend] = useState(moment())
    const [rounds, setround] = useState<round[]>([]);
    const [listrc, setlistr] = useState<listr[]>([])
    const [open, setOpen] = useState(1);
    const [openlogin, setOpenlogin] = useState(1);
    const [cudata, setcu] = useState('')
    const [formData, setFormData] = useState({
        tokenname: "",
        tokensymbol: "",
        tokentotall: "",
        tokenadress: "",
        ftarget: "",
        pptoken: "",
        sst: "",
        set: "",
        softcap: "",
        hardcap: "",
        sr: "",
        sc: "",
        mina: "",
        maxa: "",
        tdt: "",
        email: "",
        username: "",
        info: '',
        rounds: [],
        vesting: [],
        imglist: [],
        isfuther: 0,
        projecttype:1,
        des:""
    });
    useEffect(() => {

    }, [cudata])
    const [listround, setlistround] = useState([]);
    const [listvi, setlistvi] = useState([]);
    const [round, setroundrt] = useState({
        "startdate": "",
        "enddate": "",
        "price": "",
        "username": "",
        "status":0
    });
    const [visiting, setvisiting] = useState({
        "startdate": "",
        "enddate": "",
        "username": "",
        "status":0
    });
    const handleChange = (e: any) => {

        setFormData({ ...formData, [e.target.name]: e.target.value });

    };
    const handleChange1 = (e: any) => {

        setroundrt({ ...round, [e.target.name]: e.target.value });

    };


    useEffect(() => {
        setIsSSR(false);
        KycService.listround().then(p => {
            setlistround(p.data)
            KycService.listcurency().then(o => {
                setcurencylist(o.data)
                KycService.listvi().then(p => {
                    setlistvi(p.data)
                })
            })
        })
    }, []);
    useEffect(() => {

    }, [sst])

    const handleClick = () => {
        if (open == 1) {
            setOpen(0)
        } else {
            setOpen(1);
        }
    }
    const handleClicklogin = () => {
        if (openlogin == 1) {
            setOpenlogin(0)
        } else {
            setOpenlogin(1);
        }
    }
    const handleClicklogout = () => {
        localStorage.clear();
        router.push('/')
    }

    const savedata = () => {
        formData.sst = sst.local().format('DD/MM/YYYY');
        formData.set = est.local().format('DD/MM/YYYY');
        formData.rounds = listround;
        formData.vesting = listvi;
        formData.imglist = imagelist;
        formData.sc = cudata;
        KycService.addproject(formData).then(p => {
            if (p.status == 200) {
                swal({
                    title: "Create Your project Done",
                    text: "You can see in All project List  ",

                    className: 'boxshow'

                });
                router.push('/listprojects')
            }
        })
    }
    const saveround = () => {
        round.startdate = rstart.local().format('DD/MM/YYYY');
        round.enddate = rend.local().format('DD/MM/YYYY');
        KycService.addround(round).then(p => {
            KycService.listround().then(p => {
                setlistround(p.data)
            })
        })
    }
    const savevi = () => {
        visiting.startdate = vstart.local().format('DD/MM/YYYY');
        visiting.enddate = vend.local().format('DD/MM/YYYY');
        KycService.addvi(visiting).then(p => {
            KycService.listvi().then(p => {
                setlistvi(p.data)
            })
        })
    }
    const removeitemround = (id: any) => {

        KycService.deleteround(id).then(p => {
            KycService.listround().then(p => {
                setlistround(p.data)
            })
        })
    }
    const removeitemvi = (id: any) => {

        KycService.deletevi(id).then(p => {
            KycService.listvi().then(p => {
                setlistvi(p.data)
            })
        })
    }
    const selectcurency = (e: any) => {
        if (e.target.checked) {
            setcu(cudata + '-' + e.target.value)

        } else {
            let s = cudata.replace('-' + e.target.value, '');
            setcu(s);
        }
    }
    const [imagelist, setimg] = useState([
        { name: '', id: 0 }
    ])
    useEffect(() => {
    }, [imagelist])
    const upload = (e: any, id: any) => {
        KycService.upload(e.target.files[0]).then(p => {
            setimg([...imagelist, { name: p.data, id: id }])
        })
    }
    const deleteimg = (id: any) => {
        // let f=imagelist.find(p=>p.id !=id);
        setimg(imagelist.filter(p => p.id != id));
    }
    useEffect(()=>{
      UserService.deleteallround().then(p=>{
        UserService.deleteallvest().then(o=>{
            
        })
      })    
    },[])
    return (
        <div className='bg-amir dark:bg-[#16142E] '>
            <div className='container h-auto mx-auto'>
                <Head>
                    <title>  Add Project</title>
                    <meta name="description" content="Generated by create next app" />
                    <link rel="icon" href="/lo.png" />
                </Head>
                <Modal ch={open} ></Modal>
                <ModalLogin ch={openlogin} />
                <div className=' w-full lg:flex h-auto col-span-2 bg-[#D3D3D3] dark:bg-[#16142E]'>
                    <div className='w-[15%] hidden lg:block   h-auto '>
                        <div className='md:h-[126px] xl:h-[80px] w-[100%]   lg:block md:pl-[33px] xl:pl-[16px]  dark:text-[#7AFDD6] dark:bg-[#211F41] xl:pt-[16px] md:pt-[40px] font-[900] md:text-[35px] xl:text-[16px] border-b-[1px] bg-[#F0EEFF] border-r-[1px] border-[#e4e2eff5] '>
                            <img src='../img/final/l2.png' className='w-[40px] h-[41px] mt-[5px] mx-auto' />

                        </div>
                        <Menu />


                    </div>
                    <div className='w-full h-auto dark:bg-[#16142E]'>
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

                        <div className='w-full h-auto text-center lg:flex pt-8px'>
                            <div className='flex-1 gap-3 p-3'>

                                <input name='tokenname' value={formData.tokenname} onChange={(e) => handleChange(e)} type='text' placeholder='Token Name' className='w-[90%] md:h-[80px] xl:h-[50px] font-[700] dark:bg-[#241E4B] text-[16px] text-left p-1 mt-[30px] bg-white rounded-[10px] pl-[30px] border-[1px] border-white' />
                                <input name='tokentotall' value={formData.tokentotall} onChange={(e) => handleChange(e)} type='text' placeholder='Token Total Supply' className='w-[90%] md:h-[80px] xl:h-[50px] font-[700] dark:bg-[#241E4B] mt-[30px] text-[16px] text-left p-1 bg-white rounded-[10px] pl-[30px] border-[1px] border-white' />
                                <input name='ftarget' value={formData.ftarget} onChange={(e) => handleChange(e)} type='text' placeholder='Funding Target' className='w-[90%] md:h-[80px] xl:h-[50px] font-[700] dark:bg-[#241E4B] mt-[30px] text-[16px] text-left p-1 bg-white rounded-[10px] pl-[30px] border-[1px] border-white' />



                                <div className='flex mx-auto pl-[28px] '>
                             
                                    <div placeholder='Sale Start Time' className='w-[95%] flex md:h-[80px] xl:h-[50px] font-[700] dark:bg-[#241E4B] text-[16px] text-left p-1  mt-[30px] bg-white rounded-[10px] pl-[30px] border-[1px] border-white tttt' >
                                        <p className='mt-[10px] text-[#b9b6b6]'>
                                            Sale Start Time
                                        </p>
                                        &nbsp;     &nbsp;
                                        <DatePicker
                                            onChange={(e) => setsst(e)}
                                            timePicker={false}
                                            value={sst}


                                        />
                                    </div>
                                   

                                </div>

                                <input name='softcap' value={formData.softcap} onChange={(e) => handleChange(e)} type='text' placeholder='Soft Cap' className='w-[90%] md:h-[80px] xl:h-[50px] font-[700] dark:bg-[#241E4B] text-[16px] text-left p-1  mt-[30px] bg-white rounded-[10px] pl-[30px] border-[1px] border-white' />
                                <input name='sr' value={formData.sr} onChange={(e) => handleChange(e)} type='text' placeholder='Swap Ratio' className='w-[90%] md:h-[80px] xl:h-[50px] font-[700] dark:bg-[#241E4B] text-[16px] text-left p-1  mt-[30px] bg-white rounded-[10px] pl-[30px] border-[1px] border-white' />
                                <input name='maxa' value={formData.maxa} onChange={(e) => handleChange(e)} type='text' placeholder='Max Allocation' className='w-[90%] md:h-[80px] xl:h-[50px] font-[700] dark:bg-[#241E4B] text-[16px] text-left p-1  mt-[30px] bg-white rounded-[10px] pl-[30px] border-[1px] border-white' />
                                <input name='tdt' value={formData.tdt} onChange={(e) => handleChange(e)} type='text' placeholder='Token Distribution Time' className='w-[90%] md:h-[80px] xl:h-[50px] font-[700] dark:bg-[#241E4B] text-[16px] text-left p-1  mt-[30px] bg-white rounded-[10px] pl-[30px] border-[1px] border-white' />
                                <select name='projecttype' onChange={(e)=>handleChange(e)} className='w-[90%] md:h-[80px] xl:h-[50px] font-[700] dark:bg-[#241E4B] text-[16px] text-left p-1  mt-[30px] bg-white rounded-[10px] pl-[30px] border-[1px] border-white'>
                                    <option value={1}>Public</option>
                                    <option value={2}>Private</option>

                                </select>
                            </div>
                            <div className='flex-1 gap-3 p-3'>

                                <input name='tokensymbol' value={formData.tokensymbol} onChange={(e) => handleChange(e)} type='text' placeholder='Token Symbol' className='w-[90%] md:h-[80px] xl:h-[50px] font-[700] dark:bg-[#241E4B] text-[16px] text-left p-1  mt-[30px] bg-white rounded-[10px] pl-[30px] border-[1px] border-white' />
                                <input name='tokenadress' value={formData.tokenadress} onChange={(e) => handleChange(e)} type='text' placeholder='Token Adress' className='w-[90%] md:h-[80px] xl:h-[50px] font-[700] dark:bg-[#241E4B] text-[16px] text-left p-1  mt-[30px] bg-white rounded-[10px] pl-[30px] border-[1px] border-white' />
                                <input name='pptoken' value={formData.pptoken} onChange={(e) => handleChange(e)} type='text' placeholder='Price Per Token' className='w-[90%] md:h-[80px] xl:h-[50px] font-[700] dark:bg-[#241E4B] text-[16px] text-left p-1  mt-[30px] bg-white rounded-[10px] pl-[30px] border-[1px] border-white' />


                                <div className='flex mx-auto pl-[28px] '>
                                    <div placeholder='Sale Start Time' className='w-[95%] flex md:h-[80px] xl:h-[50px] font-[700] dark:bg-[#241E4B] text-[16px] text-left p-1  mt-[30px] bg-white rounded-[10px] pl-[30px] border-[1px] border-white tttt' >
                                        <p className='mt-[10px] text-[#b9b6b6]'>
                                            Sale End Time
                                        </p>
                                        &nbsp;     &nbsp;
                                        <DatePicker
                                            onChange={(e) => setend(e)}
                                            timePicker={false}
                                            value={est}


                                        />
                                    </div>



                                </div>
                                <input name='hardcap' value={formData.hardcap} onChange={(e) => handleChange(e)} type='text' placeholder='Hard Cap' className='w-[90%] md:h-[80px] xl:h-[50px] font-[700] dark:bg-[#241E4B] text-[16px] text-left p-1  mt-[30px] bg-white rounded-[10px] pl-[30px] border-[1px] border-white ' />
                                <div>
                                    <div className='flex'>
                                        <button onClick={() => setIsOpens(isOpens ? false : true)} className='w-[10%] md:h-[80px] xl:h-[50px] font-[700] dark:bg-[#241E4B] text-[16px] text-center p-1  mt-[30px] bg-white rounded-tl-[10px] rounded-bl-[10px]  ml-[30px] border-[1px] border-white'>
                                            <FontAwesomeIcon icon={faCheck} className='mx-auto h-[17px]' />
                                        </button>
                                        <input name='sc' value={cudata} onChange={(e) => handleChange(e)} type='text' placeholder='Supported Currency' className='w-[80%] md:h-[80px] xl:h-[50px] font-[700] dark:bg-[#241E4B] text-[16px] text-left p-1  mt-[30px] bg-white rounded-br-[10px] rounded-tr-[10px] pl-[30px] border-[1px] border-white' />

                                    </div>
                                    {
                                        isOpens == true ?
                                            <ul className='absolute z-[300] bg-[#27233f] ml-[80px] list-none w-[30%]'>
                                                {
                                                    listcurency.map((input, index) => {
                                                        return (
                                                            <>
                                                                <li className='flex rounded-[10px] w-auto p-[8px] mt-[4px]  text-white'>
                                                                    <input onChange={(e) => selectcurency(e)} value={input['name']} type={'checkbox'} />&nbsp; {input['name']}
                                                                </li>
                                                            </>
                                                        )
                                                    })
                                                }
                                            </ul> : ''
                                    }

                                </div>

                               
                                <input name='mina' value={formData.mina} onChange={(e) => handleChange(e)} type='text' placeholder='Min Allocation' className='w-[90%] md:h-[80px] xl:h-[50px] font-[700] dark:bg-[#241E4B] text-[16px] text-left p-1  mt-[30px] bg-white rounded-[10px] pl-[30px] border-[1px] border-white' />
                                <input name='email' type='email' value={formData.email} onChange={(e) => handleChange(e)} placeholder='Project Email Address ' className='w-[90%] md:h-[80px] xl:h-[50px] font-[700] dark:bg-[#241E4B] text-[16px] text-left p-1  mt-[30px] bg-white rounded-[10px] pl-[30px] border-[1px] border-white' />
                         
                            </div>
                        </div>

                        <div className=' w-[93%] h-[215px] bg-gradient-to-r  from-blue-900 to-gray-800 rounded-[12px] pt-[2px] mt-[50px] mx-auto '>
                            <div className='bg-[#E5E1FF] dark:bg-[#241E4B] w-[99.5%] h-[211px]  mx-auto   rounded-[12px]  font-bold text-white'>
                                <textarea name="info" value={formData.info} onChange={(e) => handleChange(e)} className='w-full h-[211px] bg-transparent p-[8px] resize-none rounded-[12px] ' placeholder='info'>

                                </textarea>
                            </div>
                        </div>

                        <div className=' lg:w-[93%] w-full m-0 m-auto h-auto mt-[50px]  rounded-[12px] p-[10px] font-bold text-gray-500'>
                            <div className='grid grid-cols-1 lg:grid-cols-5 lg:gap-[30px]'>
                                <div className='lg:w-[100%]  dark:bg-[#211F41] lg:mt-0 w-full h-[215px] text-center bg-[#E5E1FF] border-gray-300 border-[1px] pt-[10%] rounded-[10px]'>
                                    {
                                        imagelist.find(p => p.id == 1)?.name ?
                                            <>
                                                <FontAwesomeIcon onClick={() => deleteimg(1)} icon={faTrash} className='w-[20px] h-[20px] text-red-500 cursor-pointer' />
                                                <hr className='mb-[5px]' />
                                                <img src={process.env.REACT_APP_Bse_Url+'/uploads/' + imagelist.find(p => p.id == 1)?.name} className='w-[80%] h[70%px] mx-auto' />

                                            </>

                                            : <>     <button className='bg-upload w-[60px] h-[60px] bg-no-repeat'></button>
                                                <div className='font-bold md:text-[16px] xl:text-[15px] dark:text-white text-blue-800'>
                                                    Upload logo Project
                                                </div>

                                                <label className="custom-file-input file-blue">
                                                    <input onChange={(e) => upload(e, 1)} type="file" />
                                                </label> </>

                                    }

                                </div>
                                <div className='lg:w-[100%]  dark:bg-[#211F41] lg:mt-0 w-full h-[215px] text-center bg-[#E5E1FF] border-gray-300 border-[1px] pt-[10%] rounded-[10px]'>
                                    {
                                        imagelist.find(p => p.id == 2)?.name ?
                                            <>
                                                <FontAwesomeIcon onClick={() => deleteimg(2)} icon={faTrash} className='w-[20px] h-[20px] text-red-500 cursor-pointer' />
                                                <hr className='mb-[5px]' />
                                                <img src={process.env.REACT_APP_Bse_Url+'/uploads/' + imagelist.find(p => p.id == 2)?.name} className='w-[80%] h[70%px] mx-auto' />

                                            </>

                                            : <>     <button className='bg-upload w-[60px] h-[60px] bg-no-repeat'></button>
                                                <div className='font-bold md:text-[16px] xl:text-[15px] dark:text-white text-blue-800'>
                                                    Upload logo Project
                                                </div>

                                                <label className="custom-file-input file-blue">
                                                    <input onChange={(e) => upload(e, 2)} type="file" />
                                                </label> </>

                                    }
                                </div>
                                <div className='lg:w-[100%]  dark:bg-[#211F41] lg:mt-0 w-full h-[215px] text-center bg-[#E5E1FF] border-gray-300 border-[1px] pt-[10%] rounded-[10px]'>
                                    {
                                        imagelist.find(p => p.id == 3)?.name ?
                                            <>
                                                <FontAwesomeIcon onClick={() => deleteimg(3)} icon={faTrash} className='w-[20px] h-[20px] text-red-500 cursor-pointer' />
                                                <hr className='mb-[5px]' />
                                                <img src={process.env.REACT_APP_Bse_Url+'/uploads/' + imagelist.find(p => p.id == 3)?.name} className='w-[80%] h[70%px] mx-auto' />

                                            </>

                                            : <>     <button className='bg-upload w-[60px] h-[60px] bg-no-repeat'></button>
                                                <div className='font-bold md:text-[16px] xl:text-[15px] dark:text-white text-blue-800'>
                                                    Upload logo Project
                                                </div>

                                                <label className="custom-file-input file-blue">
                                                    <input onChange={(e) => upload(e, 3)} type="file" />
                                                </label> </>

                                    }
                                </div>
                                <div className='lg:w-[100%]  dark:bg-[#211F41] lg:mt-0 w-full h-[215px] text-center bg-[#E5E1FF] border-gray-300 border-[1px] pt-[10%] rounded-[10px]'>
                                    {
                                        imagelist.find(p => p.id == 4)?.name ?
                                            <>
                                                <FontAwesomeIcon onClick={() => deleteimg(4)} icon={faTrash} className='w-[20px] h-[20px] text-red-500 cursor-pointer' />
                                                <hr className='mb-[5px]' />
                                                <img src={process.env.REACT_APP_Bse_Url+'/uploads/' + imagelist.find(p => p.id == 4)?.name} className='w-[80%] h[70%px] mx-auto' />

                                            </>

                                            : <>     <button className='bg-upload w-[60px] h-[60px] bg-no-repeat'></button>
                                                <div className='font-bold md:text-[16px] xl:text-[15px] dark:text-white text-blue-800'>
                                                   Main Image For Detail Page
                                                </div>

                                                <label className="custom-file-input file-blue">
                                                    <input onChange={(e) => upload(e, 4)} type="file" />
                                                </label> </>

                                    }
                                </div>
                                <div className='lg:w-[100%]  dark:bg-[#211F41] lg:mt-0 w-full h-[215px] text-center bg-[#E5E1FF] border-gray-300 border-[1px] pt-[10%] rounded-[10px]'>
                                    {
                                        imagelist.find(p => p.id == 5)?.name ?
                                            <>
                                                <FontAwesomeIcon onClick={() => deleteimg(5)} icon={faTrash} className='w-[20px] h-[20px] text-red-500 cursor-pointer' />
                                                <hr className='mb-[5px]' />
                                                <img src={process.env.REACT_APP_Bse_Url+'/uploads/' + imagelist.find(p => p.id == 5)?.name} className='w-[80%] h[70%px] mx-auto' />

                                            </>

                                            : <>     <button className='bg-upload w-[60px] h-[60px] bg-no-repeat'></button>
                                                <div className='font-bold md:text-[16px] xl:text-[15px] dark:text-white text-blue-800'>
                                                    Upload logo Project
                                                </div>

                                                <label className="custom-file-input file-blue">
                                                    <input onChange={(e) => upload(e, 5)} type="file" />
                                                </label> </>

                                    }
                                </div>
                            </div>
                        </div>
                        <div>

                        </div>
                        <div className='bg-[#E5E1FF] dark:bg-gradient-to-tl mt-[53px] pb-[2px] to-blue-900 from-gray-800 w-[93%] mx-auto h-auto pt-[3px]  rounded-[12px]  font-bold text-gray-500'>

                            <div className='bg-[#E5E1FF] dark:bg-[#16142E] w-[99.5%] mx-auto h-auto  rounded-[12px]  font-bold text-gray-500'>
                                <div className='relative flex w-full h-[51px] '>
                                    <div className='flex-1 text-left font-[700] md:text-[30px] xl:text-[16px] text-white pt-[21px] pl-[28px]'>
                                        Rounds
                                    </div>
                                    <div className='flex-1 text-right font-bold text-[16px] pt-[21px] pr-[30px] '>
                                        {/* <button onClick={() => addround()}>
                                            <img src='../img/plus.png' className='w-[16px] h-[16px] cursor-pointer' />
                                        </button> */}
                                    </div>

                                </div>

                                <div className='grid grid-cols-5 w-full h-[88px]  dark:bg-[#211F41]'>
                                    <div className='pt-[12px] pl-[31px]  font-[700] text-white  md:text-[16px] xl:text-[15px]'>
                                        Phase
                                    </div>
                                    <div className='pt-[12px] pl-[31px]  font-[700] text-white  md:text-[16px] xl:text-[15px]'>
                                        Start Date
                                    </div>
                                    <div className='pt-[12px] pl-[31px]  font-[700] text-white  md:text-[16px] xl:text-[15px]'>
                                        End Date
                                    </div>
                                    <div className='pt-[12px] pl-[31px]  font-[700] text-white  md:text-[16px] xl:text-[15px]'>
                                        Suggested price
                                    </div>
                                    <div className='pt-[12px] pl-[31px]  font-[700] text-white  md:text-[16px] xl:text-[15px]'>

                                    </div>
                                    <div>
                                    </div>
                                    <div className='mt-[10px] ml-[28px] flex font-bold text-[18px] w-[160px] h-[35px] text-center  rounded-[2px]  '>
                                        <div className='bg-white pt-[2px] h-[35px] rounded-tl-[5px]  rounded-bl-[5px] '>
                                            <img src='../img/cal.png' className='w-[30px] h-[30px]' />

                                        </div>
                                        <DatePicker
                                            onChange={(e) => setrstart(e)}
                                            timePicker={false}
                                            value={rstart}
                                        />
                                        {/* <input name='startdate' value={input.startdate} onChange={event => handleFormChange(index, event)} className='w-full bg-white' placeholder='2 Oct 2022' /> */}


                                    </div>
                                    <div className='mt-[10px] ml-[28px] flex font-bold text-[18px] w-[160px] h-[35px] text-center  rounded-[2px] bg-white'>

                                        <div className='bg-white pt-[2px] h-[35px] rounded-tl-[5px]  rounded-bl-[5px] '>
                                            <img src='../img/cal.png' className='w-[30px] h-[30px]' />

                                        </div>
                                        <DatePicker
                                            onChange={(e) => setrend(e)}
                                            timePicker={false}
                                            value={rend}
                                        />
                                        {/* <input name='enddate' value={input.enddate} onChange={(event) => handleFormChange(index, event)} className='w-full bg-white' placeholder='2 Oct 2022' /> */}


                                    </div>
                                    <div className='mt-[10px] ml-[28px] flex font-bold text-[18px] w-[160px] h-[35px] text-center  rounded-[2px] bg-white '>

                                        <img src='../img/doler.png' /> <input name='price' value={round.price} onChange={(event) => handleChange1(event)} className='w-full bg-white' placeholder='0.0000035' />


                                    </div>
                                    <div className='mt-[10px] ml-[28px] flex font-bold text-[18px] w-[80px] h-[35px] text-center  rounded-[2px] text-red-600  '>

                                        <button onClick={() => saveround()} className='text-black bg-white text-[13px] w-[180px] rounded-[10px]'>
                                            Add Round
                                        </button>

                                    </div>
                                </div>
                                {
                                    listround.map((input, index) => {
                                        return (
                                            <>
                                                <div className='grid grid-cols-5 w-full h-[52px] gap-[10px] border-b-[1px] border-gray-500' key={index}>
                                                    <div className='mt-[10px] ml-[28px] font-[700] text-[18px] w-[35px] h-[35px] text-center pt-[3px] rounded-[8px] bg-white '>
                                                        {index + 1}
                                                    </div>
                                                    <div className='mt-[10px] ml-[28px] flex font-bold text-[18px] w-[160px] h-[35px] text-left  rounded-[2px]  '>

                                                        {input['startdate']}


                                                    </div>
                                                    <div className='mt-[10px] ml-[28px] flex font-bold text-[18px] w-[160px] h-[35px] text-center  rounded-[2px] '>

                                                        {input['enddate']}


                                                    </div>
                                                    <div className='mt-[10px] ml-[28px] flex font-bold text-[18px] w-[160px] h-[35px] text-center  rounded-[2px]  '>

                                                        {input['price']}

                                                    </div>
                                                    <div className='mt-[10px] ml-[28px] flex font-bold text-[18px] w-[20px] h-[35px] text-center  rounded-[2px] text-red-600  '>

                                                        <button onClick={() => removeitemround(input['_id'])}>
                                                            <FontAwesomeIcon icon={faTrash} className='w-[20px] h-[20px] ' />
                                                        </button>

                                                    </div>
                                                </div>
                                            </>
                                        )
                                    })
                                }

                                <br></br>
                            </div>
                        </div>
                        <div className='bg-[#E5E1FF] dark:bg-gradient-to-tl mt-[53px] to-blue-900 from-gray-800 w-[93%] mx-auto h-auto pt-[4px] pb-[2px] rounded-[12px]  font-bold text-gray-500'>

                            <div className='bg-[#E5E1FF] dark:bg-[#16142E] w-[99.5%] m-0 m-auto h-auto  rounded-[12px]  font-bold text-gray-500'>
                                <div className='relative flex w-full h-[81px] '>
                                    <div className='flex-1 text-left font-[700] text-[16px] text-white pt-[21px] pl-[28px]'>
                                        Vesting
                                    </div>
                                    <div className='flex-1 text-right font-bold text-[16px] pt-[21px] pr-[30px] '>
                                        {/* <button onClick={() => addroundvest()}>
                                            <img src='../img/plus.png' className='w-[16px] h-[16px] cursor-pointer' />
                                        </button> */}
                                    </div>

                                </div>
                                <div className='grid grid-cols-4 w-full h-[89px]  dark:bg-[#211F41]'>
                                    <div className='pt-[12px] pl-[31px]  font-[700] text-white  md:text-[16px] xl:text-[15px]'>
                                        Phase
                                    </div>
                                    <div className='pt-[12px] pl-[31px]  font-[700] text-white  md:text-[16px] xl:text-[15px]'>
                                        Start Date
                                    </div>
                                    <div className='pt-[12px] pl-[31px]  font-[700] text-white  md:text-[16px] xl:text-[15px]'>
                                        End Date
                                    </div>
                                    <div >

                                    </div>
                                    <div >

                                    </div>

                                    <div className='mt-[10px] ml-[28px] flex font-bold text-[18px] w-[216px] h-[35px] text-center  rounded-[2px] bg-white '>
                                        <div className='bg-white pt-[2px] h-[35px] rounded-tl-[5px]  rounded-bl-[5px] '>
                                            <img src='../img/cal.png' className='w-[30px] h-[30px]' />

                                        </div>
                                        <DatePicker
                                            onChange={(e) => setvstart(e)}
                                            timePicker={false}
                                            value={vstart}
                                        />


                                    </div>
                                    <div className='mt-[10px] ml-[28px] flex font-bold text-[18px] w-[216px] h-[35px] text-center  rounded-[2px] bg-white'>
                                        <div className='bg-white pt-[2px] h-[35px] rounded-tl-[5px]  rounded-bl-[5px] '>
                                            <img src='../img/cal.png' className='w-[30px] h-[30px]' />

                                        </div>
                                        <DatePicker
                                            onChange={(e) => setvend(e)}
                                            timePicker={false}
                                            value={vend}
                                        />


                                    </div>
                                    <div className='mt-[10px] ml-[28px] flex font-bold text-[18px] w-[120px] h-[35px] text-center  rounded-[2px] text-red-600  '>

                                        <button onClick={() => savevi()} className='text-black bg-white text-[13px] w-[180px] rounded-[10px]'>
                                            Add
                                        </button>

                                    </div>


                                </div>
                                {
                                    listvi.map((input, index) => {
                                        return (
                                            <>
                                                <div className='grid grid-cols-4 w-full h-[52px] gap-[10px] border-b-[1px] border-gray-500' key={index}>
                                                    <div className='mt-[10px] ml-[28px] font-[700] text-[18px] w-[35px] h-[35px] text-center pt-[3px] rounded-[8px] bg-white '>
                                                        {index + 1}
                                                    </div>
                                                    <div className='mt-[10px] ml-[28px] flex font-bold text-[18px] w-[160px] h-[35px] text-left  rounded-[2px]  '>

                                                        {input['startdate']}


                                                    </div>
                                                    <div className='mt-[10px] ml-[28px] flex font-bold text-[18px] w-[160px] h-[35px] text-center  rounded-[2px] '>

                                                        {input['enddate']}


                                                    </div>

                                                    <div className='mt-[10px] ml-[28px] flex font-bold text-[18px] w-[20px] h-[35px] text-center  rounded-[2px] text-red-600  '>

                                                        <button onClick={() => removeitemvi(input['_id'])}>
                                                            <FontAwesomeIcon icon={faTrash} className='w-[20px] h-[20px] ' />
                                                        </button>

                                                    </div>
                                                </div>
                                            </>
                                        )
                                    })
                                }
                                <br />

                            </div>
                        </div>
                        <div className='lg:flex h-[215px] w-[93%]  m-0 m-auto mt-[50px] '>
                            <div className='w-[72%] dark:bg-gradient-to-br from-blue-900 to-gray-900 rounded-[10px]' >
                                <textarea name='des' onChange={(e)=>handleChange(e)} className='w-[99.5%]    h-[209px] ml-[3px] mt-[2px] resize-none text-[16px] text-left rounded-[13px] font-[700] text-white p-3 dark:bg-gradient-to-r from-[#2d2950] to-[#242946]' placeholder='Description'>

                                </textarea>
                            </div>
                            <div className='w-[10%] pt-[96px] h-[214px] pl-[40px] font-[700] text-[30px]'>
                                OR
                            </div>
                            <div className='w-[216px] h-[216px]'>
                                <div className='lg:w-[200px] mt-3 lg:mt-0 w-full h-[200px] text-center dark:bg-[#211F41] bg-[#E5E1FF] border-gray-300 border-[2px] pt-[30%] rounded-[12px]'>
                                    <button className='bg-upload w-[60px] h-[60px] bg-no-repeat'></button>

                                    <div className='font-bold text-[16px] text-white'>
                                        Upload file
                                    </div>
                                    <label className="custom-file-input file-blue">
                                        <input type="file" />
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className=' w-[93%] m-0 m-auto h-[100px] mt-10 lg:flex rounded-[12px] p-[10px] font-bold text-gray-500'>
                            <button onClick={() => savedata()} className='lg:w-[259px]  w-full h-[40px] rounded-full bg-gradient-to-r from-blue-700 to-red-700  bg-contain bg-no-repeat text-white'>
                                send
                            </button>
                        </div>
                    </div>

                </div>

                <div className='w-full  h-[2px] bg-[#7AFDD6] mt-[50px]'>

                </div>
                {/* <DatePicker
                    isOpen={isOpen1}
                    onClose={() => setIsOpen1(false)}
                     
                    onChange={(e)=>handeldata(e,1)}
                    headerFormat='DD, MM dd'
                />
                  <DatePicker
                    isOpen={isOpen2}
                    onClose={() => setIsOpen2(false)}
                     title={'2'}
                    onChange={(e)=>handeldata(e,2)}
                    headerFormat='DD, MM dd'
                /> */}
                <Footer></Footer>
            </div>
        </div>

    )
}
export default Createproject;