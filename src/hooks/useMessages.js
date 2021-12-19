import { useState, useRef, useEffect } from "react";

const writeMsgToLocalStorage = (messages) => {
  window.localStorage.setItem('messagesData', JSON.stringify(messages))
}

export default function useMessages() {
  const id = useRef(1)
  const [errorMsg, setErrorMsg] = useState(null)
  const [nickname, setNickname] = useState('')
  const [messages, setMessages] = useState(() => {
    let messagesData = window.localStorage.getItem('messagesData') || ''
    if (messagesData && messagesData.length > 0) {
      messagesData = JSON.parse(messagesData)
      if (messagesData.length > 0) {
        id.current = messagesData[0].id + 1
        messagesData.sort(
          (a, b) => Date.parse(b.created_at) - Date.parse(a.created_at)
        )
      }
    } else {
      messagesData = []
    }
    return messagesData
  })

  const handleNicknameInput = (e) => {
    setErrorMsg('')
    setNickname(e.target.value)
  }

  useEffect(() => {
    writeMsgToLocalStorage(messages)
  }, [messages])

  return {
    id,
    errorMsg,
    setErrorMsg,
    nickname,
    setNickname,
    messages,
    setMessages,
    handleNicknameInput
  }

}