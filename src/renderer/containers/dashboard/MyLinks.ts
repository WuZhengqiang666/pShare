import { RendererRootState } from "../../reducers";
import { MyLinksStateProps, MyLinksDispatchProps, MyLinks } from "../../components/dashboard/MyLinks";
import { MapPropsToDispatchObj } from "../../system/MapPropsToDispatchObj";
import { connect } from "react-redux";
import { createSelector } from 'reselect'
import { blinq } from "blinq";
import { BdapUser } from "../../system/BdapUser";
import { push } from "connected-react-router";
import { filterDeniedUsers } from "./helpers/filterDeniedUsers";
import { DashboardActions } from "../../../shared/actions/dashboard";
import { FileSharingActions } from "../../../shared/actions/fileSharing";

const getUserName = createSelector([(state: RendererRootState) => typeof state.bdap.currentUser !== 'undefined' ? state.bdap.currentUser.object_id : undefined], (user) => user)
const getUserList = createSelector(
    [
        (state: RendererRootState) => state.bdap.users,
        (state: RendererRootState) => state.bdap.completeLinks,
        (state: RendererRootState) => state.bdap.pendingAcceptLinks,
        (state: RendererRootState) => state.bdap.pendingRequestLinks,
        (state: RendererRootState) => state.bdap.deniedLinks,
        (state: RendererRootState) => typeof state.bdap.currentUser !== 'undefined' ? state.bdap.currentUser.object_full_path : undefined
    ],
    (users, completeLinks, pendingAcceptLinks, pendingRequestLinks, deniedLinks, currentUserFqdn) => {
        const linkedUsers = blinq(users)
            .join(
                completeLinks,
                u => u.object_full_path,
                l => blinq([l.recipient_fqdn, l.requestor_fqdn]).first(n => n !== currentUserFqdn),
                (u) => ({
                    userName: u.object_id,
                    commonName: u.common_name,
                    state: "linked"
                } as BdapUser))
        const pendingAcceptUsers = filterDeniedUsers(blinq(users), deniedLinks)
            .join(
                pendingAcceptLinks,
                u => u.object_full_path,
                l => blinq([l.recipient_fqdn, l.requestor_fqdn]).first(n => n !== currentUserFqdn),
                (u) => ({
                    userName: u.object_id,
                    commonName: u.common_name,
                    state: "pending"
                } as BdapUser))
        const pendingRequestUsers = blinq(users)
            .join(
                pendingRequestLinks,
                u => u.object_full_path,
                l => blinq([l.recipient_fqdn, l.requestor_fqdn]).first(n => n !== currentUserFqdn),
                (u) => ({
                    userName: u.object_id,
                    commonName: u.common_name,
                    state: "pending"
                } as BdapUser))
        return linkedUsers
            .concat(pendingAcceptUsers)
            .concat(pendingRequestUsers)
            .orderBy(u => u.commonName.toLowerCase())
            .thenBy(u => u.userName.toLowerCase())
            .toArray()
    }
)

const mapStateToProps = (state: RendererRootState /*, ownProps*/): MyLinksStateProps => {
    return {
        users: getUserList(state),
        userName: getUserName(state)!
    };
};

const mapDispatchToProps: MapPropsToDispatchObj<MyLinksDispatchProps> = { ...FileSharingActions, ...DashboardActions, push };

export default connect(mapStateToProps, mapDispatchToProps)(MyLinks)
