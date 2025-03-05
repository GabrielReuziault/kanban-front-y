const UsersComponent = ({ users }: { users: { id: string; username: string; email: string }[] }) => {
    return (
        <div>
            <h1>Liste des Utilisateurs</h1>
            <table border="1">
                <thead>
                <tr>
                    <th>Nom</th>
                    <th>Email</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user: { id: string; username: string; email: string }) => (
                    <tr key={user.id}>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default UsersComponent;