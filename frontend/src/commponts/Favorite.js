import React, { Component } from 'react'
import axios from 'axios'
import {Card,Button} from 'react-bootstrap'
import FavModel from './FavModel';

export class Home extends Component {
    constructor(props){
        super(props);
        this.state={
            allDataCoffee:[],
            show:false,
            showModel:false,
            index:'',
            image_url:'',
            title:'',
            description:'',
            ingredients:'',


        }
    }

    componentDidMount = async () => {
        try{
            const gitAllDataAxios= await axios.get(`http://localhost:8000/fav-list`);
            const dataAxios = gitAllDataAxios.data
            console.log(dataAxios)
            this.setState({
                allDataCoffee:dataAxios,
                show:true,
            })
        }catch{
            console.log('oops API')
        }
    }

 deleteItemFav= async (e ,id)=>{
    e.preventDefault();
    const spacvicDelete=await axios.delete(`http://localhost:8000/delete/${this.state.allDataCoffee[id]._id}`);
    console.log(this.state.allDataCoffee[id]._id)
    this.setState({
        allDataCoffee:spacvicDelete.data
    })
 }

 updateCoffeeFav = (idx) => {
     this.setState({
        showModel:true,
        image_url:this.state.allDataCoffee[idx].image_url,
        title:this.state.allDataCoffee[idx].title,
        description:this.state.allDataCoffee[idx].description,
        ingredients:this.state.allDataCoffee[idx].ingredients,
        index:idx,
     })
 }

 onClose = () =>{
     this.setState({
        showModel:false,
     })
 }

 updateImage_url = (e) => {
     this.setState({
        image_url:e.target.value,

     })
 }

 updateTitle = (e) =>{
    this.setState({
        title:e.target.value,

    })
 }

 updateDescription = (e) =>{
    this.setState({
        description:e.target.value,

    })
 }

 updateIngredients = (e) =>{
    this.setState({
        ingredients:e.target.value,

    })
 }

 updateData = async (e) => {
    e.preventDefault();
    const UpdateBody = {
        image_url:this.state.image_url,
        title:this.state.title,
        description:this.state.description,
        ingredients:this.state.ingredients,
        
    }
    const updateCoffeeURL= `http://localhost:8000/update/${this.state.allDataCoffee[this.state.index]._id}`;
    const CoffeeAxios = await axios.put(updateCoffeeURL , UpdateBody );
    console.log(this.state.description);
    this.setState({
        allDataCoffee:CoffeeAxios.data,
    })
 }

    render() {
        
        return (
            <>
            {this.state.show && this.state.allDataCoffee.map((item , idx) => {
                  return (
                      <Card style={{ width: '20rem' , display:'inline-block' , margin:'15px' , border:'1px solid' }}>
                  <Card.Img variant="top" src={item.image_url} />
                  <Card.Body>
                      <Card.Title>{item.title}</Card.Title>
                      <Card.Text>{item.description}</Card.Text>
                      <Card.Text>{item.ingredients}</Card.Text>
                      <Button variant="danger" onClick={(e) =>this.deleteItemFav(e,idx)}>Delete</Button>
                      <Button variant="info" onClick={(e) =>this.updateCoffeeFav(idx)}>Update</Button>
                  </Card.Body>
              </Card> 
                  )
            })}

            <FavModel
              showModel={this.state.showModel}
              close={this.onClose}
              title={this.state.title}
              description={this.description}
              updateTitle={this.updateTitle}
              updateDescription={this.updateDescription}
              updateData={this.updateData}
            />
            </>
        )
    }
}

export default Home