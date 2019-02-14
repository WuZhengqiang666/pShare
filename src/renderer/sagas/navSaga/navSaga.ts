import { put, select, take } from "redux-saga/effects";
import { getType } from "typesafe-actions";
import { RootActions } from "../../../shared/actions";
import { RendererRootState } from "../../reducers";
import { appRoutes, pushRoute } from "../../routes/appRoutes";
import { getNavMap } from "./getNavMap";

//const delay = (time: number) => new Promise(r => setTimeout(r, time));

export function* navSaga() {
    console.log("nav saga started")
    const appInitializedAction = getType(RootActions.appInitialized);
    yield take(appInitializedAction);
    console.log("nav saga init")

    const state: RendererRootState = yield select()
    if (!state.user.syncAgreed) {
        console.log("nav saga navigating to /SyncAgree")

        yield put(pushRoute(appRoutes.syncAgree))
        const userSyncAgreedAction = getType(RootActions.userAgreeSync)
        console.log("nav saga waiting for userSyncAgreedAction")

        yield take(userSyncAgreedAction)
        console.log("nav saga userSyncAgreedAction")

    }
    console.log("nav saga navigating to /Sync")

    yield put(pushRoute(appRoutes.sync))
    // const syncPageStartTime = performance.now();
    const syncCompleteAction = getType(RootActions.syncComplete)
    console.log("nav saga waiting for syncCompleteAction")

    yield take(syncCompleteAction)


    const currentState: RendererRootState = yield select()
    if (currentState.user.isOnboarded) {
        console.log("nav saga: user is onboarded, navigating to /Main")
        yield put(pushRoute(appRoutes.main))
    }
    else {
        if (typeof currentState.user.userName !== 'undefined') {
            yield put(pushRoute(appRoutes.passwordCreate))
        }
        else {
            console.log("nav saga: navigating to Onboarding -- /CreateAccount")
            yield put(pushRoute(appRoutes.createAccount))
            console.log("nav saga navigating to /CreateAccount")
            const bdapAccountConfigNavMap = getNavMap();

            bdapAccountConfigNavMap.registerNavAction(RootActions.createAccount, appRoutes.enterUserName)
            bdapAccountConfigNavMap.registerNavAction(RootActions.userNameCaptured, appRoutes.enterCommonName)
            bdapAccountConfigNavMap.registerNavAction(RootActions.commonNameCaptured, appRoutes.enterToken)
            bdapAccountConfigNavMap.registerNavAction(RootActions.tokenCaptured, appRoutes.creatingBdapAccount)
            bdapAccountConfigNavMap.registerNavAction(RootActions.resetOnboarding, appRoutes.enterUserName)
            bdapAccountConfigNavMap.registerNavAction(RootActions.createBdapAccountComplete, appRoutes.passwordCreate, true) //true parameter indicates stopping condition
            //this will block until the navMap is complete
            yield bdapAccountConfigNavMap.runNav()
        }

        const isEncrypted: boolean = yield select((state: RendererRootState) => state.user.walletEncrypted)
        if (!isEncrypted || true) {
            const navMap = getNavMap();
            navMap.registerNavAction(RootActions.walletPasswordSetSuccess, appRoutes.mnemonicWarning),
            navMap.registerNavAction(RootActions.mnemonicWarningAccepted, appRoutes.mnemonicPage),
            navMap.registerNavAction(RootActions.mnemonicSecured, appRoutes.main, true)
            yield navMap.runNav();
        }
        else {
            // todo: really it should be
            // yield pushRoute(appRoutes.passwordGet)
            yield put(pushRoute(appRoutes.main))
        }

    }


}