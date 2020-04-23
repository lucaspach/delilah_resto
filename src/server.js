import app from './app/app'
import config from './config'
import Sequelize from 'sequelize'

//const dbQueryString = `mysql://${config.DDBB.USER}:${config.DDBB.PASS}@${config.DDBB.HOST}:${config.DDBB.PORT}/${config.DDBB.NAME}`
const sequelize = new Sequelize(config.DDBB.NAME, config.DDBB.USER, config.DDBB.PASS, {
    host: config.DDBB.HOST,
    dialect: "mysql"
})
//const sequelize = new Sequelize(dbQueryString)

sequelize
    .authenticate()
    .then(() => {
        console.log('Database connection has been established successfully.')

        app.listen(config.SERVER_PORT, () => {
        console.log(`Server is running at port ${config.SERVER_PORT}`)
        })
    })
    .catch(err => console.error('Unable to connect to the database:', err))

export default sequelize