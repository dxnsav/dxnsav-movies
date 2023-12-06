import { createContext, useState } from "react";
import { SearchContent } from "@/components/SearchModal/SearchContent";

export const DialogContext = createContext({
  content: null,
  setContent: () => { },
});

export const DialogProvider = ({ children }) => {
  const [content, setContent] = useState(<SearchContent />);

  return (
    <DialogContext.Provider value={{ content, setContent }}>
      {children}
    </DialogContext.Provider>
  );
};
