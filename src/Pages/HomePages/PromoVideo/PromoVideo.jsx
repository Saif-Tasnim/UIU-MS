import React from 'react';

const PromoVideo = () => {

    return (

        <div className='mt-20 mb-20 bg-base-200'>
            <h1 className='text-2xl text-center font-semibold pb-5 text-[#F06517]'> What We Are </h1>
            <p className='text-center pb-5'> Here is promo video about our UIU. Get to learn and explore us .... </p>
            <div>
                <iframe src="https://www.youtube.com/embed/W3upVOLfZvQ" title="UIU Promo" width="100%" height="400px" allowFullScreen>

                </iframe>
            </div>

        </div>

    );
};

export default PromoVideo;