import React, { Component } from "react";
import axios from "axios";

import CssBaseline from "@material-ui/core/CssBaseline";
import Button from "@material-ui/core/Button";
//this import keeps bugging the page
import { request } from "express";

export default class ImageGenerator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageURL: "",
    };
  }
  generateImage = async () => {
    //Generate the image HERE
    /*Create a get request to the dog API, 
    I noticed that you imported Axios so I assumed it was to be used for the challenge
    First I installed Axios in my terminal, npm i axios --save
    checked it was properly imported on top of the page
    then in my generateImage function I created a fetch request, in which i checked if there was a response
    next i set up my component to have a state, so that I could save and access my image url once found since we are using react, using a state made the most sense
    then back to my generateImage function, to set the state to the image URL which is found through the response data
    with an catch error that is console logged with the possible error. 
    in the render method, i ensured to change the <img src= > to the state i set, I also created an if statement so that if the state is an empty string, the image will be hidden.
    */
    return await axios
      .get("https://dog.ceo/api/breeds/image/random")
      .then((response) => {
        this.setState({ imageURL: response.data.message });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    if (this.state.imageURL) {
      return (
        <div className="container">
          <CssBaseline />
          <h2>Click the button to generate a new picture</h2>
          <Button
            variant="contained"
            onClick={this.generateImage}
            className="button"
          >
            Click Me!
          </Button>
          <img
            src={this.state.imageURL}
            alt="Random dog image"
            className="img-container"
            id="imgContainer"
          />
        </div>
      );
    } else {
      return (
        <div className="container">
          <CssBaseline />
          <h2>Click the button to generate a new picture</h2>
          <Button
            variant="contained"
            onClick={this.generateImage}
            className="button"
          >
            Click Me!
          </Button>
          <img
            src={this.state.imageURL}
            alt="Random dog image"
            className="img-container hidden"
            id="imgContainer"
          />
        </div>
      );
    }
  }
}
