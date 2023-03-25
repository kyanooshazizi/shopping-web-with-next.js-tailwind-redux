import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Add_cart, Delet_cart} from "../redux/shopping";
// toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Product = ({item}) => {
  const box = useSelector(state => state.shopping.shop)
  const dispatch = useDispatch()
  useEffect(()=>{
    console.log(box)
  },[box])
  const [count,setCount]=useState(Number(item.count))
  // for handle toast
  const notify=()=>{
    toast.info('محصول در انبار موجود نیست!🙂', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
  }
  function ProductHandler(){
    if(count){
        dispatch(Add_cart(item));
        setCount(x => x-1);
    }else{
      notify();
    }
  }
    return (
        <>
        <div className='bg-blue-200 mx-3 my-4 rounded-xl'>
            <Link href={`/detail_product/${item.slug}`}  className='text-center '>
                <p className='w-1/4 bg-gray-600 text-white rounded-tl-xl'>{item.description.split(" ")[1]}</p>
            </Link>
            <Link href={`/detail_product/${item.slug}`}>
              <img src={item.image} className='w-full' />
            </Link>
            <div className='flex items-center justify-between p-2'>
            <p className='rounded-full bg-gray-600 text-white p-3'>{item.price}</p>
            <button className='mx-3 rounded bg-gray-600 text-white p-3' onClick={ProductHandler}>Add to cart</button>
            </div>
        <ToastContainer />
        </div>
        </>
    );
};

export default Product;