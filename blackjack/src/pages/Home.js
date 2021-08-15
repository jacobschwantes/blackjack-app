import React, { Component } from 'react';
import Footer from '../components/Footer';
import Landing from '../components/Landing';
import Landing2 from '../components/Landing2';
import Features from '../components/Features';
import Stats from '../components/Stats'
import FAQ from '../components/FAQ';

export default class HomePage extends Component {
  render() {
    return (
      <div className="h-screen bg-gray-50">
      <Landing2/>
      </div>
    )
  }
}
