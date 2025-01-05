import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === "GET") {
        // Fetch all tasks
        const tasks = await prisma.task.findMany();
        
        // HTTP 200: OK (successful request)
        // JSON Output: Fetched tasks
        res.status(200).json(tasks);
    } else if (req.method === "POST") {
        // Receive task array from client
        // Using JS destructuring
        const { title } = req.body; 

        // Equivalent to
        // const title = req.body.title;

        // Find current highest ID in table
        const maxTask = await prisma.task.findFirst({
            orderBy: {
                id: "desc",
            },
        });

        // Set new ID
        const newId = maxTask ? maxTask.id + 1 : 1;

        // DEBUG
        // console.log("DEBUG: \"POST\" HTTP 'req' BODY: ",  req.body);

        // Create a new task (row) in the client's task array
        const newTask = await prisma.task.create({
            data: { 
                id: newId,
                title: title,
             },
        });

        // HTTP 201: A new resource was successfully created in the database
        // JSON Output: Newly created task
        res.status(201).json(newTask);
    } else if (req.method === "PUT") {
        // Update a task
        const { id, title, completed } = req.body;

        // DEBUG
        // console.log("DEBUG: \"PUT\" HTTP 'req' BODY: ",  req.body);

        const updatedTask = await prisma.task.update({
            where: { id: parseInt(id) },
            data: {
                ...(title && { title }),
                ...(typeof completed === "boolean" && { completed }),
            },
        });

        // HTTP 200: OK (successful request)
        // JSON Output: Updated tasks
        res.status(200).json(updatedTask);
    } else if (req.method === "DELETE") {
        // Delete a task
        const { id } = req.query;

        // DEBUG
        // console.log("DEBUG: \"DELETE\" HTTP 'req' QUERY: ",  req.query);

        await prisma.task.delete({
            where: { id: isNaN(id) ? id : parseInt(id) },
        });

        // HTTP 204: Successfully processed request, but not returning any content in response
        // End process after completion, no response required after deletion of task
        res.status(204).end();
    } else {
        // Invalid method error catch
        res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
        
        // HTTP 405: Unallowed HTTP method
        // End process with an error message
        res.status(405).end('Method ${req.method} Not Allowed');
    }
}