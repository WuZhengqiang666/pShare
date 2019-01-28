import UserActions from '../actions/user'
import { getType } from 'typesafe-actions';

interface UserState {
    syncAgreed: boolean
    isOnboarded: boolean
}

export default (state: UserState = { syncAgreed: false, isOnboarded: false }, action: UserActions): UserState => {
    switch (action.type) {
        case getType(UserActions.userAgreeSync):
            return { ...state, syncAgreed: true }
        default:
            return state;

    }
} 