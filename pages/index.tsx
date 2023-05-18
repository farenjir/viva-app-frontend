import React, { useState, useEffect } from "react";
import type { NextPage } from "next";
import Link from "next/link";
import Head from "next/head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff, faSun } from "@fortawesome/free-solid-svg-icons";

import { useTheme } from "next-themes";
import { IWeb3Context, useWeb3Context } from "../web3Provider/Web3ContextProvider";

import Footer from "../common/footer";
import BoxCard from "../commponent/boxcard";
import Boxone from "../commponent/boxone";
import KycService from "../Infrastructure/Services/kyc.service";
import UserService from "../Infrastructure/Services/user.service";
import proj from "../Domain/Dto/project";

const Home: NextPage = () => {
    const [listproject, setlistproject] = useState<proj[]>([]);
    const [listuser, setlistuser] = useState([]);
    // IWeb3Context
    const {
        connectWallet,
        disconnect,
        state: { address },
    } = useWeb3Context() as IWeb3Context;
    // theme
    const { theme, setTheme } = useTheme();
    const [statusedark, setdark] = useState(true);
    const andelset = () => {
        setTheme(theme === "dark" ? "light" : "dark");
        if (statusedark == true) {
            setdark(false);
        } else {
            setdark(true);
        }
    };
    // init page
    useEffect(() => {
        setTheme("dark");
        // KycService
        KycService.listproject().then((p) => {
            setlistproject(p.data);
            UserService.listuser().then((o) => {
                setlistuser(o.data);
            });
        });
    }, []);
    // return
    return (
        <div className="bg-amir dark:bg-[#16142E]">
            <div className="container box-border h-auto mx-auto ">
                <Head>
                    <title>Vivastarter</title>
                    <meta name="description" content="" />
                    <link rel="icon" href="/lo.png" />
                </Head>
                <div className="h-[70px]  pt-[15px] shadow-inner ">
                    <div id="header" className="w-full h-12 lg:grid lg:grid-cols-3 ">
                        <div className="w-full  h-[52px]  text-center md:text-left lg:text-left dark:text-white font-[900] text-[30px] lg:bg-transparent p-4">
                            <img src="./img/final/logo.png" className="w-auto h-[41px] mt-[-11px]" />
                        </div>
                        <div className="hidden h-12 lg:block"></div>
                        <div className="flex h-12  ight bg-redmx-auto lg:text-right md:text-right lg:bg-transparent pt-[1px] lg:place-items-end">
                            <div className="w-[40%]"></div>
                            <div className="w-[20%]   h-[48px] lg:flex mr-[27.57px] mt-[4px] pt-[4px]  text-right lg:bg-dark-300 gap-[8px] pl-[19px]"></div>
                            <div className="w-[40%] mr-4">
                                {!address ? (
                                    <div className="flex justify-center align-middle">
                                        <span className="pt-3 mx-3">
                                            <FontAwesomeIcon
                                                onClick={() => andelset()}
                                                icon={faSun}
                                                className="w-[25px] h-[25px] cursor-pointer"
                                            />
                                        </span>
                                        <button
                                            onClick={() => connectWallet()}
                                            className="h-[45px] bg-gradient-to-l to-[#3B28CC] from-[#E83151] font-[500] text-[18px]  border-none rounded-full w-[100%]  "
                                        >
                                            Connect Wallet
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex justify-center align-middle">
                                        <span className="pt-3 mx-3">
                                            <FontAwesomeIcon
                                                onClick={() => andelset()}
                                                icon={faSun}
                                                className="w-[25px] h-[25px] cursor-pointer"
                                            />
                                        </span>
                                        <button
                                            onClick={() => connectWallet()}
                                            className="h-[45px] font-[500] text-[18px] border border-red-500 rounded-[5px] w-[100%]"
                                        >
                                            {address.slice(0, 8)}
                                        </button>
                                        <span className="pt-3 mx-3">
                                            <FontAwesomeIcon
                                                onClick={() => disconnect()}
                                                icon={faPowerOff}
                                                className="w-[25px] h-[25px] cursor-pointer text-red-500"
                                            />
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div id="sliders" className=" p-2 lg:h-[20%]  w-[100%] ">
                    <div className="w-[60%] mx-auto h-auto  p-[10px]">
                        <img
                            src="./img/slideimag.svg"
                            className="w-[100%] lg:h-[350px] xl:h-[450px]  md:h-[550px]   h-[289px]"
                        />
                    </div>
                </div>
                <div className="h-[200px]  mt-[25px]">
                    <div id="text" className="w-full h-[120px] mt-9 text-center ">
                        <img src="./img/text-lunchpad.svg" className="lg:w-[66%] h-[65px] mx-auto w-[87%] " />
                    </div>
                    <div className="lg:h-[60px] mt-[10px] h-auto w-full lg:grid-cols-2 lg:flex md:flex  flex-wrap	">
                        <div className="flex-1 h-[50px] lg:pr-3 text-right lg:bg-contain">
                            <Link href="/listprojects">
                                <button className="lg:w-[460px] mt-1 h-[50px] w-full bg-addimg bg-contain  bg-no-repeat rounded-full  border-none "></button>
                            </Link>
                        </div>
                        <div className="flex-1 h-[50px] lg:pl-3 mt-1 text-left lg:bg-contain">
                            <button className="lg:w-[460px]  h-[50px] w-full bg-buybtn bg-contain  bg-no-repeat rounded-full  border-none "></button>
                        </div>
                    </div>
                </div>

                <div className="w-full   lg:items-center lg:h-auto  mx-auto lg:mt-[76px] lg:grid lg:grid-cols-4 gap-[26px] ">
                    <Boxone text="Total assets" number="456" flag={"$"}></Boxone>
                    <Boxone text="List Of Projects" number={listproject.length} flag={""}></Boxone>
                    <Boxone
                        text="
                 Value of assets"
                        number="4000056"
                        flag={"$"}
                    ></Boxone>
                    <Boxone text="List Of Users" number={listuser.length} flag={""}></Boxone>
                </div>
                {listproject.find((p) => p.isshow == true && p.isfuther == 1) ? (
                    <div className="row-span-full  h-[52px] mt-[50px]  font-[42px] mb-[30px] text-left">
                        <p className="md:text-[40px] xl:text-[25px] lg:text-[30px] font-[700] dark:text-white">
                            Featured project
                        </p>
                    </div>
                ) : (
                    ""
                )}
                <div id="box ferst" className="grid lg:grid-cols-3  gap-[26px]   w-full  mt-3 h-uto">
                    {listproject.map((input, index) => {
                        return (
                            <>
                                {input.isshow == true && input.isfuther == 1 ? (
                                    <BoxCard
                                        pid={input._id}
                                        enddate={input.rounds[0]?.enddate}
                                        imgasli={input.imglist.find((p) => p.id == 2)?.name}
                                        logo={input.imglist.find((p) => p.id == 1)?.name}
                                        name={input.tokenname}
                                        total={3000}
                                    ></BoxCard>
                                ) : (
                                    ""
                                )}
                            </>
                        );
                    })}
                </div>
                {/* <div id='box ferst' className='grid lg:grid-cols-4 xl:grid-cols-4 md:grid-cols-3 gap-[26px]   w-full  mt-[50px]  mb2  h-a-uto'>
          <InvBox></InvBox>
          <InvBox></InvBox>
          <InvBox></InvBox>
          <InvBox></InvBox>
          <InvBox></InvBox>
          <InvBox></InvBox>
        </div> */}
                {listproject.find((p) => p.isshow == true && p.status == 0) ? (
                    <div className="row-span-full   h-[52px] text-black font-[42px]  text-left mb-[30px] mt-[50px] flex">
                        <p className="md:text-[30px] xl:text-[25px] font-bold dark:text-white">Upcoming</p>
                        <div className=" w-full text-right  font-[700] md:text-[30px] xl:text-[25px]  cursor-pointer text-[#7AFDD6]">
                            see more
                        </div>
                    </div>
                ) : (
                    ""
                )}

                <div id="box ferst" className="gap-[26px] grid lg:grid-cols-3  w-full      h-a-uto">
                    {listproject.map((input, index) => {
                        return (
                            <>
                                {input.isshow == true && input.status == 0 ? (
                                    <BoxCard
                                        des={input.des?.slice(0, 15)}
                                        pid={input._id}
                                        enddate={input.rounds[0]?.enddate}
                                        imgasli={input.imglist.find((p) => p.id == 2)?.name}
                                        logo={input.imglist.find((p) => p.id == 1)?.name}
                                        name={input.tokenname}
                                        total={3000}
                                    ></BoxCard>
                                ) : (
                                    ""
                                )}
                            </>
                        );
                    })}
                </div>
                {listproject.find((p) => p.isshow == true && p.status == 1) ? (
                    <div className="row-span-full   h-[52px] text-black font-[42px]  text-left mb-[30px] mt-[50px] flex">
                        <p className="md:text-[30px] xl:text-[25px]  font-bold dark:text-white">open</p>
                        <div className=" w-full text-right  font-[700] md:text-[30px] xl:text-[25px]  cursor-pointer text-[#7AFDD6]">
                            see more
                        </div>
                    </div>
                ) : (
                    ""
                )}

                <div id="box ferst" className="gap-[26px] grid lg:grid-cols-3  w-full      h-a-uto">
                    {listproject.map((input, index) => {
                        return (
                            <>
                                {input.isshow == true && input.status == 1 ? (
                                    <BoxCard
                                        des={input.des?.slice(0, 15)}
                                        pid={input._id}
                                        enddate={input.rounds[0]?.enddate}
                                        imgasli={input.imglist.find((p) => p.id == 2)?.name}
                                        logo={input.imglist.find((p) => p.id == 1)?.name}
                                        name={input.tokenname}
                                        total={3000}
                                    ></BoxCard>
                                ) : (
                                    ""
                                )}
                            </>
                        );
                    })}
                </div>
                {listproject.find((p) => p.isshow == true && p.status == 2) ? (
                    <div className="row-span-full   h-[52px] text-black font-[42px]  text-left mb-[30px] mt-[50px] flex">
                        <p className="md:text-[30px] xl:text-[25px]  font-bold dark:text-white">closed</p>
                        <div className=" w-full text-right  font-[700] md:text-[30px] xl:text-[25px]  cursor-pointer text-[#7AFDD6]">
                            see more
                        </div>
                    </div>
                ) : (
                    ""
                )}

                <div id="box ferst" className="gap-[26px] grid lg:grid-cols-3  w-full      h-a-uto">
                    {listproject.map((input, index) => {
                        return (
                            <>
                                {input.isshow == true && input.status == 2 ? (
                                    <BoxCard
                                        des={input.des?.slice(0, 15)}
                                        pid={input._id}
                                        enddate={input.rounds[0]?.enddate}
                                        imgasli={input.imglist.find((p) => p.id == 2)?.name}
                                        logo={input.imglist.find((p) => p.id == 1)?.name}
                                        name={input.tokenname}
                                        total={3000}
                                    ></BoxCard>
                                ) : (
                                    ""
                                )}
                            </>
                        );
                    })}
                </div>
                <div className="w-full lg:h-[170px] md:h-[240px] xl:h-[170px] bg-[#E5E1FF] dark:bg-[#211F41] mt-[30px] rounded-[15px] lg:flex grid-cols-2">
                    <div className="h-[96x] ml-[41px] md:mt-[72px] xl:mt-[42px] ">
                        <div className="font-bold md:text-[30px] xl:text-[25px] dark:text-[#E83151] text-[#3B28CC]">
                            Never want to miss a sale?
                        </div>
                        <div className="font-[700] md:text-[20px] xl:text-[16px] ">
                            Sign up for our newsletter and get the latest news and updates.
                        </div>
                    </div>
                    <div className="md:h-[50px] flex-1 md:pl-[25%] xl:pl-[25%] md:pt-[102px] xl:pt-[60px]">
                        <div className="font-bold text-[20px] text-[#211F41] flex">
                            <input className="md:w-[400px] xl:w-[300px] border-none dark:bg-white rounded-bl-[30px] rounded-tl-[30px] text-left pl-[10px] h-[50px] focus:border-[2px] focus:border-red-500" />
                            <button className="md:w-[220px] xl:w-[130px] rounded-tr-[30px] rounded-br-[30px]  h-[50px] bg-gradient-to-r from-[#3B28CC] to-[#E83151] text-white">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
                <div className="w-full h-[2px] bg-[#7AFDD6] mt-[50px]"></div>
                <Footer></Footer>
            </div>
        </div>
    );
};

export default Home;
