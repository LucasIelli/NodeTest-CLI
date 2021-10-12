#!/usr/bin/env node

import ora from "ora";
import axios from "axios";
import { getCode } from "country-list";
import chalk from "chalk";
import figlet from "figlet";

const country = getCode(process.argv[2]);
const year = process.argv[3] || new Date().getFullYear();

figlet("Holidays !", function (error, holidaysTitle) {
  if (error) {
    console.log("Oupsie, doesn't work...");
    console.dir(error);
  }
  console.log(chalk.whiteBright(holidaysTitle));
});

const spinner = ora("Fetching Data").start();

// if (process.argv[3] != Number) {
//   console.log("is not a number");
// }

async function getHolidays() {
  try {
    const response = await axios.get(
      `https://date.nager.at/api/v3/PublicHolidays/${year}/${country}`
    );
    if (response.status === 200) {
      spinner.succeed("Data is fetched");
      return response.data;
    }
    return response.data;
  } catch (error) {
    spinner.fail("This country does not exist in our Database");
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
  } catch (error) {
    spinner.fail("Fetching Data failed");
  }
}

displayHolidays();
