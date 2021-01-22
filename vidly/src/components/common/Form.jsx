import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./Input";
import Select from "./Select";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  //Validation for inputted values in the input area
  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;
    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message; // Mapping for the object to display error message

    return errors;
  };

  //More concise validation for the input field
  //Using Joi library --> npm install joi-browser@13.4
  validateProperty = ({ name, value }) => {
    // Cannot write direct this.state.data and this.schema as parameters of Joi.validate because it will validate the whole form
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null; // using short circuit condition
  };

  //Function for the form needed to submit when button is pressed
  handleSubmit = (e) => {
    e.preventDefault();

    //Changes in error messages if the input field changed
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    this.doSubmit();
  };

  //For targeted input field (username and password)
  handleChange = ({ currentTarget: input }) => {
    //Duplicating the declared errors in the state by using spread operator (for the change event)
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    //Duplicating the declared username and password in the state by using spread operator (for the change event)
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  renderButton(label) {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  }

  //For dropdown menu in movies
  //The function of helper methods like renderInput and renderSelect is to return the correct component and hook onto the change
  renderSelect(name, label, options) {
    const { data, errors } = this.state;

    //Dropdown component for genre
    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  renderInput(name, label, type = "text") {
    //Destructuring props for cleaner code writing
    const { data, errors } = this.state;
    return (
      <Input
        name={name}
        type={type}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }
}

export default Form;
