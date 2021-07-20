import React from 'react';
import { Spin } from 'antd';
function Loading() {
  return (
    <div className="spinLoading">
      <Spin size="large" />
    </div>
  );
}

export default Loading;
