const PORT = process.env.PORT ?? 8000
const express = require('express')
const app = express()
const pool = require('./db')
const cors = require('cors')

app.use(cors())

//get all todos
app.get('/goals/:userEmail', async (req, res) => {
    console.log(req)
    const { userEmail } = req.params
    console.log(userEmail)
    try{
        const goals = await pool.query('SELECT * FROM goals WHERE user_email = $1', [userEmail])
        res.json(goals.rows)
    } catch (err) {
        console.error(err)
    }
})

app.listen(PORT, ()=>console.log(`Server running on PORT ${PORT}`))