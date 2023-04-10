import { useEffect } from "react";

export const Modal = ({ isModal, hideModal, modalImage }) => {

  const escFunction = (event) => {
    if (event.key === "Escape") {

      hideModal()
      //Do whatever when esc is pressed
    }
  }

  useEffect(() => {

    document.addEventListener("keydown", escFunction, false);
    
    return () => {
      document.removeEventListener("keydown", escFunction, false);
    }
  }, [])

  return (
    <div className="Overlay" onClick={hideModal} onKeyDown={escFunction}>
      <img
        className="Modal-img"
        src={modalImage}
        alt="somt"
      />
    </div>
  );
}
