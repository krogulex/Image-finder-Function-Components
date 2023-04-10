import { useEffect } from "react";

export const Modal = ({ isModal, hideModal, modalImage }) => {

  const escFunction = (event) => {
    if (event.key === "Escape") {

      hideModal()
    }
  }

  useEffect(() => {

    document.addEventListener("keydown", escFunction, false);
    
    return () => {
      document.removeEventListener("keydown", escFunction, false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
