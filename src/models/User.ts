export default class User {
    id: string|null=null; // On utilise des UUID mais le type n'est pas reconnu pour le front.
    username: string|null=null;
    email: string|null=null;
    firstname: string|null=null;
    lastname: string|null=null;
}