import React, { Component } from 'react'
import {Modal,Button,Form} from 'react-bootstrap'

export class FavModel extends Component {
    render() {
        return (
            <>
            <Modal show={this.props.showModel} onHide={this.props.close} animation={false}>
            <Form onSubmit={(e)=>{this.updateData(e)}}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Title</Form.Label>
                    <Form.Control onChange={this.props.updateTitle} value={this.props.title} type="text" placeholder="Title" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Description</Form.Label>
                    <Form.Control onChange={this.props.updateDescription} value={this.props.description} type="text" placeholder="Description" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Update
                </Button>
            </Form>                
            </Modal>  
            </>
        )
    }
}

export default FavModel
