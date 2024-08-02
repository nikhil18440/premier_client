import React from 'react'

export default async function Findcart(props) {

    
    if(props.cartStore.cart === null){
        
        const res = await axios.get(`${process.env.API_ENDPOINT}/cart/find/${props.userStore.user._id}`,{
            headers: {
            token: props.token
            }
        })
        if(res.data === null && props.userStore.user){
            
            const newCart = await axios.post(`${process.env.API_ENDPOINT}/cart/${props.userStore.user._id}`, {
                userId: props.userStore.user._id,
                products: [],
                total: 0
            }, {headers: {token:props.token}})
            
            dispatch(setCart(newCart.data))
            return newCart.data
        
        }else{
            if(res.data){
            
            dispatch(setCart(res.data))
            return res.data

            // res.data.products.map(item => {
            //   removefromDbCart({Cart: res.data, product: item})
            // })
            }
            
        }
    }else{
        console.log("the else loop is executing");
        return false
    }
    
    
}
