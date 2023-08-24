import React from 'react'
import '../Styles/Home.css'
import books from '../Images/books.jpg'


let goToViolation = () => {
  const violation = document.getElementById("donate");
  window.scrollTo({
    top: violation.offsetTop,
    behavior: "smooth"
  });
};


export const Home = () => {
  return (
    <>
      <div className='' id="main-display">
        <div className="main-text flex flex-row justify-center m-auto">
          <h1 className="home-text">
            Book donation Made Simple For <span>Everyone</span>
          </h1>
          <p>
            Lend a helping hand to those in need by donating unused books to support our work. Your donations stop waste and save paper.
          </p>
          <button className="btn btn-sm btn-primary" onClick={goToViolation}>
            Donate Now
          </button>
          <img id="doctor" className='m-6' height={600} style={{ maxHeight: "300px", textAlign: "center" }} src={books} alt="Doctor.png" />
        </div>
      </div>
    </>
  )
}
