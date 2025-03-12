import { useState } from "react";
import Header from "../../../layout/header/Header";
import Footer from "../../../layout/footer/Footer";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../../config/firebase";

const FindPwd = () => {
  const [email, setEmail] = useState<string>('')
  const [emailError, setEmailError] = useState<string>('')
  const [emailValid, setEmailValid] = useState<string>('')
  const [emailMatch, setEmailMatch] = useState<string>('')
  const [isCert, setIsCert] = useState<boolean>(false)
  const movePage = useNavigate()

  const handlePasswordReset = async () => {
    if (!email) {
      setEmailError('이메일을 입력해주세요.')
      return
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailPattern.test(email)) {
      setEmailValid('올바른 이메일 주소를 입력해주세요.')
      return
    }

    try {
      const actionCodeSetting = {
        url: 'http://localhost:3000/resetPwd',
        handleCodeInApp: true
      }
      
      // 비밀번호 재설정 이메일 발송 함수 호출
      await sendPasswordResetEmail(auth, email, actionCodeSetting)
      alert('비밀번호 재설정 이메일이 발송되었습니다. 이메일을 확인해주세요.')
    } catch (error) {
      console.error('비밀번호 재설정 실패: ', error)
      alert('가입된 정보가 없습니다.')
    }
  }

  return (
    <>
      <Header />

      <div style={{width: '30%', height: '66vh', margin: '0 auto', marginTop: '5rem'}}>

        <h2 style={{marginBottom: '10rem', textAlign: 'center'}}>비밀번호 찾기</h2>
        <div style={{display: 'flex', marginBottom: '5rem'}}>
          <h3 style={{width: '25%'}}>이메일</h3>
          <div style={{width: '75%'}}>
            <TextField
              type='email'
              id='email'
              placeholder='이메일 주소 입력'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{width: '100%'}}
            />
            {(emailError || emailValid || emailMatch) && (
              <div
                style={{
                  color: 'red',
                  fontSize: '0.9rem',
                  fontWeight: 'bold',
                  position: 'absolute',
                  marginTop: '0.5rem',
                  visibility: (emailError || emailValid || emailMatch) ? 'visible' : 'hidden',
                  whiteSpace: 'nowrap',
                }}
              >
                {emailError || emailValid || emailMatch}
              </div>
            )}
          </div>
        </div>
        
        <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
          <button
            onClick={() => movePage('/login')}
            style={{
              width: '49%', 
              height: '2.5rem', 
              cursor: 'pointer',
              fontSize: '1.2rem', 
              fontWeight: 'bold', 
              border: 'none', 
              borderRadius: '0.5rem', 
              backgroundColor: '#f5f5f5' 
            }}
          >
            취소
          </button>
          <button
            onClick={handlePasswordReset}
            style={{
              width: '49%', 
              height: '2.5rem', 
              fontSize: '1.2rem', 
              fontWeight: 'bold', 
              border: 'none', 
              borderRadius: '0.5rem', 
              backgroundColor: isCert ? '#555555' : '#f5f5f5', 
              cursor: isCert ? 'default': 'pointer',
            }}
            disabled={isCert}
          >
            전송
          </button>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default FindPwd
