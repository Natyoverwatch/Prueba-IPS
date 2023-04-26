import React from 'react'
import "./style.scss"
import { NavbarAdmin } from './../NavbarAdmin';
import { useState } from 'react';
import { Form, Input, Row, Col, Button } from 'antd';


const ToDoList = () => {
    const [datos, setDatos] = useState([]);
    const [notes, setNotes] = useState([]);
    let [counter, setCounter] = React.useState(0);
    const [form] = Form.useForm();
    //destructurng
    //React.useState => [value, function to update the value];
    const contador = (value) => {
        setCounter(counter + value);
    };

    const agregar = () => {
        const newNote = {
            name: datos,
            id: counter,
        }
        setNotes([...notes, newNote])
        setDatos('') //para que no siga anotando el ultimo valor
    };

    const remover = (id) => {
        const newNote = notes.filter((nota) => nota.id !== id)
        setNotes(newNote)
    };

    const onReset = () => {
        form.resetFields();
    };

    return (
        <>
            <Row
                className='styledRow'
            >
                <Col className='styledCol' xs={{ span: 20, offset: 2 }} md={{ span: 10, offset: 3 }} lg={{ span: 6, offset: 2 }} style={{}}>
                    <h1>Citologia y colposcopia </h1>
                </Col>
                <Col className='styledCol' xs={{ span: 20, offset: 2 }} md={{ span: 10, offset: 3 }} lg={{ span: 6, offset: 2 }} style={{}}>
                    <h1>Desnutricion </h1>
                </Col>
                {notes.map((nota, index) => (
                    <Col key={index} onClick={() => remover(index)} className='boxAdd'>
                        <p>{nota.name}</p>
                    </Col>
                ))}
            </Row>

        </>
    )
}

export default function GruRiesgo() {
    return (
        <div>
            <NavbarAdmin />
            <div className='container'>
                <ToDoList />
            </div>
        </div>
    )
}

