import { useState } from "react";
import { InputAdornment, TextField } from "@mui/material";

const CityInput = ({ setCity }: { setCity: React.Dispatch<React.SetStateAction<string>> }) => {
  const [city, setLocalCity] = useState<string>('')

  const handleEnter = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      setCity(city);
    }
  }

  const handleSearch = async () => {
    setCity(city); 
  }
  

  return (
    <div style={{ display: 'flex', justifyContent: 'end' }}>
      <TextField
        type="text"
        value={city}
        placeholder="도시를 입력하세요"
        onChange={(e) => setLocalCity(e.target.value)}
        onKeyDown={handleEnter}
        slotProps={{
          input: {
            style: {
              width: '15rem',
              borderRadius: "0.75rem",
              backgroundColor: "rgba(255, 255, 255, 0.10)",
              fontWeight: 'bold'
            },
            endAdornment: (
              <InputAdornment position="end">
                <img
                  src="/img/abc.png"
                  alt="돋보기"
                  style={{ width: "20px", cursor: "pointer" }}
                  onClick={handleSearch}
                />
              </InputAdornment>
            ),
          },
        }}
      />
    </div>
  )
}

export default CityInput