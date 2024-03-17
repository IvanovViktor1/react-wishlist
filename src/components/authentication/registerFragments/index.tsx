import React, { FC, useState } from "react";
import FragmentOne from "./FragmentOne";
import { current } from "@reduxjs/toolkit";
import FragmentTwo from "./FragmentTwo";

const RegisterFragments: FC = () => {
  const [currentFragment, setCurrentFragment] = useState<number | null>(1);

  return (
    <>
      {currentFragment === 1 ? (
        <FragmentOne
          next={() => {
            setCurrentFragment(2);
          }}
        />
      ) : currentFragment === 2 ? (
        <FragmentTwo
          previous={() => {
            setCurrentFragment(1);
          }}
        />
      ) : null}
    </>
  );
};

export default RegisterFragments;
