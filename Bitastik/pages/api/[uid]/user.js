import dbConnect from "../../../lib/dbconnect";
import User from "../../../models/User";

export default async function handleUser(req, res) {
    dbConnect();
    const { method } = req;
    const { uid } = req.query;

    switch (method) {
        case 'GET':
            try {
                const user = await User.findOne({ uid });
                if (user) {
                    res.status(200).json({
                        status: "success",
                        user,
                    });
                } else {
                    res.status(404).json({
                        status: "fail",
                        message: "User not found",
                    });
                }
            }
            catch (error) {
                res.status(400).json({
                    status: "fail",
                    message: error,
                });
            }
            break;

        default:
            res.status(400).json({
                status: "fail",
                message: "Method not allowed",
            });
    }
}