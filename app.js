const inquirer = require("inquirer"); // package for prompting it to the terminal
const shop_schedule = require("./SHOP_SCHEDULE.json");
const weekDay = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

inquirer
  .prompt([
    {
      type: "input",
      name: "time_day",
      message: "Enter time and day check shop is open or not!",
      default() {
        const date = new Date();
        const day = weekDay[date.getDay()];
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
    const day = answers.time_day.split(" ")[0];
    const foundDay = shop_schedule.find((element) => element.day === day);

    const currentTime = new Date(
      `01/02/2000 ${new Date().toLocaleTimeString()}`
    ).getTime();

    if (!foundDay) {
      printNextOpenDay(foundDay, currentTime);
      return;
    } else {
      const shopOpenTime = new Date(`01/02/2000 ${foundDay.open}`).getTime();
      const shopCloseTime = new Date(`01/02/2000 ${foundDay.close}`).getTime();
      if (currentTime >= shopOpenTime && currentTime <= shopCloseTime) {
        const timeRemainForClose = new Date(shopCloseTime - currentTime);
        console.log(
          `Shop is open for another ${timeRemainForClose.getUTCHours()}hr : ${timeRemainForClose.getUTCMinutes()}min`
        );
        return;
      } else if (currentTime < shopOpenTime) {
        const timeRemainForOpen = new Date(shopOpenTime - currentTime);
        console.log(
          `Shop is closed will open after ${timeRemainForOpen.getUTCHours()}hr : ${timeRemainForOpen.getUTCMinutes()}min`
        );
        return;
      } else {
        printNextOpenDay(foundDay, currentTime);
        return;
      }
    }
  });

// function for finding next day details
function findNextDayDetails(foundDay) {
  let totalHourClosed = 0;
  const currentDayIndex = foundDay
    ? new Date().getDay() + 1
    : new Date().getDay();
  if (
    shop_schedule.find(
      (element) => element.day === weekDay[currentDayIndex + 1]
    )
  ) {
    const index = shop_schedule.findIndex(
      (element) => element.day === weekDay[currentDayIndex + 1]
    );
    return { index, totalHourClosed };
  }
  for (let i = currentDayIndex; i < weekDay.length; i++) {
    totalHourClosed += 24;
    if (shop_schedule.find((element) => element.day === weekDay[i])) {
      totalHourClosed = totalHourClosed === 24 ? 0 : totalHourClosed;
      const nextOpenDay = weekDay[i];
      const index = shop_schedule.findIndex(
        (element) => element.day === nextOpenDay
      );
      return { index, totalHourClosed };
    }
    i = i === weekDay.length - 1 ? 0 : i;
  }
}

// function for finding next day on which shop is opening
function printNextOpenDay(foundDay, currentTime) {
  const detailsOfNextDay = findNextDayDetails(foundDay);
  const nextOpenDay = new Date(
    `01/02/2000 ${shop_schedule[detailsOfNextDay.index].open}`
  ).getTime();
  const timeRemainForOpen = new Date(nextOpenDay - currentTime);
  console.log(
    `Shop is closed will open after ${
      timeRemainForOpen.getUTCHours() + detailsOfNextDay.totalHourClosed
    }hr : ${timeRemainForOpen.getUTCMinutes()}min`
  );
}
