import { validationSaga } from "./validationSaga";
import { onboardingSaga } from "./onboardingSaga";
import { createBdapAccountSaga } from "./createBdapAccount/createBdapAccountSaga";
import { setWalletPasswordSaga } from "./setWalletPasswordSaga";
import { mnemonicSaga } from "./mnemonicSaga";
import { saveMnemonicSaga } from "./saveMnemonicSaga";
import { BrowserWindowProvider } from "../../shared/system/BrowserWindowProvider";
import { translateMnemonicFileSaveFailedActionsToValidationMessages } from "./translateMnemonicFileSaveFailedActionsToValidationMessages";
import { bdapSaga } from "./bdapSaga";
import { linkRequestSaga } from "./linkRequestSaga";
import { linkAcceptSaga } from "./linkAcceptSaga";
import { linkDeclineSaga } from "./linkDeclineSaga";
import { RpcClientWrapper } from "../RpcClient";
import { scanForLinkMessagesSaga } from "./scanForLinkMessagesSaga";


export const getRootSaga = (rpcClient: RpcClientWrapper, browserWindowProvider: BrowserWindowProvider) => [
    () => linkRequestSaga(rpcClient),
    () => linkAcceptSaga(rpcClient),
    () => linkDeclineSaga(rpcClient),
    () => validationSaga(rpcClient),
    () => onboardingSaga(),
    () => createBdapAccountSaga(rpcClient),
    () => setWalletPasswordSaga(rpcClient, true),
    () => mnemonicSaga(rpcClient),
    () => saveMnemonicSaga(browserWindowProvider),
    () => translateMnemonicFileSaveFailedActionsToValidationMessages(),
    () => bdapSaga(rpcClient),
    () => scanForLinkMessagesSaga(rpcClient)

]

