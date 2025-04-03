const registerRoutes = app => {
  app.use('/api/user', require('@app/routes/user'))
  app.use('/', (_, res) => res.send('Api server is up'))
}

module.exports = registerRoutes
