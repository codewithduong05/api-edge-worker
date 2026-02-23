import { UserController } from "../controllers/userController";
import { json } from "../views/jsonView";

export async function handleUserRoutes(request) {
    const url = new URL(request.url);
    const method = request.method;
    const parts = url.pathname.split("/").filter(Boolean);

    // /health
    if (url.pathname === "/health" && method === "GET") {
        return json({ message: "Server is running" });
    }

    // GET /users
    if (parts.length === 1 && parts[0] === "users" && method === "GET") {
        return UserController.getAll();
    }

    // GET /users/:id
    if (parts.length === 2 && parts[0] === "users" && method === "GET") {
        return UserController.getById(parts[1]);
    }

    // POST /users
    if (parts.length === 1 && parts[0] === "users" && method === "POST") {
        const user = await request.json();
        return UserController.create(user);
    }

    // DELETE /users/:id
    if (parts.length === 2 && parts[0] === "users" && method === "DELETE") {
        return UserController.deleteUser(parts[1]);
    }

    // ⚠ QUAN TRỌNG: luôn return Response
    return new Response("Not Found", { status: 404 });
}