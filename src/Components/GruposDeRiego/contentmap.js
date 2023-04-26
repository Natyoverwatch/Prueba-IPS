import React from 'react'
import "./style.scss"
import { NavbarAdmin } from './../NavbarAdmin';
import { useState } from 'react';
import {  Row, Col, } from 'antd';
import mamografia from '../../Images/mamografia.png';
import sifilis from '../../Images/sifilis.png';
import citologia from '../../Images/papilla.png';
import desnutricion from '../../Images/desnutricion.png';
import eda from '../../Images/diarrea.png';
import ira from '../../Images/neumonia.png';
import mme from '../../Images/muerte.png';
import add from '../../Images/agregar-usuario.png';
import { useNavigate } from 'react-router-dom';

const data = [
    {
        id:0,
        icon: mamografia,
        Informacion:"Mamografía",
        urlnavigate:"/",
    },
    {
        id:1,
        icon:sifilis, 
        Informacion:"Sifilis gestacional y congenita",
        urlnavigate:"/",
        
    },
    {
        id:2,
        icon:citologia, 
        Informacion:"Citologia y colposcopia",
        urlnavigate:"/",
        
    },
    {
        id:3,
        icon:desnutricion, 
        Informacion:"Desnutricion",
        urlnavigate:"/",
    },
    {
        id:4,
        icon:eda, 
        Informacion:"EDA",
        urlnavigate:"/",
    },
    {
        id:5,
        icon:ira, 
        Informacion:"IRA",
        urlnavigate:"/",
    },
    {
        id:6,
        icon:mme, 
        Informacion:"MME",
        urlnavigate:"/",
    },
    {
        id:7,
        icon:add, 
        Informacion:"Agregar",
        urlnavigate:"/",
    }
        ];


export default function mapeogr(props){

    const navigate = useNavigate();
    const [Count, setCount]=useState(0);
    const InfObtenida =data.find( Contador => Contador.id === Count );

    return(
        <div>
            <NavbarAdmin/>
            <div className='containerGR'>
                <Row
                    className='styledRow'
                >
                    <Col className='styledCol' xs={{span:20, offset:2 }} md={{span:10, offset:3 }} lg={{span:5, offset:2 }} style={{}}>
                        <h1>{props.Informacion} </h1>
                        <img src={props.icon} onClick={() => navigate('/')}/>
                    </Col>
                    {
                    data.map((dataRead)=>(
                            <Col
                                key={dataRead.id}
                                >
                            </Col>
                    ))
                }
                </Row>
            </div>
        </div>
    )
}