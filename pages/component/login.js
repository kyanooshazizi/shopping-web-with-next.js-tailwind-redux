import React, { useRef, useState } from 'react';
import Layout from './Layout';
import styles from "../../styles/login.module.css";
// validate form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";



const Login = (props) => {
    
    // s:password handler
    const passRegister=useRef()
    const [eye,setEye]=useState("visible_off");
    function passHandler(){
        if(eye==="visible_off"){
            const x=document.querySelectorAll(".pass2020");
            x[0].type="text"
            x[1].type="text";
            setEye("visible")
        }else{
            const x=document.querySelectorAll(".pass2020");
            x[0].type="password";
            x[1].type="password";
            setEye("visible_off")
        }
    }
    function passregisterHandler(){
        if(eye==="visible_off"){
            passRegister.current.type="text"
            setEye("visible")
        }else{
            passRegister.current.type="password"
            setEye("visible_off")
        } 
    }
    // E:password 
    // s:form validatin
    // flag for choose login or register form
    const [flag,setFlag]=useState(1);
    const registerHandler=(event)=>{
        setFlag(0)
    }
    const loginHandler=()=>{
      setFlag(1);
    console.log( watch("email"))
        }
        // validation 
    const schema = yup.object().shape({
         email: yup.string().email("ایمیل معتبر وارد کنید").required("ایمیل معتبر وارد کنید"),
         username: yup.string()
         .min(5,"نام کاربری حداقل باید 5 کاراکتر باشد")
         .max(10,"نام کاربری حداکثر باید 10 کاراکتر باشد").required(),
         password:yup.string().required("پسورد معتبر وارد کنید")
         .matches(
           /^.*(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,15}.*$/,
           "پسورد باید شامل حروف،اعداد و کاراکتر های ویژه باشد"
         ),
         confirmpassword:yup.string()
         .required("پسورد خود را تکرار کنید")
         .oneOf([yup.ref('password'), null], "پسورد ها یکسان نیستند"),
         check:yup.boolean()
            .oneOf([true], "لطفا قوانین ما رو هم قبول کنید😃")
    });
    const { register, handleSubmit, formState: { errors }, reset,watch } = useForm({
              resolver: yupResolver(schema),
        });
    // E:form validatin
    return (
        <Layout flaglogin={true} title={"login"}>
            {flag? <form className='shadow-xl bg-zinc-100 shadow-zinc-300 rounded-lg md:w-1/3 sm:w-2/3 w-11/12  mx-auto mt-8 ' onSubmit={handleSubmit(loginHandler)}>
                <h2 className='m-3 bg-zinc-200 md:w-1/2 w-11/12 rounded-md text-center mx-auto py-3 shadow-xl shadow-slate-300 text-gray-500 font-bold'>Form Login</h2>
                {/* email */}
                <input type="text" name="email" placeholder='Email...' className='w-11/12 p-4 my-5 mx-4 rounded-lg shadow-2xl shadow-slate-400 bg-zinc-100 outline-0' {...register("email")} /><br/>
                <p className='text-red-600 text-center text-sm font-bold'>{errors?.email?.message}</p>
                {/* username */}
                <input type="text" name="username" placeholder='userName...' className='w-11/12 p-4 my-5 mx-4 rounded-lg shadow-2xl shadow-slate-400 bg-zinc-100 outline-0' {...register("username")}/><br/>
                <p className='text-red-600 text-center text-sm font-bold'>{errors?.username?.message}</p>
                {/* s:password */}
                <div className='relative'>
                    <input  type="password" name="pass"  placeholder='Password...' className='w-11/12 p-4 my-5 mx-4  rounded-lg shadow-2xl shadow-slate-400 bg-zinc-100 outline-0 pass2020'  {...register("password")}/><br/>
                    <p className='text-red-600 text-center text-sm font-bold'>{errors.password?.message}</p>
                {/* svg */}
                <img src={`/image/icon/${eye}.svg`} onClick={passHandler} className="absolute top-9 right-6 w-6 cursor-pointer"/>
                </div>
                    <input type="password"   placeholder='Repeat password...' className='w-11/12 p-4 my-3 mx-4  rounded-lg shadow-2xl shadow-slate-400 bg-zinc-100 outline-0 pass2020' {...register("confirmpassword")}/>
                    <p className='text-red-600 text-center text-sm font-bold my-3'>{errors.confirmpassword?.message}</p>
                 {/* E:password */}
                 {/* s:checkbox */}
                <div className='text-right mr-5 relative'>
                    <label htmlFor='check1' className='mr-9 text-gray-700'>تمام قوانین سایت را می پذیرم</label>
                    <input type="checkbox" name="check" id={"check1"} className={`z-10 ${styles.check} absolute right-0 opacity-0 top-2 right-1 cursor-pointer` } {...register("check")}/>
                    {/* <p className='text-red-600 text-center text-sm font-bold my-2'>{errors.check?.message}</p> */}
                    <div className={`w-5 h-5 border-2 border-gray-700 border-solid rounded-full absolute right-0 top-1 ${styles.bg} cursor-pointer`}></div>
                </div>
                {/* E:checkbox */}
                <div className='flex items-center justify-between '>
                    <button className='m-4 bg-zinc-600 text-white px-5 py-2 rounded-md font-bold' onClick={loginHandler}>login</button>
                    <button className='m-4 bg-zinc-600 text-white px-5 py-2 rounded-md font-bold' onClick={registerHandler}>Register</button>
                </div>
                {/* form register */}
              </form>:
              <form className='shadow-xl bg-zinc-100 shadow-zinc-300 rounded-lg md:w-1/3 sm:w-2/3 w-11/12 mx-auto mt-8 ' onSubmit={handleSubmit(registerHandler)}>
              <h2 className='m-3 bg-zinc-200 w-1/2 rounded-md text-center mx-auto py-3 shadow-xl shadow-slate-300 text-gray-500 font-bold'>Form Register</h2>
                <input type="email" name="email" placeholder='Email...' className='w-11/12 p-4 my-5 mx-4 rounded-lg shadow-2xl shadow-slate-400 bg-zinc-100 outline-0' /><br/>
                {/* s:password */}
               <div className='relative'>
                 <input ref={passRegister} type="password" name="pass" id="pass" placeholder='Password...' className='w-11/12 p-4 my-5 mx-4  rounded-lg shadow-2xl shadow-slate-400 bg-zinc-100 outline-0' /><br/>
                  {/* svg */}
                <img src={`/image/icon/${eye}.svg`} onClick={passregisterHandler} className="absolute top-9 right-6 w-6"/>
               </div>
                {/* E:password */}
                <div className='flex items-center justify-between '>
                    <button className='m-4 bg-zinc-600 text-white px-5 py-2 rounded-md font-bold' onClick={loginHandler}>login</button>
                    <button className='m-4 bg-zinc-600 text-white px-5 py-2 rounded-md font-bold' onClick={registerHandler}>Register</button>
                </div>
              </form>}
        
        </Layout>
    );
};

export default Login;