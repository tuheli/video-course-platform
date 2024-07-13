export const timeAvailablePerWeek = {
  imVeryBusy: '0-2 hours',
  iWorkOnThisOnTheSide: '2-4 hours',
  iHaveLotsOfFlexibility: '5+ hours',
  iHaventDecidedIfIHaveTime: 'indecisive',
} as const;

export const courseCategories = {
  design: 'Design',
  development: 'Development',
  marketing: 'Marketing',
  itAndSoftware: 'IT and Software',
  personalDevelopment: 'Personal Development',
  business: 'Business',
  photography: 'Photography',
  music: 'Music',
} as const;

export type CourseType = 'course' | 'practice-test';

export type KnownCourseCategory =
  (typeof courseCategories)[keyof typeof courseCategories];

export type TimeAvailablePerWeek =
  (typeof timeAvailablePerWeek)[keyof typeof timeAvailablePerWeek];

// NOTE: These types must
// match the actual property names which
// can be updated in course content.
// The reducers on client select the correct
// properties to be updated using these types.
export type UpdateableCourseContentProperty =
  | 'learningObjectives'
  | 'prerequisites'
  | 'intendedLearners';

interface Reorderable {
  orderIndex: number;
}

export interface TextWithId extends Reorderable {
  id: number;
  text: string;
}

export interface ReorderableTextArrayObject {
  type: UpdateableCourseContentProperty;
  items: TextWithId[];
}

export interface Lesson {
  id: number;
  name: string;
  orderIndex: number;
  // NOTE: Description is not currently checked
  // Its type should be custom Descendant[] which
  // is a type from slatejs.
  description: any;
  video?: {
    url: string;
    lengthSeconds: number;
  };
}

export interface ICurriculumSection {
  id: number;
  title: string;
  learningObjective: string;
  orderIndex: number;
  lessons: Lesson[];
}

interface CourseContent {
  // NOTE: Remember to update getCourseDraftProgressValue when adding more properties
  learningObjectives: ReorderableTextArrayObject;
  prerequisites: ReorderableTextArrayObject;
  intendedLearners: ReorderableTextArrayObject;
  // NOTE: Video content length is not currently checked
  videoContentLengthSeconds: number;
  curriculum: ICurriculumSection[];
}

interface Rating {
  courseId: string;
  userEmail: string;
  rating: number;
}

interface Enrollment {
  courseId: string;
  userEmail: string;
  enrollmentDate: string;
}

export interface CourseDraft {
  id: number;
  creatorId: number;
  creatorEmail: string;
  courseType: CourseType;
  courseTitle: string;
  courseCategory: KnownCourseCategory;
  creatorTimeAvailablePerWeek: TimeAvailablePerWeek;
  isPublic: boolean;
  isSubmissionProcessCompleted: boolean;
  courseContent: CourseContent;
  ratings: Rating[];
  enrollments: Enrollment[];
  createdAt: string;
  // NOTE: Language is not currently typed
  language: string;
}

export type NewCourseDraftEntry = Omit<
  CourseDraft,
  | 'id'
  | 'isPublic'
  | 'isSubmissionProcessCompleted'
  | 'courseContent'
  | 'ratings'
  | 'enrollments'
  | 'createdAt'
  | 'language'
>;
export interface CreateCourseDraftRequestBody {
  newCourseDraftEntry: NewCourseDraftEntry;
}

export interface CreateLearningObjectiveRequestBody {
  learningObjective: string;
  orderIndex: number;
}

export interface CreatePrerequisiteRequestBody {
  prerequisite: string;
  orderIndex: number;
}

export interface CreateIntendedLearnerRequestBody {
  intendedLearner: string;
  orderIndex: number;
}

export interface UpdateCourseGoalsRequestBody {
  learningObjectives: ReorderableTextArrayObject;
  prerequisites: ReorderableTextArrayObject;
  intendedLearners: ReorderableTextArrayObject;
}

export type ICurriculumSectionUpdateEntry = ICurriculumSection;

export interface UpdateCurriculumSectionsRequestBody {
  entries: ICurriculumSectionUpdateEntry[];
}

export interface CreateLectureRequestBody {
  title: string;
}

export interface SignInRequestBody {
  credentialsNotSafe: CredentialsNotSafe;
}

export interface UserInDatabaseSafeWithToken extends UserInDatabaseSafe {
  authorizationToken: string;
}

export interface CredentialsNotSafe {
  email: string;
  password: string;
}

export interface SignupRequestBody {
  credentialsNotSafe: CredentialsNotSafe;
  fullName: string;
  receiveInsiderEmails: boolean;
}

export interface UserInDatabaseNotSafe {
  id: number;
  email: string;
  passwordHash: string;
  fullName: string;
  receiveInsiderEmails: boolean;
}

export type UserForDatabase = Omit<UserInDatabaseNotSafe, 'id'>;

export interface UserInDatabaseSafe {
  id: number;
  email: string;
  fullName: string;
  receiveInsiderEmails: boolean;
}

export interface PresignUrlParams {
  uploadId: string;
  multipartUploadKey: string;
  partNumber: number;
}

export interface InitiateMultipartUploadParams {
  partCount: number;
}

export interface InitiateMultipartUploadResult {
  uploadId: string;
  partsWithUploadUrls: Array<{ partNumber: number; uploadUrl: string }>;
  multipartUploadKey: string;
  expirationTime: Date;
  creationTime: Date;
}

export interface FinishUploadParams {
  key: string;
  uploadId: string;
  parts: Array<{ partNumber: number; ETag: string }>;
}
export interface CreateMultipartUploadParams {
  key: string;
  uploadId: string;
  userId: number;
  lessonId: number;
  expirationTime: string;
  creationTime: string;
}
export interface FinishMultipartUploadParams {
  uploadId: string;
  userId: number;
}
export interface CourseDraftInDatabase {
  id: number;
  creatorId: number;
  creatorEmail: string;
  courseType: string;
  courseTitle: string;
  courseCategory: string;
  creatorTimeAvailablePerWeek: string;
  isPublic: boolean;
  isSubmissionProcessCompleted: boolean;
  language: string;
  createdAt: string;
}
export interface DeleteLearningObjectiveParams {
  learningObjectiveId: number;
  userId: number;
}
export interface DeletePrerequisiteParams {
  prerequisiteId: number;
  userId: number;
}
export interface DeleteIntendedLearnerParams {
  intendedLearnerId: number;
  userId: number;
}
export interface GetCourseDraftParams {
  userId: number;
  courseDraftId: number;
}
export interface UpdateCourseDraftCourseGoalsParams {
  userId: number;
  courseDraftId: number;
  updateRequest: UpdateCourseGoalsRequestBody;
}
interface CreateTextWithId {
  userId: number;
  courseDraftId: number;
  text: string;
  orderIndex: number;
}
export interface UpdateCurriculumSectionsParams {
  userId: number;
  courseDraftId: number;
  requestBody: UpdateCurriculumSectionsRequestBody;
}
export interface CreateCurriculumSectionParams {
  courseDraftId: number;
  userId: number;
}
export interface CreateLessonParams {
  curriculumSectionId: number;
  userId: number;
  title: string;
}
export interface DeleteLessonParams {
  lessonId: number;
  userId: number;
}
export interface DeleteSectionParams {
  sectionId: number;
  userId: number;
}
export type CreatePrerequisiteParams = CreateTextWithId;

export type CreateLearningObjectiveParams = CreateTextWithId;

export interface UpdateLessonVideoParams {
  lessonId: number;
  userId: number;
  videoUrl: string;
  videoLengthSeconds: number;
  videoSizeInBytes: number;
}
export interface UpdateLessonReturnValue {
  videoFileName: string;
  videoSizeInBytes: number;
  videoLengthSeconds: number;
}
export interface GetVideoUriParams {
  lessonId: number;
}
