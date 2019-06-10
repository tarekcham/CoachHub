import React, { Component, Fragment } from "react";
import "./App.css";
import { getItemsApi, addItemApi, deleteItemApi, updateItemApi } from "./api";
// Import components
import Input from "./components/Input";

export default class App extends Component {
  state = {
    title: "",
    description: "",
    editTitle: "",
    editDescription: "",
    items: [],
    showEdit: false,
    itemEditId: "",
    doneItemId: ""
  };

  componentDidMount = () => {
    this.getItems();
  };

  // update inpute value
  updateInputValue = e => {
    const { name, value } = e.target;
    if (
      ((name === "title" || name === "editTitle") && value.length < 200) ||
      ((name === "description" || name === "editDescription") &&
        value.length < 600)
    ) {
      this.setState({
        [name]: value
      });
    }
  };

  // Toggle edit section

  toggleEdit = id => {
    this.setState(prevState => {
      return {
        itemEditId: id,
        showEdit: !prevState.showEdit
      };
    });
  };

  // update complete value
  updateCompleteValue = async item => {
    const data = {
      title: item.title,
      description: item.description,
      complete: !item.complete
    };
    await updateItemApi(item._id, data);
    this.getItems();
  };
  // Fetch items
  getItems = async () => {
    const result = await getItemsApi();

    this.setState({
      items: result
    });
    console.log("resute get items", result);
  };

  // Add item
  addItem = async () => {
    // Clear the inputes
    this.setState({
      title: "",
      description: ""
    });

    // create object
    const data = {
      title: this.state.title,
      description: this.state.description
    };
    await addItemApi(data);

    this.getItems();
  };

  // Delete an Item
  deleteItem = async id => {
    await deleteItemApi(id);
    this.getItems();
  };

  // Update an Item

  updateItem = async id => {
    // Clear the inputes
    this.setState({
      editTitle: "",
      editDescription: "",
      showEdit: false
    });
    const data = {
      title: this.state.editTitle,
      description: this.state.editDescription,
      complete: false
    };
    await updateItemApi(id, data);
    this.getItems();
  };

  formatTime = time => {
    return (time = time.substring(0, time.length - 5).replace("T", " / "));
  };

  render() {
    return (
      <Fragment>
        <div id="myDIV" className="header">
          <h2>My To Do List</h2>
          <Input
            fun={this.updateInputValue}
            value={this.state.title}
            placeholder="Title..."
            name="title"
            style="mainInput"
          />

          <Input
            fun={this.updateInputValue}
            value={this.state.description}
            placeholder="Description..."
            name="description"
            style="mainInput"
          />

          <span onClick={this.addItem} className="addBtn">
            Add
          </span>
        </div>

        <ul id="myUL">
          {this.state.items.map(item => (
            <li key={item._id} className={item.complete ? "itemDone" : ""}>
              {item.title} : {item.description}
              <span className="timeSpan"> {this.formatTime(item.date)}</span>
              <span className="doneSpan"> done</span>
              <input
                onChange={() => this.updateCompleteValue(item)}
                type="checkbox"
                name="complete"
                className="complete"
                checked={item.complete}
              />
              <span onClick={() => this.toggleEdit(item._id)} className="edit">
                {" "}
                edit
              </span>
              <span
                onClick={() => this.deleteItem(item._id)}
                className="delete"
              >
                {" "}
                X
              </span>
            </li>
          ))}
        </ul>

        {this.state.showEdit && (
          <Fragment>
            <div className="editSection">
              <Input
                fun={this.updateInputValue}
                value={this.state.editTitle}
                placeholder="Description..."
                name="editTitle"
                style="mainInput"
              />

              <Input
                fun={this.updateInputValue}
                value={this.state.editDescription}
                placeholder="Description..."
                name="editDescription"
                style="mainInput"
              />

              <span
                onClick={() => this.updateItem(this.state.itemEditId)}
                className="addBtn"
              >
                Edit
              </span>
            </div>
          </Fragment>
        )}
      </Fragment>
    );
  }
}
