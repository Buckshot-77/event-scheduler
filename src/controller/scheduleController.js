const fs = require("fs");
const Schedule = require("../model/scheduleModel.js");

const lectures = fs
  .readFileSync(`${__dirname}/../../resources/proposals.txt`, "utf-8")
  .trim()
  .split("\n");

const letters = ["A", "B", "C", "D"];
const tracksArray = [];
let lightning_lectures = [];
let newTrack = true;
let minsFirstSess = 180;
let minsSecondSess = 240;
let session = 1;
let networkingTime;

let date = new Date("2020-06-12 09:00");

function addMinutes(date, minutes) {
  return new Date(date.getTime() + minutes * 60000);
}

const getSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.find();
    res.status(200).json({
      status: "success",
      data: schedule,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

const postSchedule = (req, res) => {
  try {
    lectures.forEach((element, index) => {
      let willAddLecture = false;

      if (newTrack) {
        tracksArray.push({
          name: "Track " + letters[tracksArray.length],
          lectures: [],
        });
        minsFirstSess = 180;
        minsSecondSess = 240;
        newTrack = false;
      }

      let matches = element.match(/\d+/g);

      if (matches === null) {
        lightning_lectures.push(element);
        return;
      }

      let duration = parseInt(matches[0]);

      if (minsFirstSess > 0 && minsFirstSess - duration >= 0) {
        willAddLecture = true;
        minsFirstSess -= duration;
        session = 1;
      }

      if (!willAddLecture && minsSecondSess - duration >= 0) {
        willAddLecture = true;
        minsSecondSess -= duration;
        if (session === 1) {
          tracksArray[tracksArray.length - 1]["lectures"].push({
            name: "almoço",
            duration: 60,
            session: 0,
            time: "12:00:00",
          });
          date = addMinutes(date, 60);
        }
        session = 2;
      }

      if (willAddLecture) {
        tracksArray[tracksArray.length - 1]["lectures"].push({
          name: element,
          duration,
          session: session,
          time: date.toLocaleTimeString(),
        });
        date = addMinutes(date, duration);
        return;
      }

      if (minsSecondSess >= 5 && lightning_lectures.length > 0) {
        tracksArray[tracksArray.length - 1]["lectures"].push({
          name: lightning_lectures.shift(),
          duration: 5,
          session: session,
          time: date.toLocaleTimeString(),
        });
        date = addMinutes(date, 5);
        minsSecondSess -= 5;
      }
      networkingTime = date.toLocaleTimeString();
      newTrack = true;
      date = new Date("2020-06-12 09:00");
    });

    tracksArray.forEach((track) => {
      track.lectures.push({
        name: "Networking",
        duration: 0,
        session: 2,
        time: networkingTime,
      });
    });

    const tracksObject = { tracks: tracksArray };
    Schedule.create(tracksObject);
    res.status(201).json({
      status: "success",
      data: tracksObject,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

const deleteSchedule = async (req, res) => {
  try {
    await Schedule.deleteMany();
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

module.exports = { getSchedule, postSchedule, deleteSchedule };
