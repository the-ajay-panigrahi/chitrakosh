const MainContainer = () => {
  return (
    <div className="w-full h-screen ">
      <video
        className="w-full h-full object-cover"
        src="https://videos.pexels.com/video-files/7989385/7989385-uhd_2732_1440_25fps.mp4"
        autoPlay
        muted
        loop
      ></video>
    </div>
  );
};

export default MainContainer;
