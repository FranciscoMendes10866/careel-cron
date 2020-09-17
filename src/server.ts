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
  const dummyJSON = [
    {
      id: 1,
      sponsor_date: '2020-08-16T22:45:03.154Z'
    },
    {
      id: 2,
      sponsor_date: '2020-08-16T22:45:03.154Z'
    },
    {
      id: 3,
      sponsor_date: '2020-09-01T22:45:03.154Z'
    }
  ]
  // reformat dummyJSON array
  const reformatArray = dummyJSON.map(obj => obj.sponsor_date)
  // current execution timestamp
  const currentTime = moment()
  // converts the reformatArray (string) into a timestamp
  const convertion = []
  reformatArray.forEach((item) => {
    const convertSponsor = moment(item)
    convertion.push(convertSponsor)
  })
  // checks the difference between the two timestamps
  const validation = []
  convertion.forEach((item) => {
    const result = (currentTime.diff(item, 'days') >= 24)
    validation.push(result)
  })
  const validatedIds = dummyJSON
    // eslint-disable-next-line no-sequences
    .reduce((s, { id }, i) => (validation[i] ? s.push(id) : s, s), [])
  // prints all the logic
  console.log({
    db: dummyJSON,
    reformated: reformatArray,
    converted: convertion,
    validated: validation,
    validatedID: validatedIds
  })
  console.log('-----------------------------------')
}, null, true, 'Europe/Lisbon')

job.start()
