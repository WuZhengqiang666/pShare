import React, { ChangeEvent, Component, FormEvent } from "react";
import { CSSTransitionGroup } from 'react-transition-group';
import { ValidationResult } from "../../../shared/system/validator/ValidationResult";
import logo from "../../assets/svgs/logo_without_text.svg";
import Box from "../ui-elements/Box";
import { ArrowButton } from "../ui-elements/Button";
import { Card } from "../ui-elements/Card";
import Container from "../ui-elements/Container";
import { AppLogo } from '../ui-elements/Image';
import Input from "../ui-elements/Input";
import { H1, Text } from "../ui-elements/Text";

export interface EnterUsernameStateProps {
    username: string,
    isValidating: boolean,
    validationResult?: ValidationResult<string>
}
export interface EnterUsernameDispatchProps {
    submitUsername: (username: string) => void
}
type EnterUsernameProps = EnterUsernameDispatchProps & EnterUsernameStateProps

interface EnterUsernameComponentState {
    username: string
}

export class EnterUsername extends Component<EnterUsernameProps, EnterUsernameComponentState>{
    constructor(props: EnterUsernameProps) {
        super(props)
        this.state = { username: props.username }
    }
    handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({ username: e.target.value })
    }
    handleSubmit = (e: FormEvent) => {
        console.log("submit", this.state)
        this.props.submitUsername(this.state.username)
        //if we don't prevent form submission, causes a browser reload
        e.preventDefault()
    }
    render() {
        const { isValidating, validationResult } = this.props
        const validationFailed = typeof validationResult !== 'undefined' && !validationResult.success
        return <>
            <Box width="100%" margin="2em 0 -1.5em 0" align="center">
                <AppLogo src={logo} width="100px" height="120px" />
            </Box>
            <CSSTransitionGroup
                transitionName="example"
                transitionAppear={true}
                transitionAppearTimeout={500}
                transitionEnter={false}
                transitionLeave={false}>
                <H1 align="center" colored fontWeight="600">Create Account</H1>
                <Container height="50vh" margin="10% 0 0 0">
                    <form onSubmit={this.handleSubmit}>
                        <Box direction="column" align="center" width="100%">
                            <Box direction="column" width="700px" align="start" margin="0 auto 0 auto">
                                <Card width="100%" align="center" minHeight="225px" padding="2em 12em 2em 8em">
                                    <Text fontSize="14px">Enter a user name</Text>
                                    <Input value={this.state.username} onChange={this.handleChange} placeholder="User name" margin="1em 0 1em 0" padding="0 1em 0 1em" />
                                    {
                                        validationFailed
                                            ? (typeof validationResult !== 'undefined' ? validationResult.errors : []).map((e, i) => <Text align="center" color="#e30429" key={i}>{e}</Text>)
                                            : <></>
                                    }
                                </Card>
                            </Box>
                            <Box direction="column" width="700px" align="right" margin="0 auto 0 auto">
                                <ArrowButton label="Continue" type="submit" disabled={isValidating} />
                                {
                                    isValidating ? <div>show spinner</div> : <></>
                                }
                            </Box>
                        </Box>
                    </form>
                </Container>
            </CSSTransitionGroup>
        </>
    }
}
