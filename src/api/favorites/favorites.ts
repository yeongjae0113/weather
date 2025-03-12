import axios from "axios"

export const api = axios.create({
  // 서버 ip ex) 172.30.1.77:8282    ||  백엔드 로컬 주소 ex) localhost:5000 
  baseURL: '',
  headers: {
    'Content-Type': 'application/json',
    // 'Authorization': `Bearer ${accessToken}`
  }
})

export interface FavoritesList {
  id: number
  uid: string
  itemName: string
  selected: boolean
  createdAt: string
}

interface FavoriteAdd {
  uid: string
  itemName: string
  selected: boolean
}


export default {

  favoritesList: async (uid: string) => {
    const response = await api.get<FavoritesList[]>(`/api/favorites/${uid}`)
    return response.data
  },

  addFavorites: async (params: FavoriteAdd) => {
    const response = await api.post(`/api/favorites`, params)
    return response.data
  },

  removeFavorites: async (favoriteId: number) => {
    await api.delete(`/api/favorites/${favoriteId}`)
    return
  }
}