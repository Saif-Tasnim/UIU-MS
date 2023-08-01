import React from 'react';
import Banner from '../Banner/Banner';
import PromoVideo from '../PromoVideo/PromoVideo';
import AboutUs from '../AboutUs/AboutUs';

const Home = () => {
    return (
        <div>
           <Banner></Banner>
           <PromoVideo></PromoVideo>
           <AboutUs></AboutUs>
        </div>
    );
};

export default Home;