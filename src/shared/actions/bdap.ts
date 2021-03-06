import { ActionType, createStandardAction } from 'typesafe-actions';
import { GetUserInfo } from '../../dynamicdInterfaces/GetUserInfo';
import { Link } from '../../dynamicdInterfaces/links/Link';
import { PendingLink } from '../../dynamicdInterfaces/links/PendingLink';
import { CompleteLink } from "../../dynamicdInterfaces/links/CompleteLink";
import { LinkRequestOptions } from './payloadTypes/LinkRequestOptions';
import { LinkAcceptOptions } from "./payloadTypes/LinkAcceptOptions";
import { LinkBase } from './payloadTypes/LinkBase';
import { DeniedLink } from '../../dynamicdInterfaces/DeniedLink';
import { LinkRouteEnvelope } from './payloadTypes/LinkRouteEnvelope';
import { LinkMessageEnvelope } from './payloadTypes/LinkMessageEnvelope';
import { LinkMessage } from '../../dynamicdInterfaces/LinkMessage';


export const BdapActions = {

    initialize: createStandardAction('bdap/INITIALIZE')<void>(),

    getUsers: createStandardAction('bdap/GET_USERS')<void>(),
    getUsersSuccess: createStandardAction('bdap/GET_USERS_SUCCESS')<GetUserInfo[]>(),
    getUsersFailed: createStandardAction('bdap/GET_USERS_FAILED')<string>(),

    getCompleteLinks: createStandardAction('bdap/GET_COMPLETE_LINKS')<void>(),
    getCompleteLinksSuccess: createStandardAction('bdap/GET_COMPLETE_LINKS_SUCCESS')<CompleteLink[]>(),
    getCompleteLinksFailed: createStandardAction('bdap/GET_COMPLETE_LINKS_FAILED')<string>(),


    getDeniedLinks: createStandardAction('bdap/GET_DENIED_LINKS')<void>(),
    getDeniedLinksSuccess: createStandardAction('bdap/GET_DENIED_LINKS_SUCCESS')<DeniedLink[]>(),
    getDeniedLinksFailed: createStandardAction('bdap/GET_DENIED_LINKS_FAILED')<string>(),

    getPendingRequestLinks: createStandardAction('bdap/GET_PENDING_REQUEST_LINKS')<void>(),
    getPendingRequestLinksSuccess: createStandardAction('bdap/GET_PENDING_REQUEST_LINKS_SUCCESS')<PendingLink[]>(),
    getPendingRequestLinksFailed: createStandardAction('bdap/GET_PENDING_REQUEST_LINKS_FAILED')<string>(),

    getPendingAcceptLinks: createStandardAction('bdap/GET_PENDING_ACCEPT_LINKS')<void>(),
    getPendingAcceptLinksSuccess: createStandardAction('bdap/GET_PENDING_ACCEPT_LINKS_SUCCESS')<PendingLink[]>(),
    getPendingAcceptLinksFailed: createStandardAction('bdap/GET_PENDING_ACCEPT_LINKS_FAILED')<string>(),

    getBalance: createStandardAction('bdap/GET_BALANCE')<void>(),
    getBalanceSuccess: createStandardAction('bdap/GET_BALANCE_SUCCESS')<number>(),
    getBalanceFailed: createStandardAction('bdap/GET_BALANCE_FAILED')<string>(),

    getTopUpAddress: createStandardAction('bdap/GET_TOP_UP_ADDRESS')<void>(),
    getTopUpAddressSuccess: createStandardAction('bdap/GET_TOP_UP_ADDRESS_SUCCESS')<string>(),
    getTopUpAddressFailed: createStandardAction('bdap/GET_TOP_UP_ADDRESS_FAILED')<string>(),


    bdapDataFetchSuccess: createStandardAction('bdap/BDAP_DATA_FETCH_SUCCESS')<void>(),
    bdapDataFetchFailed: createStandardAction('bdap/BDAP_DATA_FETCH_FAILED')<string>(),

    currentUserReceived: createStandardAction('bdap/CURRENT_USER_RECEIVED')<GetUserInfo>(),

    beginCreateLinkRequest: createStandardAction('bdap/BEGIN_CREATE_LINK_REQUEST')<LinkRequestOptions>(),
    createLinkRequest: createStandardAction('bdap/CREATE_LINK_REQUEST')<LinkRequestOptions>(),
    createLinkRequestFailed: createStandardAction('bdap/CREATE_LINK_REQUEST_FAILED')<string>(),

    beginAcceptLink: createStandardAction('bdap/BEGIN_ACCEPT_LINK')<LinkBase>(),
    acceptLink: createStandardAction('bdap/ACCEPT_LINK')<LinkAcceptOptions>(),

    beginDeclineLink: createStandardAction('bdap/BEGIN_DECLINE_LINK')<LinkBase>(),
    declineLink: createStandardAction('bdap/DECLINE_LINK')<LinkBase>(),

    newCompleteLink: createStandardAction('bdap/NEW_COMPLETE_LINK')<Link>(),


    sendLinkMessage: createStandardAction('bdap/SEND_LINK_MESSAGE')<LinkRouteEnvelope<LinkMessageEnvelope<any>>>(),
    linkMessageReceived: createStandardAction('bdap/LINK_MESSAGE_RECEIVED')<{ message: LinkMessageEnvelope<any>, rawMessage: LinkMessage }>(),

    insufficientFunds: createStandardAction('bdap/INSUFFICIENT_FUNDS')<string>(),
    fundsDialogDismissed: createStandardAction('bdap/FUNDS_DIALOG_DISMISSED')<void>(),

}

export type BdapActions = ActionType<typeof BdapActions>;

