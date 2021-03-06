import { connect } from 'react-redux';
import { OnboardingActions } from "../../../shared/actions/onboarding";
import { EnterUserName, EnterUserNameDispatchProps, EnterUserNameStateProps } from '../../components/onboarding/EnterUserName';
import { RendererRootState } from '../../reducers';
import { MapPropsToDispatchObj } from '../../system/MapPropsToDispatchObj';


const mapStateToProps = (state: RendererRootState /*, ownProps*/): EnterUserNameStateProps => {

    return {
        userName: state.bdapAccountFormValues.fields.userName.value,
        isValidating: state.bdapAccountFormValues.fields.userName.isValidating,
        validationResult: state.bdapAccountFormValues.fields.userName.validationResult
    };
};


const mapDispatchToProps: MapPropsToDispatchObj<EnterUserNameDispatchProps> = { ...OnboardingActions };
// const mapDispatchToProps:EnterUserNameDispatchProps = { ...OnboardingActions };

export default connect(mapStateToProps, mapDispatchToProps)(EnterUserName)