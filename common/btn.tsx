

export default function Btn(props:any) {
  return (
    
      <button  className={'w-[156px]  h-[41px] rounded-full md:mt-[39px] xl:mt-[19px] text-[16px]  font-[500] bg-gradient-to-r  from-[#3B28CC] to-[#E83151] bg-no-repeat '} onClick={event =>props.handleClick()}>{props.text}</button>
    
  );
}