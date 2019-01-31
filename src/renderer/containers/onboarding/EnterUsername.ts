import { connect } from 'react-redux';
import OnboardingActions from "../../../shared/actions/onboarding";
import { EnterUsername, EnterUsernameDispatchProps, EnterUsernameStateProps } from '../../components/onboarding/EnterUsername';
import { RendererRootState } from '../../reducers';
import { MapPropsToDispatchObj } from '../../system/MapPropsToDispatchObj';


const mapStateToProps = (state: RendererRootState /*, ownProps*/): EnterUsernameStateProps => {
    return {
        username:state.onboarding.username.value
    };
};


const mapDispatchToProps: MapPropsToDispatchObj<EnterUsernameDispatchProps> = { ...OnboardingActions };

export default connect(mapStateToProps, mapDispatchToProps)(EnterUsername)