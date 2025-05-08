import React from 'react';

export const Header = ({ children }: { children: React.ReactNode }) => {
  return <header className='header'>{children}</header>;
};
