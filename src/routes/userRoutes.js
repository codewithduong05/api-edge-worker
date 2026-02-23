import { UserController } from "../controllers/userController";
import { json } from "../views/jsonView";

export async function handleUserRoutes (request) { 
    const url = new URL(request.url);   
    const method = request.method;

    if (url.pathname === "/heath" && method === "GET") {
        return json ({message : "Server is running"})
    }

    if (url.pathname === "/users" && method === "GET") {
        return UserController.getAll()
    }
    return new Response("Not found" , {status : 404})
}
