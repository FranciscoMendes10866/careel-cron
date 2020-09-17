import cron from 'cron'
import moment from 'moment'

const CronJob = cron.CronJob

const job = new CronJob('*/5 * * * * *', () => {
  console.log('🍎 Cron job running every 5 sec. 🍏')
  const sponsorDate = '2020-08-16T22:45:03.154Z'
  const localTime = moment()
  const otherTime = moment(sponsorDate)
  const difference = (localTime.diff(otherTime, 'days') >= 24)
  if (difference === true) {
    console.log('Yes')
  } else if (difference === false) {
    console.log('No')
  } else {
    console.log('Valor incorreto.')
  }
}, null, true, 'Europe/Lisbon')

job.start()
