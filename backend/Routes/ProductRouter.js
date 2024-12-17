import express from "express";
import ensureAuthenticated from "../Middlewares/Auth.js";
const router = express.Router();

router.get("/", ensureAuthenticated, (req, res) => {
    res.status(200).json([
        {
            name: "mobile",
            price: 100000
        },
        {
            name: "laptop",
            price: 200000
        }
    ]);
});

export default router;