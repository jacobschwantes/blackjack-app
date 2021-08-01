import React, { Component } from "react";
import { writeUserStats } from "../helpers/db";
import { auth } from "../services/firebase";
import { db } from "../services/firebase";
let Filter = require('bad-words');
let filter = new Filter();
let dateFormat = require("dateformat");
const devUID = 'WL5h3hFpovNgi7Ix3U4iBNFkXkF3';
export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: auth().currentUser,
      chats: [],
      users: [],
      content: '',
      readError: null,
      writeError: null,
      loadingChats: false,
      loadingUsers: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.myRef = React.createRef();
  }

  async componentDidMount() {
    this.setState({ readError: null, loadingChats: true });
    const chatArea = this.myRef.current;
    try {
      db.ref("users").on("value", snapshot => {
        let users = [];
        snapshot.forEach((snap) => {
          users.push(snap.val());
        });
        this.setState({ users });
        this.setState({ loadingUsers: false });
      });
      db.ref("chats").on("value", snapshot => {
        let chats = [];
        snapshot.forEach((snap) => {
          chats.push(snap.val());
        });
        chats.sort(function (a, b) { return a.timestamp - b.timestamp })
        this.setState({ chats });
        chatArea.scrollBy(0, chatArea.scrollHeight);
        this.setState({ loadingChats: false });
      });

    } catch (error) {
      this.setState({ readError: error.message, loadingChats: false });
    }
  }


  handleChange(event) {
    this.setState({
      content: event.target.value
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.setState({ writeError: null });
    const chatArea = this.myRef.current;
    try {
      await db.ref("chats").push({
        content: filter.clean(this.state.content),
        timestamp: Date.now(),
        uid: this.state.user.uid,
        profileSrc: this.state.user.photoURL,
        userName: this.state.user.displayName
      });
      this.setState({ content: '' });
      chatArea.scrollBy(0, chatArea.scrollHeight);
      writeUserStats(this.state.user.uid, 10, 10, 10)
    } catch (error) {
      this.setState({ writeError: error.message });
    }
  }

  formatTime(timestamp) {
    const now = new Date(timestamp);
    const time = dateFormat(now, "mmmm dS, yyyy h:MM TT");
    return time;
  }

  classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  render() {
    return (
      <div className="rounded-lg bg-white overflow-hidden shadow  p-6 h-full flex flex-col">
        <h2 className="text-base font-medium text-gray-900" id="announcements-title">
          Chat
        </h2>
        <div ref={this.myRef} className=" overflow-y-scroll scrollbar-hide flex-1 rounded-lg">
          <div className="h-full mx-auto " >
            {/* loading indicator */}
            {this.state.loadingChats ? <div className="spinner-border text-success" role="status">
              <span className="sr-only">Loading...</span>
            </div> : ""}
            {/* chat area */}
            {this.state.chats.map(chat => {
              let user = this.state.users.find(user => user.uid === chat.uid);
              return (
                <div className=" tracking-tight text-white rounded-lg p-2 m-1 max-w-lg break-words bg-gray-700">
                  <p className=" text-sm text-white  "><span><img className="mr-1 float-left rounded-full h-5 w-5 object-cover bg-white" alt="" src={user.picture}></img></span><span className={"font-bold text-xs text-cyan-500 bg-gray-100 rounded mr-0.5 " + (chat.uid === devUID ? " px-1" : null)}>{chat.uid === devUID ? 'dev' : null} </span>{user.username}</p>
                  <p className="text-base">{chat.content}</p>
                </div>
              )
            })}
          </div>
        </div>
        <form onSubmit={this.handleSubmit}>
          <label for="chat" className="text-gray-700 text-sm font-medium">Send a message</label>
          <input id="chat" required className="form-control  rounded-lg  w-full  h-14 focus:ring-cyan-500 " name="content" onChange={this.handleChange} type="text" value={this.state.content}></input>
          {this.state.error ? <p className="text-danger">{this.state.error}</p> : null}
        </form>
      </div>


    );
  }
}
