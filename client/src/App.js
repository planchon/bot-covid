import React from 'react';
import { Grid, Row, Col } from "react-flexbox-grid"
import ChatBox from './components/ChatBox/ChatBox'

const App = () => {
  return (
    <Grid fluid>
      <Row>
        <Col xs={12}>
          <ChatBox user={"User"} />
        </Col>
      </Row>
    </Grid>
  )
}

export default App