// dependencies
import cron from 'cron'
import moment from 'moment'
import { Context } from 'koa'

import runCron from './cron'

// const && vars
const CronJob = cron.CronJob
let ctx

// cron job (runs every 5 sec)
const job = new CronJob('*/5 * * * * *', () => {
  // cron start date
  const jobDate = moment().format('LLLL')
  console.log('-------------------------------------------------------------')
  console.log(`🍎 Cron job ${jobDate} executed. 🍏`)
  // cron function
  runCron(ctx as Context)
  console.log('-------------------------------------------------------------')
}, null, true, 'Europe/Lisbon')

job.start()
