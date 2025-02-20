import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading/Loading';
import useVideo from '../contexts/VideoContext';


function Home() {
  // const [videos, setVideos] = useState([]); // Store videos only
  const navigate = useNavigate(); // ✅ React Router Navigation Hook
  const { videos, loading: videoLoading, error, timeAgo } = useVideo();

  const watchVideo = (videoId) => {
    navigate(`/watch/${videoId}`); // Redirect to watch page with video ID
  };

  if (videoLoading) {
    return <Loading message="videos are Loading..." />
  }


  return (
    <div className="container mx-auto p-4 sm:p-6 bg-stone-950 w-full sm:w-6/7  h-full rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-white">Total Videos: {videos.length}</h2>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {videos.map((video) => (
          <div
            key={video._id}
            className="card bg-base-200 shadow-xl hover:shadow-white/10 hover:scale-[1.02] transition-all duration-200 cursor-pointer"
            onClick={() => watchVideo(video._id)} // ✅ Pass the video ID when clicked
          >
            {/* ✅ Thumbnail Image */}
            <figure className="relative h-24 sm:h-40 md:h-46 lg:h-52 w-full overflow-hidden">
              <img
                // src={video.thumbnail}
                src={`${video.thumbnail}?q_auto=f_auto&w=300&h=200&c_fill&dpr=2`}
                alt={video.title}
                loading='lazy' // i want to load the images faster 
                fetchPriority='high'
                decoding='async'
                className="w-full h-full object-cover rounded-lg"
              />
              <p className='absolute right-0 bottom-0 text-sm m-1 bg-gray-800/70 rounded-md px-1 py-0.5'>
                {`${video.duration} seconds`}</p>
            </figure>


            {/* ✅ Video Info */}
            <div className="card-body w-full sm:w-auto h-auto m-0 p-1.5 sm:p-2.5">
              <h2 className="card-title text-lg sm:text-md font-semibold m-0 p-0">
                {video.title}
              </h2>
              <div className='flex gap-0 m-0 justify-start'>
                <p className='m-0 text-sm text-white/80 text-left'>
                  {video.views} Views | {timeAgo(video.createdAt)}
                </p>
              </div>
              <div className='flex gap-2 m-0 p-0'>
                <img src={video.owner.avatar} alt="Channel avatar" className='w-5 h-5 rounded-full' />
                <p className="text-gray-500 text-sm sm:text-md m-0 p-0 truncate sm:whitespace-normal">
                  {video.owner.username}
                </p>

              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
