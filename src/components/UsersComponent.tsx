"use client";

import React, { useState } from "react";
import { List, Typography, Button, Modal, Form, Input, message } from "antd";
import User from "@/models/User";
import API_URLS from "@/constants/api.url";
import { randomUUID } from "crypto";
import HttpService from "@/services/HttpService";

const { Title } = Typography;

const UsersComponent = ({ users: initialUsers }: { users: User[] }) => {
    const [users, setUsers] = useState<User[]>(initialUsers);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    const toggleModal = (show: boolean) => {
        setIsModalVisible(show);
        if (!show) form.resetFields();
    };

    const handleAddUser = async () => {
        try {
            const values = await form.validateFields();
            const newUser: User = { id: randomUUID, ...values };

            const response = await HttpService.post(API_URLS.users, newUser);
            console.log(response);


            if (!response) throw new Error("Erreur lors de l'ajout de l'utilisateur.");

            setUsers([...users, newUser]);
            message.success("Utilisateur ajouté avec succès !");
            toggleModal(false);
            await HttpService.get(API_URLS.users);
        } catch (error) {
            console.error("Erreur :", error);
            message.error("Impossible d'ajouter l'utilisateur. Merci de réessayer.");
        }
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

            <Button type="primary" onClick={() => toggleModal(true)} style={{ marginBottom: "20px" }}>
                Ajouter un utilisateur
            </Button>

            <List
                bordered
                dataSource={users}
                style={{
                    background: "#ffffff",
                    borderRadius: "8px",
                }}
                header={<Title level={4}>Users ({users.length})</Title>}
                renderItem={(user) => (
                    <List.Item key={user.id}>
            <span>
              <strong>{user.username}</strong> <br />
                {user.email}
            </span>
                    </List.Item>
                )}
            />

            <Modal
                title="Ajouter un utilisateur"
                open={isModalVisible}
                onOk={handleAddUser}
                onCancel={() => toggleModal(false)}
                okText="Ajouter"
                cancelText="Annuler"
            >
                <Form form={form} layout="vertical">
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
                    <Form.Item
                        name="firstname"
                        label="Prénom"
                        rules={[{ required: true, message: "Veuillez entrer prénom." }]}
                    >
                        <Input placeholder="Entrez votre prénom" />
                    </Form.Item>
                    <Form.Item
                        name="lastname"
                        label="Nom"
                        rules={[{ required: true, message: "Veuillez entrer nom." }]}
                    >
                        <Input placeholder="Entrez votre nom" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default UsersComponent;