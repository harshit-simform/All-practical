const inquirer = require("inquirer");
const shop_schedule = require("./SHOP_SCHEDULE.json");
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
inquirer
  .prompt([
    {
      type: "input",
      name: "time_day",
      message: "Enter time and day check shop is open or not!",
      default() {
        const date = new Date();
        const day = days[date.getDay()];
        const time = date.toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        });
        return `${day} ${time}`;
      },
    },
  ])
  .then((answers) => {
    const timeDay = answers.time_day.split(" ");
    const day = timeDay[0];
    const time = timeDay[1];
    const meridian = timeDay[2];

    const foundDay = shop_schedule.find((element) => element.day === day);

    if (!foundDay) {
      console.log("closed");
    } else {
      const shopOpenTime = new Date(`01/02/2000 ${foundDay.open}`).getTime();
      const shopCloseTime = new Date(`01/02/2000 ${foundDay.close}`).getTime();
      const currentTime = new Date(
        `01/02/2000 ${new Date().toLocaleTimeString()}`
      ).getTime();

      if (currentTime >= shopOpenTime && currentTime <= shopCloseTime) {
        console.log("open");
        return;
      } else {
        console.log("closed");
      }
    }
  });
