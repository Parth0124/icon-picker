import React, { useState } from 'react';
import * as FiIcons from 'react-icons/fi'; 
import { IconContext } from 'react-icons'; 

const IconPicker = ({
  rowsInOnePage = 4,
  columnsInOnePage = 5,
  iconHeight = 60, 
  iconWidth = 60,
  pickerHeight = 600, 
  pickerWidth = 600,
  onSelectIcon,
}) => {
  const icons = Object.keys(FiIcons);
  const iconsPerPage = rowsInOnePage * columnsInOnePage;
  const [currentPage, setCurrentPage] = useState(0);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(null);

    // eslint-disable-next-line
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if ((currentPage + 1) * iconsPerPage < icons.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleIconClick = (icon) => {
    setSelectedIcon(icon);
    onSelectIcon(icon); 
    setIsPickerOpen(false); 
  };

  return (
    <div className="relative flex justify-center items-center h-screen bg-teal-300">
      <div
        className="icon-trigger w-32 h-32 border-4 border-gray-400 flex justify-center items-center cursor-pointer rounded-lg hover:border-zinc-950"
        onClick={() => setIsPickerOpen(!isPickerOpen)}
      >
        {selectedIcon ? React.createElement(FiIcons[selectedIcon], { size: 60, color: 'white' }) : <span className="text-zinc-950">Select Icon</span>}
      </div>

      {isPickerOpen && (
        <div
          className="icon-picker fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gray-800 border-2 border-gray-700 shadow-lg rounded-lg z-50"
          style={{ width: pickerWidth, height: pickerHeight }}
        >
          <div className="icon-picker-header flex justify-between items-center p-4 border-b-2 border-gray-600 text-white">
            <h4 className="text-xl font-bold">Select an Icon</h4>
            <button onClick={() => setIsPickerOpen(false)} className="btn btn-square btn-outline">✕</button>
          </div>
          <div
            className="icon-grid grid p-4 gap-4 text-white"
            style={{
              gridTemplateRows: `repeat(${rowsInOnePage}, minmax(0, 1fr))`,
              gridTemplateColumns: `repeat(${columnsInOnePage}, minmax(0, 1fr))`,
            }}
          >
            {icons.slice(currentPage * iconsPerPage, (currentPage + 1) * iconsPerPage).map((icon, index) => {
              const IconComponent = FiIcons[icon];
              return (
                <div
                  key={index}
                  className="icon-item flex justify-center items-center p-2 rounded-lg hover:bg-gray-600 cursor-pointer"
                  onClick={() => handleIconClick(icon)}
                >
                  <IconContext.Provider value={{ size: iconHeight, color: 'white' }}>
                    <IconComponent />
                  </IconContext.Provider>
                </div>
              );
            })}
          </div>
          <div className="icon-picker-footer flex justify-center items-center p-4 border-t-2 border-gray-600 text-white">
            <div className="join">
              <button
                className="join-item btn"
                onClick={handlePreviousPage}
                disabled={currentPage === 0}
              >
                «
              </button>
              <button className="join-item btn" disabled style={{ color: '#FF4500' }}>
                Page {currentPage + 1}
              </button>
              <button
                className="join-item btn"
                onClick={handleNextPage}
                disabled={(currentPage + 1) * iconsPerPage >= icons.length}
              >
                »
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IconPicker;
