#!/usr/bin/env node

// const ora = require("ora");

const axios = require("axios");
const { getCode } = require("country-list");
const chalk = require("chalk");
const figlet = require("figlet");

const country = getCode(process.argv[2]);
const year = process.argv[3] || new Date().getFullYear();

// if (process.argv[3] != Number) {
//   console.log("is not a number");
// }

async function getHolidays() {
  try {
    const response = await axios.get(
      `https://date.nager.at/api/v3/PublicHolidays/${year}/${country}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

async function displayHolidays() {
  const holidays = await getHolidays();
  const aka = " aka ";
  try {
    holidays.map((holiday) =>
      console.log(
        `${chalk.greenBright.bold.underline(
          holiday.date
        )}: ${chalk.magenta.italic(holiday.name)}${chalk.grey(
          aka
        )}> ${chalk.cyanBright(holiday.localName)}`
      )
    );
    return "";
  } catch (error) {
    console.error(error);
  }
}

figlet("Holidays !", function (error, holidaysTitle) {
  if (error) {
    console.log("Oupsie, doesn't work...");
    console.dir(error);
  }
  console.log(chalk.whiteBright(holidaysTitle));
});
displayHolidays();
