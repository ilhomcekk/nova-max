import { Button, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { Link, useLocation } from "react-router-dom";
import "../../assets/scss/_modal.scss";
import registerPhoto from "../../assets/images/register-photo.webp";

const ProfileModal = ({ showModal, onClose, text }) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <>
      <Modal open={showModal} onClose={onClose} center>
        <div className="error-modal">
          <div className="text-xl">Зарегистрируйтесь</div>
          <img src={registerPhoto} className="my-5" alt="" />
          <Button
            onClick={handleClose}
            className="!flex"
            variant="outlined"
            color="primary"
          >
            <Link className="w-full" to="/firstregister">
              Зарегистрироваться
            </Link>
          </Button>
          <Button
            onClick={handleClose}
            variant="contained"
            className="!flex !mt-4"
            color="primary"
          >
            <Link className="w-full" to="/register">
              Войти
            </Link>
          </Button>
        </div>
        {/* <div
          className="fixed z-10 top-0 right-0 bottom-0 left-0 w-full h-full duration-500"
          style={{ background: "rgba(0,0,0,0.7)" }}
        >
          ErrorModal
        </div> */}
      </Modal>
    </>
  );
};

export default ProfileModal;
