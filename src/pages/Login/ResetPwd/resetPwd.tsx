import { TextField } from "@mui/material"
import Footer from "../../../layout/footer/Footer"
import Header from "../../../layout/header/Header"
import { useEffect, useState } from "react"
import { confirmPasswordReset } from "firebase/auth"
import { auth } from "../../../config/firebase"
import { useNavigate, useSearchParams } from "react-router-dom"

const ResetPwd = () => {
  const [newPwd, setNewPwd] = useState<string>('')
  const [newPwdChk, setNewPwdChk] = useState<string>('')
  const [pwdError, setPwdError] = useState<string>('')
  const [pwdValid, setPwdValid] = useState<string>('')
  const [pwdMatch, setPwdMatch] = useState<string>('')
  const [pwdChkError, setPwdChkError] = useState<string>('')
  const [searchParams] = useSearchParams()
  const oobCode = searchParams.get('oobCode')
  const movePage = useNavigate()

  useEffect(() => {
    if (!oobCode) {
      alert('유효하지 않는 링크입니다.')
    }
  }, [oobCode])

  const handleResetPassword = async () => {
    const validation = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/

    var hasError = false
    setPwdError('')
    setPwdValid('')
    setPwdMatch('')
    setPwdChkError('')

    if (!newPwd) {
      setPwdError('비밀번호를 입력하세요.')
      hasError = true
    }
    if (newPwd != newPwdChk) {
      setPwdChkError('비밀번호가 일치하지 않습니다.')
      hasError = true
    }
    if (!validation.test(newPwd)) {
      setPwdValid('비밀번호는 6~20자, 영문 대소문자, 숫자, 특수문자를 포함해야합니다.')
      hasError = true
    }
    if (hasError)
      return

    try {
      await confirmPasswordReset(auth, oobCode as string, newPwd)
      alert('비밀번호 변경 성공')
      movePage('/login')
    } catch (error) {
      console.error
    }
  }

  return (
    <>
      <Header />
      <div style={{width: '30%', height: '66vh', margin: '0 auto', marginTop: '5rem'}}>
        <h1 style={{marginBottom: '10rem', textAlign: 'center'}}>비밀번호 재설정</h1>
        <div style={{display: 'flex', width: '100%', marginBottom: '2rem', position: 'relative'}}>
          <h3 style={{width: '25%'}}>비밀번호</h3>
          <div style={{width: '75%'}}>
            <TextField
              type='email'
              id='email'
              placeholder='이메일 주소 입력'
              value={newPwd}
              onChange={(e) => setNewPwd(e.target.value)}
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
                  // whiteSpace: 'nowrap',
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
              type='email'
              id='email'
              placeholder='이메일 주소 입력'
              value={newPwdChk}
              onChange={(e) => setNewPwdChk(e.target.value)}
              style={{width: '100%'}}
            />
            {pwdChkError && (
              <div
                style={{
                  color: 'red',
                  fontSize: '0.9rem',
                  fontWeight: 'bold',
                  position: 'absolute',
                  // marginTop: '0.5rem',
                  // visibility: pwdChkError ? 'visible' : 'hidden',
                  // whiteSpace: 'nowrap',
                }}
              >
                {pwdChkError}
              </div>
            )}
          </div>
        </div>
        <button
            onClick={handleResetPassword}
            style={{
              width: '100%',
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
      <Footer />
    </>
  )
}

export default ResetPwd