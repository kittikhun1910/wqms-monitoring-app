import React from "react";

interface DisplayRelayComponentProps {
  data: { time: string; field: string; value: string }[] | null;

}

const DisplayRelayComponent: React.FC<DisplayRelayComponentProps> = ({ data }) => {
  console.log(data);
  return (
    <div>
      <h1>test</h1>
      {data && (
        <div>
          <p>All fetched values:</p>
          {data.map((record, index) => (
            <p key={index}>{`${record.time}:${record.field}=${record.value}`}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default DisplayRelayComponent;
