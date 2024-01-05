const { Sequelize } = require('sequelize')
const { envs } = require('../environments/environments')

const sequelize = new Sequelize(envs.DB_URI, {
    logging: false
})

const authenticated = async () => {
    try {
        await sequelize.authenticate()
        console.log('Connection has been established succesfully 🎊');
    } catch (error) {
        console.log(error);
    }
}

const syncUp = async () => {
    try {
        // await sequelize.sync({ force: true })
        await sequelize.sync()
        console.log('Connection has been synced succesfully 🔁');
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    authenticated,
    syncUp,
    sequelize
}