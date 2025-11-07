import * as yup from "yup";

export const AddContactSchema = yup.object({
  firstName: yup.string().trim().required("First name is required"),
  lastName: yup.string().trim().required("Last name is required"),
  address: yup.string().trim().required("Address is required"),
  image: yup.string().trim().url("Image must be a valid URL").required("Image URL is required"),
  description: yup.string().trim().max(2000, "Max 2000 characters"),
});

export const EditContactSchema = yup.object({
  id: yup.number().required(),
  firstName: yup.string().trim().required("First name is required"),
  lastName: yup.string().trim().required("Last name is required"),
  address: yup.string().trim().required("Address is required"),
  image: yup.string().trim().url("Image must be a valid URL").required("Image URL is required"),
  description: yup.string().trim().max(2000, "Max 2000 characters"),
});
