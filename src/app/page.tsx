"use client";

import { useState } from "react";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee.component";
import About from "./components/About";
import Result from "./components/Result";
import Sessions from "./components/Sessions";
import Agenda from "./components/Agenda";
import Invitee from "./components/Invitee.component";
import Venue from "./components/Venue";
import Faq from "./components/Faq";
import Footer from "./components/Footer";
import FormComponent from "./components/FormComponent";

export default function Home() {
  const [showForm, setShowForm] = useState(false);

  const openForm = () => {
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
  };

  if (showForm) {
    return <FormComponent onCancel={closeForm} />;
  }

  return (
    <>
      <Hero onReserve={openForm} />
      <Marquee />
      <About />
      <Result />
      <Sessions />
      <Agenda onReserve={openForm} />
      <Invitee />
      <Venue />
      <Faq />
      <Footer onReserve={openForm} />
    </>
  );
}
