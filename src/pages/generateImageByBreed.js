import React, { Component } from "react";
import axios from "axios";

import CssBaseline from "@material-ui/core/CssBaseline";
import Button from "@material-ui/core/Button";

export default class ImageGenerator extends Component {
  //create a state for the React component to contain and array of dog breeds, which breed was selected and the src url for the image of that breed
  //through this.state all these values are easily accessible throughout this component
  constructor(props) {
    super(props);
    this.state = {
      dogBreeds: [],
      select: "",
      imageURL: "",
    };
  }
  /*Populate the selct's options
  Access the dog breeds from the website using Axios in an async-await function
  Because this information needs to be available the moment the page is loaded, I created a componentDidMount function which is automatically run with the render method.
  This will allow all the breeds from the dog website to be listed in the drop-down menu the moment the page has loaded
  As the list is an object, I changed it to an Array to be simpler to organize and find within the state
  */

  componentDidMount = async () => {
    await axios
      .get("https://dog.ceo/api/breeds/list/all")
      .then((response) => {
        this.setState({
          dogBreeds: Object.keys(response.data.message),
        });
      })
      .catch((error) => {
        console.log("Cannot fetch list");
      });
  };
  //chooseDog method is set once the client side has chosen a breed of dog, it will be saved inthe state
  chooseDog = (e) => {
    this.setState({ select: e.target.value });
  };
  //generateImage method is used to access the url of the specific dog breed chosen by the client-side
  generateImage = async (e) => {
    //Generate the image HERE
    let dog = this.state.select;
    let url = "https://dog.ceo/api/breed/" + dog + "/images/random";
    await axios
      .get(url)
      .then((response) => {
        this.setState({ imageURL: response.data.message });
      })
      .catch((error) => {
        console.log("Error fetching image", error);
      });
  };

  render() {
    //if there is a breed selected, an image will be shown of that breed of dog
    if (this.state.select) {
      return (
        <div className="container">
          <CssBaseline />
          <h2>Select a breed to generate an image</h2>
          <select id="list" onChange={this.chooseDog} className="select">
            <option value="">Select a breed</option>
            <option value={this.state.select}>{this.state.select}</option>
            {this.state.dogBreeds.map((dog) => {
              return <option value={dog}>{dog}</option>;
            })}
          </select>
          <Button
            variant="contained"
            onClick={this.generateImage}
            className="button"
          >
            Click me!
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
      //if no breed has been selected then there will be no images that show up to keep the page clean
      return (
        <div className="container">
          <CssBaseline />
          <h2>Select a breed to generate an image</h2>
          <select id="list" onChange={this.chooseDog} className="select">
            <option value="">Select a breed</option>
            <option value={this.state.select}>{this.state.select}</option>
            {this.state.dogBreeds.map((dog) => {
              return <option value={dog}>{dog}</option>;
            })}
          </select>
          <Button
            variant="contained"
            onClick={this.generateImage}
            className="button"
          >
            Click me!
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
