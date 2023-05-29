import { call, put, takeLatest } from 'redux-saga/effects';
import { treeviewActions } from '.';
import { axiosInstance } from 'plugins/axios';

export function* loadTreeview() {
  try {
    const response = yield call(axiosInstance.get, 'filetree');
    yield put(treeviewActions.treeviewLoaded(response.data));
  } catch (error) {
    yield put(treeviewActions.treeviewLoadError());
  }
}

export function* treeviewSaga() {
  yield takeLatest(treeviewActions.loadTreeview, loadTreeview);
}
