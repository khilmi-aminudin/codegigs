// connection to databse
const Sequelize = require('sequelize')
module.exports = new Sequelize('d3epq309sbmg4u', 'djjphkwrybkhzp', 'e6428b943119968380b3602b262e1d11ba5fbdc3e88e727418cb366eabb087db', {
    host : 'ec2-35-169-254-43.compute-1.amazonaws.com',
    dialect : 'postgres',
    // operatorsAliases : false,

    pool : {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000 
    }
})
