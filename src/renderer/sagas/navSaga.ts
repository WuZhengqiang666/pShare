import { push } from "connected-react-router";
import { put, select, take } from "redux-saga/effects";
import { getType } from "typesafe-actions";
import { RendererRootState } from "../reducers";
import RootActions from "./../../shared/actions";

//const delay = (time: number) => new Promise(r => setTimeout(r, time));

export function* navSaga() {
    console.log("nav saga started")
    const appInitializedAction = getType(RootActions.appInitialized);
    yield take(appInitializedAction);
    console.log("nav saga init")

    const state: RendererRootState = yield select()
    if (!state.user.syncAgreed) {
        console.log("nav saga navigating to /SyncAgree")

        yield put(push("/SyncAgree"))
        const userSyncAgreedAction = getType(RootActions.userAgreeSync)
        console.log("nav saga waiting for userSyncAgreedAction")

        yield take(userSyncAgreedAction)
        console.log("nav saga userSyncAgreedAction")

    }
    console.log("nav saga navigating to /Sync")

    yield put(push("/Sync"))
    // const syncPageStartTime = performance.now();
    const syncCompleteAction = getType(RootActions.syncComplete)
    console.log("nav saga waiting for syncCompleteAction")

    yield take(syncCompleteAction)

    // const syncPageEndTime = performance.now()
    // const timeOnSyncPage = syncPageEndTime - syncPageStartTime;
    // // let's stay at least 2s on sync page, otherwise we
    // // get an unnatural flash of the sync screen
    // const remainingTime = 2000 - timeOnSyncPage;
    // if (remainingTime > 0) {
    //     yield call(delay, remainingTime)
    // }


    const newState: RendererRootState = yield select()
    if (newState.user.isOnboarded) {
        console.log("nav saga: user is onboarded, navigating to /Main")
        yield put(push("/Main"))

    }
    else {
        console.log("nav saga navigating to /Onboarding")
        yield put(push("/Onboarding"))
        const createAccountAction = getType(RootActions.createAccount)
        console.log("nav saga waiting for RootActions.createAccount")
        yield take(createAccountAction)
        console.log("nav saga navigating to /CreateAccount")
        yield put(push("/CreateAccount"))
    }
}