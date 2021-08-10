import React, { Component } from "react";
import { auth } from "../services/firebase";
import { db } from "../services/firebase";
let Filter = require('bad-words');
let filter = new Filter();
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
      lastChat: null
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
      if (!filter.isProfane(this.state.content)) {
        if (Math.abs((this.state.lastChat - Date.now()) / 1000) % 60 > 1) {
          this.setState({ lastChat: Date.now() })
          await db.ref("chats").push({
            content: filter.clean(this.state.content),
            timestamp: Date.now(),
            uid: this.state.user.uid,
          });
        }
        else {
          this.props.alert("You're sending messages too quickly.")
        }

      }
      else {
        this.props.alert('That message contained profanity. It has not been sent.')
      }

      this.setState({ content: '' });
      chatArea.scrollBy(0, chatArea.scrollHeight);
    } catch (error) {
      this.setState({ writeError: error.message });
    }
  }


  classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  render() {
    return (
      <div className="rounded-lg bg-white dark:bg-gray-800 overflow-hidden shadow  p-6 h-full flex flex-col">
        <h2 className="text-base font-medium text-gray-900 dark:text-gray-50" id="announcements-title">
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
                <div className=" text-white rounded-lg p-2 my-2 w-full break-words bg-gray-100 dark:bg-gray-700">
                  <p className=" font-semibold text-sm dark:text-gray-50 text-gray-800  "><span><img className="mr-1 float-left rounded-full h-5 w-5 object-cover " alt="" src={user.picture}></img></span><span className={"font-bold text-center text-xs text-white dark:text-cyan-500 bg-cyan-600 dark:bg-gray-100 rounded mr-0.5 " + (chat.uid === devUID ? " px-1" : null)}>{chat.uid === devUID ? 'dev' : null} </span>{user.username}</p>
                  <p className="text-base dark:text-gray-50 text-gray-800 ">{chat.content}</p>
                </div>
              )
            })}
          </div>
        </div>
        <form onSubmit={this.handleSubmit}>
          <label className="text-gray-700 text-sm font-medium dark:text-gray-50">Send a message</label>
          <input id="chat" required className="form-control  rounded-lg  w-full  h-14 focus:ring-cyan-500 dark:bg-gray-700 dark:text-gray-50" name="content" onChange={this.handleChange} type="text" value={this.state.content}></input>
          {this.state.error ? <p className="text-danger">{this.state.error}</p> : null}
        </form>
      </div>


    );
  }
}
