import HttpService from "@/services/HttpService";
import API_URLS from "@/constants/api.url";

const getUsers = async () => {
    return HttpService.get(API_URLS.users);
};

export default async function UsersPage(){
    const users = await getUsers();
    return (
        <>
            <h2>Utilisateurs</h2>
            <p>{users.length}</p>
        </>
    );
}