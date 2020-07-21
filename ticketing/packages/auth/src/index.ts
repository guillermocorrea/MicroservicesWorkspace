import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';

import { NotFoundError } from './errors/not-found-error';
import { errorHandler } from './middlewares/error-handler';
import { meRouter } from './routes/me';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';

const app = express();
app.use(json());

app.use(meRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

app.listen(3000, () => console.log('"@ticketing/auth" listening on port 3000'));
