import Joi from "joi";

export const register = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        type: Joi.string().optional()
    }),
};

export const getApiKey = {
    params: Joi.object().keys({
        id: Joi.number().required()
    })
};

export const revokeApiKey = {
    body: Joi.object().keys({
        id: Joi.number().required()
    })
};
