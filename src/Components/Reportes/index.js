import React from 'react'
import "./style.scss"
import { NavbarAdmin } from './../NavbarAdmin';
import { Button, Modal, Form, Input, Select, Upload, message } from 'antd';
import { useState, useContext, useEffect } from 'react';
import { addData } from "../../controller/control"
import { AppContext } from '../../Provider';
import { UploadOutlined } from '@ant-design/icons';


export default function Reports() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [imageUrl, setImageUrl] = useState(null);
    const [imageFile, setImageFile] = useState(null);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        form.submit();
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const viewImage = () => {
        const imageUrl = URL.createObjectURL(imageFile);
        setImageUrl(imageUrl);
    }

    const onFinish = (values) => {
        console.log('Valores del formulario:', values);
        console.log('Archivo de imagen:', imageFile);
        console.log('URL image:', imageUrl);
        setIsModalVisible(false);
        viewImage();
    };

    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('Solo puedes subir archivos JPG/PNG');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('La imagen debe ser menor a 2MB');
        }
        setImageFile(file);

        return false; // Evita que el archivo se suba automáticamente
    };

    return (
        <div>
            <NavbarAdmin />
            <Button type="primary" onClick={showModal}>
                Abrir Modal
            </Button>
            {imageUrl && (
                <img src={imageUrl} alt="Imagen previa" style={{ maxWidth: '100%', marginTop: 10 }} />
            )}
            <Modal
                title="Ejemplo de Modal con Formulario"
                open={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form form={form} onFinish={onFinish}>
                    <Form.Item
                        name="nombre"
                        label="Nombre"
                        rules={[{ required: true, message: 'Por favor ingresa tu nombre' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            { required: true, message: 'Por favor ingresa tu correo electrónico' },
                            { type: 'email', message: 'Por favor ingresa un correo electrónico válido' },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="imagen"
                        label="Imagen"
                        rules={[{ required: true, message: 'Por favor selecciona una imagen' }]}
                    >
                        <Upload beforeUpload={beforeUpload} maxCount={1}>
                            <Button icon={<UploadOutlined />}>Seleccionar imagen</Button>
                        </Upload>

                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};



/*
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState([
        {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
            uid: '-2',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
    ]);
    const handleCancel = () => setPreviewOpen(false);
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };
    const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
    const uploadButton = (
        <div>
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </div>
    );
 
    return (
        <>
            {/*<NavbarAdmin />
            <Button type="primary" onClick={showModal}>
                Open Modal
            </Button>
            <Modal
                title="Modal Title"
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={[
                    <Button key="back" onClick={() => setIsModalOpen(false)}>
                        Cancel
                    </Button>,
                    <Button key="ok" onClick={() => { form.submit() }}>
                        Submit
                    </Button>,
                ]}
            >
                <Form form={form} onFinish={onFinish}>
                    <Form.Item name="user" label="Usuario">
                        <Input />
                    </Form.Item>
                    <Form.Item name="pass" label="Contraseña">
                        <Input.Password />
                    </Form.Item>
                    <Form.Item name="roll" label="Roll">
                        <Select
                            options={[
                                {
                                    value: 'admin',
                                    label: 'Administrador',
                                },
                                {
                                    value: 'auxiliar',
                                    label: 'Auxiliar',
                                },
                                {
                                    value: 'revisor',
                                    label: 'Revisor',
                                }
                            ]} />
 
                    </Form.Item>
                </Form>
                        </Modal>}
 
        </>
    )
}*/

