const PORT = process.env.PORT ?? 8000
const express = require('express')
const app = express()
const pool = require('./db')

//get all todos
app.get('/goals', async (req, res) => {
    try{
        const goals = await pool.query('SELECT * FROM goals WHERE user_email = $1', [user_email])
        res.json(goals.rows)
    } catch (err) {
        console.error(err)
    }
})

app.listen(PORT, ()=>console.log(`Server running on PORT ${PORT}`))