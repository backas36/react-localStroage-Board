import { useState } from "react"
import styled from "styled-components"

const NewMsgContainer = styled.div`
  display:flex;
  flex-direction:column;
`


const NewMsgTextarea = styled.textarea`
  margin-top:20px;
  font-size:16px;
  border: 2px solid #716040;
  min-height:200px;
  padding:8px;
  resize:none;
  border-radius:6px;
  width:100%;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
`
const SubmitBtn = styled.button`
  margin-top:10px;
  border:none;
  background: #8c7851;
  color: #fffffe;
  padding:6px 12px;
  border-radius:6px;
  cursor:pointer;
  opacity: 0.7;
  transition: opacity .5s;
  &:hover {
    opacity:1;
  }
  align-self:flex-end;
`
const ErrorMsg = styled.div`
  color:#ee3333;
`



const MessageMaker = ({ setErrorMsg, messages, setMessages, id, nickname, setNickname }) => {
  const [newMsg, setNewMsg] = useState('')
  const [newMsgErr, setNewMsgErr] = useState(null)

  const handleTexareaChange = e => {
    setErrorMsg('')
    setNewMsgErr('')
    setNewMsg(e.target.value)
  }
  const handleNewMsgBtn = (e) => {
    if (!nickname) {
      setErrorMsg('nickname cannot be empty.')
      return
    }
    if (!newMsg) {
      setNewMsgErr('message cannot be empty.')
      return
    }
    if (messages.find(msg => msg.id === id)) {
      setMessages(messages.map(msg => {
        if (msg.id === id) {
          const { responses } = msg
          return {
            ...msg,
            responses: [
              ...responses,
              {
                content: newMsg,
                author: nickname,
                created_at: new Date(),
                updated_at: new Date(),
                id: Math.random()
              }
            ]
          }
        }
        return msg
      }))
    } else {
      setMessages([
        {
          id: id.current,
          content: newMsg,
          author: nickname,
          responses: [],
          created_at: new Date(),
          updated_at: new Date()
        },
        ...messages
      ])
      id.current++
    }

    setNewMsg('')
  }


  return (
    <NewMsgContainer>
      <NewMsgTextarea
        placeholder='Leave a comment ...'
        onChange={handleTexareaChange}
        value={newMsg}
      />
      <SubmitBtn onClick={handleNewMsgBtn}>Submit</SubmitBtn>
      {newMsgErr && (
        <ErrorMsg>{newMsgErr}</ErrorMsg>
      )}
    </NewMsgContainer>
  )
}

export default MessageMaker