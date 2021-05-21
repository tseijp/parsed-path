import React from 'react'
import styled from 'styled-components'



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

export default function HomepageFeatures() {
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
  );
}
