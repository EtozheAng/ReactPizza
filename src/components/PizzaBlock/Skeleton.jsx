import React from 'react'
import ContentLoader from 'react-content-loader'

const Skeleton = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="140" cy="133" r="130" />
    <rect x="0" y="287" rx="11" ry="11" width="280" height="29" />
    <rect x="0" y="340" rx="10" ry="10" width="280" height="88" />
    <rect x="0" y="451" rx="11" ry="11" width="95" height="30" />
    <rect x="128" y="448" rx="20" ry="20" width="152" height="45" />
  </ContentLoader>
)

export default Skeleton
