import React,{useState} from 'react';

import choices from '../Icons/choices.png'
import menu from '../Icons/menu.png'
import cupons from '../Icons/cupon.png'
import suggest from '../Icons/sugerencia.png'
import data from '../Icons/data.png'
import bill from '../Icons/bill.png'
import bars from '../Icons/estadistica.png'

import './MenuBar.css'

const MenuBar = (props) =>{

    let [styleLi,setStyleLi] = useState("")
    return(
        <div id = "menu-container">
            <div id = "logo-container">
                <img src={'http://localhost:5000/Images/logo.png'}/>
            </div>
            <div id="options-container">
                <ul>
                    <li

                     onClick = {()=>{
                        props.option(1)
                     }}
                    ><img src = {choices}/>Pedidos 
                     <div
                      id = "order-indicator"
                     >{props.ordersActive}</div>
                    </li>
                    <li
                    onClick = {()=>{
                        props.option(2)
                     }}
                    ><img src = {menu}/>Menu</li>
                    <li
                    onClick = {()=>{
                        props.option(3)
                     }}
                    ><img src = {cupons}/>Cupones</li>
                    <li
                    onClick = {()=>{
                        props.option(4)
                     }}
                    ><img src = {suggest}/>Sugerencias
                    <div
                      id = "order-indicator"
                     >{props.ordersActive}</div>
                    </li>
                    <li
                    onClick = {()=>{
                        props.option(5)
                     }}
                    ><img src = {data}/>Datos</li>
                    <li
                    onClick = {()=>{
                        props.option(6)
                     }}
                    ><img src = {bill}/>Efectivo</li>
                    <li
                    onClick = {()=>{
                        props.option(7)
                     }}
                    ><img src = {bars}/>Estadisticas</li>
                </ul>
            </div>
        </div>
    )    
}

export default MenuBar;