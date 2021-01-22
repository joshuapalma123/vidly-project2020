import React from "react";
import Form from "./common/Form";
import Joi from "joi-browser";
import { getMovie, saveMovie } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    genres: [],
    errors: {},
  };

  //Schema for validation error message
  schema = {
    _id: Joi.string(), // Not necessarily required
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number().min(0).max(100).label("Number In Stock"),
    dailyRentalRate: Joi.number().min(0).max(10).label("Daily Rental Rate"),
  };

  componentDidMount() {
    const genres = getGenres(); // Getting genre from fake api
    this.setState({ genres }); // Update the state

    const movieId = this.props.match.params.id;
    if (movieId === "new") return; //We dont need to populate the existing movie in our list

    const movie = getMovie(movieId); //A function in the fake movie file
    if (!movie) return this.props.history.replace("/not-found"); // If we use push instead of replace, when the user click the back button, the url will become invalid and redirect in an infinite loop

    this.setState({ data: this.mapToViewModel(movie) }); // In real world applications, we needed to display a piece of data to different model
  }

  //Mapping to view in different model
  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }
  //Validation for inputted values in the input area

  doSubmit = () => {
    //Call the server
    saveMovie(this.state.data); // A function in the fake movie file

    this.props.history.push("/movies");
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Number in Stock", "number")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
