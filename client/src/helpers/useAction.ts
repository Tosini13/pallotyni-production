import { useState } from "react";

const useAction = () => {
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  return {
    isProcessing,
    execute: async <T>(promise: Promise<T>) => {
      setIsProcessing(true);
      const response = await promise;
      setIsProcessing(false);
      return response;
    },
  };
};

export default useAction;
