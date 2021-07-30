import React, { Component } from "react";
import { auth } from "../services/firebase";
import { db } from "../services/firebase";

export default class Blackjack extends Component {
    constructor(props) {
      super(props);
      this.state = {
        user: auth().currentUser,
        readError: null,
        writeError: null,
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        this.setState({ readError: null, loadingChats: true });
        const chatArea = this.myRef.current;
        try {
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

      async handleSubmit(event) {
        event.preventDefault();
        this.setState({ writeError: null });
        const chatArea = this.myRef.current;
        try {
          await db.ref("user").push({
            : Date.now(),
            uid: this.state.user.uid,
            profileSrc: this.state.user.photoURL,
            userName: this.state.user.displayName
          });
          this.setState({ content: '' });
          chatArea.scrollBy(0, chatArea.scrollHeight);
        } catch (error) {
          this.setState({ writeError: error.message });
        }
      }
}