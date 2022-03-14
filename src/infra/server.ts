import { app } from './app'

// eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
const port = process.env.SERVER_PORT ?? 3333

app.listen(port, () => {
  console.log(`Server is running on port: http://localhost:${port}`)
})
