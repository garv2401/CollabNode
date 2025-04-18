import React from "react";

const DislikeButton = () => {
  return (
    <div className="flex flex-row gap-2 p-1">
      <p>{}</p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="17"
        height="16"
        viewBox="0 0 21 20"
        fill="none"
      >
        <path
          fill="#000"
          d="M101.9 600h-2.1v11.988h2.1c1.16 0 2.1-.894 2.1-1.998v-7.992c0-1.104-.94-1.998-2.1-1.998m-14.202 0H97.7v11.988l-1.805 6.188c-.213 1.316-1.65 2.199-3.105 1.667-.87-.318-1.39-1.18-1.39-2.068v-4.788c0-.552-.47-1-1.05-1h-4.477c-1.847 0-3.213-1.634-2.798-3.346l1.825-6.523c.3-1.24 1.46-2.118 2.798-2.118"
          transform="translate(-139 -760) translate(56 160)"
        />
      </svg>
    </div>
  );
};

export default DislikeButton;
