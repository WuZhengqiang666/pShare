import * as React from "react";
import styled from "styled-components"
import logosrc from "../../assets/svgs/logo_without_text.svg";
import mylinks from "../../assets/svgs/mylinks-32.svg";
import mylinkswhite from "../../assets/svgs/mylinks-32-white.svg";
import inbox from "../../assets/svgs/inbox-32.svg";
import inboxwhite from "../../assets/svgs/inbox-32-white.svg";
import outbox from "../../assets/svgs/outbox-32.svg";
import outboxwhite from "../../assets/svgs/outbox-32-white.svg";
import invites from "../../assets/svgs/invites-32.svg";
import inviteswhite from "../../assets/svgs/invites-32-white.svg";
import pending from "../../assets/svgs/pending-32.svg";
import addLinksBtn from "../../assets/svgs/btn-add-32.svg";
import addlinks from "../../assets/svgs/add-32.svg";
import requestsent from "../../assets/svgs/request-sent-32.svg";
import close from "../../assets/svgs/close-32.svg";
import viewbtn from "../../assets/svgs/viewbtn.svg";
import doc from "../../assets/svgs/p-share-doc.svg";
import progressSpinner from "../../assets/svgs/progress-spinner.svg"
import deleteicon from "../../assets/delete.svg";
import checkicon from "../../assets/check.svg";
import cancelicon from "../../assets/cancel.svg";
import downloadicon from "../../assets/svgs/download.svg";
import doneicon from "../../assets/svgs/done.svg";
import erroricon from "../../assets/svgs/error.svg";
import foldericon from "../../assets/svgs/folder-blue.svg";
import goback from "../../assets/svgs/goback.svg";
import rightchevron from "../../assets/svgs/right-chevron.svg";
import exporticon from "../../assets/svgs/export.svg";

interface ImageProps {
    src?: string,
    width?: string,
    height?: string,
    margin?: string,
    white?: boolean,
    onClick?: (e:React.MouseEvent) => void,
    cursor?: string,
    float?: string,

}
interface Styleable {
    style?: Record<string, any>
}

const SvgIcon = styled('img') <ImageProps>`
    src: ${props => props.src};
    width: ${props => props.width ? props.width : '100%'};
    height: ${props => props.height ? props.height : '100px'};  
    margin: ${props => props.margin || '0'};  
    vertical-align: middle;
    background: ${props => props.white ? '#737373' : ''};
    cursor: ${props => props.cursor};
    float: ${props => props.float};
`;

const PlainAppLogo = () => <SvgIcon src={logosrc} height="70px" />

const UserListAvatar = styled('img') <ImageProps>`
    src: ${props => props.src}
    width: 20px;
    height: 30px;
`;

const ProgressSpinner: React.FunctionComponent<ImageProps> = 
    ({ width, height, margin }) => <SvgIcon src={progressSpinner} width={width || '50px'} height={height || "30px"} margin={margin || "0 10px"} />

const MyLinksIcon: React.FunctionComponent<ImageProps> =
    ({ width, height, margin, white }) => <SvgIcon src={white ? mylinkswhite : mylinks} width={width || '50px'} height={height || "30px"} margin={margin || "0 10px"} />
const InboxIcon: React.FunctionComponent<ImageProps> =
    ({ width, height, margin, white }) => <SvgIcon src={white ? inboxwhite : inbox} width={width || '50px'} height={height || "30px"} margin={margin || "0 10px"} />
const OutboxIcon: React.FunctionComponent<ImageProps> =
    ({ width, height, margin, white }) => <SvgIcon src={white ? outboxwhite : outbox} width={width || '50px'} height={height || "30px"} margin={margin || "0 10px"} />
const InvitesIcon: React.FunctionComponent<ImageProps> =
    ({ width, height, margin, white }) => <SvgIcon src={white ? inviteswhite : invites} width={width || '50px'} height={height || "30px"} margin={margin || "0 10px"} />

const PendingIcon: React.FunctionComponent<ImageProps> =
    ({ width, height, margin }) => <SvgIcon src={pending} width={width || '50px'} height={height || "30px"} margin={margin || "0 10px"} />


const BtnAddLinksIcon: React.FunctionComponent<ImageProps> =
    ({ width, height, margin, onClick }) => <SvgIcon onClick={onClick} style={{ cursor: 'pointer' }} src={addLinksBtn} width={width || '50px'} height={height || "30px"} margin={margin || "0 10px"} />
const AddLinksIcon: React.FunctionComponent<ImageProps> =
    ({ width, height, margin }) => <SvgIcon src={addlinks} width={width || '50px'} height={height || "30px"} margin={margin || "0 10px"} />
const CloseIcon: React.FunctionComponent<ImageProps & Styleable> =
    ({ width, height, margin, onClick, style }) => <SvgIcon onClick={onClick} style={{ cursor: 'pointer', ...style }} src={close} width={width || '50px'} height={height || "30px"} margin={margin || "0 10px"} />
const RequestSentIcon: React.FunctionComponent<ImageProps> =
    ({ width, height, margin }) => <SvgIcon src={requestsent} width={width || '50px'} height={height || "30px"} margin={margin || "0 10px"} />

const ViewBtnIcon: React.FunctionComponent<ImageProps> =
    ({ width, height, margin, onClick }) => <SvgIcon style={{ cursor: 'pointer' }} onClick={onClick} src={viewbtn} width={width || '50px'} height={height || "30px"} margin={margin || "0 10px"} />

const DocumentSvg: React.FunctionComponent<ImageProps> =
    ({ width, height, margin, onClick }) => <SvgIcon onClick={onClick} src={doc} width={width || '50px'} height={height || "30px"} margin={margin || "0 10px"} />

const DeleteIcon: React.FunctionComponent<ImageProps & Styleable> = 
    ({ width, height, margin, onClick, style }) => <SvgIcon style={{ cursor: 'pointer', ...style }} onClick={onClick} src={deleteicon} width={width || '50px'} height={height || "30px"} margin={margin || "0 10px"} />

const CheckIcon: React.FunctionComponent<ImageProps & Styleable> =
    ({ width, height, margin, onClick, style }) => <SvgIcon onClick={onClick} style={{ cursor: 'pointer', ...style }} src={checkicon} width={width || '50px'} height={height || "30px"} margin={margin || "0 10px"} />

const CancelIcon: React.FunctionComponent<ImageProps & Styleable> =
    ({ width, height, margin, onClick, style }) => <SvgIcon onClick={onClick} style={{ cursor: 'pointer', ...style }} src={cancelicon} width={width || '50px'} height={height || "30px"} margin={margin || "0 10px"} />

const DownloadIcon: React.FunctionComponent<ImageProps & Styleable> =
    ({ width, height, margin, onClick, style }) => <SvgIcon onClick={onClick} style={{ cursor: 'pointer', ...style }} src={downloadicon} width={width || '50px'} height={height || "30px"} margin={margin || "0 10px"} />

const DoneIcon: React.FunctionComponent<ImageProps & Styleable> =
    ({ width, height, margin, onClick, style }) => <SvgIcon onClick={onClick} style={{ cursor: 'pointer', ...style }} src={doneicon} width={width || '50px'} height={height || "30px"} margin={margin || "0 10px"} />

const ErrorIcon: React.FunctionComponent<ImageProps & Styleable> =
    ({ width, height, margin, onClick, style }) => <SvgIcon onClick={onClick} style={{ cursor: 'pointer', ...style }} src={erroricon} width={width || '50px'} height={height || "30px"} margin={margin || "0 10px"} />

const FolderIcon: React.FunctionComponent<ImageProps & Styleable> =
    ({ width, height, margin, onClick, style }) => <SvgIcon onClick={onClick} style={{ cursor: 'pointer', ...style }} src={foldericon} width={width || '50px'} height={height || "30px"} margin={margin || "0 10px"} />

const GoBackIcon: React.FunctionComponent<ImageProps & Styleable> =
    ({ width, height, margin, onClick, style }) => <SvgIcon onClick={onClick} style={{ cursor: 'pointer', ...style }} src={goback} width={width || '50px'} height={height || "30px"} margin={margin || "0 10px"} />

const RightChevronIcon: React.FunctionComponent<ImageProps & Styleable> =
    ({ width, height, margin, onClick, style }) => <SvgIcon onClick={onClick} style={{ ...style }} src={rightchevron} width={width || '50px'} height={height || "30px"} margin={margin || "0 10px"} />

const ExportIcon: React.FunctionComponent<ImageProps & Styleable> = 
    ({ width, height, margin, onClick, style }) => <SvgIcon onClick={onClick} style={{ cursor: 'pointer', ...style }} src={exporticon} width={width || '50px'} height={height || "30px"} margin={margin || "0 10px"} />


export {
    SvgIcon as AppLogo, PlainAppLogo, MyLinksIcon, InboxIcon, OutboxIcon, RequestSentIcon, ViewBtnIcon,
    InvitesIcon, UserListAvatar, PendingIcon, BtnAddLinksIcon, AddLinksIcon, CloseIcon, DocumentSvg,
    ProgressSpinner, DeleteIcon, CheckIcon, CancelIcon, DownloadIcon, DoneIcon, ErrorIcon, FolderIcon,
    GoBackIcon, RightChevronIcon, ExportIcon
}