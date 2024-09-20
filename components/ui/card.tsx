import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  title,
}) => (
  <div className={`bg-white shadow-lg rounded-xl overflow-hidden ${className}`}>
    {title && (
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-4">
        <h3 className="text-xl font-semibold text-white">{title}</h3>
      </div>
    )}
    <div className="p-6">{children}</div>
  </div>
);
