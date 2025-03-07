import HttpService from "@/services/HttpService";
import API_URLS from "@/constants/api.url";
import UsersComponent from "@/components/user/UsersComponent";

const getUsers = async () => {
    return HttpService.get(API_URLS.users);
};

export default async function UsersPage(){
    const users = await getUsers();
    return (
        <>
            <UsersComponent users={users}/>
        </>
    );
}