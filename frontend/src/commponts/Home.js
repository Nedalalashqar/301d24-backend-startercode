import React, { Component } from 'react'
import axios from 'axios'
import {Card,Button} from 'react-bootstrap'

export class Home extends Component {
    constructor(props){
        super(props);
        this.state={
            allDataCoffee:[],
            show:false,
        }
    }

    componentDidMount = async () => {
        try{
            const gitAllDataAxios= await axios.get(`http://localhost:8000/retreive`);
            const dataAxios = gitAllDataAxios.data
            this.setState({
                allDataCoffee:dataAxios,
                show:true,
            })
        } catch{
            console.log('oops API')
        }
    }

    createFavCard= async (e, itme) => {
        e.preventDefault();
        const dataBody={
            image_url:itme.image_url,
            title:itme.title,
            description:itme.description,
            ingredients:itme.ingredients,
            
        }
        await axios.post(`http://localhost:8000/create`,dataBody)
    }

    render() {
        return (
            <>
            {this.state.show && this.state.allDataCoffee.map(item => {
                return(
                     <Card style={{ width: '20rem' , display:'inline-block' , margin:'15px' , border:'1px solid' }}>
                <Card.Img variant="top" src={item.image_url} />
                <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Text>{item.description}</Card.Text>
                    <Card.Text>{item.ingredients}</Card.Text>
                    <Button variant="primary" onClick={(e) => {this.createFavCard(e,item)}}>ADD FAV</Button>
                </Card.Body>
            </Card> )
                 

            })}
            </>
        )
    }
}

export default Home
