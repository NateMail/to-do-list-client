import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../apiConfig'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

class ItemEdit extends Component {
  constructor (props) {
    super(props)

    this.state = {
      item: {
        title: '',
        description: ''
      },
      updated: false
    }
  }

  componentDidMount () {
    axios({
      url: `${apiUrl}/items/${this.props.match.params.id}`,
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

  handleChange = event => {
    const updatedField = {
      [event.target.name]: event.target.value
    }
    const editedItem = Object.assign(this.state.item, updatedField)
    this.setState({ items: editedItem })
  }

  handleSubmit = async event => {
    event.preventDefault()
    await axios({
      url: `${apiUrl}/items/${this.props.match.params.id}`,
      method: 'PATCH',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: {
        item: this.state.item
      }
    })
    this.setState({ updated: true })
  }

  render () {
    const { updated } = this.state

    if (updated) {
      return <Redirect to={'/items'} />
    }

    return (
      <Form className="form updated" onSubmit={this.handleSubmit}>
        <h2>Update To-Do</h2>
        <Form.Group controlId="toDoTitle">
          <Form.Label>To-Do Title</Form.Label>
          <Form.Control
            type="string"
            value={this.title}
            name="title"
            required
            onChange={this.handleChange}
            placeholder="Update Title"
          />
        </Form.Group>
        <Form.Group controlId="toDoDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="string"
            value={this.description}
            name="description"
            required
            placeholder="Update Description"
            onChange={this.handleChange}
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          className="m-1"
        >
          Submit
        </Button>
        <Link to={'/items'} >
          <Button
            variant="dark"
            type="button"
            className="m-1"
          > Back
          </Button>
        </Link>
      </Form>
    )
  }
}

export default ItemEdit
