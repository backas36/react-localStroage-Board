import styled from "styled-components"

import MessageMaker from "../MessageMaker"
const MsgsContainer = styled.div`
  margin-top:100px;
`
const MsgContainer = styled.div`
  margin-top:20px;
  background:#fffffe;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  padding:30px;
`

const MsgTitle = styled.div`
  color:#020826;
  font-weight:bold;
  font-size:26px;
  word-break: break-word;
`

const MsgInfo = styled.div`
  margin-top:10px;
  color:#aaa;
  font-weight:300;
`

const MsgContent = styled.div`
  margin-top:10px;
  color:#020826;
  font-weight:300;
  font-size:20px;
  word-break: break-word;
`
const MsgResContainer = styled.div`
  margin-top:20px;
`

const ResTitle = styled.div`
  color:#020826;
  font-weight:bold;
  font-size:24px;

`

const ResItemsContainer = styled.div`
  padding:20px;
`
const ResItem = styled.div`
  padding:10px 0;
  border-bottom: 1px solid #020826;
`

const ResContent = styled.div`
  font-size:20px;
  font-weight:300;
  word-break: break-word;
`
const ResItemInfo = styled.div`
  margin-top:10px;
  color:#aaa;
  font-weight:300;
`

const EmptyReply = styled.div`
  font-weight:300;
`

const Messages = ({ setErrorMsg, messages, setMessages, id, nickname, setNickname }) => {


  const RenderResItem = ({ resItem }) => {
    let { author, content, created_at } = resItem
    return (
      <ResItem>
        <ResContent>{content}</ResContent>
        <ResItemInfo>{new Date(created_at).toLocaleString()} - {author}</ResItemInfo>
      </ResItem>
    )
  }

  const ResItems = ({ responses }) => {
    responses.sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at))
    return (
      <ResItemsContainer>
        {responses.length > 0 ? (
          responses.map((resItem, index) => (
            <RenderResItem
              key={resItem.id}
              resItem={resItem}
            />
          ))
        ) : (
          <EmptyReply>welcome leave some comment...</EmptyReply>
        )}

      </ResItemsContainer>
    )
  }
  const RenderMsg = ({ msg, index }) => {
    let { author, content, responses, created_at, id } = msg
    return (
      <>
        <MsgContainer>
          <MsgTitle>Comment - {index + 1}</MsgTitle>
          <MsgInfo>{new Date(created_at).toLocaleString()} - {author}</MsgInfo>
          <MsgContent>{content}</MsgContent>
          <MessageMaker
            setErrorMsg={setErrorMsg}
            nickname={nickname}
            messages={messages}
            setMessages={setMessages}
            setNickname={setNickname}
            id={id}
          />
          <MsgResContainer>
            <ResTitle>Reply</ResTitle>
            <ResItems responses={responses} />
          </MsgResContainer>
        </MsgContainer>
      </>

    )
  }

  return (
    <MsgsContainer>
      {messages && messages.map((msg, index) => (
        <RenderMsg
          key={msg.id}
          msg={msg}
          index={index}
        />
      ))}
    </MsgsContainer>
  )
}

export default Messages