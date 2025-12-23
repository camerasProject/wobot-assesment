import { useState } from "react";

export default function TableBody({ cameras,onDeleteCamera }) {
    // LOGIC OF PAGINATION
    const PAGE_SIZE=10
    const [currentPage, setCurrentPage] = useState(0);

    const noOfPages=Math.ceil(cameras.length/PAGE_SIZE)
    console.log(noOfPages)

    const start=currentPage*PAGE_SIZE;
    const end= start+PAGE_SIZE;

  return (
    <>
    {/* ALL THE DATA IS FETCHED HERE */}
      <tbody>
        {cameras.slice(start,end).map((cam) => (
          <tr key={cam.id} className="border-b hover:bg-gray-50 transition">
            {/* Checkbox */}
            <td className="px-4 py-3">
              <input type="checkbox" />
            </td>

            {/* Name */}
            <td className="px-4 py-3">
              <div className="flex items-center gap-2">
                {/* Status dot */}
                <span className="h-2 w-2 rounded-full bg-green-500"></span>

                <span className="font-medium text-gray-800">{cam.name}</span>

                {/* Warning icon (optional) */}
                {cam.warning && (
                  <span className="text-orange-500 text-xs">⚠</span>
                )}
              </div>
            </td>

            {/* Health */}
            <td className="px-4 py-3">
              <div className="flex gap-2 text-gray-500">
                <span className="h-5 w-5 rounded-full border flex items-center justify-center text-xs">
                  B
                </span>
                <span className="h-5 w-5 rounded-full border flex items-center justify-center text-xs">
                  C
                </span>
                <span className="h-5 w-5 rounded-full border border-green-500 text-green-600 flex items-center justify-center text-xs">
                  A
                </span>
              </div>
            </td>

            {/* Location */}
            <td className="px-4 py-3 text-gray-700">{cam.location}</td>

            {/* Recorder */}
            <td className="px-4 py-3 text-gray-700">{cam.recorder || "N/A"}</td>

            {/* Tasks */}
            <td className="px-4 py-3 text-gray-700">
              {cam.tasks ? `${cam.tasks} Tasks` : "N/A"}
            </td>

            {/* Status */}
            <td className="px-4 py-3">
              <span
                className={`rounded px-2 py-1 text-xs font-medium ${
                  cam.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {cam.status}
              </span>
            </td>

            {/* Actions */}
            <td className="px-4 py-3 text-center">
              <button
                onClick={() => onDeleteCamera(cam.id)}
                className="text-red-500 hover:text-red-700 transition"
              >
                🗑
              </button>
            </td>
          </tr>
        ))}
      </tbody>

      {/* PAGINATION  */}
      <div className="flex items-center justify-between px-6 py-3 border-t text-sm text-gray-600">
        {/* Rows per page */}
        <div className="flex items-center gap-2">
          <span>Rows per page</span>
          <select
            // onChange={(e) => {
            //   setRowsPerPage(Number(e.target.value));
            //   setCurrentPage(1);
            // }}
            className="border rounded px-2 py-1"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
        </div>

        {/* Page info */}
        <div>
          {start + 1}-{Math.min(end, cameras.length)} of {cameras.length}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <button
            disabled={currentPage === 0}
            onClick={() => setCurrentPage(0)}
            className="disabled:opacity-40"
          >
            ⏮
          </button>
          <button
            disabled={currentPage === 0}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="disabled:opacity-40"
          >
            ◀
          </button>
          <button
            disabled={currentPage === noOfPages-1}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="disabled:opacity-40"
          >
            ▶
          </button>
          <button
            disabled={currentPage === noOfPages-1}
            onClick={() => setCurrentPage(noOfPages-1)}
            className="disabled:opacity-40"
          >
            ⏭
          </button>
        </div>
      </div>
    </>
  );
}
