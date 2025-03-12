import { TextField } from "@mui/material"
import Footer from "../../layout/footer/Footer"
import Header from "../../layout/header/Header"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth"
import { auth } from "../../config/firebase"
import { emailValidation, pwdValidation } from "../../utils/ValidUtils"

const Join = () => {
  const [email, setEmail] = useState<string>('')
  const [pwd, setPwd] = useState<string>('')
  const [pwdChk, setPwdChk] = useState<string>('')
  const [emailError, setEmailError] = useState<string>('')
  const [emailValid, setEmailValid] = useState<string>('')
  const [emailMatch, setEmailMatch] = useState<string>('')
  const [pwdError, setPwdError] = useState<string>('')
  const [pwdValid, setPwdValid] = useState<string>('')
  const [pwdMatch, setPwdMatch] = useState<string>('')
  const [pwdChkError, setPwdChkError] = useState<string>('')
  const [isCert, setIsCert] = useState<boolean>(false)
  const movePage = useNavigate()

  const handleSendCertCode = async () => {

    var hasError = false
    setEmailError('')
    setEmailValid('')
    setEmailMatch('')
    setPwdError('')
    setPwdValid('')
    setPwdChkError('')
    setPwdMatch('')
    
    if (!email) {
      setEmailError('이메일을 입력하세요.')
      hasError = true
    }
    if (!emailValidation.test(email)) {
      setEmailValid('이메일 형식에 맞게 작성해주세요.')
      hasError = true
    }
    if (!pwd) {
      setPwdError('비밀번호를 입력하세요.')
      hasError = true
    }
    if (!pwdValidation.test(pwd)) {
      setPwdValid('비밀번호는 6~20자, 영문 대소문자, 숫자, 특수문자를 포함해야합니다.')
      hasError = true
    }
    if (pwd != pwdChk) {
      setPwdChkError('비밀번호가 일치하지 않습니다.')
      hasError = true
    }
    if (hasError)
      return

    try {
      const actionCodeSetting = {
        url: 'http://localhost:3000/login',
        handleCodeInApp: true
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, pwd)
      const user = userCredential.user
      
      try {
        await sendEmailVerification(user, actionCodeSetting)
        alert('이메일 인증코드가 발송되었습니다. 이메일을 확인해주세요.')
        
        // checkEmailVerification()
      } catch (error) {
        console.error
      }
    } catch (error) {
      console.error
    }
  }

  // const checkEmailVerification = async () => {
  //   try {
  //     const response = await fetch(`/api/checkEmail`, {
  //       method: 'POST',
  //       body: JSON.stringify({email}),
  //       headers: {'Content-Type': 'application/json'}
  //     })
  //     const data = await response.json()

  //     if (data.success) {
  //       setIsCert(true)     // 이메일 인증이 완료되었으면 isCert 상태 true로 설정
  //       movePage('/login')  // 로그인 페이지로 이동
  //     } else {
  //       alert('이메일 인증이 완료되지 않았습니다. 인증을 확인해주세요.')
  //     }
  //   } catch (error) {
  //     console.error('이메일 인증 확인 중 오류 발생:', error)
  //     alert('이메일 인증 확인에 실패했습니다.')
  //   }
  // }

  return (
    <>
      <Header />

      <div style={{width: '30%', height: '66vh', margin: '0 auto', marginTop: '5rem'}}>

        <h1 style={{marginBottom: '3rem', textAlign: 'center'}}>Join</h1>
        <div style={{display: 'flex', width: '100%', marginBottom: '2rem'}}>
          <h3 style={{width: '25%'}}>이메일</h3>
          <div style={{width: '75%'}}>
            <TextField
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              style={{width: '100%'}}
              />
              {(emailError || emailValid || emailMatch) && (
                <div
                  style={{
                    color: 'red',
                    fontSize: '0.9rem',
                    fontWeight: 'bold',
                    position: 'absolute',
                    // marginTop: '0.5rem',
                    // visibility: (emailError || emailValid || emailMatch) ? 'visible' : 'hidden',
                    // whiteSpace: 'nowrap',
                  }}
                >
                  {emailError || emailValid || emailMatch}
                </div>
              )}
          </div>
        </div>
        <div style={{display: 'flex', width: '100%', marginBottom: '2rem', position: 'relative'}}>
          <h3 style={{width: '25%'}}>비밀번호</h3>
          <div style={{width: '75%'}}>
            <TextField 
              onChange={(e) => setPwd(e.target.value)}
              type='password'
              value={pwd}
              style={{width: '100%'}}
            />
            {(pwdError || pwdValid || pwdMatch) && (
              <div
                style={{
                  color: 'red',
                  fontSize: '0.9rem',
                  fontWeight: 'bold',
                  position: 'absolute',
                  // marginTop: '0.5rem',
                  // visibility: (pwdError || pwdValid || pwdMatch) ? 'visible' : 'hidden',
                  // whiteSpace: 'nowrap'
                }}
              >
                {pwdError || pwdValid || pwdMatch}
              </div>
            )}
          </div>
        </div>
        <div style={{display: 'flex', width: '100%', marginBottom: '2rem', position: 'relative'}}>
          <h3 style={{width: '25%'}}>비밀번호 확인</h3>
          <div style={{width: '75%'}}>
            <TextField 
              onChange={(e) => setPwdChk(e.target.value)}
              type='password'
              value={pwdChk}
              style={{width: '100%'}}
            />
            {pwdChkError && (
              <div
                style={{
                  color: 'red',
                  fontSize: '0.9rem',
                  fontWeight: 'bold',
                  position: 'absolute',
                  marginTop: '0.5rem',
                  visibility: pwdChkError ? 'visible' : 'hidden',
                  whiteSpace: 'nowrap'
                }}
              >
                {pwdChkError}
              </div>
            )}
          </div>
        </div>
        <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '5rem'}}>
          <button
            onClick={() => movePage('/login')}
            style={{
              width: '49%',
              height: '2.5rem',
              cursor: 'pointer',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              border: 'none',
              borderRadius: '0.5rem',
              backgroundColor: '#f5f5f5'
            }}
          >
            취소
          </button>
          <button
            onClick={handleSendCertCode}
            style={{
              width: '49%',
              height: '2.5rem',
              cursor: 'pointer',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              border: 'none',
              borderRadius: '0.5rem',
              backgroundColor: '#f5f5f5'
            }}
          >
            가입하기
          </button>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default Join