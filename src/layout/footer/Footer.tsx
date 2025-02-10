const Footer = () => {
  
  return (
    <>
      <div 
      style={{
        display: 'flex',
        justifyContent: 'center',
        height: '150px',
        backgroundColor: '#f5f5f5'
      }}>
        <div>
          <p 
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: '14px',
              color: '#929294',
              marginTop: '2rem'
            }}>
            본 콘텐츠의 저작권은 제공처에 있으며, 이를 무단 이용하는 경우 저작권법 등에 따라 법적책임을 질 수 있습니다. <br/>
            사업자정보 확인 주소: 경기도 성남시 분당구 정자일로 9510, Weather 1784, 13561 대표전화: 1588-3820<br/>
            사업자등록번호: 123-12-12345, 통신판매업신고번호: 123-12-12345 <br/>
          </p>
          <h3 style={{alignContent: 'center', textAlign: 'center', color: '#929294'}}>
            Weather
          </h3>
        </div>
      </div>
    </>
  )
}
export default Footer