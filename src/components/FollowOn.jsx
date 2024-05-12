import React from "react";
// React Icons
import { FaInstagram, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
// CSS
import "../App.css";

const FollowOn = () => {
  return (
    <div className="faded-text pt-2">
      <span>Follow on:</span>
      <div className="flex gap-4 pt-3">
        <a href="#">
          <FaYoutube size={20} />
        </a>
        <a href="#">
          <FaInstagram size={20} />
        </a>
        <a href="#">
          <FaXTwitter size={20} />
        </a>
      </div>
    </div>
  );
};

export default FollowOn;
