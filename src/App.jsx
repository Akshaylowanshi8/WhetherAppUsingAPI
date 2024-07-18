import { useState } from 'react';
import './App.css'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

function App() {

  const apiKey = '4fb18f1580cedad91583237aad16bd4d';
  const [city, setCity] = useState(''); // Initial state is empty
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false); 
  const notify =(e)=>toast.error(e, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress:"",
    theme: "colored",
  
    });
 
  const feachdata= async(e)=>{
    e.preventDefault();
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    setLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (!response.ok) {
        // notify(data.message)  
        throw new Error(data.message);
      }
      setWeather(data);
    } catch (error) {
      notify(error.message);
    } finally {
      setLoading(false);
    }
  }

  const getCurrentDateTime = () => {
    const now = new Date();
    return now.toLocaleString(); 
  };

  // console.log(weather);

  return (
    <>
<div className=" bg-gradient-to-r from-blue-200 to-cyan-200 h-[100vh] w-auto">

    <h1 className="text-7xl p-5">Weather App</h1>


<form className="max-w-md mx-auto p-4 mt-7"  onSubmit={feachdata} >
  <label
    htmlFor="default-search"
    className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
  >
    Search
  </label>
  <div className="relative">
    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
      <svg
        className="w-4 h-4 text-gray-500 dark:text-gray-400"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 20 20"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
        />
      </svg>
    </div>
    <input
      type="search"
      value={city}

      onChange={(e) => setCity(e.target.value)}
      id="default-search"
      className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder="Search your city weather "
      required
    />
    <button
      type="submit"
      className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      Search
    </button>
  </div>
</form>

<div className="flex flex-col  justify-center  align-middle  ">
{loading && <div class="text-center m-4">
<div
    className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-yellow-500 mx-auto "
  ></div>
</div>}
      {weather && (
        <div  className='  bg-slate-700 w-60 h-auto rounded-lg p-5 text-white align-middle text-center text-pretty   ml-[40%] '>
          <h2>Weather in {weather.name}, {weather.sys.country}</h2>
          <img className='text-white p-2' src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Feels Like: {weather.main.feels_like}°C</p>
          <p>Description: {weather.weather[0].description}</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
          <p>Current Date and Time: {getCurrentDateTime()}</p>
        </div>
      )} 
      </div>

      <ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored"
transition: Bounce
/>
      
{/* https://api.openweathermap.org/data/2.5/weather?q=bhopal&appid=4fb18f1580cedad91583237aad16bd4d */}
</div>
</>
  )
}
export default App