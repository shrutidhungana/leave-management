import React from "react";

const Empty: React.FC<{ message?: string }> = ({
  message = "No leaves taken yet!",
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="text-6xl text-muted mb-4">🗓️</div>
      <p className="text-lg text-muted">{message}</p>
    </div>
  );
};

export default Empty;
