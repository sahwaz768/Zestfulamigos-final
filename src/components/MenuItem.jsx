import React from 'react';

const MenuItem = ({ icon, label }) => (
  <div className="menu-item-second">
    <div className="icon-container-second">
      {icon}
    </div>
    <span className="menu-label-second">{label}</span>
  </div>
);

export default MenuItem;