import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import invest5 from '../../Assets/invest5.png';
import invest2 from '../../Assets/invest2.png';
import invest3 from '../../Assets/invest3.png';
// import invest4 from '../../Assets/invest4.jpg';

function VillaResortPage() {
  const styles = {
    container: {
      maxWidth: '900px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
    },
    heading: {
      textAlign: 'center',
      color: '#2c3e50',
    },
    carouselBox: {
      marginTop: '30px',
    },
    section: {
      marginTop: '30px',
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Villa Resort Investment</h1>

      {/* 🔹 Carousel Only */}
      <div style={styles.carouselBox}>
        <Carousel
          showThumbs={false}
          showStatus={false}
          infiniteLoop
          autoPlay
          interval={3000}
          swipeable
          emulateTouch
        >
          <div>
            <img src={invest2} alt="Resort View 1" />
          </div>
          <div>
            <img src={invest3} alt="Resort View 2" />
          </div>
          <div>
            <img src={invest5} alt="Resort View 3" />
          </div>
        </Carousel>
      </div>

      {/* 🔹 Project Details */}
      <section style={styles.section}>
        <h2>Project Overview</h2>
        <p>This project involves the construction and operation of a luxury villa resort.</p>
        <p>We aim to provide high-end amenities and beautiful scenery to attract high-net-worth individuals.</p>
      </section>

      <section style={styles.section}>
        <h2>Why Invest?</h2>
        <ul>
          <li>High return on investment</li>
          <li>Location with growing tourism demand</li>
          <li>Exclusive amenities for guests</li>
        </ul>
      </section>

      <section style={styles.section}>
        <h2>Investment Plan</h2>
        <p>
          Details of the investment options will be provided upon request. We offer flexible plans 
          to accommodate your budget and investment goals.
        </p>
      </section>
    </div>
  );
}

export default VillaResortPage;
