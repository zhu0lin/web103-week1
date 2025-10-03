import pool from './database'
import dotenv from './dotenv'
import events from '../data/events'

async function createEventsTable() {

    const createTableQuery = `DROP TABLE IF EXISTS events;
        CREATE TABLE IF NOT EXISTS events (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        pricePoint VARCHAR(10) NOT NULL,
    )`

    try {
        const res = await pool.query(createTableQuery)
        console.log('🎉 events table created successfully')
    } catch (err) {
        console.error('⚠️ error creating events table', err)
    }
}

async function seedEventsTable() {
    await createEventsTable()

    events.forEach((event) => {
        const insertQuery = {
            text: 'INSERT INTO events (name, pricePoint,image,) VALUES ($1, $2, $3)'
        }
    })

    const values = [
        event.name,
        event.pricePoint,
        event.image,
    ]

    pool.query(insertQuery, values, (err, res) => {
        if (err) {
            console.error('⚠️ error inserting event', err)
            return
        }

        console.log(`✅ ${event.name} added successfully`)
    })

}

seedEventsTable()