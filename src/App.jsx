import { useEffect, useState } from "react";
import axios from "axios";
import TableHeader from "./components/Tableheader";
import TableBody from "./components/Tablebody";
import Pagination from "./components/Pagination";

function App() {
  const token = "4ApVMIn5sTxeW7GQ5VWeWiy";

  const [allCameras, setAllCameras] = useState([]);
  const [filteredCameras, setFilteredCameras] = useState([]);

  const [cities, setCities] = useState([]);
  const [statuses, setStatuses] = useState([]);

  const [selectedCity, setSelectedCity] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  // LOGIC OF PAGINATION
    const PAGE_SIZE=10
    const [currentPage, setCurrentPage] = useState(0);

    const noOfPages=Math.ceil(allCameras.length/PAGE_SIZE)
    console.log(noOfPages)

    const start=currentPage*PAGE_SIZE;
    const end= start+PAGE_SIZE;
    
  const fetchCameras = async () => {
    try {
      const res = await axios.get(
        "https://api-app-staging.wobot.ai/app/v1/fetch/cameras",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAllCameras(res.data.data); // all 80 records
      const data = res.data.data;
      setFilteredCameras(data);

      // Extract unique cities
      const uniqueCities = [
        ...new Set(data.map((cam) => cam.location).filter(Boolean)),
      ];

      // Extract unique statuses
      const uniqueStatuses = [
        ...new Set(data.map((cam) => cam.status).filter(Boolean)),
      ];

      setCities(uniqueCities);
      setStatuses(uniqueStatuses);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCameras();
  }, []);

  console.log(allCameras);
  console.log(cities);
  console.log(statuses);

  useEffect(() => {
    let result = [...allCameras];

    if (selectedCity) {
      result = result.filter((cam) => cam.location === selectedCity);
    }

    if (selectedStatus) {
      result = result.filter((cam) => cam.status === selectedStatus);
    }

    setFilteredCameras(result);
  }, [selectedCity, selectedStatus, allCameras]);

  const handleDeleteCamera = (id) => {
    setAllCameras((prev) => prev.filter((cam) => cam.id !== id));
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 px-10 pt-5 pb-4 mb-6">
        {/* Left Section */}
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Cameras</h1>
          <p className="text-sm text-gray-500">Manage your cameras here.</p>
        </div>

        {/* Right Section - Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="search"
            className="w-64 rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-sm text-gray-700 
                     focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
          />

          {/* Search Icon */}
          <svg
            className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35m1.85-5.65a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>
      {/* Location & Status Dropdown */}
      <div className="flex gap-3 mb-4 ps-10">
        {/* Location */}
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:outline-none"
        >
          <option value="">Location</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>

        {/* Status */}
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:outline-none"
        >
          <option value="">Status</option>
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
        <table className="w-full border-collapse text-sm">
          <TableHeader />
          <TableBody start={start} end={end} cameras={filteredCameras} onDeleteCamera={handleDeleteCamera} />
        </table>
      </div>
      <Pagination start={start} end={end} cameras={allCameras} currentPage={currentPage} noOfPages={noOfPages} setCurrentPage={setCurrentPage}/>
    </div>
  );
}

export default App;
