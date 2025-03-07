"use client";

import React, { useState } from "react";
import { List, Typography, Button, Modal, Form, message, Popconfirm } from "antd";
import User from "@/models/User";
import API_URLS from "@/constants/api.url";
import { randomUUID } from "crypto";
import HttpService from "@/services/HttpService";
import UserFormComponent from "./UserFormComponent";

const { Title } = Typography;

const containerStyle = {
    maxWidth: "600px",
    margin: "40px auto",
    padding: "20px",
    borderRadius: "8px",
    background: "#f9f9f9",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
};

const buttonStyle = { marginBottom: "20px" };

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
            const newUser: User = { id: randomUUID(), ...values };
            const response = await HttpService.post(API_URLS.users, newUser);

            if (!response) throw new Error("Erreur lors de l'ajout de l'utilisateur.");

            setUsers((prevUsers) => [...prevUsers, newUser]);
            message.success("Utilisateur ajouté avec succès !");
            toggleModal(false);
        } catch (error) {
            console.error(error);
            message.error("Impossible d'ajouter l'utilisateur. Merci de réessayer.");
        }
    };

    const handleDeleteUser = async (userId: string) => {
        try {
            await HttpService.delete(`${API_URLS.users}/${userId}`);
            setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
            message.success("Utilisateur supprimé avec succès !");
        } catch (error) {
            console.error(error);
            message.error("Impossible de supprimer l'utilisateur. Merci de réessayer.");
        }
    };

    const renderUserItem = (user: User) => (
        <List.Item
            key={user.id}
            actions={[
                <Popconfirm
                    key="delete"
                    title="Êtes-vous sûr(e) de vouloir supprimer cet utilisateur ?"
                    onConfirm={() => handleDeleteUser(user.id!)}
                    okText="Oui"
                    cancelText="Non"
                >
                    <Button danger type="text">
                        Supprimer
                    </Button>
                </Popconfirm>,
            ]}
        >
            <span>
                <strong>{user.username}</strong> <br />
                {user.email}
            </span>
        </List.Item>
    );

    return (
        <div style={containerStyle}>
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
                <Title level={2}>Users List</Title>
            </div>

            <Button type="primary" onClick={() => toggleModal(true)} style={buttonStyle}>
                Ajouter un utilisateur
            </Button>

            <List
                bordered
                dataSource={users}
                style={{ background: "#ffffff", borderRadius: "8px" }}
                header={<Title level={4}>Users ({users.length})</Title>}
                renderItem={renderUserItem}
            />

            <Modal
                title="Ajouter un utilisateur"
                open={isModalVisible}
                onOk={handleAddUser}
                onCancel={() => toggleModal(false)}
                okText="Ajouter"
                cancelText="Annuler"
            >
                <UserFormComponent form={form} />
            </Modal>
        </div>
    );
};

export default UsersComponent;