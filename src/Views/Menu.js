import React,{useState,useEffect} from 'react';
import './Menu.css';

import PopupAddFood from '../Components/PopupAddFood';

import close from '../Icons/close.png'
import edit from '../Icons/editar.png'
import visibility from '../Icons/visibilidad.png'

import add from '../Icons/plus.png'
import APIData from '../Components/APICredentials';

const CardFood = (props) =>{

    const [opacityEnable, setOpacityEnable] = useState()
    
    var formatter = new Intl.NumberFormat('en-US',{
        style:'currency',
        currency: 'USD'
    })
    
    useEffect(()=>{
        console.log(props.active)
        if(props.active){
            setOpacityEnable()
        }else{
           setOpacityEnable(<div id = "opacity-card"></div>) 
        }
    },[])


    const changeVisible = (_id)=>{
        //connect to api

        fetch(APIData.URI+'foods/toogleVisibility',{
            method:'put',
            body:JSON.stringify({_id:_id}),
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(res => res.json())
        .then((res)=>{
            console.log(res)
            if(res.status){
                setOpacityEnable()   
            }else{
             
             setOpacityEnable(<div id = "opacity-card"></div>)
            }
        })
        .catch(err=>{
            if(err) throw err
        })
    }

    const deleteElement = (_id)=>{
        //connect to api

        fetch(APIData.URI+'foods/deleteFood',{
            method:'put',
            body:JSON.stringify({_id:_id}),
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(res => res.json())
        .then((res)=>{
            if(res.status === 'ok'){
                props.refresh()
            }
        })
        .catch(err=>{
            if(err) throw err
        })
    }

    
    return(
        <div
        id = "container-card"
        >
            {opacityEnable}
            <div id = "buttons-container">
                <div id = "button-card" style = {{background:'#4AA4F6'}}
                 onClick = {()=>{
                     //conect to api for change status visibility
                     changeVisible(props._id)
                 }}
                >
                    <img src = {visibility}/>
                </div>
                <div id = "button-card" style = {{background:'#0DC23C'}}
                 onClick = {()=>{
                    //conect to api for edit food
                    props.openPop()
                }}
                >
                    <img src = {edit}/>
                </div>
                <div id = "button-card" style = {{background:'#C21B0D'}}
                onClick = {()=>{
                    //conect to api for change status
                    deleteElement(props._id)
                    
                }}
                >
                    <img src={close}/>
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

const Menu = ()=>{

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
            {viewPopupAdd}
            <h1>Menu</h1>
            <div id = "add-button"
             onClick = {()=>{
                 console.log('open pop up add')
                 setViewPopupAdd(<PopupAddFood
                  back = {()=>{
                      setViewPopupAdd()
                      getFoodsApi()
                  }}
                 />)
             }}
            >
                <img src={add}/>
                
            </div>

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
                          openPop = {()=>{
                            setViewPopupAdd(<PopupAddFood
                                back = {()=>{
                                    setViewPopupAdd()
                                    getFoodsApi()
                                }}

                                title = {value.title}
                                desc = {value.desc}
                                image = {value.image}
                                price = {value.price}
                                _id = {value._id}
                                code = {value.code}
                                type = {value.type}
                               />)
                          }}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default Menu