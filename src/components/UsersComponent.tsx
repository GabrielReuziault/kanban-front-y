"use client";

import React, { useState } from "react";
import User from "@/models/User";
import { List, Typography, Button, Modal, Form, Input, message } from "antd";

const { Title } = Typography;

const UsersComponent = ({ ...props }: { users: User[] }) => {
    const [users, setUsers] = useState<User[]>(props.users);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const [form] = Form.useForm();

    const showModal = () => {
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
        form.resetFields();
    };

    const handleAddUser = () => {
        form
            .validateFields()
            .then((values) => {
                const newUser: User = {
                    id: Math.random().toString(36).substr(2, 9),
                    username: values.username,
                    email: values.email,
                };
                setUsers([...users, newUser]); // Ajouter le nouvel utilisateur
                closeModal(); // Fermer le modal
                message.success("Utilisateur ajouté avec succès !");
            })
            .catch((info) => {
                console.error("Validation échouée :", info);
            });
    };

    return (
        <div
            style={{
                maxWidth: "600px",
                margin: "40px auto",
                padding: "20px",
                borderRadius: "8px",
                background: "#f9f9f9",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
        >
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
                <Title level={2}>Users List</Title>
            </div>

            <Button type="primary" onClick={showModal} style={{ marginBottom: "20px" }}>
                Ajouter un utilisateur
            </Button>

            <List
                dataSource={users}
                bordered
                style={{
                    background: "#ffffff",
                    borderRadius: "8px",
                }}
                header={<Title level={4}>Users ({users.length})</Title>}
                renderItem={(user: User) => (
                    <List.Item key={user.id}>
                        <strong>{user.username}</strong> <br/> <span>{user.email}</span>
                    </List.Item>
                )}
            />

            <Modal
                title="Ajouter un utilisateur"
                visible={isModalVisible}
                okText="Ajouter"
                cancelText="Annuler"
                onCancel={closeModal}
                onOk={handleAddUser}
            >
                <Form form={form} layout="vertical" name="add_user_form">
                    <Form.Item
                        name="username"
                        label="Nom d'utilisateur"
                        rules={[{ required: true, message: "Veuillez entrer un nom d'utilisateur." }]}
                    >
                        <Input placeholder="Entrez le nom d'utilisateur" />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            { required: true, message: "Veuillez entrer un email." },
                            { type: "email", message: "Veuillez entrer un email valide." },
                        ]}
                    >
                        <Input placeholder="Entrez l'email" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default UsersComponent;