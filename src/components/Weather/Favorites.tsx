import { Dialog } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import favorites, { FavoritesList } from "../../api/favorites/favorites"
import { AuthContext } from "../../context/AuthContext"

const Favorites = ({
  isDialog,
  handleCloseDialog
}: {
  isDialog: boolean,
  handleCloseDialog: () => void
}) => {

  const [favoritesData, setFavoritesData] = useState<FavoritesList[]>([])
  const user = useContext(AuthContext)
  const uid = user?.user?.uid

  useEffect(() => {
    
    if (isDialog) {
      if (!uid || undefined) {
        alert('로그인하세요.')
        return
      }
      const getFavorites = async () => {
        try {
          const response = await favorites.favoritesList(uid)
          setFavoritesData(response)
        } catch (error) {
          console.error
        }
      }
      getFavorites()
    }
  }, [isDialog, uid])

  return (
    <div style={{width: '100%'}}>
      <Dialog 
        open={isDialog} 
        onClose={handleCloseDialog}
        sx={{
          '& .MuiDialog-paper': {
            width: '50%',
            height: '50%',
            position: 'absolute',
            top: '10%',
          }
        }}
      >
        <div style={{width: '90%', height: '100%', margin: '0 auto'}}>
          <h2>즐겨찾기</h2>
          <div style={{height: '70%', textAlign: 'center', alignContent: 'center', alignItems: 'center'}}>

            {favoritesData.length === 0 ? (
              <div>즐겨찾기 목록이 없습니다.</div>
            ) : (
              <>
                {favoritesData.map((data) => (
                  <div key={data.id}>
                    {data.itemName} ({data.selected ? '선택됨' : '선택 안됨'})
                  </div>
                ))}
              </>
            )}
            

          </div>
          <div style={{position: 'absolute', top: '90%', right: '4%', marginBottom: '0.5rem'}}>
            <button onClick={handleCloseDialog}>
              닫기
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  )
}

export default Favorites