import type { NextPage } from "next";
import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import footer from "../common/footer";
import Head from "next/head";
import Image from "next/image";
import logo from "../public/img/logo.png";
import Footer from "../common/footer";
import Menu from "../common/menu";
import Btn from "../common/btn";
import Modal from "../commponent/Modal";
import KycService from "../Infrastructure/Services/kyc.service";
import UserService from "../Infrastructure/Services/user.service";
import { useRouter } from "next/router";
import ModalLogin from "../commponent/Modallogin";
import Link from "next/link";
import proj from "../Domain/Dto/project";
import Boxone from "../commponent/boxone";
import BoxCard from "../commponent/boxcard";

const Listprojects: NextPage = () => {
    const router = useRouter();
    //const [listproject, setlistproject] = useState([])
    const [listuser, setlistuser] = useState([]);
    const { theme, setTheme } = useTheme();
    const [open, setOpen] = useState(1);
    const [statusedark, setdark] = useState(true);
    const [openlogin, setOpenlogin] = useState(1);
    const [listproject, setlistproject] = useState<proj[]>([]);
    const [typeshow, settype] = useState(1);
    const [btntype, setbtn] = useState(4);
    const andelset = () => {
        setTheme(theme === "dark" ? "light" : "dark");
        if (statusedark == true) {
            setdark(false);
        } else {
            setdark(true);
        }
    };
    useEffect(() => {
        setTheme("dark");
    }, []);
    useEffect(() => {
        KycService.listproject().then((p) => {
            setlistproject(p.data);
            UserService.listuser().then((p) => {
                setlistuser(p.data);
            });
        });
    }, []);

    const handleClick = () => {
        if (open == 1) {
            setOpen(0);
        } else {
            setOpen(1);
        }
    };
    const setfun = () => {};

    const serch = (e: any) => {
        if (e.target.value.length == 0) {
            KycService.listproject().then((p) => {
                setlistproject(p.data);
            });
        } else {
            setlistproject(
                listproject.filter((p) => p["tokenname"].toLowerCase().includes(e.target.value.toLowerCase()))
            );
        }
    };
    const handleClicklogin = () => {
        if (openlogin == 1) {
            setOpenlogin(0);
        } else {
            setOpenlogin(1);
        }
    };
    const handleClicklogout = () => {
        localStorage.clear();
        router.push("/");
    };
    const handleClickkyc = () => {
        router.push("/kyc");
    };
    useEffect(() => {
        if (btntype == 4) {
            KycService.listproject().then((p) => {
                setlistproject(p.data);
            });
        }
        if (btntype == 1) {
            setlistproject(listproject.filter((p) => p.status == 0));
        }
        if (btntype == 2) {
            setlistproject(listproject.filter((p) => p.status == 1));
        }
        if (btntype == 3) {
            setlistproject(listproject.filter((p) => p.status == 2));
        }
    }, [btntype]);
    return (
        <div className="bg-amir dark:bg-[#16142E]   ">
            <div className="container h-auto mx-auto">
                <Head>
                    <title> ALL Project </title>
                    <meta name="description" content="Generated by create next app" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <Modal ch={open}></Modal>
                <ModalLogin ch={openlogin} />
                <div className=" w-full lg:flex h-auto col-span-2 bg-[#D3D3D3] dark:bg-[#16142E] ">
                    <div className="w-[15%] hidden lg:block   h-auto ">
                        <div className="md:h-[126px] xl:h-[80px] w-[100%]   lg:block md:pl-[33px] xl:pl-[20px]  dark:text-[#7AFDD6] dark:bg-[#211F41] xl:pt-[20px] md:pt-[40px] font-[900] md:text-[35px] xl:text-[20px] border-b-[1px] bg-[#F0EEFF] border-r-[1px] border-[#e4e2eff5] ">
                            Vivastarter
                        </div>
                        <Menu />
                    </div>
                    <div className="w-full h-auto">
                        <div className="md:h-[126px] xl:h-[80px]  text-right w-full flex  dark:bg-[#211F41] bg-[#F0EEFF] border-b-[1px] border-gray-600">
                            <div className="w-[70%]">
                                <div className="w-[201px] md:h-[126px] xl:h-[80px] border-r-[0.5px] border-[#9b9999] text-left flex md:pt-[53px] xl:pt-[26px] pl-[20px] md:text-[20px] xl:text-[17px]">
                                    connected{" "}
                                    <img
                                        src="../img/leak.svg"
                                        className="md:w-[48px] xl:w-[38px] md:h-[48px] xl:h-[38px] mt-[-10px] ml-[10px]"
                                    />
                                </div>
                            </div>
                            <div className="w-[30%] flex gap-[10px] pr-[8px]" style={{ direction: "rtl" }}>
                                {typeof window != "undefined" ? (
                                    localStorage.getItem("token") == null ? (
                                        <>
                                            <Btn text={"Sign in "} handleClick={handleClicklogin}></Btn>
                                            <Btn text={"Create Account "} handleClick={handleClick}></Btn>
                                            <p className="w-[30px]"></p>
                                        </>
                                    ) : (
                                        <>
                                            <Btn text={"logout "} handleClick={handleClicklogout}></Btn>
                                            <Btn text={"Kyc "} handleClick={handleClickkyc}></Btn>
                                        </>
                                    )
                                ) : (
                                    ""
                                )}
                            </div>
                            {/* <Btn text={'Connect '} handleClick={handleClick} ></Btn> */}
                        </div>
                        <div className="lg:flex  h-[50px]  mt-[30px]  ">
                            <div className="flex-1 h-[50] pl-[31px] flex">
                                <img
                                    onClick={() => settype(1)}
                                    src="../img/table.png"
                                    className="w-[20px] h-[21px] mt-[3px] cursor-pointer"
                                />{" "}
                                <img
                                    onClick={() => settype(2)}
                                    src="../img/grp.png"
                                    className="w-[25px] h-[28px] ml-[8px] cursor-pointer"
                                />
                            </div>
                            <div className="flex-1 lg:flex gap-[28px]  h-[50]">
                                <button
                                    onClick={() => setbtn(4)}
                                    className={`w-[170px] font-[700] rounded-[30px] text-[16px] h-[40px] border-[1px] border-blue-900 ${
                                        btntype == 4 ? "bg-gradient-to-r from-[#3B28CC] to-[#E83151]" : ""
                                    } `}
                                >
                                    All
                                </button>
                                <button
                                    onClick={() => setbtn(1)}
                                    className={`w-[170px] font-[700] rounded-[30px] text-[16px] h-[40px] border-[1px] border-blue-900 ${
                                        btntype == 1 ? "bg-gradient-to-r from-[#3B28CC] to-[#E83151]" : ""
                                    } `}
                                >
                                    Upcoming
                                </button>
                                <button
                                    onClick={() => setbtn(2)}
                                    className={`w-[170px] font-[700] rounded-[30px] text-[16px] h-[40px] border-[1px] border-blue-900 ${
                                        btntype == 2 ? "bg-gradient-to-r from-[#3B28CC] to-[#E83151]" : ""
                                    } `}
                                >
                                    open
                                </button>
                                <button
                                    onClick={() => setbtn(3)}
                                    className={`w-[170px] font-[700] rounded-[30px] text-[16px] h-[40px] border-[1px] border-blue-900 ${
                                        btntype == 3 ? "bg-gradient-to-r from-[#3B28CC] to-[#E83151]" : ""
                                    } `}
                                >
                                    closed
                                </button>
                            </div>
                        </div>
                        <div className="grid lg:grid-cols-3 h-auto  mt-[50px] gap-[10px] w-[96%] mx-auto">
                            <div className="h-[209px]  w-[100%] rounded-[25px] bg-gradient-to-r from-[#d8cd98] to-[#363549]">
                                <div className=" h-[206px] w-[99%] mt-[1px] ml-[1px] rounded-[25px] bg-gradient-to-r from-[#36344A] to-[#232139]">
                                    <div className="w-full  h-[50px] text-left pt-[30px] pl-[26px] font-[700] text-[20px]">
                                        Funded Projects
                                    </div>
                                    <div className="w-full lg:flex  h-auto mt-[16px] font-[500] text-[16px]  text-[#FFE346]">
                                        <div className="flex-1 text-left pl-[26px] pt-[16px]">
                                            {listproject.length}
                                        </div>
                                        <div className="flex-1 text-center pt-[30.29px] pl-[30px]">
                                            <img
                                                src="../img/hub.png"
                                                className="text-center  w-[60px] h-[60px] ml-[20px]"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="h-[209px]  w-[100%] rounded-[25px] bg-gradient-to-r from-[#7AFDD6] via-[#d0eee5] to-[#262531]">
                                <div className=" h-[206px] w-[99%] mt-[1px] ml-[1px] rounded-[25px] bg-gradient-to-r from-[#36344A] to-[#232139]">
                                    <div className="w-full  h-[50px] text-left pt-[30px] pl-[26px] font-[700] text-[20px]">
                                        Unique Participants
                                    </div>
                                    <div className="w-full lg:flex  h-auto mt-[16px] font-[500] text-[16px]  text-[#7AFDD6]">
                                        <div className="flex-1 text-left pl-[26px] pt-[16px]">
                                            {listuser.length}
                                        </div>
                                        <div className="flex-1 text-center pt-[30.29px] pl-[30px]">
                                            <img
                                                src="../img/user.png"
                                                className="text-center  w-[60px] h-[60px] ml-[20px]"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="h-[209px]  w-[100%] rounded-[25px] bg-gradient-to-r from-[#ee8395] via-[#be9da3] to-[#292935]">
                                <div className=" h-[206px] w-[99%] mt-[1px] ml-[1px] rounded-[25px] bg-gradient-to-r from-[#36344A] to-[#2d2c3d]">
                                    <div className="w-full  h-[50px] text-left pt-[30px] pl-[26px] font-[700] text-[20px]">
                                        Raised Capital
                                    </div>
                                    <div className="w-full lg:flex  h-auto mt-[16px] font-[500] text-[16px]  text-[#E83151]">
                                        <div className="flex-1 text-left pl-[26px] pt-[16px]">
                                            $49,729,044
                                        </div>
                                        <div className="flex-1 text-center pt-[30.29px] pl-[30px]">
                                            <img
                                                src="../img/acc-2.png"
                                                className="text-center  w-[60px] h-[60px] ml-[20px]"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-[95%] mx-auto md:h-[160px] xl:h-[120px] dark:bg-gradient-to-r from-blue-900 to-gray-800 bg-[#E5E1FF] mt-[50px] rounded-[25px] lg:flex grid-cols-2">
                            <div className="w-[99.5%] mx-auto md:h-[156px] xl:h-[118px] flex dark:bg-gradient-to-r from-[#2C2662] to-[#1E1B36] rounded-[25px] ">
                                <div className="md:h-[124px] w-[55%] xl:h-[104px]  pl-[39px] md:pt-[42px] xl:pt-[14px]">
                                    <div className="font-[700] text-[20px] text-[#E83151]">
                                        Funded Projects
                                    </div>
                                    <div className="font-[700] text-[20px] ">
                                        We bring new technologies to our community
                                    </div>
                                </div>
                                <div className="  xl:h-[104px] flex md:pl-[50px] xl:pl-[40%px] md:pt-[68px] xl:pt-[34px] w-[45%] ">
                                    <div className="font-bold text-[16px] text-[#3B28CC] flex w-[100%]">
                                        <input
                                            autoComplete="off"
                                            onChange={(e) => serch(e)}
                                            className="w-[89%] dark:bg-white border-none rounded-bl-[30px] rounded-tl-[30px] text-left pl-[10px] h-[51px] focus:border-[2px] focus:border-red-500 "
                                            placeholder="Search project name"
                                        />
                                        <button className="w-[84px]  bg-gradient-to-r from-[#3B28CC] to-[#E83151] pl-[22px] pt-[0px] rounded-tr-[30px] rounded-br-[30px]  h-[51px]  text-white">
                                            <img src="../img/search.png" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {typeshow == 1 ? (
                            <>
                                <div className="w-[95%] mx-auto dark:bg-gradient-to-r from-blue-900 to-gray-900 row-span-3 h-auto pt-[2px] mt-[50px] rounded-[25px]  ">
                                    <div className="dark:bg-gradient-to-r from-[#2C2662] to-[#1E1B36] w-[99.5%] h-auto rounded-[25px]  ml-[2px]">
                                        <div className="flex w-full h-auto col-span-8 text-left ">
                                            <table className="w-full pl-[20px]">
                                                <tr className="  p-[10px] ">
                                                    <th className="pl-[20px] pt-[20px]">Project name</th>

                                                    <th className=" pt-[20px]">Participants</th>
                                                    <th className=" pt-[20px]">Total raised</th>
                                                    <th className=" pt-[20px]">Current price</th>
                                                    {/* <th>ATH since IDO</th> */}
                                                    <th className=" pt-[20px]">Ended in</th>
                                                </tr>
                                                <tr>
                                                    <th className="pl-[20px] pt-[20px]"></th>

                                                    <th className=" pt-[20px]"></th>
                                                    <th className=" pt-[20px]"></th>
                                                    <th className=" pt-[20px]"></th>
                                                    {/* <th>ATH since IDO</th> */}
                                                    <th className=" pt-[20px]"></th>
                                                </tr>
                                                {listproject.map((input: any, index) => {
                                                    return (
                                                        <>
                                                            <Link
                                                                key={input["_id"]}
                                                                href={`/Detail?pid=${input["_id"]}`}
                                                            >
                                                                <tr className=" border-t-[3px] border-[#3B28CC] p-[20px] cursor-pointer">
                                                                    <td className="flex mt-[20px] pl-[10px]">
                                                                        <img
                                                                            src="../img/imglist.png"
                                                                            className="w-[30px] h-[30px] mt-[-7px] mr-[8px]"
                                                                            alt="imglist"
                                                                        />
                                                                        {input["tokenname"]}
                                                                    </td>

                                                                    <td>0</td>
                                                                    <td>${input["tokentotall"]}</td>
                                                                    <td>${input["pptoken"]}</td>
                                                                    {/* <td>
    <div className='w-[82px] h-[41px] text-center pt-[8px] bg-[#00DF9D] rounded-[10px] text-black'>
        +319 %
    </div>
</td> */}
                                                                    <td>{input["set"]}</td>
                                                                    {/* <td>
                                                                                <div className='w-[36px] mt-[2px] h-[36px] bg-blue-900 rounded-full'>

                                                                                </div>
                                                                            </td> */}
                                                                </tr>
                                                            </Link>
                                                            <br />
                                                        </>
                                                    );
                                                })}
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div
                                    id="box ferst"
                                    className="grid lg:grid-cols-3  gap-[26px]   w-full  mt-3 h-uto pl-[30px] pt-[20px]"
                                >
                                    {listproject.map((input, index) => {
                                        return (
                                            <>
                                                {
                                                    <BoxCard
                                                        pid={input._id}
                                                        enddate={input.rounds[0]?.enddate}
                                                        imgasli={input.imglist.find((p) => p.id == 2)?.name}
                                                        logo={input.imglist.find((p) => p.id == 1)?.name}
                                                        name={input.tokenname}
                                                        total={3000}
                                                    ></BoxCard>
                                                }
                                            </>
                                        );
                                    })}
                                </div>
                            </>
                        )}
                    </div>
                </div>

                <div className="w-full h-[2px] bg-[#7AFDD6] mt-[50px]"></div>
                <Footer></Footer>
            </div>
        </div>
    );
};
export default Listprojects;
