import videoHomePage from '../../assets/video-homepage.mp4';

const HomePage = (props) => {
    return(
        <div className="homepage-container">
            <video autoPlay muted loop>
                <source
                    src={videoHomePage}
                    type="video/mp4"
                />
            </video>
            <div className='homepage-content'>
                <div className="title-1">there's a better way to ask</div>
                <div className="title-2">
                    you don't want to make a boring form. 
                    And your audience won't answer one. 
                    Create a type form instead - and make everyone happy.</div>
                <div className="title-3">
                    <button>Get's started. It's free</button>
                </div>
            </div>
        </div>
    )
}

export default HomePage