import React, { Component } from 'react';
import Footer from '../components/Footer';
import Statcard from '../components/Statcard';
import Landing from '../components/Landing';

export default class HomePage extends Component {
  render() {
    return (
      <>
      <Landing/>
      <Statcard/>
      <Footer/>
      </>
    )
  }
}
