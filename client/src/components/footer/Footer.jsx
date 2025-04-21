import './Footer.css';
import { FaRegAddressBook } from "react-icons/fa";
import { MdContactMail } from "react-icons/md";

function Footer() {
  return (
    <div className='d-flex felx-wrap justify-content-around bg-dark  text-center text-white p-5 fs-4'>
      <div>
        <p className='text-info display-4'><FaRegAddressBook /></p>
        <p>PVP SIT</p>
        <p>Vijayawada</p>
      </div>
      <div>
      <p className='text-info display-4'><MdContactMail /></p>
        <p>pvp@mail.com</p>
        <p>99999999</p>
      </div>
    </div>
  )
}

export default Footer