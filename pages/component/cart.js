import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Add_cart, Delet_cart} from "../redux/shopping";
import Layout from './Layout';
import Image from "next/image";
import { useRouter } from 'next/router';
import dynamic from "next/dynamic";
import Cookies from 'js-cookie';
// toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Shopping_cart = (props) => {
  const rout=useRouter();
    const box = useSelector(state => state.shopping.shop)
  const dispatch = useDispatch()
   // for handle toast
   const notify=()=>{
    toast.info('بیشتر از این تعداد محصول را در انبار نداریم', {
      position: "top-center",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      })};
  const addHandler=(item)=>{
    if(item.qyt<item.count){

      dispatch(Add_cart(item))
    }else{
      notify();
    }
  }
  const deletHandler=(item)=>{
    dispatch(Delet_cart(item))
  }
  function checkoutHandler(){
    
   rout.push("login?redirect=/component/cart")
  }
  function clearHandler(){
    Cookies.set('shop',"")  
    rout.reload(window.location.pathname)
  }
    return (
        <Layout title={"shopping_cart"}>
<div className={`mt-8 mx-auto container md:flex gap-8`}>
            <div className='basis-1/4 md:mx-0 mx-2'>
              <div className='md:font-bold font-normal md:w-80 w-4/5 md:h-36 rounded-xl md:p-8 py-2 bg-blue-500 shadow-lg shadow-blue-500/50'>
                 <span className='p-4'>Finall Total Price: <span className='bg-stone-800 text-white md:p-3 p-2 rounded-full'>{box.reduce((sum,item) => sum+(item.price.split("$")[0]*item.qyt) ,0)} $</span> </span>
              </div>
              <div className='md:text-right text-center'>
                <button   onClick={checkoutHandler} className='md:mt-12 mt-6 mr-12 hover:bg-blue-600 bg-blue-500 py-2 px-4 rounded-xl md:font-bold font-normal mb-2 text-white'>Checkout</button>
              </div>
              <div className='md:text-right text-center'>
                <button   onClick={clearHandler} className='md:mt-12 mr-12 hover:bg-red-700 bg-red-600 py-2 px-4 rounded-xl md:font-bold font-normal mb-12 text-white'>Clear Cart</button>
              </div>
            </div>
           <div className='basis-3/4 md:mx-0 mx-2'>
           {box.length>0?box.map(item => 
                <div className="flex justify-between items-center md:font-bold font-normal mb-4 shadow-xl rounded-xl ">
                 <div className='flex items-center'>
                 <img src={item.image} className="md:w-48 w-20 rounded-tl-xl rounded-bl-xl"/>
                 <span className='pl-6 text-blue-600 lg:block hidden'>{item.description}</span>
                 </div>
                 <span className='lg:block hidden'>total price: {item.price.split("$")[0]*item.qyt}$</span>
                 <span className='pr-4'> count: {item.qyt}</span>
                 <div>
                    <button onClick={addHandler.bind(null,item)}>
                    <img src="/image/icon/plus.svg" className="md:mx-8 mx-2 w-6 md:w-8" />
                    </button>
                    <button onClick={deletHandler.bind(null,item)}>
                    {item.qyt>1?<img className="text-red-600 w-6 md:w-8" src="/image/icon/minus.svg"/>:<img src="/image/icon/delet.svg"  className='w-6 md:w-8'/>}
                    </button>
                 </div>
                </div>
            ): <p className='text-center font-bold bg-zinc-500 py-2 px-4 rounded-xl text-white'>Your shopping cart is empty 🙂🙂</p>}
           </div>
            
</div>
<ToastContainer />
        </Layout>
    );
};

export default dynamic(() => Promise.resolve(Shopping_cart),{ssr:false});