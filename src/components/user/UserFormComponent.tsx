"use client";

import React from "react";
import { Form, Input } from "antd";

const UserFormComponent = ({ form }: { form: any }) => {
    return (
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
    );
};

export default UserFormComponent;