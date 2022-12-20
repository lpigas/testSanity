import React from 'react'
import { AiOutlineClose } from 'react-icons/ai';

const Modal = ({children,
    visible,
    setVisible,
    zindex = 100,
    // width = 750,
}
    ) => {
        const changeClasses = ["MyModal"];

  if (visible) {
    changeClasses.push("active");
  }
  return (
    <div
    className={changeClasses.join(" ")}
    style={{ zIndex: zindex }}
    onClick={() => setVisible(false)}
  >
    <div
    //   style={{ width: width }}
      className="MyModalContent"
      onClick={(e) => e.stopPropagation()}
    >

      {children}
        <div className='modal-close' onClick={()=> setVisible(false)}>
            <AiOutlineClose/>
        </div>
    </div>
  </div>
  )
}

export default Modal

