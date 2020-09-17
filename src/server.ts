import Koa from 'koa'

const app = new Koa()

app.use(async (ctx) => {
  ctx.body = '🍎 Cron job runnig 🍏'
})

app.listen(5678)
