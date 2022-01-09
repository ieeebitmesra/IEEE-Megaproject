import Confession from '../../../models/Confession'
import dbConnect from "../../../lib/dbconnect";
dbConnect();

async function handler(req, res) {
    if (req.method === "POST") {
        try {
            const { uid, content } = req.body;
            const confession_instance = new Confession({
                uid,
                content,
            });
            await confession_instance.save();
            res.status(200).json({ message: "content Added", Status: "Success" });
        } catch (err) {
            const response = { Status: "Failure", Description: err.message };
            res.status(400).send(response);
        }
    }
    if (req.method === "GET") {
        try {
            console.log("hello world");
            const { uid } = req.body;
            const todo_instance = await Todo.find({ uid });
            res.status(200).json({
                message: "All Todos of the particular user fetched",
                Status: "Success",
                todos: todo_instance,
            });
        } catch (err) {
            const response = { Status: "Failure", Description: err.message };
            res.send(response).status(400);
        }
    }

    if (req.method === "DELETE") {
        try {
            console.log("hello world")
            const { id } = req.body;
            const todo_instance = await Todo.deleteOne({ _id: id });
            res.status(200).json({
                message: "All Todos of the particular user fetched",
                Status: "Success",
                todos: todo_instance,
            });
        } catch (err) {
            const response = { Status: "Failure", Description: err.message };
            res.send(response).status(400);
        }
    }

    if (req.method === "PUT") {
        try {
            const { uid, _id, type } = req.body;
            const dtype = type === 'upvotes' ? 'downvotes' : 'upvotes';
            const confession_instance = await Confession.findOne({ _id })
            confession_instance[type].push(uid);
            confession_instance[dtype].pull(uid);
            await confession_instance.save();
            res.status(200).json({ message: "content Added", Status: "Success", _id });
        } catch (err) {
            const response = { Status: "Failure", Description: err.message };
            res.status(400).send(response);
        }
    }
}

export default handler;
