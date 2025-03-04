import catchAsync from '../utils/CatchAsync.js';
import { encryptApiKey } from '../utils/encryption.js';
import { App } from '../models/index.js';

export const register = catchAsync(async (req, res) => {
    const apiKey = encryptApiKey();
    const data = await App.create({ ...req.body, apiKey });
    if (!data) {
        res.status(500).json({ statusVale: 0, statusText: "Registration failed" })
    } else {
        res.status(201).json({ statusVale: 1, statusText: "Registerd Successfully", data })
    }

});

export const getApiKeyController = catchAsync(async (req, res) => {
    const data = await App.findByPk(req.params.id);
    if (data.apiKey === null) {
        const apiKey = encryptApiKey();
        const updatedData = await App.update({
            apiKey: apiKey
        }, { where: { id: req.params.id } });
        if (updatedData === 0) {
            res.status(200).json({ statusVale: 0, statusText: 'Failed to fetch details' })
        }
        res.status(200).json({ statusVale: 1, apikey: apiKey })
    } else {
        res.status(200).json({ statusVale: 1, apikey: data.apiKey })
    }

});

export const revokeApiKeyController = catchAsync(async (req, res) => {
    const [data] = await App.update({
        apiKey: null
    }, { where: { id: req.body.id } });
    if (data === 0) {
        res.status(500).json({ statusVale: 0, statusText: "Failed to fetch details" })
    } else {
        res.status(200).json({ statusVale: 1, statusText: "Api key removed sccessfully" })
    }
});