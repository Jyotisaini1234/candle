// import React from 'react';
// import './Button.scss';

// interface ButtonProps {
//   children: React.ReactNode;
//   variant?: 'primary' | 'secondary' | 'outline';
//   onClick?: () => void;
//   className?: string;
// }

// export const Button: React.FC<ButtonProps> =({ onClick, children, ...rest }) => ({ 
//  {
//   return (
//     <button 
//       onClick={onClick} 
//       className={`btn btn--${variant} ${className}`}
//     >
//       {children}
//     </button>
//   );
// };


import React from 'react';
import './Button.scss';

interface ButtonProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: string;
  className?: string;
  children: React.ReactNode;
}


export const Button: React.FC<ButtonProps> = ({ onClick, children,variant,className, ...rest }) => {
  return (
    <button onClick={onClick} {...rest} className={`btn btn--${variant} ${className}`}>
      {children}
    </button>
  );
};
