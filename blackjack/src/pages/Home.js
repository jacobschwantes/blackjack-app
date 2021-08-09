import React, { Component } from 'react';
import Footer from '../components/Footer';
import Statcard from '../components/Statcard';
import Landing from '../components/Landing';

export default class HomePage extends Component {
  render() {
    return (
      <div className="h-screen bg-gray-50">
      <Landing/>
      <Statcard/>
      <Footer/>
      </div>
    )
  }
}
