import { App } from "../models/index.js";

export const validateApiKey = async (req, res, next) => {
    console.log(req);

    try {
        const apiKey = req.headers["x-api-key"];
        if (!apiKey) {
            return res.status(401).json({ error: "API key is required" });
        }

        const app = await App.findOne({ where: { apiKey: apiKey } });
        if (!app) {
            return res.status(403).json({ error: "Invalid API key" });
        }

        req.app = app;
        next();
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};
