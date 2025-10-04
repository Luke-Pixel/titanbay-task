import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import fundRoutes from './routes/funds'
import investorRoutes from './routes/investors'

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())

// routes
app.use('/funds', fundRoutes)
app.use('/investors', investorRoutes)

export default app
