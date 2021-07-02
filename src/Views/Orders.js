import React ,{useEffect,useState}from 'react';
import './Orders.css'
import APIData from '../Components/APICredentials';

const CardOrder = (props)=>{
    return(
        <div id = "container-card">
            <h3>Pedido: {props.serial}</h3>
            {props.order.map((value)=>{
                return(
                    <p>{value.title}</p>
                )
            })}
            
            <div id = "button-complete"
              onClick = {()=>{
                  props.completeOrder()
              }}            
            >
                <p>Entregar pedido</p>
            </div>
        </div>
    )
}


const Orders = ()=>{

    const [pendingOrder,setPedingOrder] = useState([])

    useEffect(()=>{
        fetch(APIData.URI+'Orders',{
            method:'PUT',
            body:JSON.stringify({test:'ok'}),
            headers:{
                'Content-Type':'application/json'
            }
        }).then((res)=>res.json())
        .then((res)=>{
            setPedingOrder(res)
        })
        .catch((e)=>{
            if(e) throw e
        })
    },[])

    const completeFood = (id)=>{
        fetch(APIData.URI+'Orders/completeOrder',{
            method:'PUT',
            body:JSON.stringify({_id:id}),
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(res => res.json())
        .then((res)=>{
            setPedingOrder(res)
        })
        .catch(err => {
            if(err) throw err
        })
    }
    
    return(
        <div id = "container-subMain">
            <h1>Pedidos</h1>
            {
                pendingOrder.map((value)=>{
                    return(
                        <CardOrder
                         serial = {value.serial}
                         order = {value.order}
                         completeOrder = {()=>{
                             completeFood(value._id)
                         }}
                        />
                    )
                })
            }
        </div>
    )
}

export default Orders