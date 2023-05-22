import { backend } from "../helper/backend";
import { IFrame } from "../types/series";

export const useCheckout = () => {
  const checkout = async (frame: IFrame) => {
    const res = await backend
      .post("/stripe/checkout", { item: frame })
      .catch((error) => console.log(error));

    if (res) window.location = res.data.url;
  };

  return { checkout };
};
