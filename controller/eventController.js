const Event = require('../models/eventModel');
const User = require('../models/userModel');
const createEvent=async ( req, res)=>{
    try {
        const{title,    description , date , location} = req.body;
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
        res.status(500).json({ error: error.message });
    }
}


const getAllEvent = async(req,res)=>{
    try {
        const events = await Event.find().populate('createdBy', 'email');
        res.json(events);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


const getEventById = async(req, res)=>{
    try {
        const event = await Event.findById(req.params.id).populate('createdBy', 'email');
        res.json(event);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateEvent = async(req, res)=>{
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ message: 'Event not found' });
    
        if (event.createdBy.toString() !== req.userId) {
          return res.status(403).json({ message: 'Not authorized to update this event' });
        }
    
        const updated = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}

const deleteEvent= async(req, res)=>{
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ message: 'Event not found' });
    
        if (event.createdBy.toString() !== req.userId) {
          return res.status(403).json({ message: 'Not authorized to delete this event' });
        }
    
        await Event.findByIdAndDelete(req.params.id);
        res.json({ message: 'Event deleted successfully' });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
}

module.exports ={createEvent , getAllEvent, getEventById, updateEvent , deleteEvent};