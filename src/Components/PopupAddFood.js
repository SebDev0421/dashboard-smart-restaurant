import React,{useState,useEffect} from 'react';
import APIData from './APICredentials';
import './PopupAddFood.css'
import axios from 'axios'

import back from '../Icons/back.png'

const  PopupAddFood =(props) => {
    const [name, setName] = useState("")
    const [title, setTitle] = useState("")
    const [description,setDescription] = useState("")
    const [code, setCode] = useState("")
    const [price, setPrice] = useState("")
    const [type, setType] = useState("Comida")
    const [selectFile,setSelectFile] = useState(null)

    function fileSelectedHandler(event){
        const value  = event.target.files[0]
        setName(value.name)
        setSelectFile(value)
    }

    async function upload(){

        if(title === "" || description === "" || code === "" || price === "" || name === ""){
            alert('Por favor llenar todos los campos')
            return true
        }

        if(props._id === undefined){

        

        const data = new FormData();
        data.append("name","pizza")
        data.append("file",selectFile)
        await axios.post(APIData.URI+'foods/uploadimages',data).then(res => console.log(res)).catch(err => console.log(err));
        //add new product to db
        await fetch(APIData.URI+'Foods/addFood',{
            method:'PUT',
            body:JSON.stringify({title:title,price:price,desc:description,type:type,code:code,image:name,active:true}),
            headers:{
                'Content-Type':'application/json'
            }
        }).then(res=> res.json())
          .then((res)=>{
              console.log(res)
              if(res.status === "ok"){
                  props.back()
              }
          })
          .catch(err=>{
              if(err) throw err
          })
          }else{
            if(selectFile !== null){
                const data = new FormData();
                data.append("name","pizza")
                data.append("file",selectFile)
                await axios.post(APIData.URI+'foods/uploadimages',data).then(res => console.log(res)).catch(err => console.log(err));
            }
            
            //add new product to db
            await fetch(APIData.URI+'Foods/editFood',{
                method:'PUT',
                body:JSON.stringify({_id:props._id,title:title,price:price,desc:description,type:type,code:code,image:name}),
                headers:{
                    'Content-Type':'application/json'
                }
            }).then(res=> res.json())
              .then((res)=>{
                  console.log(res)
                  if(res.status === "ok"){
                      props.back()
                  }
              })
              .catch(err=>{
                  if(err) throw err
              })
          }
        
    }

    useEffect(()=>{
        if(props._id !== undefined){
            console.log(props._id)
            setTitle(props.title)
            setDescription(props.desc)
            setCode(props.code)
            setType(props.type)
            setName(props.image)
            setPrice(props.price)
        }
    },[])

        return(
        <div id = "container-popupadd">
            <div id = "popup">
                <div id = "button-back">
                    <img src={back}
                        onClick={()=>{
                            props.back()
                        }}
                    />
                </div>

                <h3>Nuevo producto</h3>
                
                <label>Nombre del producto</label>
                <input type="text" id= "field-text"
                 onChange = {(event)=>{
                     const { value } = event.target
                     setTitle(value)
                 }}
                 value={title}
                />
                
                <label>Descripcion del producto</label>
                <input type="text" id= "field-text"
                 onChange = {(event)=>{
                    const { value } = event.target
                    setDescription(value)
                }}
                value={description}
                />

                <label>Codigo del producto</label>
                <input type="text" id= "field-text"
                onChange = {(event)=>{
                    const { value } = event.target
                    setCode(value)
                }}
                value={code}
                />

                <label>Categoria</label>

                <select name="Categoria"
                value={type}
                onChange={(event)=>{setType(event.target.value)}}>
                    <option>Comida</option>
                    <option>Bebidas</option>
                    <option>Ensaladas</option>
                    <option>Helados</option>
                    <option>Combos</option>
                </select>
                <label>Precio del producto</label>
                <input type="text" id= "field-text"
                onChange = {(event)=>{
                    let { value } = event.target
                    if(/^\d+$/.test(value.substr(value.length-1))){
                        setPrice(value)    
                    }
                }}
                value = {price}
                />

                <input id="file" name="file" type="file" accept=".jpg,.png,.jpeg" onChange = {fileSelectedHandler}/>
                <label id="button-search" for = "file">Selecciona una foto</label>
                <p>{name}</p>
                <div
                id = "button-upload"
                 onClick={upload}
                >
                    <p>Crear producto</p>
                </div>
            </div>
        </div>
        )
}

export default PopupAddFood;