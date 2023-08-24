import React from 'react'
import {Header} from "../Components/Header";
import {Incentives} from "../Components/Incentives";
import {Forms} from "../Components/Forms";
import {Home} from "../Components/Home";
import {Footer} from "../Components/Footer";

export default function User() {
  return (
    <>
    <Header/>
    <Home/>
    <Incentives/>
    <Forms/>
    <Footer/>
    </>
  )
}
