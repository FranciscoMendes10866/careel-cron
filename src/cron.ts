import moment from 'moment'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const runCron = async (ctx) => {
  // gets all the sponsorships
  const Sponsors = await prisma.sponsorships.findMany({
    where: {
      still_online: true
    },
    select: {
      id: true,
      sponsor_date: true
    }
  })
  // if the array is not empty
  if (Sponsors.length > 0) {
    // reformats the Sponsors array
    const reformatArray = Sponsors.map(obj => obj.sponsor_date)
    // current execution timestamp
    const currentTime = moment()
    // converts the reformatArray (strings) into timestamps
    const convertion = []
    reformatArray.forEach((item) => {
      const convertSponsor = moment(item)
      convertion.push(convertSponsor)
    })
    // checks the difference between the two timestamps
    const validation = []
    convertion.forEach((item) => {
      const result = (currentTime.diff(item, 'days') >= 30)
      validation.push(result)
    })
    // validates the validation array
    // to verify if we have an item with a "true" value
    const val = validation.includes(true)
    // if we have at least one, we will update it
    if (val === true) {
      // gets the corresponding Sponsors.id (when then validation item is true)
      const validatedIds = Sponsors
        // eslint-disable-next-line no-sequences
        .reduce((s, { id }, i) => (validation[i] ? s.push(id) : s, s), [])
      // then, we will update every single item to false
      validatedIds.forEach(async (item) => {
        await prisma.sponsorships.update({
          where: {
            id: item
          },
          data: {
            still_online: false
          }
        })
      })
      // update response
      console.log('Finnished the cron job with success.')
    } else if (val === false) {
      // if we don't have a single true value, we will stop the process
      console.log('Looks like their campaigns are still online.')
    }
  } else {
    // if the Sponsors array is empty
    console.log('The array was empty.')
  }
}

export default runCron
