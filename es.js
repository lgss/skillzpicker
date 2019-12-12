require('dotenv').config();
const es = require('elasticsearch');

const client = new es.Client({
    host: process.env.ELASTICDB,
    log: 'trace',
    apiVersion: '7.2'
});

client.indices.initialize = (params) =>
    client.indices.exists(params)
        .then(exists => {
            if (!exists) {
                return client.indices.create(params).then(()=>{console.log(`Generated ${params.index} index`)})
            }
        });


client.ping({
    requestTimeout: 30000,
}, function (error) {
    if (error) {
        console.error('elasticsearch cluster is down!');
    } else {
        console.log('Connected to elasticsearch');
    }
});
module.exports = client;