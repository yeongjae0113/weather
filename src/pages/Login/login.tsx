import { TextField } from "@mui/material"
import { useState } from "react"
import Footer from "../../layout/footer/Footer"
import Header from "../../layout/header/Header"
import { useNavigate } from "react-router-dom"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../config/firebase"

const Login = () => {
  const [email, setEmail] = useState<string>('')
  const [pwd, setPwd] = useState<string>('')
  const [emailError, setEmailError] = useState<string>('')
  const [pwdError, setPwdError] = useState<string>('')
  const [emailMatch, setEmailMatch] = useState<string>('')
  const movePage = useNavigate()

  const handleSubmit = async () => {
    setEmailError('')
    setEmailMatch('')
    setPwdError('')

    var hasError = false

    if (!email) {
      setEmailError('이메일을 입력해주세요.')
      hasError = true
    }
    if (!pwd) {
      setPwdError('비밀번호를 입력해주세요.')
      hasError = true
    }
    if (hasError)   // = if (hasError = true)
      return

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, pwd)
      const user = userCredential.user
      const accessToken = await user.getIdToken()

      console.log('유저 토큰: ', accessToken)
      console.log('유저 정보: ', user)
      alert('로그인 성공')
      movePage('/')
    } catch (error) {
      console.error('로그인 실패: ', error)
    }
  }
    


  return (
    <>
      <Header />
      <div style={{width: '30%', height: '66vh', margin: '0 auto', marginTop: '5rem'}}>

        <h1 style={{marginBottom: '3rem', textAlign: 'center'}}>Login</h1>
        <div style={{display: 'flex', width: '100%', marginBottom: '2rem', position: 'relative'}}>
          <h3 style={{width: '25%'}}>이메일</h3>
          <div style={{width: '75%'}}>
            <TextField 
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              style={{width: '100%'}}
            />
            {(emailError || emailMatch) && (
              <div
                style={{
                  color: 'red',
                  fontSize: '0.9rem',
                  fontWeight: 'bold',
                  position: 'absolute',
                  // visibility: emailError || emailMatch ? 'visible' : 'hidden',
                  // whiteSpace: 'nowrap'
                }}
              >
                {emailError || emailMatch}
              </div>
            )}
          </div>
        </div>
        <div style={{display: 'flex', width: '100%', position: 'relative', marginBottom: '2rem'}}>
          <h3 style={{width: '25%'}}>비밀번호</h3>
          <div style={{width: '75%'}}>
            <TextField 
              onChange={(e) => setPwd(e.target.value)}
              type='password'
              value={pwd}
              style={{width: '100%'}}
            />
            {(pwdError && (
              <div
                style={{
                  color: 'red',
                  fontSize: '0.9rem',
                  fontWeight: 'bold',
                  position: 'absolute',
                  // visibility: emailError || emailMatch ? 'visible' : 'hidden',
                  // whiteSpace: 'nowrap'
                }}
              >
                {pwdError}
              </div>
            ))}
          </div>
        </div>
        <div style={{display: 'flex', marginTop: '5rem'}}>
          <button
            onClick={() => movePage('/findPwd')}
            style={{
              border: 'none',
              fontWeight: 'bold',
              color: '#555555',
              backgroundColor: 'white',
              cursor: 'pointer',
              marginBottom: '1rem',
            }}
          >
            비밀번호 찾기 &nbsp;
          </button>
          <button
            onClick={() => movePage('/join')}
            style={{
              border: 'none',
              fontWeight: 'bold',
              color: '#555555',
              backgroundColor: 'white',
              cursor: 'pointer',
              marginBottom: '1rem',
            }}
          >
            &nbsp; 회원가입
          </button>
        </div>
        <div>
          <button
            onClick={handleSubmit}
            style={{
              width: '100%', 
              height: '2.5rem', 
              cursor: 'pointer',
              fontSize: '1.2rem', 
              fontWeight: 'bold', 
              border: 'none', 
              borderRadius: '0.5rem', 
              backgroundColor: '#f5f5f5' 
            }}
          >
            로그인
          </button>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Login