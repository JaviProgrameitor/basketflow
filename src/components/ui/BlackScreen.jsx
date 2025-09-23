
import React from 'react';

const BlackScreen = ({children}) => {
  return (
    <div className="fixed inset-0 bg-black/70  bg-opacity-75 flex items-center justify-center z-50">
      {children}
    </div>
  );
}

export default BlackScreen;