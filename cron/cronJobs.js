const cron = require('node-cron');
const Event = require('../models/eventModel');
const moment = require('moment');

cron.schedule('* * * * *', async () => {
    const now = new Date();
    const fiveMinutesFromNow = new Date(now.getTime() + 5 * 60000);
  
    try {
      const upcomingEvents = await Event.find({
        date: {
          $gte: now,
          $lte: fiveMinutesFromNow,
        }
      });
  
      upcomingEvents.forEach(event => {
        console.log(`Reminder: "${event.title}" is starting soon!`);
      });
    } catch (err) {
      console.error('Reminder Cron Job Failed:', err.message);
    }
  });



cron.schedule('*/10 * * * *', async () => {
    const now = new Date();
  
    try {
     
      await Event.updateMany(
        { status: 'upcoming', date: { $lte: now } },
        { $set: { status: 'ongoing' } }
      );
  
      
      await Event.updateMany(
        { status: 'ongoing', endDate: { $lte: now } },
        { $set: { status: 'completed' } }
      );
  
      console.log('✅ Status updated for events at', new Date().toLocaleTimeString());
    } catch (err) {
      console.error('Status Cron Job Failed:', err.message);
    }
  });
  