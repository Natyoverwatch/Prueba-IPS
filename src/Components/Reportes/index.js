import React from 'react'
import "./style.scss"
import { NavbarAdmin } from './../NavbarAdmin';
import { Button, Modal, Form, Input, Upload, message } from 'antd';
import { useState, } from 'react';
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
        console.log('URL image:', imageUrl);
    }

    const onFinish = (values) => {
        console.log('Valores del formulario:', values);
        console.log('Archivo de imagen:', imageFile);
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