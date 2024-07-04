import { ICurriculumSection } from '../../features/courseDraftsSlice';
import {
  getAllLectureDescriptionsKeys,
  getLectureDescriptionLocalStorageKey,
} from '../text-editor/utils';

// NOTE: Clean up localstorage used for text editor
// to not have unnecessary data kept in there.
// Especially now in development the curriculum
// has randomized ids on every refresh which
// accumulates unused data in localstorage.

// Localstorage max size is 5000 KB and it could
// fill up without cleaning.

// 3 paragraphs each containing 10 lines of text
// seems to be around 5 KB. That could be reasonable
// max size for a single lecture description.

// Size can be checked via browser console using one liner
// from https://stackoverflow.com/questions/4391575/how-to-find-the-size-of-localstorage

// var _lsTotal=0,_xLen,_x;for(_x in localStorage){ if(!localStorage.hasOwnProperty(_x)){continue;} _xLen= ((localStorage[_x].length + _x.length)* 2);_lsTotal+=_xLen; console.log(_x.substr(0,50)+" = "+ (_xLen/1024).toFixed(2)+" KB")};console.log("Total = " + (_lsTotal / 1024).toFixed(2) + " KB");

export const cleanupCurriculumLocalStorage = (
  courseDraftId: number,
  curriculum: ICurriculumSection[]
) => {
  const keysFromReduxState = curriculum.flatMap((section) => {
    return section.lessons.map((lesson) => {
      return getLectureDescriptionLocalStorageKey(
        courseDraftId,
        section.id,
        lesson.id
      );
    });
  });

  const keysInLocalStorage = getAllLectureDescriptionsKeys(courseDraftId);

  const keysToDelete = keysInLocalStorage.filter(
    (key) => !keysFromReduxState.includes(key)
  );

  keysToDelete.forEach((key) => {
    localStorage.removeItem(key);
  });
};

export const getAudioDuration = async (file: File) => {
  const promise = new Promise<number>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (!reader.result || reader.result instanceof ArrayBuffer) {
        return reject('Invalid file');
      }

      const audio = new Audio(reader.result);
      audio.onloadedmetadata = () => {
        const duration = audio.duration;
        return resolve(duration);
      };
    };

    reader.readAsDataURL(file);
    reader.onerror = (error) => reject(error);
  });

  return promise;
};
