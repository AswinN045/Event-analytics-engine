import Joi from "joi";

export const eventCollections = {
    body: Joi.object().keys({
        event: Joi.string().required(),
        url: Joi.string().required(),
        referrer: Joi.string().required(),
        device: Joi.string().required(),
        ipAddress: Joi.string().required(),
        timestamp: Joi.string().required(),
        metadata: Joi.object().required(),
        userId: Joi.string().required()
    }),
};

export const eventSummary = {
    query: Joi.object().keys({
        event: Joi.string().required(),
        startDate: Joi.string().optional(),
        endDate: Joi.string().optional(),
        app_id: Joi.string().optional()
    }),
};

export const userStats = {
    query: Joi.object().keys({
        userId: Joi.string().required()
    }),
};