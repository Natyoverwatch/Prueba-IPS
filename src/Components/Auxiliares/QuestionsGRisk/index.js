import React, { useState, useContext, useEffect } from 'react'
import "./style.scss"
import { Form, Modal, Button, Input, Row, Col, Popconfirm, Select, Table } from 'antd';
import { addData, getData, editData, deleteData } from "../../../controller/control"
import { AppContext } from '../../../Provider';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { SearchOutlined } from "@ant-design/icons"
import { useParams } from 'react-router-dom';
import { NavbarAux } from '../NavbarAux';
import addImage from '../../../Images/agregar-usuario.png';
import ppersonal from '../../../Images/preguntapersonal.png'
import pseguimiento from '../../../Images/preguntaseguimiento.png'

const { Option } = Select

export default function QuestionsGRisk() {
    let { id } = useParams()

    //Id for updating specific questions
    const [idEdit, setIdEdit] = useState(null)

    //Forms to control diferent modals
    const [formUpdateQuestions] = Form.useForm();
    const [form] = Form.useForm();

    //Estados para el control de las modales
    //Modal para creación de las preguntas
    const [isModalVisible, setIsModalVisible] = useState(false);
    //Modal para la actualización de las preguntas
    const [isEditing, setisEditing] = useState(false)

    //Global state
    const [state, setState] = useContext(AppContext)

    //Data de las preguntas
    const [dataSource, setDataSource] = useState([]);

    const [dataRisk, setDataRisk] = useState([]);

    //Editar las preguntas y actualizar
    const editQuestions = (questions) => {
        setisEditing(true)
        formUpdateQuestions.setFieldsValue(questions);
        setIdEdit(questions._id)
    }

    //Actualizar la pregunta
    const updateQuestions = async (values) => {
        form.resetFields()
        const data = await editData(values, `https://api.clubdeviajeros.tk/api/questions/${idEdit}`, state?.token)
        if (data === "ok") { setisEditing(false); getQuestions() }
    }

    //Creación de una nueva pregunta
    const createNewQuestion = async (values) => {
        form.resetFields()
        setIsModalVisible(false);
        const datos = {
            id_riesgo: id,
            tipo: values.tipo,
            pregunta: values.pregunta,
            name: values.name,
        }
        const data = await addData(datos, "https://api.clubdeviajeros.tk/api/questions", state?.token)
        if (data) getQuestions()
    };

    //Obtención de las preguntas
    const getQuestions = async () => {
        const getConstdata = await getData(`https://api.clubdeviajeros.tk/api/questions/${id}`, state?.token)
        setDataSource(getConstdata);
        getRisks()
    }

    useEffect(() => {
        getQuestions()
        // eslint-disable-next-line
    }, [])

    //Borrar pregunta 
    const deleteQuestions = async (questions) => {
        const data = await deleteData(`https://api.clubdeviajeros.tk/api/questions/${questions}`, state?.token)
        if (data === 200) getQuestions()
    }

    //Obtención de los grupos de riesgo
    const getRisks = async () => {
        const getConstdata = await getData(`https://api.clubdeviajeros.tk/api/risk/${state?.id_supervisor}`, state?.token)
        setDataRisk(getConstdata);

    }

    //
    const filterRisk = (a) => {
        const filtro = dataRisk.filter(data => data._id === a.id_riesgo)
        return (filtro[0]?.name)
    }

    const columns = [
        {
            title: 'Tipo de pregunta',
            dataIndex: 'tipo',
            key: 'tipo',
            filters: [
                {
                    text: 'seguimiento',
                    value: 'seguimiento',
                },
                {
                    text: 'personal',
                    value: 'personal',
                },
            ],
            onFilter: (value, record) => record.tipo.indexOf(value) === 0,
        },
        {
            title: 'Pregunta',
            dataIndex: 'pregunta',
            key: 'pregunta',
            editable: true,
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
                return (
                    <>
                        <Input
                            autoFocus
                            placeholder='Escribe aquí'
                            onPressEnter={() => { confirm() }}
                            onBlur={() => { confirm() }}
                            value={selectedKeys[0]}
                            onChange={(e) => {
                                setSelectedKeys(e.target.value ? [e.target.value] : [])
                                confirm({ closeDropdown: false })
                            }}
                        ></Input>
                    </>
                )
            },
            filterIcon: () => { return (<SearchOutlined />) },
            onFilter: (value, record) => { return record.pregunta.toLowerCase().includes(value.toLowerCase()) },
        },
        {
            title: 'Nombre del input de la pregunta',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Acciones',
            key: 'actions',
            render: (a) => {
                return (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <FiEdit onClick={() => editQuestions(a)} />
                        <Popconfirm title="Seguro deseas borrarlo?" onConfirm={() => deleteQuestions(a._id)}>
                            <FiTrash2 />
                        </Popconfirm>
                    </div >
                );
            }
        },
    ];

    return (
        <div>
            <NavbarAux />
            <Row className='styledRow'>
                <Col
                    className='styledColGrisk'
                    xs={{ span: 20, offset: 2 }} md={{ span: 10, offset: 3 }} lg={{ span: 6, offset: 2 }}>
                    <Row className='styledRow2' onClick={() => { }}>
                        <h1 style={{ textTransform: "capitalize", textAlign: 'center' }}> Preguntas Personales </h1>
                        <img src={ppersonal} alt={"ppersonal"} />
                    </Row>
                </Col>
                <Col
                    className='styledColGrisk'
                    xs={{ span: 20, offset: 2 }} md={{ span: 10, offset: 3 }} lg={{ span: 6, offset: 2 }}>
                    <Row className='styledRow2' onClick={() => { }}>
                        <h1 style={{ textTransform: "capitalize", textAlign: 'center' }}> Preguntas de seguimiento </h1>
                        <img src={pseguimiento} alt={"pseguimiento"} />
                    </Row>
                </Col>
            </Row>
        </div>
    )
}