import { createSlice } from '@reduxjs/toolkit'
// ckooci
import Cookies from 'js-cookie';
import data from '../../data/product.json';

export const shopping_cart = createSlice({
  name: 'shopping',
  initialState: {
    shop:Cookies.get('shop')?JSON.parse(Cookies.get('shop')):[],
    dataset:[...data]
  },
  reducers: {
    Add_cart: (state,action) => {
      const produc=state.shop.find(i=>i.slug===action.payload.slug)
      if(produc){
        state.shop.forEach(i=> {
          if(i.slug===produc.slug){
            i.qyt++;
          }
        })
      }
      else{
        const data={...action.payload};
        data.qyt=1;
        state.shop.push(data)
      }
      Cookies.set('shop',JSON.stringify(state.shop))
    },
    Delet_cart: (state,action) => {
      if(action.payload.qyt>1){
        state.shop.forEach(fun)
        function fun(i){
           if(i.slug===action.payload.slug){
             i.qyt--; 
           }
        }
      }
      else{
        const data=state.shop.filter(i=>i.slug!==action.payload.slug)
        state.shop=[...data]
    }
    Cookies.set('shop',JSON.stringify(state.shop)) 
  },

  Data_base: (state,action) => {
       state.dataset=action.payload;
  }
}})

export const { Add_cart, Delet_cart ,Data_base} = shopping_cart.actions

export default shopping_cart.reducer
