import React, {useState} from 'react'
import APIData from '../Components/APICredentials'

import './Cash.css'



const CardContainer = (props)=>{

    var formatter = new Intl.NumberFormat('en-US',{
        style:'currency',
        currency: 'USD'
    })

    const removeCash = (code)=>{
        fetch(APIData.URI+'Orders/completeCash',{
            method:'PUT',
            body:JSON.stringify({code:code}),
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(res => res.json())
        .then((res)=>{
            if(res.status === 'ok'){
                alert('la orden se esta cocinando')
                props.eraseOrder()
            }
        })
        .catch(err => {
            if(err) throw err
        })
    }

    const addOrderToCook = (order,price,code)=>{
        fetch(APIData.URI+'Orders/addOrder',{
            method:'PUT',
            body:JSON.stringify({order:order,price:price}),
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(res => res.json())
        .then((res)=>{
            if(res.serial !== undefined){
                removeCash(code)
            }
        })
        .catch(err => {
            if(err) throw err
        })
    }

    const [moneyChange, setMoneyChange] = useState(NaN)

    return(
        <div id= "card-Cash">
            <h2>Orden a pagar</h2>
            {props.order.map((value)=>{
                return(
                    <div>
                    <p>{value.title}</p>
                    <p>{value.price}</p>
                    </div>
                )
            })}
            <div>
                <input
                 id = "moneyInput"
                 placeholder = "recibir"
                 onChange = {(data)=>{
                     const {value} = data.target
                     
                     const change = parseInt(value)-props.priceTotal
                     setMoneyChange(change)
                 }}
                />
                <h3>Total a pagar{formatter.format(props.priceTotal)}</h3>
                <h3>Cambio {formatter.format(moneyChange)}</h3>
                <div id = "btn-paymentCash"
             onClick = {()=>{
                 //Conect to api to search code
                 console.log(moneyChange)

                 if(moneyChange === NaN){

                    alert("Falta dinero")
                     return true
                 }

                 if(moneyChange < 0){
                     alert("Falta dinero")
                     return true
                 }else{
                     //pass cash to order List
                     addOrderToCook(props.order,props.priceTotal,props.code)
                 }
             }}
            >
                <p>Pagar orden</p>
            </div>
            </div>
        </div>
    )
}

const Cash = ()=>{

    const [code, setCode] = useState("")
    const [viewCard, setViewCard] = useState()

    const getCashOrder = (code)=>{
        fetch(APIData.URI+'Orders/searchCashOrder',{
            method:'PUT',
            body:JSON.stringify({code:code}),
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then((res)=>{
            console.log(res)
            if(res === null){
                alert('Lo lamentamos la orden no extiste')
            }else{
                setViewCard(<CardContainer
                   order = {res.order}
                   priceTotal = {res.price}
                   code = {code}
                   eraseOrder = {()=>{
                       setViewCard()
                   }}
                />)
            }
        })
        .catch(err=>{
            if(err) throw err
        })
    }

    return(
        <div id = "container-subMain">
            <h1>Ordenes en efectivo</h1>
            <input placeholder="Codigo cliente"
             onChange = {(data)=>{
                 const {value} = data.target
                 setCode(value)
             }}
            />
            <div id = "btn-searchCash"
             onClick = {()=>{
                 //Conect to api to search code 
                 getCashOrder(code)
             }}
            >
                <p>Buscar orden</p>
            </div>
            {viewCard}

        </div>
    )
}

export default Cash;