import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Data_base} from "../redux/shopping";
// dataset
import data from '../../data/product.json';

const Layout = ({title,children,flag,flaglogin}) => {
    const total_card = useSelector(state => state.shopping.shop);
    const dispach=useDispatch();
    const [total,setTotal]=useState(0);
    const [search,setSearch]=useState("")
  useEffect(()=>{
setTotal(total_card.reduce((acc,i) => acc+i.qyt,0))
  },[total_card])

//   S:filter search box

  function searchHandler(event){
      setSearch(event.target.value);
    //   console.log("e",event.target.value,"s",search)
      const dataset=data.filter(item => item.description.toLowerCase().includes(event.target.value.toLowerCase()))
      dispach(Data_base(dataset))
    }
//   E:filter search box
    return (
        <>  
        <Head>
        <link rel="icon" type="image/jpg" sizes="64x64" href="/image/icon/shop.svg"/>
            <title>{title}_page</title>
        </Head>
        <div>
            {/* start header */}
            <header>
               <nav className={"bg-gray-700 h-[10vh] flex justify-between items-center sm:font-bold font-normal"}>
                <Link href="/" className={`bg-gray-600 sm:p-3 p-1 rounded-lg mx-2 text-white`}>shopping</Link>
                    {/* search filter:s */}
                    {/* flag for show filtersearch in component */}
                {flag&&<div className='basis-1/4 relative hidden sm:block'>
                    <Image  className='absolute z-10 top-2 right-4' src="/image/icon/iconsearch.gif" alt="search" width={25} height={25}  />
                    <input type="text" placeholder='search...' className=' py-2 px-4 rounded-lg outline-0 w-full placeholder:pl-2 text-blue-700 text-md' onChange={searchHandler} value={search}/>
                     
                </div>}
                     {/* search filter:E */}
                <div>
                    <Link href="/component/login" className={`px-4 bg-gray-600 text-white sm:p-3 p-1 rounded-lg mx-2`}>login</Link>
                    {!flaglogin&&<Link href="/component/cart" className={`px-4 bg-gray-600 text-white sm:p-3 p-1 rounded-lg mx-2`}>cart <span className='bg-white text-black p-2 rounded-full text-xs align-top ml-1 hidden sm:inline'>{total}</span></Link>}
                </div>
               </nav>
            </header>
            {/* End header */}
            <main className='min-h-[80vh] md:container md:mx-auto'>
                {/* for responsive in max-with:640px */}
                {flag&&<div className='basis-1/4 relative sm:hidden mt-2 w-2/3 text-center mx-auto'>
                    <Image  className='absolute z-10 top-2 right-4' src="/image/icon/iconsearch.gif" alt="search" width={25} height={25}  />
                    <input type="text" placeholder='search...' className=' py-2 px-4 rounded-lg outline-0 w-full placeholder:pl-2 text-blue-700 text-lg border-solid border-2 border-indigo-600' onChange={searchHandler} />
                </div>}
                {/* for responsive in max-with:640px */}
                {children}
            </main>
            <footer className='text-center h-[10vh] bg-gray-700 font-bold flex justify-center items-center text-white'>design by Kyanoosh</footer>
        </div>
        </>
    );
};


export default Layout;