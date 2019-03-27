import ora from 'ora';
import { getLocation } from '../utils/location';
import { getWeather } from '../utils/weather';

export async function today(args) {
  const spinner = ora().start();

  try {
    const location = args.location || args.l || (await getLocation());
    const weather = await getWeather(location);

    spinner.stop();

    console.log(`Current conditions in ${location}:`);
    console.log(`\t${weather.condition.temp}° ${weather.condition.text}`);
  } catch (err) {
    spinner.stop();
    console.error(err);
  }
}
