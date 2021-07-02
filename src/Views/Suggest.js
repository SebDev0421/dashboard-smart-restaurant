import React,{useState,useEffect} from 'react';
import './Menu.css';


import check from '../Icons/check.png'
import close from '../Icons/close.png'

import APIData from '../Components/APICredentials';

const CardFood = (props) =>{

    const [opacityEnable, setOpacityEnable] = useState()
    const [imageButton, setImageButton] = useState()
    const [colorButton, setColorButton] = useState("")
    
    var formatter = new Intl.NumberFormat('en-US',{
        style:'currency',
        currency: 'USD'
    })

    const addToSuggest = (_id) =>{
        fetch(APIData.URI+'foods/addSuggest',{
            method:'put',
            body:JSON.stringify({_id:_id}),
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(res => res.json())
        .then((res)=>{
            console.log(res.status)
            if(res.status){
                //enable X image
                setImageButton(<img src = {close}/>)
                setColorButton("#C21B0D")
            }else{
                setImageButton(<img src = {check}/>)
                setColorButton("#4AF64D")
            }
        })
    }
    
    useEffect(()=>{
        if(props.active){
            setOpacityEnable()
        }else{
           setOpacityEnable(<div id = "opacity-card"></div>) 
        }

        if(props.suggest){
            setImageButton(<img src = {close}/>)
            setColorButton("#C21B0D")
        }else{
            setImageButton(<img src = {check}/>)
            setColorButton("#4AF64D")
        }

    },[])
    
    return(
        <div
        id = "container-card"
        >
            {opacityEnable}
            <div id = "buttons-container">
                <div id = "button-card" style = {{background:colorButton}}
                 onClick = {()=>{
                     // add to sugest collection
                     addToSuggest(props._id)
                 }}
                >
                    {imageButton}
                </div>
            </div>
            <img src={`http://localhost:5000/images/${props.image}`}/>
            <h3>{props.title}</h3>
            <p>{props._id}</p>
            <p>{props.code}</p>
            <p>{props.type}</p>
            <p>{props.desc}</p>
            <p>{formatter.format(props.price)}</p>
        </div>
    )
}

const Suggest = ()=>{

    const [viewPopupAdd, setViewPopupAdd] = useState()
    const [menuData, setMenuData] = useState([])

    const getFoodsApi = () =>{
        fetch(APIData.URI+'foods/',{method:'PUT'}).then(res=>res.json())
        .then((res)=>{
            console.log(res)
            setMenuData(res)
        })
        .catch(err=>{
            if(err) throw err
        })
    }
    
    useEffect(()=>{
        getFoodsApi()
    },[])

    return(
        <div id = "container-subMain">
            <h1>Sugerir</h1>
            
            <div id = "container-food">
                {menuData.map((value)=>{
                    return(
                        <CardFood
                          title = {value.title}
                          desc = {value.desc}
                          image = {value.image}
                          price = {value.price}
                          _id = {value._id}
                          code = {value.code}
                          type = {value.type}
                          active = {value.active}
                          refresh = {()=>{
                            getFoodsApi()
                          }}
                          suggest = {value.suggest}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default Suggest