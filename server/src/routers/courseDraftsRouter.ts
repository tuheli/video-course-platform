import { Router } from 'express';
import { userExtractor } from '../middleware';
import {
  createCourseDraft,
  createCurriculumSection,
  createIntendedLearner,
  createLearningObjective,
  createLesson,
  createPrerequisite,
  deleteIntendedLearner,
  deleteLearningObjective,
  deleteLesson,
  deletePrerequisite,
  deleteSection,
  getCourseDraft,
  getCourseDrafts,
  updateCourseDraftCourseGoals,
  updateCurriculumSections,
} from '../queries/courseDraftQueries';
import {
  finishUpload,
  getPresignedUrlForUploadedVideo,
  initiateMultipartUpload,
} from '../aws-s3';
import {
  createMultipartUpload,
  finishMultipartUpload,
  getKeyByUploadId,
  getUploadedVideoKey,
} from '../queries/awsUploadQueries';
import {
  toCreateCourseDraftRequestBody,
  toCreateLectureRequestBody,
  toCreateLearningObjectiveRequestBody,
  toCreatePrerequisiteRequestBody,
  toCreateIntendedLearnerRequestBody,
  toUpdateCourseGoalsRequestBody,
  toUpdateCurriculumSectionsRequestBody,
} from '../type-guards-and-parsers';

const router = Router();

router.post(
  '/:coursedraftid/sections/:sectionid/lessons/:lessonid/initiatevideoupload',
  userExtractor,
  async (req, res, next) => {
    try {
      if (!req.user) {
        return res
          .status(401)
          .json({ message: 'User was not found. Please sign in.' });
      }

      const lessonId = parseInt(req.params.lessonid);
      const uploadInitiationResult = await initiateMultipartUpload(req.body);

      await createMultipartUpload({
        key: uploadInitiationResult.multipartUploadKey,
        uploadId: uploadInitiationResult.uploadId,
        userId: req.user.id,
        lessonId,
        expirationTime: uploadInitiationResult.expirationTime.toISOString(),
        creationTime: uploadInitiationResult.creationTime.toISOString(),
      });

      return res.status(200).json(uploadInitiationResult);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/finishupload', userExtractor, async (req, res, next) => {
  try {
    if (!req.user) {
      return res
        .status(401)
        .json({ message: 'User was not found. Please sign in.' });
    }
    const { uploadId, parts } = req.body;
    const key = await getKeyByUploadId(uploadId);
    await finishUpload({ key, uploadId, parts });
    await finishMultipartUpload({ uploadId, userId: req.user.id });
    return res.status(201).json({ message: 'Video upload was successful.' });
  } catch (error) {
    next(error);
  }
});

router.post('/', userExtractor, async (req, res, next) => {
  try {
    const createCourseDraftRequestBody = toCreateCourseDraftRequestBody(
      req.body
    );

    const databaseResult = await createCourseDraft(
      createCourseDraftRequestBody.newCourseDraftEntry
    );

    return res.status(201).json(databaseResult);
  } catch (error) {
    next(error);
  }
});

router.post(
  '/:coursedraftid/sections',
  userExtractor,
  async (req, res, next) => {
    try {
      if (!req.user) {
        return res
          .status(401)
          .json({ message: 'User was not found. Please sign in.' });
      }

      const courseDraftId = parseInt(req.params.coursedraftid);
      await createCurriculumSection({ courseDraftId, userId: req.user.id });
      return res.sendStatus(201);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/:coursedraftid/sections/:sectionid/lessons',
  userExtractor,
  async (req, res, next) => {
    try {
      if (!req.user) {
        return res
          .status(401)
          .json({ message: 'User was not found. Please sign in.' });
      }

      const sectionId = parseInt(req.params.sectionid);
      const requestBody = toCreateLectureRequestBody(req.body);

      await createLesson({
        curriculumSectionId: sectionId,
        userId: req.user.id,
        title: requestBody.title,
      });
      return res.sendStatus(201);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/:coursedraftid/goals/learningobjectives',
  userExtractor,
  async (req, res, next) => {
    try {
      if (!req.user) {
        return res
          .status(401)
          .json({ message: 'User was not found. Please sign in.' });
      }

      const createLearningObjectiveRequestBody =
        toCreateLearningObjectiveRequestBody(req.body);

      const courseDraftId = parseInt(req.params.coursedraftid);

      if (isNaN(courseDraftId)) {
        return res.status(400).json({ message: 'Invalid course draft id.' });
      }

      const courseDraftInDatabase = await getCourseDraft({
        userId: req.user.id,
        courseDraftId,
      });

      const isCourseDraftInDatabase = courseDraftInDatabase !== null;

      if (!isCourseDraftInDatabase) {
        return res.status(404).json({ message: 'Course draft was not found.' });
      }

      const createdLearningObjective = await createLearningObjective({
        userId: req.user.id,
        courseDraftId,
        text: createLearningObjectiveRequestBody.learningObjective,
        orderIndex: createLearningObjectiveRequestBody.orderIndex,
      });

      return res.status(201).json(createdLearningObjective);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/:coursedraftid/goals/prerequisites',
  userExtractor,
  async (req, res, next) => {
    try {
      if (!req.user) {
        return res
          .status(401)
          .json({ message: 'User was not found. Please sign in.' });
      }

      const createPrerequisiteRequestBody = toCreatePrerequisiteRequestBody(
        req.body
      );

      const courseDraftId = parseInt(req.params.coursedraftid);

      if (isNaN(courseDraftId)) {
        return res.status(400).json({ message: 'Invalid course draft id.' });
      }

      const courseDraftInDatabase = await getCourseDraft({
        userId: req.user.id,
        courseDraftId,
      });

      const isCourseDraftInDatabase = courseDraftInDatabase !== null;

      if (!isCourseDraftInDatabase) {
        return res.status(404).json({ message: 'Course draft was not found.' });
      }

      const createdPrerequisite = await createPrerequisite({
        userId: req.user.id,
        courseDraftId,
        text: createPrerequisiteRequestBody.prerequisite,
        orderIndex: createPrerequisiteRequestBody.orderIndex,
      });

      return res.status(201).json(createdPrerequisite);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/:coursedraftid/goals/intendedlearners',
  userExtractor,
  async (req, res, next) => {
    try {
      if (!req.user) {
        return res
          .status(401)
          .json({ message: 'User was not found. Please sign in.' });
      }

      const createIntendedLearnerRequestBody =
        toCreateIntendedLearnerRequestBody(req.body);

      const courseDraftId = parseInt(req.params.coursedraftid);

      if (isNaN(courseDraftId)) {
        return res.status(400).json({ message: 'Invalid course draft id.' });
      }

      const courseDraftInDatabase = await getCourseDraft({
        userId: req.user.id,
        courseDraftId,
      });

      const isCourseDraftInDatabase = courseDraftInDatabase !== null;

      if (!isCourseDraftInDatabase) {
        return res.status(404).json({ message: 'Course draft was not found.' });
      }

      const createdIntendedLearner = await createIntendedLearner({
        userId: req.user.id,
        courseDraftId,
        text: createIntendedLearnerRequestBody.intendedLearner,
        orderIndex: createIntendedLearnerRequestBody.orderIndex,
      });

      return res.status(201).json(createdIntendedLearner);
    } catch (error) {
      next(error);
    }
  }
);

router.get('/', userExtractor, async (req, res, next) => {
  try {
    if (!req.user) {
      return res
        .status(401)
        .json({ message: 'User was not found. Please sign in.' });
    }

    const courseDraftFromDatabaseResult = await getCourseDrafts(req.user.id);

    return res.status(200).json(courseDraftFromDatabaseResult);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:coursedraftid/sections/:sectionid/lessons/:lessonid/video/view',
  userExtractor,
  async (req, res, next) => {
    try {
      if (!req.user) {
        return res
          .status(401)
          .json({ message: 'User was not found. Please sign in.' });
      }

      const coursedraftid = parseInt(req.params.coursedraftid);
      const sectionid = parseInt(req.params.sectionid);
      const lessonId = parseInt(req.params.lessonid);

      if (isNaN(coursedraftid) || isNaN(sectionid) || isNaN(lessonId)) {
        return res.status(404).json({ message: 'Invalid request.' });
      }

      const lessonKeyInAws = await getUploadedVideoKey(lessonId, req.user.id);

      if (!lessonKeyInAws) {
        return res.status(404).json({ message: 'Video was not found.' });
      }

      const presignedUrl =
        await getPresignedUrlForUploadedVideo(lessonKeyInAws);
      return res.status(200).json({ presignedUrl });
    } catch (error) {
      next(error);
    }
  }
);

router.put('/:coursedraftid/goals', userExtractor, async (req, res, next) => {
  try {
    if (!req.user) {
      return res
        .status(401)
        .json({ message: 'User was not found. Please sign in.' });
    }

    const courseDraftId = parseInt(req.params.coursedraftid);
    const updateCourseGoalsRequestBody = toUpdateCourseGoalsRequestBody(
      courseDraftId,
      req.body
    );

    await updateCourseDraftCourseGoals({
      courseDraftId,
      userId: req.user.id,
      updateRequest: updateCourseGoalsRequestBody,
    });

    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

router.put(
  '/:coursedraftid/curriculum/sections/',
  userExtractor,
  async (req, res, next) => {
    try {
      if (!req.user) {
        return res
          .status(401)
          .json({ message: 'User was not found. Please sign in.' });
      }

      const courseDraftId = parseInt(req.params.coursedraftid);
      const updateCurriculumSectionsRequestBody =
        toUpdateCurriculumSectionsRequestBody(req.body);

      await updateCurriculumSections({
        userId: req.user.id,
        courseDraftId,
        requestBody: updateCurriculumSectionsRequestBody,
      });

      return res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:coursedraftid/goals/learningobjectives/:learningobjectiveid',
  userExtractor,
  async (req, res, next) => {
    try {
      if (!req.user) {
        return res
          .status(401)
          .json({ message: 'User was not found. Please sign in.' });
      }

      const courseDraftId = parseInt(req.params.coursedraftid);

      if (isNaN(courseDraftId)) {
        return res.status(400).json({ message: 'Invalid course draft id.' });
      }

      const learningObjectiveId = parseInt(req.params.learningobjectiveid);

      if (isNaN(learningObjectiveId)) {
        return res
          .status(400)
          .json({ message: 'Invalid learning objective id.' });
      }

      await deleteLearningObjective({
        userId: req.user.id,
        learningObjectiveId,
      });

      return res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:coursedraftid/goals/prerequisites/:prerequisiteid',
  userExtractor,
  async (req, res, next) => {
    try {
      if (!req.user) {
        return res
          .status(401)
          .json({ message: 'User was not found. Please sign in.' });
      }

      const courseDraftId = parseInt(req.params.coursedraftid);

      if (isNaN(courseDraftId)) {
        return res.status(400).json({ message: 'Invalid course draft id.' });
      }

      const prerequisiteId = parseInt(req.params.prerequisiteid);

      if (isNaN(prerequisiteId)) {
        return res.status(400).json({ message: 'Invalid prerequisite id.' });
      }

      await deletePrerequisite({
        userId: req.user.id,
        prerequisiteId,
      });

      return res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:coursedraftid/goals/intendedlearners/:intendedlearnerid',
  userExtractor,
  async (req, res, next) => {
    try {
      if (!req.user) {
        return res
          .status(401)
          .json({ message: 'User was not found. Please sign in.' });
      }

      const courseDraftId = parseInt(req.params.coursedraftid);

      if (isNaN(courseDraftId)) {
        return res.status(400).json({ message: 'Invalid course draft id.' });
      }

      const intendedLearnerId = parseInt(req.params.intendedlearnerid);

      if (isNaN(intendedLearnerId)) {
        return res
          .status(400)
          .json({ message: 'Invalid intended learner id.' });
      }

      await deleteIntendedLearner({
        userId: req.user.id,
        intendedLearnerId,
      });

      return res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:coursedraftid/sections/:sectionid/lessons/:lessonid',
  userExtractor,
  async (req, res, next) => {
    try {
      if (!req.user) {
        return res
          .status(401)
          .json({ message: 'User was not found. Please sign in.' });
      }

      const lessonId = parseInt(req.params.lessonid);

      await deleteLesson({
        userId: req.user.id,
        lessonId,
      });

      return res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:coursedraftid/sections/:sectionid',
  userExtractor,
  async (req, res, next) => {
    try {
      if (!req.user) {
        return res
          .status(401)
          .json({ message: 'User was not found. Please sign in.' });
      }

      const sectionId = parseInt(req.params.sectionid);

      await deleteSection({
        userId: req.user.id,
        sectionId,
      });

      return res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
