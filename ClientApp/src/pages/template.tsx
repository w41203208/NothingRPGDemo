import React, { useEffect, useState } from 'react';
import { BaseItem } from '../Services/Item';

interface CharacterDetailProps {
  children?: React.ReactNode;
}

export const CharacterDetail: React.FC<CharacterDetailProps> = ({
  children,
  ...props
}) => {
  useEffect(() => {
    return () => {};
  }, []);

  return (
    <>
      <section className="flex justify-center items-center min-h-screen">
        This is CharacterDetail Page.
      </section>
    </>
  );
};
