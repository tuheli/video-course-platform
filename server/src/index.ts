import express from 'express';
import cors from 'cors';
import { connectToDatabase } from './database';
import { port } from './config';
import signupRouter from './routers/signupRouter';
import signinRouter from './routers/signinRouter';
import courseDraftsRouter from './routers/courseDraftsRouter';
import topSecretDemovideoRouter from './routers/topSecretDemovideoRouter';
import validateAuthorizationTokenRouter from './routers/validateAuthorizationTokenRouter';
import { errorHandler, requestLogger } from './middleware';
import path from 'path';

const relativeDistPath =
  process.env.NODE_ENV === 'production' ? './' : '../dist';
const absoluteDistPath = path.join(__dirname, relativeDistPath);

const isCrossOriginAllowed = process.env.NODE_ENV !== 'production';

const app = express();

if (isCrossOriginAllowed) {
  app.use(cors());
} else {
  app.use(
    cors({
      origin: 'https://server-dawn-night-7149-video-course-platform.fly.dev',
      optionsSuccessStatus: 200,
    })
  );
}
app.use(express.json());
app.use(requestLogger);
app.use('/', express.static(absoluteDistPath));
app.use('/api/signup', signupRouter);
app.use('/api/signin', signinRouter);
app.use('/api/coursedrafts', courseDraftsRouter);
app.use('/api/topsecretdemovideo', topSecretDemovideoRouter);
app.use('/api/validateauthorizationtoken', validateAuthorizationTokenRouter);
app.get('/*', (req, res) => {
  if (req.originalUrl.startsWith('/api')) {
    return res.status(404).json({ message: 'Unknown endpoint.' });
  } else {
    const filepath = absoluteDistPath + 'index.html';
    return res.sendFile(filepath);
  }
});
app.use(errorHandler);

// NOTE: Dont catch potential errors
// here. Let a potentially unhandled error
// shut down the process intentionally.
// It could be a configuration error at
// connect to database.

const start = async () => {
  await connectToDatabase();

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

start();
