import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import cabinetEdit from "../../assets/images/Vector (19).png";
import "../../assets/scss/_cabinet.scss";
import { MContainer } from "../../element/Elemens";
import { logout, removeAccount } from "../../redux/actions/authActions";
import noimage from "../../assets/images/noimage.jpg";
import { useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Modal } from "react-responsive-modal";
import { Button, TextField } from "@mui/material";
import {
  changePassword,
  changePhone,
  changePhoneCode,
} from "../../redux/actions/userActions";
import PreLoader from "../../component/Loading";
const API = `${process.env.REACT_APP_API_DOMAIN}`;
const token = window.localStorage.getItem("novamarktToken");

const UpdateProfile = ({ updateUser, onClickUpdateData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState(updateUser.name);
  const [lastname, setLastName] = useState(updateUser.lastname);
  const [email, setEmail] = useState(updateUser.email);
  const [phone, setPhone] = useState(updateUser.phone);
  const [photo, setPhoto] = useState(API + updateUser.photo);
  const [birthday, setBirthday] = useState(updateUser.birthday);
  const [gender, setGender] = useState(updateUser.gender);
  const [inn, setInn] = useState(updateUser.inn);
  const [account, setAccount] = useState(updateUser.account);
  const [okohx, setOkohx] = useState(updateUser.okohx);
  const [bank, setBank] = useState(updateUser.bank);
  const [mfo, setMfo] = useState(updateUser.mfo);
  const [oked, setOked] = useState(updateUser.oked);
  const [address_legal, setAddressLegal] = useState(updateUser.address_legal);
  const [last_address, setLastAddress] = useState(updateUser.last_address);
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [newPhone, setNewPhone] = useState();
  const [newPhoneCode, setNewPhoneCode] = useState();
  const [password_current, setPasswordCurrent] = useState();
  const [password_new, setPasswordNew] = useState();
  const [password_compare, setPasswordCompare] = useState();

  const onImageChange = (file, element) => {
    const fileReader = new FileReader();
    fileReader.addEventListener("load", function (e) {
      element.src = e.target.result;
    });
    fileReader.readAsDataURL(file);
    setPhoto(file);
  };

  const genders = [
    {
      id: 1,
      label: "Муж.",
    },
    {
      id: 2,
      label: "Жен.",
    },
  ];

  const handleRemoveAccount = () => {
    if (window.confirm("Вы точно хотите выйти?")) {
      dispatch(removeAccount());
      navigate("/");
    }
  };

  const handleLogout = () => {
    if (window.confirm("Вы точно хотите выйти?")) {
      navigate("/");
      dispatch(logout());
    }
  };

  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const onClose = () => {
    setShowModal(false);
  };
  const onClose2 = () => {
    setShowModal2(false);
  };
  const { changePhoneStep } = useSelector((state) => state.user);
  const { changePhoneStepLoading } = useSelector((state) => state.user);

  return (
    <MContainer>
      <Modal open={showModal} onClose={onClose} center>
        <div className="error-modal">
          <div className="text-xl">Введите новый номер телефона</div>
          <TextField
            placeholder="Номер телефона"
            className="!mt-8 !mb-4"
            type="number"
            onChange={(e) => setNewPhone(e.target.value)}
          />
          {changePhoneStepLoading ? (
            <div className="flex items-center justify-center mb-4">
              <PreLoader />
            </div>
          ) : (
            changePhoneStep !== 0 && (
              <TextField
                placeholder="Код"
                className="!mb-8"
                type="number"
                onChange={(e) => setNewPhoneCode(e.target.value)}
              />
            )
          )}
          {changePhoneStep === 0 ? (
            <Button
              onClick={() => {
                dispatch(
                  changePhone({
                    phone: `+${newPhone}`,
                  })
                );
              }}
              size="large"
              variant="contained"
              color="primary"
            >
              Получить код
            </Button>
          ) : (
            <Button
              onClick={() => {
                dispatch(
                  changePhoneCode({
                    phone: `+${newPhone}`,
                    code: newPhoneCode,
                  })
                );
              }}
              size="large"
              variant="contained"
              color="primary"
            >
              Отправить
            </Button>
          )}
        </div>
      </Modal>
      <Modal open={showModal2} onClose={onClose2} center>
        <div className="error-modal">
          <div className="text-xl">Изменить пароль</div>
          <TextField
            placeholder="Текущий пароль"
            className="!mt-8 !mb-4"
            type="text"
            onChange={(e) => setPasswordCurrent(e.target.value)}
          />
          <TextField
            placeholder="Новый пароль"
            className="!mb-4"
            type="text"
            onChange={(e) => setPasswordNew(e.target.value)}
          />
          <TextField
            placeholder="Повторите новый пароль"
            className="!mb-4"
            type="text"
            onChange={(e) => setPasswordCompare(e.target.value)}
          />
          {password_current &&
          password_new?.length > 5 &&
          password_compare?.length > 5 ? (
            <Button
              onClick={() => {
                dispatch(
                  changePassword({
                    password_current: password_current,
                    password_new: password_new,
                    password_compare: password_compare,
                  })
                );
              }}
              size="large"
              variant="contained"
              color="primary"
            >
              Сохранить
            </Button>
          ) : (
            <Button size="large" variant="contained" color="primary">
              Заполните поле
            </Button>
          )}
        </div>
      </Modal>
      <div className="user__cabinet mb-12">
        <div className="user">
          <div className="user__img relative">
            <input
              id="photo"
              onChange={(e) =>
                onImageChange(
                  e.target.files[0],
                  document.querySelectorAll("#avatarImage")[0]
                )
              }
              className="absolute top-0 right-0 bottom-0 left-0"
              style={{ zIndex: "10", opacity: 0, cursor: "pointer" }}
              type="file"
            />
            <label onChange={onImageChange} htmlFor="photo">
              {updateUser.photo ? (
                <img id="avatarImage" src={photo} alt="not found" />
              ) : (
                <img id="avatarImage" src={noimage} alt="not found" />
              )}
            </label>
          </div>
          <input
            defaultValue={updateUser?.name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            type="text"
            id="userName"
            className="user__name"
          />
          <label htmlFor="userName" className="md:block hidden">
            <img className="cursor-pointer" src={cabinetEdit} alt="not found" />
          </label>
        </div>
        <div className="info__box">
          {/* <div className="info__user">
            <div className="title">Фамилия</div>
            <div className="change">
              <input
                id="lastname"
                type="text"
                defaultValue={updateUser?.lastname}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
              <label htmlFor="lastname">
                <img src={cabinetEdit} alt="not found" />
              </label>
            </div>
          </div> */}
          <div className="info__user">
            <div className="title">E-mail</div>
            <div className="change">
              <input
                id="email"
                type="email"
                defaultValue={updateUser?.email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <label htmlFor="email">
                <img src={cabinetEdit} alt="not found" />
              </label>
            </div>
          </div>
          <div className="info__user">
            <div className="title">Телефон</div>
            <div className="change" onClick={() => setShowModal(true)}>
              <input id="phone" type="phone" defaultValue={updateUser?.phone} />
              <label htmlFor="phone">
                <img src={cabinetEdit} alt="not found" />
              </label>
            </div>
          </div>
          <div className="info__user">
            <div className="title">Дата рождения</div>
            <div className="change">
              <input
                type="date"
                id="birthday"
                defaultValue={updateUser?.birthday}
                onChange={(e) => {
                  setBirthday(e.target.value);
                }}
              />
              <label htmlFor="birthday">
                <img src={cabinetEdit} alt="not found" />
              </label>
            </div>
          </div>
          <div className="info__user">
            <div className="title">Пол</div>
            <div
              onChange={(e) => setGender(e.target.value)}
              className="change inputs !justify-start"
            >
              {genders.map((gen, idx) => (
                <label key={idx} className="flex items-center">
                  <input
                    value={gen.id}
                    className="mr-2"
                    type="radio"
                    name="name"
                    defaultChecked={gender === gen.id}
                  />
                  {gen.label}
                </label>
              ))}
            </div>
          </div>
          {/* <div className="info__user">
            <div className="title">ИНН</div>
            <div className="change">
              <input
                defaultValue={updateUser?.inn}
                onChange={(e) => setInn(e.target.value)}
                id="inn"
                type="text"
                placeholder="inn"
              />
              <label htmlFor="inn">
                <img src={cabinetEdit} alt="not found" />
              </label>
            </div>
          </div> */}
          {/* <div className="info__user">
            <div className="title">Аккаунт</div>
            <div className="change">
              <input
                defaultValue={updateUser?.account}
                onChange={(e) => setAccount(e.target.value)}
                id="account"
                type="text"
                placeholder="account"
              />
              <label htmlFor="account">
                <img src={cabinetEdit} alt="not found" />
              </label>
            </div>
          </div> */}
          {/* <div className="info__user">
            <div className="title">OKOHX</div>
            <div className="change">
              <input
                defaultValue={updateUser?.okohx}
                onChange={(e) => setOkohx(e.target.value)}
                id="okoxh"
                type="text"
                placeholder="okoxh"
              />
              <label htmlFor="okoxh">
                <img src={cabinetEdit} alt="not found" />
              </label>
            </div>
          </div> */}
          {/* <div className="info__user">
            <div className="title">Наименование банка</div>
            <div className="change">
              <input
                defaultValue={updateUser?.bank}
                onChange={(e) => setBank(e.target.value)}
                id="bank"
                type="text"
                placeholder="bank"
              />
              <label htmlFor="bank">
                <img src={cabinetEdit} alt="not found" />
              </label>
            </div>
          </div> */}
          {/* <div className="info__user">
            <div className="title">МФО</div>
            <div className="change">
              <input
                defaultValue={updateUser?.mfo}
                onChange={(e) => setMfo(e.target.value)}
                id="mfo"
                type="text"
                placeholder="mfo"
              />
              <label htmlFor="mfo">
                <img src={cabinetEdit} alt="not found" />
              </label>
            </div>
          </div> */}
          {/* <div className="info__user">
            <div className="title">ОКЭД</div>
            <div className="change">
              <input
                defaultValue={updateUser?.oked}
                onChange={(e) => setOked(e.target.value)}
                id="oked"
                type="text"
                placeholder="oked"
              />
              <label htmlFor="oked">
                <img src={cabinetEdit} alt="not found" />
              </label>
            </div>
          </div> */}
          <div className="info__user">
            <div className="title">Адрес</div>
            <div className="change">
              <input
                defaultValue={updateUser?.last_address}
                id="lastAdres"
                type="text"
                placeholder="Адрес"
                onChange={(e) => setLastAddress(e.target.value)}
              />
              <label htmlFor="lastAdres">
                <img src={cabinetEdit} alt="not found" />
              </label>
            </div>
          </div>
          {/* <div className="info__user">
            <div className="title">Юридический адрес</div>
            <div className="change">
              <input
                defaultValue={
                  updateUser?.addresses[0]?.address || updateUser?.address_legal
                }
                id="address_legal"
                type="text"
                placeholder="Адрес"
                onChange={(e) => setAddressLegal(e.target.value)}
              />
              <label htmlFor="address_legal">
                <img src={cabinetEdit} alt="not found" />
              </label>
            </div>
          </div> */}
          {/* <div className="info__user">
            <div className="title">Изменить пароль</div>
            <div
              className="change md:justify-start justify-between cursor-pointer"
              onClick={() => setShowModal2(true)}
            >
              <div className="relative md:!w-auto !w-full">
                <input id="password" type="password" placeholder="******" />
              </div>
              <label htmlFor="password">
                <img src={cabinetEdit} alt="not found" />
              </label>
            </div>
          </div> */}
          {/* <div className="info__user">
            <div className="title">Адресы</div>
            <div className="change flex-col">
              <div className="flex items-center">
                <input
                  defaultValue={updateUser.address1}
                  id="address1"
                  type="text"
                  placeholder="Адрес 1"
                  onChange={(e) => setAddress1(e.target.value)}
                />
                <label htmlFor="address1">
                  <img src={cabinetEdit} alt="not found" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  defaultValue={updateUser.address2}
                  id="address2"
                  type="text"
                  placeholder="Адрес 2"
                  onChange={(e) => setAddress2(e.target.value)}
                />
                <label htmlFor="address2">
                  <img src={cabinetEdit} alt="not found" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  defaultValue={updateUser.address3}
                  id="address3"
                  type="text"
                  placeholder="Адрес 3"
                  onChange={(e) => setAddresses?.push(e.target.value)}
                />
                <label htmlFor="address3">
                  <img src={cabinetEdit} alt="not found" />
                </label>
              </div>
            </div>
          </div> */}
          {/* <div className="info__user">
            <div className="title">ФИО руководителя</div>
            <div className="change">
              <p>mironshohnasimov</p>
              <img src={cabinetEdit} alt="not found" />
            </div>
          </div> */}
        </div>
        <div className="flex flex-wrap gap-2 justify-end items-center mt-4">
          <button
            onClick={handleLogout}
            className="self-end text-white bg-blue-700 hover:!bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Выйти из аккаунта
          </button>
          <button
            type="button"
            style={{ background: "#0052FF" }}
            className="self-end text-white bg-blue-700 hover:!bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() =>
              onClickUpdateData({
                name,
                lastname,
                email,
                birthday,
                photo: photo,
                // address1,
                // address2,
                // address3,
                // address,
                gender,
                last_address,
              })
            }
          >
            Сохранить
          </button>
          {token && (
            <Button
              variant="outlined"
              onClick={handleRemoveAccount}
              color="error"
              className="!normal-case !border-none !h-full self-end text-white bg-red-700 hover:bg-red-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-500 dark:red:bg-red-700 dark:focus:ring-red-600"
            >
              Удалить аккаунт
            </Button>
          )}
        </div>
      </div>
    </MContainer>
  );
};

export default UpdateProfile;
