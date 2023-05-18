export default function Modal(props: any) {
    
    return (
        <div  style={{display:props.ch ==1?'none':'block'}} className='w-[960px]  absolute h-[891px] bg-[#211F41] mt-[100px] ml-[276px] rounded-[20px] shadow-3xl border-[2px] border-[#B8B8B8]'>
            <div className="w-[588px] h-auto  mt-[74px] ml-[160px]">
                <p className="mt-[74px] font-[700] text-[30px]">Welcome to Vivastarter</p>
                <input className="w-[588px] h-[80px] rounded-[10px] border-[1px] bg-transparent border-white mt-[41px] text-[20px] font-[700] pl-[20px] " placeholder="User*" />
                <input className="w-[588px] h-[80px] rounded-[10px] border-[1px] bg-transparent border-white mt-[30px] text-[20px] font-[700] pl-[20px]" placeholder="password*" />
                <input className="w-[588px] h-[80px] rounded-[10px] border-[1px] bg-transparent border-white mt-[30px] text-[20px] font-[700] pl-[20px]" placeholder="Repeat password*"/>
                <input className="w-[588px] h-[80px] rounded-[10px] border-[1px] bg-transparent border-white mt-[30px] text-[20px] font-[700] pl-[20px]" placeholder="wallet address*"/>
                <input className="w-[588px] h-[80px] rounded-[10px] border-[1px] bg-transparent border-white mt-[30px] text-[20px] font-[700] pl-[20px]" placeholder="Email*"/>
            </div>
            <div className="w-[588px] h-[26px] text-[20px] font-[700]  mt-[13px] ml-[160px] text-right">
            Forget  password
            </div>
            <div className="w-[588px] h-[26px]  mt-[50px] ml-[160px] text-center ">
              <button  className="w-[459px] h-[50px] bg-gradient-to-r from-[#3B28CC] to-[#E83151] text-[20px] rounded-[30px]">
              Register
              </button>
            </div>
        </div>
    );
}