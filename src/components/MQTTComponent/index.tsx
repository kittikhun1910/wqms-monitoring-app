import React from "react";

interface MQTTComponentProps {
  data: { time: string; field: string; value: string }[] | null;
}

const MQTTComponent: React.FC<MQTTComponentProps> = ({ data }) => {
  return (
    <div>
      <h1>test</h1>
      {data && (
        <div>
          <p>All fetched values:</p>
          {data.map((record, index) => (
            <p key={index}>{`${record.field}=${record.value}`}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default MQTTComponent;
