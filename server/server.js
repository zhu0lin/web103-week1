import express from 'express'
import eventsRouter from './routes/events.js'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

const publicDir = path.resolve(__dirname, '../public')

// Serve static assets from client/public at the root
app.use(express.static(publicDir))
app.use('/scripts', express.static(path.join(publicDir, 'scripts')))
app.use('/images', express.static(path.join(publicDir, 'images')))

app.use('/events', eventsRouter)

const PORT = process.env.PORT || 3001

app.get('/', (req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'))
})

// Catch-all for 404 - serve custom 404 page
app.use((req, res) => {
  res.status(404).sendFile(path.join(publicDir, '404.html'))
})

app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`)
})