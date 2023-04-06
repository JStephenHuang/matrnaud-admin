import emailjs from "@emailjs/browser";

export const useEmail = () => {
  const sendEmail = async (
    emailFrom: string,
    name: string,
    message: string
  ) => {
    const templateParams = {
      emailFrom: emailFrom,
      name: name,
      message: message,
    };
    const serviceId = import.meta.env.VITE_SERVICE_ID;
    const templateId = import.meta.env.VITE_TEMPLATE_ID;
    const publicId = import.meta.env.VITE_PUBLIC_ID;
    await emailjs.send(serviceId, templateId, templateParams, publicId);
  };
  return { sendEmail };
};
