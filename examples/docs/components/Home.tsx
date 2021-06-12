import React from 'react'
import styled from 'styled-components'

const blmGrey = 'rgb(33, 33, 33)';
const blmMetal = 'rgb(66, 66, 66)';


const Home: any = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: white;
  background: linear-gradient(20deg, ${blmGrey}, ${blmMetal});
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.17);
  box-sizing: border-box;
  min-height: 100vh;
  padding-top: 160px;
  padding-bottom: 160px;
`

function HomeHeader() {
  return (
    <header>
      <h1>{`<👋>`}</h1>
      <p>parsed</p>
      <p>path</p>
    </header>
  )
}

Home.Header = styled(HomeHeader)`
    padding: 4rem 0;
    border: solid white;
    flex-direction: column;
    p {
        padding: 2rem;
        text-align: left;
        font-size: 50px;
    }
`

function Feature({title, children}: any) {
  return (
    <div className="col col--4">
      <h3>{title}</h3>
      <p>{children}</p>
    </div>
  );
}

const Section = styled.section`
    display: flex;
    align-items: center;
    padding: 2rem 0;
    width: 100%;
`

const StyledFeature = styled(Feature)`
    height: 200px;
    width: 200px;
`

Home.Features = () =>  {
  return (
    <Section>
      <div className="container">
        <div className="row">
          <StyledFeature
            title='Easy to Use'>
            Docusaurus was designed from the ground up to be easily installed and
            used to get your website up and running quickly.
          </StyledFeature>
          <StyledFeature
            title='Focus on What Matters'>
            Docusaurus lets you focus on your docs, and we&apos;ll do the chores. Go
            ahead and move your docs into the <code>docs</code> directory.
          </StyledFeature>
          <StyledFeature
            title='Powered by React'>
            Extend or customize your website layout by reusing React. Docusaurus can
            be extended while reusing the same header and footer.
          </StyledFeature>
        </div>
      </div>
    </Section>
  )
}

export {Home}
