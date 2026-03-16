const express = require('express');
const postsRouter = require("./routers/posts");
const errorHandler = require('./middlewares/errorHandler');
const notFound = require('./middlewares/notFound');

const app = express()
const port = 3000

app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use("/posts", postsRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
 console.log(`Example app listening on http://localhost:${port}/`)
})
