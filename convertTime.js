const inquirer = require("inquirer");
const data = require("./timeZoneName.json");

const timeZone = [
  "Coordinated Universal Time (UTC)",
  "Greenwich Mean Time (GMT)",
  "British Summer Time (BST)",
  "Central European Time (CET)",
  "Central European Summer Time (CEST)",
  "Eastern European Time (EET)",
  "Eastern European Summer Time (EEST)",
  "Moscow Standard Time (MSK)",
  "Arabian Standard Time (AST)",
  "Gulf Standard Time (GST)",
  "Indian Standard Time (IST)",
  "Pakistan Standard Time (PKT)",
  "Bangladesh Standard Time (BST)",
  "Japan Standard Time (JST)",
  "Australian Eastern Standard Time (AEST)",
  "Australian Central Standard Time (ACST)",
  "Australian Western Standard Time (AWST)",
  "New Zealand Standard Time (NZST)",
  "Norfolk Island Time (NFT)",
  "Hawaii Standard Time (HST)",
  "Alaska Standard Time (AKST)",
  "Pacific Standard Time (PST)",
  "Mountain Standard Time (MST)",
  "Central Standard Time (CST)",
  "Eastern Standard Time (EST)",
  "Atlantic Standard Time (AST)",
  "Newfoundland Standard Time (NST)",
];

inquirer
  .prompt([
    {
      type: "input",
      name: "current_time",
      message: "Enter Current Time",
      default() {
        return new Date().toLocaleTimeString();
      },
    },
    {
      type: "list",
      name: "current_time_zone",
      message: "Choose your current time zone",
      choices: timeZone,
    },
    {
      type: "list",
      name: "convert_time_zone",
      message: "Choose Timezone which wanted to convert to!",
      choices: timeZone,
    },
  ])
  .then((answers) => {
    const currentTime = new Date(`05/16/2023 ${answers.current_time}`);
    const currentTimeZone = data[answers.current_time_zone]; // getting current time
    const convertTimeZone = data[answers.convert_time_zone]; // getting time zone to which current time has to be converted

    const originalTime = currentTime.toLocaleTimeString("en-US", {
      timeZone: `${currentTimeZone}`,
    });

    const convertedTime = currentTime.toLocaleTimeString("en-US", {
      timeZone: `${convertTimeZone}`,
    });

    console.log(`Original Time: ${originalTime}`);
    console.log(`Converted Time: ${convertedTime}`);
  });
