import { useEffect, useState } from "react";

export const Waiter = () => {
  const [waiter, setWaiter] = useState<string>("");
  useEffect(() => {
    setTimeout(() => {
      setWaiter("passed");
    }, 2000);
  }, []);

  return <div data-testid="waiter">{waiter}</div>;
};

export default Waiter;
