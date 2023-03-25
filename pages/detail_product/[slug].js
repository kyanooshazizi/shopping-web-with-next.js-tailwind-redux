import React, { useState,useEffect } from 'react';
import {useRouter} from "next/router";
import data from "../../data/product.json";
import Layout from '../component/Layout';
import { useSelector, useDispatch } from 'react-redux';
import { Add_cart, Delet_cart} from "../redux/shopping";
import Link from 'next/link';


const productDetails = (props) => {
    const dispatch = useDispatch()
    const path=useRouter();
    const id=path.query;
    const produc=data.find(item => item.slug===id.slug)
    if(!produc){
        return(
            <p>product not found</p>
            )
        }
        // چک می کنیم که آیا محصول در سبد هست یا نه
        const box = useSelector(state => state.shopping.shop)
        const flag=box.find(i => i.slug===produc.slug)
        const [count,setCount]=useState(Number(produc.count))
    useEffect(()=>{
        if(flag){
            setCount(produc.count-flag.qyt) 
       }
    },[box])
   
    function ProductHandler(){
        if(count>0){
            dispatch(Add_cart(produc));
        }
        path.push("/component/cart")
      }
    return (
        
        <Layout title={produc.title}>
           <div className='bg-gray-500 text-white w-4/5 mx-auto my-8 rounded-md md:flex md:font-bold'>
            <img src={produc.image} alt={produc.title} className="md:w-2/6 w-full rounded-l-md" />
            <div className='md:mt-20 mt-12 ml-5 md:w-1/6'>
             <p >{produc.title}</p>
             <p >{produc.description}</p>
             <span className='hidden md:block'>{produc.catgoury}</span>
            </div>
            <div className=' mt-10 md:w-1/2'>
                <div className='flex justify-around'>
                   <div>price:</div>
                   <div>{produc.price}</div>
                </div>
                <div className='flex justify-around p-6'>
                   <div>Statuse:</div>
                   <div>{count? <span>Available</span>:<span className='text-red-500'>not Available</span>}</div>
                </div>
                <div className='flex justify-around'>
                   <div>count Product Available
                    :</div>
                   <div className={count?"text-white":"text-red-500"}>{count}</div>
                </div>
                <div className='text-center'>
                <button className='w-1/2 bg-amber-500 text-white my-4 p-2 rounded' onClick={ProductHandler}>Add to cart</button>
                </div>
            </div>
           </div>
        </Layout>
    );
};

export default productDetails;