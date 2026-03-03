import { config } from 'dotenv'
import { app } from './app.js'
import { connect } from './config/dbConnection.js'
config()

const port = process.env.PORT || 3000


connect().then(() => {
    app.listen(port, () => {
        console.log(`Server started at : http://localhost:${port}`)
    })
})
    .catch((err) => {
        console.log("App error :", err)
    })

