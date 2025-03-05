import HttpService from "@/services/HttpService";
import API_URLS from "@/constants/api.url";

const getProjects = async () => {
    return HttpService.get(API_URLS.projects);
};

export default async function ProjectsPage(){
    const projects = await getProjects();
    return (
        <>
            <h2>Projects</h2>
            <p>{projects.length}</p>
        </>
    );
}