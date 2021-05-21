import React from 'react'
import styled from 'styled-components'

function HomepageHeader() {
  return (
    <header>
      <h1>{`<👋>`}</h1>
      <p>parsed</p>
      <p>path</p>
    </header>
  )
}

const StyledHomepageHeader = styled(HomepageHeader)`
    padding: 4rem 0;
    border: solid white;
    flex-direction: column;
    p {
        padding: 2rem;
        text-align: left;
        font-size: 50px;
    }
`
export default StyledHomepageHeader
