import React, { useState } from "react";
export const SettingContext = React.createContext();

function SettingProvider(props) {
  const [hide, setHide] = useState(true);
  const [itemPerPage, setItemPerPage] = useState(3);
  const [order, setOrder] = useState("difficulty");

  const state = {
    hide,
    itemPerPage,
    order,
    changeHide: setHide,
    changeItemNum: setItemPerPage,
    changeOrder: setOrder,
  };
  return (
    <SettingContext.Provider value={state}>
      {props.children}
    </SettingContext.Provider>
  );
}

export default SettingProvider;
