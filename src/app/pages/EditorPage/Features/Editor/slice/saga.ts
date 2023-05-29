import { call, put, takeLatest } from 'redux-saga/effects';
import { editorActions } from '.';
import { axiosInstance } from 'plugins/axios';
import { File } from '../../Treeview/slice/types';
import { treeviewActions } from '../../Treeview/slice';

export function* getFile({ payload }) {
  try {
    const response = yield call(axiosInstance.get, `files/${payload}`);
    yield put(editorActions.openFile(response.data));
  } catch (error) {
    yield put(editorActions.openFileError());
  }
}

export function* saveFile({ payload }) {
  try {
    const { id, content, name } = payload as File;
    yield call(axiosInstance.put, `files/${id}`, { id, content, name });
    yield put(editorActions.fileSaved(payload));
  } catch (error) {
    yield put(editorActions.saveFileError());
  }
}

export function* deleteFile({ payload }) {
  try {
    yield call(axiosInstance.delete, `files/${payload}`);
    yield put(editorActions.fileDeleted());
    yield put(treeviewActions.deleteChild(payload));
  } catch (error) {
    yield put(editorActions.deleteFileError());
  }
}

export function* editorSaga() {
  yield takeLatest(editorActions.getFile, getFile);
  yield takeLatest(editorActions.saveFile, saveFile);
  yield takeLatest(editorActions.deleteFile, deleteFile);
}
