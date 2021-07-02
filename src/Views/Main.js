import React , {useState}from 'react'

import Orders from './Orders';
import Menu from './Menu';
import Cupons from './Cupons';
import Suggest from './Suggest'
import Cash from './Cash';

import MenuBar from '../Components/MenuBar'

import './Main.css'

const Main = ()=>{

    const [viewActive, setViewActive] = useState()
    return(
        <div id = "container-main">
            <MenuBar
             option = {(option)=>{
                 switch(option){
                     case 1:
                         setViewActive(<Orders/>)
                         break;
                     case 2:
                        setViewActive(<Menu/>)
                            break;
                     case 3:
                        setViewActive(<Cupons/>)
                         break;
                     case 4 :
                        setViewActive(<Suggest/>)
                         break;
                     case 5 :
                        setViewActive(<Orders/>)
                         break;
                     case 6 :
                        setViewActive(<Cash/>)
                        break;
                     case 7 :
                        setViewActive(<Orders/>)
                        break;

                 }
             }}

             ordersActive = {2}
            />
            {viewActive}
        </div>
    )
}

export default Main