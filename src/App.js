import React, { useState } from 'react';
import IconPicker from './components/IconPicker';

const App = () => {
  // eslint-disable-next-line
  const [selectedIcon, setSelectedIcon] = useState(null); 

  return (
    <div style={{}}>
      <IconPicker
        rowsInOnePage={3}
        columnsInOnePage={4}
        iconHeight={40}
        iconWidth={40}
        pickerHeight={400}
        pickerWidth={400}
        onSelectIcon={(icon) => setSelectedIcon(icon)}
      />
    </div>
  );
};

export default App;