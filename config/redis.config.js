const redis = require('redis')

const client = redis.createClient({
    host: 'redis-13711.c292.ap-southeast-1-1.ec2.cloud.redislabs.com',
    port: 13711,
    username: 'default',
    password: 'iVLIgkHVrmDOXK0ggmpgS3YmRasSWLYB'
})

client.on('connect', () => {
    console.log('Client connected to redis...')
})

client.on('ready', () => {
    console.log('Connection is establishing now...')
})

client.on('error', (err) => {
    console.log(err.message)
})

client.on('end', () => {
    console.log('Client disconnected from redis')
})

module.exports = client

