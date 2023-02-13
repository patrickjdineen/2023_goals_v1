const PORT = process.env.PORT ?? 8000
const express = require('express')
const { v4: uuidv4 } = require('uuid')
const app = express()
const pool = require('./db')
const cors = require('cors')
const bCrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

app.use(cors())
app.use(express.json())


//get all goals
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

//create goal
app.post('/goals', async (req,res) =>{
    const {user_email, title, progress, date} = req.body
    console.log(user_email,title, progress, date)
    const id = uuidv4()
    try{
        const newGoal = await pool.query(`INSERT INTO goals(id, user_email, title, progress, date) VALUES ($1, $2, $3, $4, $5)`,
        [id, user_email, title, progress, date])
        res.json(newGoal)
    } catch(err){
        console.log(err)}
})

//edit goal
app.put('/goals/:id', async (req, res) =>{
    const {id} = req.params
    const {user_email, title, progress, date } = req.body
    try{
        const editGoal = await pool.query(`UPDATE goals SET user_email = $1, title= $2, progress=$3, date=$4 WHERE id = $5;`,
        [user_email, title, progress, date, id])
        res.json(editGoal)
    }catch(err){
        console.log(err)
    }
})

//delete goal
app.delete('/goals/:id', async (req, res) =>{
    const {id} = req.params
    try{
        const deleteGoal = await pool.query(`DELETE FROM goals WHERE id=$1;`,
        [id])
        res.json(deleteGoal)
    } catch(err){
        console.log(err)
    }
})

//Auth
//signup
app.post('/signup', async (req, res) => {
    const { email, password } = req.body
    const salt = bCrypt.genSaltSync(10)
    const hashPass = bCrypt.hashSync(password, salt)
    try{
        const signUp = await pool.query(`INSERT INTO users (email, hashed_password) VALUES ($1,$2);`,
        [email, hashPass])

        const token = jwt.sign({email}, 'secret', {expiresIn: '1hr'})

        res.json({email, token})
    }catch(err){
        console.log(err)}
})

//login
app.post('/login', async (req, res) => {
    const { email, password } = req.body
    try{

    }catch(err){
        console.log(err)}
})

app.listen(PORT, ()=>console.log(`Server running on PORT ${PORT}`))