import React from 'react';
import './Welcome.css'

const Welcome = (props)=>{
    return(
        <div id = "container-welcome">
        {/* Logo smart restaurant */}

        <h1>Smart Restaurant</h1>
        <p>Gestiona tu restaurante con smart restaurant</p>
        <div id = "Button"
         onClick = {()=>{
           props.open()
         }}
        >
          <p>Bienvenido</p>
        </div>
      </div>
    )
}

export default Welcome