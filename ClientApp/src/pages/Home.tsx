import React, { useEffect, useState } from 'react';

interface HomeProps {
  children?: React.ReactNode;
}

export const Home: React.FC<HomeProps> = ({ children, ...props }) => {

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <>
      <section className="flex justify-center items-center min-h-screen">
        This is Home Page.
      </section>
    </>
  );
};
