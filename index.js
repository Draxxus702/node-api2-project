const server = require('./api/server.js')

PORT = 5005

server.listen(PORT, ()=>{
    console.log(`\n *** API is running on http://localhost:${PORT} *** \n`)
})