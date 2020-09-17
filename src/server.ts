import cron from 'cron'

const CronJob = cron.CronJob

const job = new CronJob('*/5 * * * * *', () => {
  console.log('Cron job running every 5 sec.')
}, null, true, 'Europe/Lisbon')

job.start()
