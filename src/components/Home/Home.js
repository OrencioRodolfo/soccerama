import React from 'react'
import styled from 'styled-components'
import logo from '../../images/logo.png'
import Link from '../Link/Link'
import League from '../League/League'

const Page = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
  max-width: 1024px;
`

const Head = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
`
const Img = styled.img`
  width: 100%;
  min-width: 120px;
  max-width: 500px;
  height: auto;
`

const Content = styled.div`
  flex-grow: 1;
  flex-shrink: 0;
  padding: 30px 0;
  overflow-x: scroll;
`

const Footer = styled.div`
  border-top: 1px solid grey;
  padding: 10px 0;
`

const url = 'https://www.sportmonks.com'

const Home = () => (
  <Page>
    <Head>
      <Link href={url}>
        <Img src={logo} alt="soccreama" />
      </Link>
    </Head>
    <Content>
      <League />
    </Content>
    <Footer>
      <Link href={url}>SportMonks</Link> provides fast and reliable data
      for different kind of sports.
    </Footer>
  </Page>
)

export default Home
