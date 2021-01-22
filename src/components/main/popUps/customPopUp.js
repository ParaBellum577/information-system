import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const CustomPopUp = function ({ children, trigger }) {
    const [open, setOpen] = React.useState(false);
    const closeModal = () => setOpen(false);
  return(
      <>
        <Popup
            trigger={trigger}
            modal
            nested
            open={open} 
            closeOnDocumentClick 
            onClose={closeModal}
            >
            {children}
        </Popup>
      </>
    )
}

export default CustomPopUp;