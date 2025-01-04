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

        // Create a new task (row) in the client's task array
        const newTask = await prisma.task.create({
            data: { title }, // Since only the title is user input
        });

        // HTTP 201: A new resource was successfully created in the database
        // JSON Output: Newly created task
        res.status(201).json(newTask);
    }
}