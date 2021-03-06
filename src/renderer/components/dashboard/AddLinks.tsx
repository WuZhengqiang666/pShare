import { Component } from "react";
import React from "react";
import { H1, Text } from "../ui-elements/Text";
import { UserListAvatar, CloseIcon, BtnAddLinksIcon, RequestSentIcon } from "../ui-elements/Image";
import { UserList, UserListItem } from "../ui-elements/Dashboard";
import man from "../../assets/man.svg";
import Container from "../ui-elements/Container";
import { BdapUser } from "../../system/BdapUser";
import { LinkDisplayName } from "./LinkDisplayName";
import { BdapActions } from "../../../shared/actions/bdap";
import { PickedDispatchProps } from "../../system/PickedDispatchProps";
import { Box } from "../ui-elements/Box";
import Modal from "../ui-elements/Modal";
import Button from "../ui-elements/Button";
import Input from "../ui-elements/Input";
import { SearchActions } from "../../../shared/actions/search";
// import { BulkImportActions } from "../../../shared/actions/bulkImport";
import BalanceIndicator from "../../containers/dashboard/BalanceIndicator";

type SearchStatus = "NO_SEARCH" | "SEARCH_RESULT"
export interface AddLinksStateProps {
    users: BdapUser[]
    currentUserName: string
    queryText: string
    status: SearchStatus

}
export type AddLinksDispatchProps =
    PickedDispatchProps<typeof SearchActions, "addLinksQueryTextChanged">
    // & PickedDispatchProps<typeof BulkImportActions, "beginBulkImport">
    & PickedDispatchProps<typeof BdapActions, "beginCreateLinkRequest">
    & { push: (pathname: string) => void }
export type AddLinksProps = AddLinksStateProps & AddLinksDispatchProps

interface AddLinksComponentStateProps {
    requestModal: boolean, recipent: string
}

interface CustomRequestMessageProps {
    close: () => void,
    send: (msg: string) => void,
}
interface CustomRequestMessageComponentState {
    msg: string
}

class CustomRequestMessage extends Component<CustomRequestMessageProps, CustomRequestMessageComponentState> {
    constructor(props: CustomRequestMessageProps) {
        super(props);
        this.state = {
            msg: ''
        }
        this.handleInput = this.handleInput.bind(this)
    }
    handleInput(event: React.ChangeEvent<HTMLInputElement>) {
        let value = event.target.value
        this.setState({ msg: value })
    }
    render() {
        const { send, close } = this.props
        return (
            <Modal >
                <Box background="#fafafa" margin="40vh auto 0 auto" borderRadius="5px" padding="1em 1.5em">
                    <Text fontSize="1.2em" fontWeight="600" margin="0" color="#4a4a4a">
                        Invite Message
                </Text>
                    <Input margin="10px 0" padding="0 1em" width="420px" value={this.state.msg} onChange={this.handleInput} />
                    <Box align="right" width="100%" >
                        <Button onClick={() => close()} width="100px" margin="0 8px 0 0">
                            <Text margin="0" fontSize="0.7em" color="#2e77d0" align="center">Cancel</Text>
                        </Button>
                        <Button onClick={() => send(this.state.msg)} primary width="100px" margin="0 8px 0 0">
                            <Text margin="0" fontSize="0.7em" color="white" align="center">Send Request</Text>
                        </Button>
                    </Box>
                </Box>
            </Modal>
        )
    }
}

export class AddLinks extends Component<AddLinksProps, AddLinksComponentStateProps> {
    constructor(props: AddLinksProps) {
        super(props)
        this.state = {
            requestModal: false,
            recipent: '',
        }
    }
    render() {
        const { users, beginCreateLinkRequest, currentUserName, push, addLinksQueryTextChanged, queryText, status } = this.props
        return (
            <>
                {this.state.requestModal &&
                    <CustomRequestMessage
                        close={() => this.setState({ requestModal: false })}
                        send={(msg) => {
                            beginCreateLinkRequest({ requestor: currentUserName, recipient: this.state.recipent, inviteMessage: msg })
                            this.setState({ requestModal: false })
                        }}
                    />}
                <div style={{ width: "100%", display: 'block', position:'relative' }}>
                    <BalanceIndicator />
                    <div style={{ float: 'right', margin: '40px 0 0 0' }}>
                        <CloseIcon margin="0 40px 0 0" onClick={() => push('/Dashboard/MyLinks')} />
                        <Text margin="5px 0 0 5px" fontSize="0.8em">finish</Text>
                    </div>
                    <Container margin="7em 20% 5em 25%" height="100%" minWidth="50%">
                        <H1 color="#4a4a4a">
                            {/* <AddLinksIcon width="40px" height="40px" margin="0 0 0 0" /> */}
                         Add Links</H1>
                        <div style={{ display: 'flex' }}>
                            <Input id="addLinksInput" value={queryText}
                                placeholder="Search new links to add"
                                onChange={e => addLinksQueryTextChanged(e.target.value)}
                                margin="20px 0 20px 0"
                                padding="0 20px"
                                autoFocus={true}
                            />
                            <CloseIcon style={{
                                visibility: queryText.length > 0 ? "visible" : "hidden",
                                margin: '30px 0 0 0'
                            }}
                                onClick={() => {
                                    addLinksQueryTextChanged("");
                                    document.getElementById("addLinksInput")!.focus()
                                }} />
                        </div>
                        {/* 
                        
                            NOTE

                            adding and removing the element below with a ternary statement
                            causes measurable performance issues 
                            
                            toggling css visibility below is an optimization that doesn't
                            cause document reflow
                        
                        
                        */}
                        {
                            renderResults(queryText, status, users, x => this.setState(x), push)
                        }
                        <div style={{ padding: "2.5em" }} />
                    </Container>
                </div>
            </>
        )
    }

}

const renderResults = (queryText: string, status: string, users: BdapUser[], setState: (x: AddLinksComponentStateProps) => void, push: (pathname: string) => void) => {
    switch (status) {
        case "NO_SEARCH":

            return queryText.length === 0
                ? <>
                    <Text color="#4a4a4a" fontWeight="400" fontSize="1.2em">Type some characters to find other users...</Text>
                    <Text>
                        <span onClick={(event) => {
                            event.preventDefault();
                            push("/Dashboard/BulkImport")
                        }}
                            style={{ cursor: 'pointer', color: '#2e77d0' }}
                        >Bulk invite from file...</span></Text>
                </>
                : <Text color="#4a4a4a" fontWeight="400" fontSize="1.2em">Type some more characters to find other users...</Text>
        case "SEARCH_RESULT":
            return users.length > 0
                ? <UserList >
                    {users.map(u => <UserListItem key={u.userName} style={{ cursor: u.state === 'pending' ? '' : 'pointer'}}
                            onClick={u.state === 'pending' ? undefined : () => setState({ requestModal: true, recipent: u.userName }) }>
                        <div style={{ display: 'flex' }} >
                            <UserListAvatar src={man} />
                            <LinkDisplayName disabled={u.state === 'pending'} displayName={u.commonName} />
                        </div>
                        {u.state === 'pending' ?
                            <div style={{ fontSize: "0.8em" }}> Request sent <RequestSentIcon width="30px" height="30px" margin="0 0 0 1em" /></div>
                            : <div style={{ fontSize: "0.7em" }} >
                                Request
                                <BtnAddLinksIcon width="30px" height="30px" margin="0 0 0 1em" />
                            </div>}
                    </UserListItem>)}
                </UserList>
                : <Text color="#4a4a4a" fontWeight="400" fontSize="1.2em">No results</Text>;
        default:
            return <Text color="#4a4a4a" fontWeight="400" fontSize="1.2em">Encountered an unexpected condition</Text>;
    }
}

