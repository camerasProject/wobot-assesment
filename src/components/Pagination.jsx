import React from 'react'

const Pagination = ({setPAGESIZE,start,end,cameras,currentPage,noOfPages,setCurrentPage}) => {
    // const forward=()=>{
    //     setCurrentPage(prev=>prev+1)
    // }
    // const backward=()=>{
    //     setCurrentPage(prev=>prev-1)
    // }
  return (
    <div>
      <div className="flex items-center justify-between px-6 py-3 border-t text-sm text-gray-600">
        {/* Rows per page */}
        <div className="flex items-center gap-2">
          <span>Rows per page</span>
          <select
            onChange={(e) => {
              setPAGESIZE(Number(e.target.value));
            }}
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
            onClick={() => setCurrentPage(currentPage-1)}
            className="disabled:opacity-40"
          >
            ◀
          </button>
          <button
            disabled={currentPage === noOfPages-1}
            onClick={() => setCurrentPage(currentPage+ 1)}
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
    </div>
  )
}

export default Pagination
