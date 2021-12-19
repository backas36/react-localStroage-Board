import styled from 'styled-components'

import MessageMaker from '../MessageMaker'
import Messages from '../Messages'
import useMessages from '../../hooks/useMessages'



const Main = styled.main`
  max-width:800px;
  margin: 40px auto;
  @media screen and (max-width: 800px) {
    padding:40px;
  }
`

const Title = styled.div`
  color:#020826;
  font-weight:bold;
  font-size:36px;
`

const NicknameInput = styled.input`
  margin-top:30px;
  font-size:16px;
  border: 2px solid #716040;
  border-radius:6px;
  width:20%;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
  padding: 8px;
`
const EmptyMsg = styled.div`
  margin-top:100px;
  font-size:22px;
  font-weight:300;
`
const ErrorMsg = styled.div`
  color:#ee3333;
`


const App = () => {
  const {
    id,
    errorMsg,
    setErrorMsg,
    nickname,
    setNickname,
    messages,
    setMessages,
    handleNicknameInput
  } = useMessages()
  return (
    <Main>
      <Title>Leave a Message Demo App</Title>
      <NicknameInput
        placeholder="Your nickname"
        onChange={handleNicknameInput}
        value={nickname}
      />
      <MessageMaker
        setErrorMsg={setErrorMsg}
        nickname={nickname}
        messages={messages}
        setMessages={setMessages}
        setNickname={setNickname}
        id={id}
      />
      {errorMsg && (
        <ErrorMsg>{errorMsg}</ErrorMsg>
      )}
      {messages && messages.length > 0 ? (
        <Messages
          messages={messages}
          setErrorMsg={setErrorMsg}
          nickname={nickname}
          setMessages={setMessages}
          setNickname={setNickname}
        />
      ) : (
        <EmptyMsg>Welcome leave some messages ... </EmptyMsg>
      )}

    </Main>
  )
}

export default App