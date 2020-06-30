import { put, takeEvery, all } from "redux-saga/effects";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

// This is a watcher saga that runs synchronously when the home page loads
function* helloSaga() {
  console.log("Hello Sagas!");
}

// Our worker Saga: will perform the async increment task
function* incrementAsync() {
  console.log("Our worker Saga: will perform the async increment task");
  yield delay(1000);
  yield put({ type: "INCREMENT" });
}

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
function* watchIncrementAsync() {
  console.log(
    "Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC"
  );
  yield takeEvery("INCREMENT_ASYNC", incrementAsync);
}

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([helloSaga(), watchIncrementAsync()]);
}
