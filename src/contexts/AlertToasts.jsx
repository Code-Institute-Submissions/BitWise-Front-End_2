import { createContext, useContext, useState } from "react";

export const SuccessToastContext = createContext();
export const SetSuccessToastContext = createContext();

export const FailToastContext = createContext();
export const SetFailToastContext = createContext();

export const useSuccessToast = () => useContext(SuccessToastContext);
export const useSetSuccessToast = () => useContext(SetSuccessToastContext);

export const useFailToast = () => useContext(FailToastContext);
export const useSetFailToast = () => useContext(SetFailToastContext);

export const AlertToastProvider = ({ children }) => {
  const [successToast, setSuccessToast] = useState("");
  const [failToast, setFailToast] = useState("");

  return (
    <SuccessToastContext.Provider value={successToast}>
      <SetSuccessToastContext.Provider value={setSuccessToast}>
        <FailToastContext.Provider value={failToast}>
          <SetFailToastContext.Provider value={setFailToast}>
            {children}
          </SetFailToastContext.Provider>
        </FailToastContext.Provider>
      </SetSuccessToastContext.Provider>
    </SuccessToastContext.Provider>
  );
};
