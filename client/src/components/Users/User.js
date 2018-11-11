import React, { Component } from 'react';
import {
  Button,
  ButtonGroup,
  Glyphicon,
  Label,
  ListGroupItem,
  Grid,
  Row,
  Col
 } from 'react-bootstrap';

export default class User extends Component {
  renderButtons = () => {
    if (this.props.allow_mutations) {
      return (
        <Col>
          <ButtonGroup>
            <Button><Glyphicon glyph="pencil" /></Button>
            <Button><Glyphicon glyph="trash" /></Button>
          </ButtonGroup>
        </Col>
      ) ;
    }
  }
  render () {
    if (this.props.allow_mutations) {
      console.log('Render some edit and delete fns for', this.props.user.email)
    }
    return (
      <ListGroupItem>
        <Grid>
          <Row>
            <Col md={8}>
              <p><Label>Email:</Label> {this.props.user.email}</p>
            </Col>
            {this.renderButtons()}
          </Row>
        </Grid>
      </ListGroupItem>
    )
  }
}
