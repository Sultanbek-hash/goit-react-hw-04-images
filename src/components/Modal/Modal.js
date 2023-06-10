import { useEffect } from "react";
import PropTypes from 'prop-types';

export default function Modal({url, onClose}) {
    useEffect(() => {
        const clickEsc = event => {
            if (event.code === 'Escape') {
                onClose();
            }
        }
        window.addEventListener('keydown', clickEsc);
        return () => window.removeEventListener('keydown', clickEsc);

    }, [onClose]);
   const clickBackDrop = event => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    }
    return(
        <div className="Overlay" onClick={clickBackDrop} >
            <div className="Modal">
                <img src={url} alt="" />
            </div>
        </div>
    );
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    url: PropTypes.string.isRequired,
  };
