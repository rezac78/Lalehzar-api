const mongoose = require("mongoose");

const TimeSlotSchema = new mongoose.Schema({
  open: String,
  close: String,
});

const DailyHoursSchema = new mongoose.Schema({
  day: String, 
  slots: [TimeSlotSchema],
});

const SpecialDaySchema = new mongoose.Schema({
  date: Date,
  slots: [TimeSlotSchema],
  note: String,
});

const OpeningHoursSchema = new mongoose.Schema({
  regularHours: [DailyHoursSchema],
  specialHours: [SpecialDaySchema],
});

const Cafe = mongoose.model("Cafe", OpeningHoursSchema);

module.exports = Cafe;
