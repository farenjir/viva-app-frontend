import React, { useState, useEffect } from 'react';
import swal from 'sweetalert';
import UserService from '../Infrastructure/Services/user.service';

export default function Modal(props: any) {
    const [isopen, setopen] = useState(1);
    const [formData, setFormData] = useState({
        username: '',
        walletadress: '',
        email: '',
        password: '',
        passwordrep: '',
        Reffrallcode:''
    });
    const saveform = () => {
        if (formData.username != "" && formData.password != "") {
            if (formData.password == formData.passwordrep) {
                UserService.registeruser(formData).then(p => {
                   
                    if (p.status == 200) {
                        const o = document.getElementById('box') ? document.getElementById('box').style.display = 'none' : '';


                        swal({
                            title: "Create Your Account Done",
                            text: "You can Login Now",
                            icon: "success",
                            className: 'boxshow'

                        });

                    }
                    if (p.status == 202) {
                        swal({
                            title: "The username is duplicated",

                            icon: "error",

                        });
                    }
                })
            } else {
                swal({
                    title: "Password not match",
                    text: "",
                    icon: "error",
                    buttons: "Ok",
                });
            }

        } else {
            swal({
                title: "Please,Enter data to create account",
                text: "fild is empaty",
                icon: "error",
                buttons: "Ok",
            });
        }

    }
    const handleChange = (e: any) => {

        setFormData({ ...formData, [e.target.name]: e.target.value });

    };
    const cansel=()=>{
        var x = document.getElementById("box");
      
          x.style.display = "none";
        
    }
    return (

        <div id='box' style={{ display: props.ch == 1 ? 'none' : 'block' }} className='w-[90%] h-[100vh] text-center absolute pl-[30%]'>
            <div className='w-[560px]   h-[750px] bg-[#211F41] mt-[20px] ml-[6px] rounded-[20px] shadow-3xl border-[2px] border-[#B8B8B8] mx-auto'>
                <div className="w-[100%] h-auto  mt-[30px] ml-[5px] text-center mx-auto">
                    <img src='../img/final/l2.png' className='w-auto h-[81px] mt-[0px] mx-auto' />

                    <p className="mt-[14px] font-[700] text-[30px]">Welcome to Vivastarter</p>
                    <input className="w-[90%] h-[50px] rounded-[10px] border-[1px] bg-transparent border-white mt-[10px] text-[16px] font-[700] pl-[20px] " placeholder="User*" name="username" value={formData.username} onChange={(e) => handleChange(e)} />
                    <input className="w-[90%] h-[50px] rounded-[10px] border-[1px] bg-transparent border-white mt-[21px] text-[16px] font-[700] pl-[20px]" type={'password'} placeholder="password*" name="password" value={formData.password} onChange={(e) => handleChange(e)} />
                    <input className="w-[90%] h-[50px] rounded-[10px] border-[1px] bg-transparent border-white mt-[21px] text-[16px] font-[700] pl-[20px]" type={'password'} placeholder="Repeat password*" name="passwordrep" value={formData.passwordrep} onChange={(e) => handleChange(e)} />
                    <input className="w-[90%] h-[50px] rounded-[10px] border-[1px] bg-transparent border-white mt-[21px] text-[16px] font-[700] pl-[20px]" placeholder="wallet address*" name="walletadress" value={formData.walletadress} onChange={(e) => handleChange(e)} />
                    <input type="email" className="w-[90%] h-[50px] rounded-[10px] border-[1px] bg-transparent border-white mt-[41px] text-[16px] font-[700] pl-[20px]" placeholder="Email*" name="email" value={formData.email} onChange={(e) => handleChange(e)} />
                    <input type="text" className="w-[90%] h-[50px] rounded-[10px] border-[1px] bg-transparent border-white mt-[41px] text-[16px] font-[700] pl-[20px]" placeholder="Reffrall Code" name="Reffrallcode" value={formData.Reffrallcode} onChange={(e) => handleChange(e)} />



                </div>

                <div className="w-[98%] h-[26px] pl-[20px]  mt-[30px] ml-[0px] text-center  mx-auto" style={{direction:'rtl'}}>
                    <button onClick={() => saveform()} className="w-[50%] h-[50px] bg-gradient-to-r from-[#3B28CC] to-[#E83151] text-[18px] rounded-[30px] mx-auto">
                        Register
                    </button>
                    <button onClick={() => cansel()} className="w-[50%] h-[50px] bg-gradient-to-r from-[#3B28CC] to-[#E83151] text-[18px] rounded-[30px] mx-auto">
                        Cansel
                    </button>
                </div>

            </div>



        </div>

    );
}