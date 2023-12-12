import { SearchContent } from "@/components/SearchDrawer/SearchContent";
import { createContext, useState } from "react";

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
