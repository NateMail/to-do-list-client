import React, { Component } from 'react'
import axios from 'axios'
import { withRouter, Redirect, Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

import apiUrl from '../apiConfig'

class Items extends Component {
  constructor (props) {
    super(props)

    this.state = {
      items: [],
      deleted: false
    }
  }

  componentDidMount () {
    axios({
      url: `${apiUrl}/items`,
      method: 'GET',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      }
    })
      .then(res => {
        this.setState({ items: res.data.items })
      })
      .catch(console.error)
  }

  handleDelete = (id) => {
    axios({
      url: `${apiUrl}/items/${id}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      }
    })
      .then(() => {
        this.setState({ deleted: true })
      })
      .catch(console.error)
  }

  render () {
    const item = this.state.items.map(item => (
      <Card key={item.id}>
        <Card.Body>  {item.title} </Card.Body>
        <Card.Body> {item.description} </Card.Body>
        <Button
          variant="danger"
          type="button"
          className="m-1"
          size="lg"
          onClick={() => this.handleDelete(item.id)}
          block
        >
        Delete
        </Button>
        <Link to={`/items/${item.id}`} >
          <Button
            variant="info"
            size="lg"
            type="button"
            className="m-1"
            block
          >
        Update
          </Button>
        </Link>
      </Card>
    ))

    const { deleted } = this.state

    if (!item) {
      return (
        <div>
          <p>Loading...</p>
        </div>
      )
    }

    if (deleted) {
      return <Redirect to={
        { pathname: '/items', state: { msg: 'To-Do Successfully deleted!' } }
      } />
    }
    return (
      <div>
        <h3>Everything you need To-Do</h3>
        <ul>{item}</ul>
        <Link to={'/items'} >
          <Button
            variant="dark"
            type="button"
            className="m-1"
          > Back
          </Button>
        </Link>
      </div>
    )
  }
}

export default withRouter(Items)
