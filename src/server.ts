// dependencies
import cron from 'cron'
import moment from 'moment'

// constants
const CronJob = cron.CronJob

// cron job function
const job = new CronJob('*/5 * * * * *', () => {
  // cron start date
  const jobDate = moment().format('LLLL')
  // logic
  console.log('-----------------------------------')
  console.log(`🍎 Cron job ${jobDate} executed. 🍏`)
  const sponsorDate = '2020-08-16T22:45:03.154Z'
  const localTime = moment()
  const otherTime = moment(sponsorDate)
  const difference = (localTime.diff(otherTime, 'days') >= 24)
  if (difference === true) {
    console.log('Yes')
  } else if (difference === false) {
    console.log('No')
  } else {
    console.log('An error occored.')
  }
  console.log('-----------------------------------')
}, null, true, 'Europe/Lisbon')

job.start()
