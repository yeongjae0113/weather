import { useState } from "react"
import Footer from "../../layout/footer/Footer"
import Header from "../../layout/header/Header"
import { deleteUser, getAuth, signOut } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import { TextField } from "@mui/material"

const MyPage = () => {
  const [deleteText, setDeleteText] = useState<string>('')
  const auth = getAuth()
  const movePage = useNavigate()

  const handleDeleteUser = async () => {
    if (!auth.currentUser) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      confirm('탈퇴하시겠습니까?')
      await deleteUser(auth.currentUser)
      await signOut(auth)
      movePage('/')
    } catch (error) {
      console.error
    }
  }
  
  return (
    <>
      <Header />
      <div style={{width: '80%', height: '72vh', margin: '0 auto'}}>
        <h2 style={{textAlign: 'center', marginBottom: '10rem'}}>마이페이지</h2>
        <div style={{display: 'flex', justifyContent: 'center'}}> 
          <div style={{width: '30%', fontWeight: 'bold', marginBottom: '1rem'}}>회원탈퇴를 원하시면 "회원탈퇴"를 입력하세요.</div>
        </div>
        <div style={{display: 'flex', justifyContent: 'center', marginBottom: '2rem'}}>
          <TextField 
            value={deleteText}
            placeholder="회원탈퇴"
            onChange={(e) => setDeleteText(e.target.value)}
            style={{width: '30%'}}
          />
        </div>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <button
            onClick={deleteText === '회원탈퇴' ? handleDeleteUser : undefined}
            style={{
              width: '30%', 
              height: '2.5rem', 
              cursor: deleteText === '회원탈퇴' ? 'pointer' : 'not-allowed',
              fontSize: '1.2rem', 
              fontWeight: 'bold', 
              border: 'none', 
              borderRadius: '0.5rem', 
              backgroundColor: deleteText === '회원탈퇴' ? '#ff2400' : '#888',
              color: 'white'
            }}
          >
            탈퇴하기
          </button>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default MyPage