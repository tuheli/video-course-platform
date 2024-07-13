import { Router } from 'express';
import { getPresignedTopSecretDemovideoUrl } from '../aws-s3';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const presignedUrl = await getPresignedTopSecretDemovideoUrl();
    res.status(200).json({ presignedUrl });
  } catch (error) {
    next(error);
  }
});

export default router;
