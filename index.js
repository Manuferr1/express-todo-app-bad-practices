import express from "express"
import bodyParser from "body-parser"
const port = 8000; //mejor a una variable de entorno


// === initialisation == //
app = express()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// === store == //
const todoItems = [];
todoItems.push({ index: 1, value: "learn react", done: false });
todoItems.push({ index: 2, value: "Go shopping", done: true });
todoItems.push({ index: 3, value: "buy flowers", done: true });

const index = 5;


// === endpoints == //
// index endpoint
app.get('/', (req, res) => res.send('Hello World!'))

// get all tasks
app.get('/task', (req, res) => {
    return res.json({ data: todoItems, status: "success" })
})

// create a task
app.post('/task', (req, res) => {
    todoItems.push({
        index: index++,
        value: req.body.value,
        done: false,
    })
    return res.json({ data: todoItems, status: 'success' })
})

// delete a task
app.delete('/task/:id', (req, res) => {
    const todoItems = todoItems.filter(d => d.index != +req.params.id)
    return res.json({ data: todoItems, status: 'success' })
})

// update a task
app.patch('/task/:id', (req, res) => {
    todoItems.filter(d => d.index == +req.params.id)[0].done = req.body.done
    return res.json({ data: todoItems, status: 'success' })
})


// === run app == //
app.listen(port, () => console.log(`Example app running!`))