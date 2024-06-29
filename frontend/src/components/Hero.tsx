import HeroImage from '../assets/hero.png';

function Hero() {
    return (
        <div className="">
            <img src={HeroImage} alt="Hero image" className='w-full max-h-[600px] object-cover' />
        </div>
    )
}

export default Hero;
