import React, { useState, useEffect } from 'react';
import swal from 'sweetalert';
import UserService from '../Infrastructure/Services/user.service';
import { useRouter } from 'next/router'


export default function ModalLogin(props: any) {
    const router = useRouter()
    const [formData, setFormData] = useState({
        username: '',
        password: '',

    });
    const handclick = () => {
        UserService.login(formData).then(p => {
   
            if (p.status == 200) {

                localStorage.setItem('token', p.data)
                const o = document.getElementById('boxlogin').style.display = 'none';
                router.push('/')
            }
            if (p.status == 202) {
                swal({
                    title: "The username or password not found",

                    icon: "error",
                    buttons: 'ok'
                }
                )
            }
        })
    }
    const onchangme = (e: any) => {

        setFormData({ ...formData, [e.target.name]: e.target.value });

    };
    const cansel=()=>{
        
        var x = document.getElementById("boxlogin");
      
          x.style.display = "none";
        
    }
    return (
        <div  className='absolute text-right w-[90%]'>
            <div  id='boxlogin' style={{ display: props.ch == 1 ? 'none' : 'block' }} className='w-[30%]   h-[491px] bg-[#211F41] mt-[70px]  rounded-[20px] shadow-3xl border-[2px] border-[#B8B8B8] mx-auto' >
                <div className=' w-[100%] mx-auto text-center'>
                    <div className="w-full h-auto  mt-[34px] ml-[0px]">
                        <img src='../img/final/l2.png' className='w-auto h-[81px] mt-[0px] mx-auto' />

                        <p className="mt-[14px] font-[700] text-[20px]">Welcome to Vivastarter</p>
                        <input className="w-[90%] h-[50px] rounded-[10px] border-[1px] bg-transparent border-white mt-[41px] text-[16px] font-[700] pl-[20px] " placeholder="User*" name="username" value={props.username} onChange={(e) => onchangme(e)} />
                        <input className="w-[90%] h-[50px] rounded-[10px] border-[1px] bg-transparent border-white mt-[30px] text-[16px] font-[700] pl-[20px]" placeholder="password*" type={'password'} name="password" value={props.password} onChange={(e) => onchangme(e)} />

                        <div className="w-[95%] h-[26px] text-[16px] font-[700]  mt-[13px] ml-[0px] text-right">
                            Forget  password
                        </div>
                        <div className="w-[100%] h-[26px]  mt-[20px] ml-[0px] text-center " style={{direction:'rtl'}}>
                            <button onClick={() => handclick()} className="w-[45%] h-[40px] bg-gradient-to-r from-[#3B28CC] to-[#E83151] text-[20px] rounded-[30px]">
                                Login
                            </button>
                            &nbsp;
                            <button onClick={() => cansel()} className="w-[45%] h-[40px] bg-gradient-to-r from-[#3B28CC] to-[#E83151] text-[20px] rounded-[30px]">
                                Cansel
                            </button>
                        </div>
                    </div>

                </div>


            </div>
        </div>


    );
}