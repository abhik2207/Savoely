import LandingPageImage from '../assets/landing.png';
import AppDownloadImages from '../assets/appDownload.png';

function Homepage() {
    return (
        <div className="flex flex-col gap-12">
            <div className="bg-white rounded-xl shadow-xl py-8 flex flex-col gap-5 text-center -mt-16">
                <h1 className="text-5xl font-bold tracking-tight text-orange-600">Savor a lovely takeaway today!</h1>
                <span className="text-xl">Food is just a click away!</span>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
                <img src={LandingPageImage} alt="Phones image" />
                <div className='flex flex-col items-center justify-center gap-4 text-center'>
                    <span className='font-bold text-3xl tracking-tighter'>
                        Order takeaway even faster!
                    </span>
                    <span>
                        Download the Savorly app for faster ordering and personalised recommendations!
                    </span>
                    <img src={AppDownloadImages} alt="Downlaod app images" />
                </div>
            </div>
        </div>
    )
}

export default Homepage;
