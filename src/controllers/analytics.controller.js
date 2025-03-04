import catchAsync from '../utils/CatchAsync.js';
import { Events } from '../models/index.js';


export const createCollections = catchAsync(async (req, res) => {
    const appData = req.app;
    const data = await Events.create({ ...req.body, appId: appData.id });
    if (!data) {
        res.status(500).json({ statusVale: 0, statusText: "Event insertion failed" })
    } else {
        res.status(201).json({ statusVale: 1, statusText: "Events are inserted successfully", data })
    }
});

export const getEventSummary = catchAsync(async (req, res) => {
    const similarEvents = await Event.findAll({
        where: {
            event_name: { [Op.iLike]: `%${req.query.event}%` }
        },
        attributes: [
            "event",
            "device",
            "user_id"
        ]
    });
    const totalEvents = similarEvents.length;
    const uniqueUsers = new Set(similarEvents.map(e => e.user_id)).size;
    const deviceData = similarEvents.reduce((acc, event) => {
        acc[event.device_type] = (acc[event.device_type] || 0) + 1;
        return acc;
    }, {});

    res.json({
        event: eventName,
        count: totalEvents,
        uniqueUsers: uniqueUsers,
        deviceData: deviceData
    });
});

export const getUserStats = catchAsync(async (req, res) => {
    const similarEvents = await Event.findAll({
        where: {
            event_name: { [Op.iLike]: `%${req.query.event}%` }
        },
        attributes: [
            "event",
            "userId",
            "metadata",
            "ipAddress"

        ]
    });
    const totalEvents = similarEvents.length;

    res.json({
        event: eventName,
        count: totalEvents,
        uniqueUsers: uniqueUsers,
        deviceData: deviceData
    });
});