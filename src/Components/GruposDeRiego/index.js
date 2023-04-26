import React from 'react'
import "./style.scss"
import { NavbarAdmin } from './../NavbarAdmin';
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
        icon: mme, 
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


export default function GruRiesgo(props){

    const navigate = useNavigate();

    return(
        <div>
            <NavbarAdmin/>
            <div className='containerGR'>
                <Row
                    className='styledRow'
                >
                    {
                    data.map((read, index)=>(
                        <Col 
                            className='styledCol' 
                            xs={{span:20, offset:2 }} md={{span:10, offset:3 }} lg={{span:5, offset:2 }} 
                            key={index}
                            onClick={() => navigate(read.urlnavigate)}>
                            <h1>{read.Informacion} </h1>
                            <img src={read.icon} alt={read.Informacion}/>
                        </Col>
                    ))
                }
                </Row>
            </div>
        </div>
    )
}

/*import React from 'react'
import "./style.scss"
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


export default function GruRiesgo(props){

    const navigate = useNavigate();
    
    return(
        <div>
            <NavbarAdmin/>
            <div className='containerGR'>
                <Row
                    className='styledRow'
                >
                    <Col className='styledCol' xs={{span:20, offset:2 }} md={{span:10, offset:3 }} lg={{span:5, offset:2 }} style={{}}>
                        <h1>Mamografia </h1>
                        <img src={mamografia} alt="citologia" onClick={() => navigate('/')}/>
                    </Col>
                    <Col className='styledCol' xs={{span:20, offset:2 }} md={{span:10, offset:3 }} lg={{span:5, offset:2 }} style={{}}>
                        <h1>Sifilis gestacional y congenita </h1>
                        <img src={sifilis} alt="citologia" onClick={() => navigate('/')}/>
                    </Col>
                    <Col className='styledCol' xs={{span:20, offset:2 }} md={{span:10, offset:3 }} lg={{span:5, offset:2 }} style={{}}>
                        <h1>Citologia y colposcopia </h1>
                        <img src={citologia} alt="citologia" onClick={() => navigate('/')}/>
                    </Col>
                    <Col className='styledCol' xs={{span:20, offset:2 }} md={{span:10, offset:3 }} lg={{span:5, offset:2 }} style={{}}>
                        <h1>Desnutricion </h1>
                        <img src={desnutricion} alt="citologia" onClick={() => navigate('/')}/>
                    </Col>
                    <Col className='styledCol' xs={{span:20, offset:2 }} md={{span:10, offset:3 }} lg={{span:5, offset:2 }} style={{}}>
                        <h1>EDA </h1>
                        <img src={eda} alt="citologia" onClick={() => navigate('/')}/>
                    </Col>
                    <Col className='styledCol' xs={{span:20, offset:2 }} md={{span:10, offset:3 }} lg={{span:5, offset:2 }} style={{}}>
                        <h1>IRA </h1>
                        <img src={ira} alt="citologia" onClick={() => navigate('/')}/>
                    </Col>
                    <Col className='styledCol' xs={{span:20, offset:2 }} md={{span:10, offset:3 }} lg={{span:5, offset:2 }} style={{}}>
                        <h1>MME </h1>
                        <img src={mme} alt="citologia" onClick={() => navigate('/')}/>
                    </Col>
                    <Col className='styledCol' xs={{span:20, offset:2 }} md={{span:10, offset:3 }} lg={{span:5, offset:2 }} style={{}}>
                        <h1>Agregar </h1>
                        <img src={add} alt="citologia" onClick={() => navigate('/')}/>
                    </Col>
                    {
                    data.map((dataRead)=>(
                            <Col
                                key={dataRead.id}
                                onClick={()=> setCount(dataRead.id)}>
                            </Col>
                    ))
                }
                </Row>
            </div>
        </div>
    )
}
*/
