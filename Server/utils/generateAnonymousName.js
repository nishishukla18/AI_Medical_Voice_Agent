import User from "../models/User.js";

const adjectives = [
  "Silent",
  "Curious",
  "Brave",
  "Calm",
  "Mysterious",
  "Happy",
  "Clever",
  "Wandering",
  "Quiet",
  "Fearless"
];

const animals = [
  "Fox",
  "Panda",
  "Wolf",
  "Raven",
  "Tiger",
  "Owl",
  "Penguin",
  "Bear",
  "Lion",
  "Rabbit"
];

const generateAnonymousName = async () => {
  let name;
  let exists = true;

  while (exists) {
    const adjective =
      adjectives[Math.floor(Math.random() * adjectives.length)];

    const animal =
      animals[Math.floor(Math.random() * animals.length)];

    const number = Math.floor(Math.random() * 1000);

    name = `${adjective} ${animal} ${number}`;

    exists = await User.exists({
      anonymousName: name
    });
  }

  return name;
};

export default generateAnonymousName;