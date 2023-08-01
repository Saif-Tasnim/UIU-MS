import React from 'react';
import './Banner.css';
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import img1 from '../../../assets/Banner/uiu_banner.png'
import img2 from '../../../assets/Banner/294558727_1784637781868698_8880204775555930428_n (1).jpg'
import img3 from '../../../assets/Banner/Awaited-Dreams-scaled.jpg'
import img4 from '../../../assets/Banner/lib.jpg'
import img5 from '../../../assets/Banner/PXL_20220918_060106504.jpg'
import img6 from '../../../assets/Banner/lib.jpg'
import img7 from '../../../assets/Banner/Awaited-Dreams-scaled.jpg'
import img8 from '../../../assets/Banner/294558727_1784637781868698_8880204775555930428_n (1).jpg'

const Banner = () => {
    const [opacities, setOpacities] = React.useState([])
    const images = [img1, img2, img3, img4, img5, img6, img7, img8];

    const [sliderRef] = useKeenSlider({
        slides: images.length,
        loop: true,
        detailsChanged(s) {
            const new_opacities = s.track.details.slides.map((slide) => slide.portion)
            setOpacities(new_opacities)
        },
    })

    return (
        <div ref={sliderRef} className="fader">
            {images.map((src, idx) => (
                <div
                    key={idx}
                    className="fader__slide"
                    style={{ opacity: opacities[idx] }}
                >
                    <img src={src} />
                </div>
            ))}
        </div>
    );
};

export default Banner;