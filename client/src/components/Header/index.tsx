import React from 'react'

type Props = {
 name: string;
 buttonComponent?: any;
isSmallerText?: boolean;
}
const Header = ({name,buttonComponent,isSmallerText=false}:Props) => {
  return (
    <div className='mb-5 flex w-full items-center justify-between'>
<h1
  className={`${
    isSmallerText ? "text-lg" : "text-2xl"
  } font-semibold dark:text-[#E0E0E0]`}
>
  {name}
</h1>    
    {buttonComponent}</div>
  )

}

export default Header;
