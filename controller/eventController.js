const Event = require('../models/eventModel');

const createEvent=async ( req, res)=>{
    try {
        const{title,    description , data , location} = req.body;
        const newEvent =  await Event({
            title,
            description,
            date,
            location,
            createdBy: req.userId
        })
        const savedEvent = await newEvent.save();
        res.status(200).json(savedEvent);
    } catch (error) {
        res.status(500).json({ error: err.message });
    }
}


const getAllEvent = async(req,res)=>{
    try {
        const events = await Event.find().populate('createdBy', 'email');
        res.json(events);
    } catch (error) {
        res.status(500).json({ error: err.message });
    }
}


const getEventById = async(req, res)=>{
    try {
        const event = await Event.findById(req.params.id).populate('createdBy', 'email');
        res.json(event);
    } catch (error) {
        res.status(500).json({ error: err.message });
    }
}

module.exports ={createEvent , getAllEvent, getEventById};