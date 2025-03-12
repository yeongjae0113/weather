import { useState } from "react";
import { InputAdornment, TextField } from "@mui/material";

const CityInput = ({ setCity }: { setCity: any }) => {
  const [city, setLocalCity] = useState<string>('')

  const handleSearch = async (e: any) => {
    e.preventDefault()
    setCity(city); 
  }
  
  return (
    <div style={{ display: 'flex', justifyContent: 'end' }}>
      <form onSubmit={handleSearch}>
        <TextField
          type="text"
          value={city}
          placeholder="도시를 입력하세요"
          onChange={(e) => setLocalCity(e.target.value)}
          slotProps={{
            input: {
              style: {
                width: '15rem',
                height: '2.5rem',
                borderRadius: "0.75rem",
                backgroundColor: "rgba(255, 255, 255, 0.10)",
                fontWeight: 'bold'
              },
              endAdornment: (
                <InputAdornment position="end">
                  <img
                    src="/img/abc.png"
                    alt="돋보기"
                    style={{width: "20px", cursor: "pointer"}}
                    onClick={handleSearch}
                  />
                </InputAdornment>
              ),
            },
          }}
        />
      </form>
    </div>
  )
}

export default CityInput