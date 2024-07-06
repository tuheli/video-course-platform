import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  CourseDraft,
  ICurriculumSection,
  NewCourseDraftEntry,
  ReorderableTextArrayObject,
  TextWithId,
} from './courseDraftsSlice';
import { RootState } from '../app/store';

export interface CredentialsNotSafe {
  email: string;
  password: string;
}

export interface SignupRequestBody {
  credentialsNotSafe: CredentialsNotSafe;
  fullName: string;
  receiveInsiderEmails: boolean;
}

export interface SignInRequestBody {
  credentialsNotSafe: CredentialsNotSafe;
}

interface CreateCourseDraftRequestBody {
  newCourseDraftEntry: NewCourseDraftEntry;
}

interface ValidateAuthorizationTokenRequestBody {
  userInDatabaseSafeWithToken: UserInDatabaseSafeWithToken;
}

interface UserInDatabaseSafe {
  id: number;
  email: string;
  fullName: string;
  receiveInsiderEmails: boolean;
}

export interface UserInDatabaseSafeWithToken extends UserInDatabaseSafe {
  authorizationToken: string;
}

export type GetCourseDraftsFromDatabaseResult = CourseDraft[];

export interface UpdateCourseGoalsRequestBody {
  courseDraftId: number;
  learningObjectives: ReorderableTextArrayObject;
  prerequisites: ReorderableTextArrayObject;
  intendedLearners: ReorderableTextArrayObject;
}

type ICurriculumSectionUpdateEntry = ICurriculumSection;

export interface UpdateCurriculumSectionsRequest {
  courseDraftId: number;
  entries: ICurriculumSectionUpdateEntry[];
}

export interface CreateLearningObjectiveRequestBody {
  courseDraftId: number;
  learningObjective: string;
  orderIndex: number;
}

export interface CreatePrerequisiteRequestBody {
  courseDraftId: number;
  prerequisite: string;
  orderIndex: number;
}

export interface CreateIntendedLearnerRequestBody {
  courseDraftId: number;
  intendedLearner: string;
  orderIndex: number;
}

export interface CreateCurriculumSectionRequest {
  courseDraftId: number;
}

interface CreateLectureRequest {
  courseDraftId: number;
  curriculumSectionId: number;
  lectureTitle: string;
}

interface DeleteLectureRequest {
  courseDraftId: number;
  curriculumSectionId: number;
  lectureId: number;
}

interface DeleteSectionRequest {
  courseDraftId: number;
  sectionId: number;
}

interface UploadVideoRequest {
  courseDraftId: number;
  sectionId: number;
  lectureId: number;
  videoFile: File;
}

interface CreateVideostreamTokenRequest {
  lectureId: number;
}

interface GetVideostreamTokenResult {
  token: string;
}

interface UploadChunkRequest {
  chunk: Blob;
  chunkId: number;
  fileId: number;
  fileSize: number;
  fileName: string;
}

export const toUserInDatabaseSafeWithToken = (
  data: unknown
): UserInDatabaseSafeWithToken | null => {
  if (!data || typeof data !== 'object') {
    return null;
  }

  if (!('id' in data)) {
    return null;
  }

  if (typeof data.id !== 'number') {
    return null;
  }

  if (!('email' in data)) {
    return null;
  }

  if (!data.email || typeof data.email !== 'string') {
    return null;
  }

  if (!('fullName' in data)) {
    return null;
  }

  if (!data.fullName || typeof data.fullName !== 'string') {
    return null;
  }

  if (!('receiveInsiderEmails' in data)) {
    return null;
  }

  if (typeof data.receiveInsiderEmails !== 'boolean') {
    return null;
  }

  if (!('authorizationToken' in data)) {
    return null;
  }

  if (!data.authorizationToken || typeof data.authorizationToken !== 'string') {
    return null;
  }

  return {
    id: data.id,
    email: data.email,
    fullName: data.fullName,
    receiveInsiderEmails: data.receiveInsiderEmails,
    authorizationToken: data.authorizationToken,
  };
};

export const apiSlice = createApi({
  reducerPath: 'api',
  tagTypes: ['CourseDrafts'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api/',
    prepareHeaders: (headers, { getState }) => {
      const authorizationToken = (getState() as RootState).me.user
        ?.authorizationToken;

      if (authorizationToken) {
        headers.set('authorization', `Bearer ${authorizationToken}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    ping: builder.query<string, void>({
      query: () => 'ping',
    }),
    signup: builder.mutation<UserInDatabaseSafe, SignupRequestBody>({
      query: (body) => ({
        url: 'signup',
        method: 'POST',
        body,
      }),
    }),
    signin: builder.mutation<UserInDatabaseSafeWithToken, SignInRequestBody>({
      query: (body) => ({
        url: 'signin',
        method: 'POST',
        body,
      }),
    }),
    createCourseDraft: builder.mutation<void, CreateCourseDraftRequestBody>({
      query: (body) => ({
        url: 'coursedrafts',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['CourseDrafts'],
    }),
    createLearningObjective: builder.mutation<
      TextWithId,
      CreateLearningObjectiveRequestBody
    >({
      query: (body) => ({
        url: `coursedrafts/${body.courseDraftId}/goals/learningobjectives`,
        method: 'POST',
        body: {
          learningObjective: body.learningObjective,
          orderIndex: body.orderIndex,
        },
      }),
      invalidatesTags: ['CourseDrafts'],
    }),
    createPrerequisite: builder.mutation<
      TextWithId,
      CreatePrerequisiteRequestBody
    >({
      query: (body) => ({
        url: `coursedrafts/${body.courseDraftId}/goals/prerequisites`,
        method: 'POST',
        body: {
          prerequisite: body.prerequisite,
          orderIndex: body.orderIndex,
        },
      }),
      invalidatesTags: ['CourseDrafts'],
    }),
    createIntendedLearner: builder.mutation<
      TextWithId,
      CreateIntendedLearnerRequestBody
    >({
      query: (body) => ({
        url: `coursedrafts/${body.courseDraftId}/goals/intendedlearners`,
        method: 'POST',
        body: {
          intendedLearner: body.intendedLearner,
          orderIndex: body.orderIndex,
        },
      }),
      invalidatesTags: ['CourseDrafts'],
    }),
    createCurriculumSection: builder.mutation<
      void,
      CreateCurriculumSectionRequest
    >({
      query: (body) => ({
        url: `coursedrafts/${body.courseDraftId}/sections`,
        method: 'POST',
      }),
      invalidatesTags: ['CourseDrafts'],
    }),
    createLecture: builder.mutation<void, CreateLectureRequest>({
      query: (body) => ({
        url: `coursedrafts/${body.courseDraftId}/sections/${body.curriculumSectionId}/lessons`,
        method: 'POST',
        body: {
          title: body.lectureTitle,
        },
      }),
      invalidatesTags: ['CourseDrafts'],
    }),
    updateCourseDraftGoals: builder.mutation<
      void,
      UpdateCourseGoalsRequestBody
    >({
      query: (body) => ({
        url: `coursedrafts/${body.courseDraftId}/goals`,
        method: 'PUT',
        body: {
          learningObjectives: body.learningObjectives,
          prerequisites: body.prerequisites,
          intendedLearners: body.intendedLearners,
        },
      }),
      invalidatesTags: ['CourseDrafts'],
    }),
    updateCurriculumSections: builder.mutation<
      void,
      UpdateCurriculumSectionsRequest
    >({
      query: (body) => ({
        url: `coursedrafts/${body.courseDraftId}/curriculum/sections`,
        method: 'PUT',
        body: {
          entries: body.entries,
        },
      }),
      invalidatesTags: ['CourseDrafts'],
    }),
    deleteLearningObjective: builder.mutation<
      void,
      { learningObjectiveId: number; courseDraftId: number }
    >({
      query: ({ courseDraftId, learningObjectiveId }) => ({
        url: `coursedrafts/${courseDraftId}/goals/learningobjectives/${learningObjectiveId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['CourseDrafts'],
    }),
    deletePrerequisite: builder.mutation<
      void,
      { prerequisiteId: number; courseDraftId: number }
    >({
      query: ({ courseDraftId, prerequisiteId }) => ({
        url: `coursedrafts/${courseDraftId}/goals/prerequisites/${prerequisiteId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['CourseDrafts'],
    }),
    deleteIntendedLearner: builder.mutation<
      void,
      { intendedLearnerId: number; courseDraftId: number }
    >({
      query: ({ courseDraftId, intendedLearnerId }) => ({
        url: `coursedrafts/${courseDraftId}/goals/intendedlearners/${intendedLearnerId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['CourseDrafts'],
    }),
    deleteLecture: builder.mutation<void, DeleteLectureRequest>({
      query: (body) => ({
        url: `coursedrafts/${body.courseDraftId}/sections/${body.curriculumSectionId}/lessons/${body.lectureId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['CourseDrafts'],
    }),
    deleteSection: builder.mutation<void, DeleteSectionRequest>({
      query: (body) => ({
        url: `coursedrafts/${body.courseDraftId}/sections/${body.sectionId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['CourseDrafts'],
    }),
    getCourseDrafts: builder.query<GetCourseDraftsFromDatabaseResult, void>({
      query: () => `coursedrafts`,
      providesTags: ['CourseDrafts'],
    }),
    createLessonVideostreamToken: builder.mutation<
      GetVideostreamTokenResult,
      CreateVideostreamTokenRequest
    >({
      query: (body) => ({
        url: `/coursedrafts/videostream/signedurl`,
        method: 'POST',
        body,
      }),
    }),
    validateAuthorizationToken: builder.mutation<
      UserInDatabaseSafeWithToken,
      ValidateAuthorizationTokenRequestBody
    >({
      query: (body) => ({
        url: 'validateauthorizationtoken',
        method: 'POST',
        body,
        headers: {
          authorization: `Bearer ${body.userInDatabaseSafeWithToken.authorizationToken}`,
        },
      }),
    }),
    uploadVideo: builder.mutation<void, UploadVideoRequest>({
      query: ({ videoFile, courseDraftId, sectionId, lectureId }) => {
        const formData = new FormData();
        formData.append('video', videoFile, videoFile.name);
        return {
          url: `coursedrafts/${courseDraftId}/sections/${sectionId}/lessons/${lectureId}/video`,
          method: 'POST',
          body: formData,
          formData: true,
        };
      },
      invalidatesTags: ['CourseDrafts'],
    }),
    uploadChunk: builder.mutation<void, UploadChunkRequest>({
      query: ({ chunk, chunkId, fileId, fileSize, fileName }) => {
        return {
          url: `coursedrafts/upload`,
          method: 'POST',
          headers: {
            'Content-Type': 'application/octet-stream',
            'x-chunk-id': chunkId.toString(),
            'x-upload-id': fileId.toString(),
            'x-chunk-size': chunk.size.toString(),
          },
          body: chunk,
          cache: 'no-cache',
        };
      },
    }),
  }),
});

export const {
  usePingQuery,
  useSignupMutation,
  useSigninMutation,
  useCreateCourseDraftMutation,
  useCreateCurriculumSectionMutation,
  useCreateLearningObjectiveMutation,
  useCreatePrerequisiteMutation,
  useCreateIntendedLearnerMutation,
  useCreateLectureMutation,
  useUpdateCourseDraftGoalsMutation,
  useUpdateCurriculumSectionsMutation,
  useDeleteLearningObjectiveMutation,
  useDeletePrerequisiteMutation,
  useDeleteIntendedLearnerMutation,
  useDeleteLectureMutation,
  useDeleteSectionMutation,
  useValidateAuthorizationTokenMutation,
  useGetCourseDraftsQuery,
  useCreateLessonVideostreamTokenMutation,
  useUploadVideoMutation,
  useUploadChunkMutation,
} = apiSlice;
