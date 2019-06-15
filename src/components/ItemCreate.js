import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import axios from 'axios'
import apiUrl from '../apiConfig'

class ItemCreate extends Component {
  constructor () {
    super()

    this.state = {
      title: '',
      description: ''
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()

    axios({
      url: `${apiUrl}/items`,
      method: 'POST',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: {
        item: {
          title: this.state.title,
          description: this.state.description
        }
      }
    })
      .then(response => this.setState({
        item: response.data.item
      }))
      .then(() => this.props.alert(`${this.state.title} has been added!`, 'success'))
      .then(() => this.props.history.push('/items'))
      .catch(() => {
        this.props.alert('Whoops! Failed to add your to-do. Please try again.', 'danger')
        this.setState({
          title: '',
          description: ''
        })
      })
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  resetForm = () => this.setState({
    title: '',
    description: ''
  })

  render () {
    const { title, description } = this.state

    return (
      <Form className="form" onSubmit={this.handleSubmit}>
        <h2>Add To-Do</h2>
        <Form.Group controlId="toDoTitle">
          <Form.Label>To-Do Title</Form.Label>
          <Form.Control
            type="string"
            value={title}
            name="title"
            required
            onChange={this.handleChange}
            placeholder="Shopping"
          />
        </Form.Group>
        <Form.Group controlId="toDoDescription">
          <Form.Label>To-Do Description</Form.Label>
          <Form.Control
            type="string"
            value={description}
            name="description"
            required
            placeholder="get milk"
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
        <Button
          variant="danger"
          type="button"
          className="m-1"
          onClick={this.resetForm}
        >
          Reset
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

export default withRouter(ItemCreate)
