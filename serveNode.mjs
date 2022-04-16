import express from 'express';
import { handler as ssrHandler } from './dist/server/entry.mjs';
const port = 8080;

const app = express();
app.use(ssrHandler);

app.listen(port, () => {
  console.log(`App being servered on ${port}`);
});
