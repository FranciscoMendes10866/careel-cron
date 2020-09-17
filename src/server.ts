// dependencies
import cron from 'cron'
import moment from 'moment'

// constants
const CronJob = cron.CronJob

// cron job function (runs every 5 sec)
const job = new CronJob('*/5 * * * * *', () => {
  // cron start date
  const jobDate = moment().format('LLLL')
  // logic
  console.log('-----------------------------------')
  console.log(`🍎 Cron job ${jobDate} executed. 🍏`)
  // supposed data that comes from the database
  const sponsorDate = '2020-08-16T22:45:03.154Z'
  // current execution timestamp
  const currentTime = moment()
  // converts the sponsorDate (string) into a timestamp
  const convertSponsor = moment(sponsorDate)
  // checks the difference between the two timestamps
  const result = (currentTime.diff(convertSponsor, 'days') >= 24)
  // response
  if (result === true) {
    console.log('Yes')
  } else if (result === false) {
    console.log('No')
  } else {
    console.log('An error occored.')
  }
  console.log('-----------------------------------')
}, null, true, 'Europe/Lisbon')

job.start()
