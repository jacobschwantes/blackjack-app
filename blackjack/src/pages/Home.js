import React, { Component } from 'react';
import Footer from '../components/Footer';
import Stats from '../components/Stats';
import Landing from '../components/Landing';

export default class HomePage extends Component {
  render() {
    return (
      <div className="h-screen bg-gray-50">
      <Landing/>
      <Stats/>
      <Footer/>
      </div>
    )
  }
}
