import * as yup from "yup";

const passwordRule = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
// min 5 char, 1 uppercase, 1 lowercase, 1number, 1 symbol
const today = new Date();
const maxDate = today.toISOString().split("T")[0];

// Define the allowed image types
const SUPPORTED_IMAGE_FORMATS = ["image/jpeg", "image/png", "image/gif"];

// Define the allowed video types
const SUPPORTED_VIDEO_FORMATS = ["video/mp4", "video/mkv", "video/avi"];

export const LoginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

export const UserRegistrationSchema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[a-zA-Z\s]+$/, "Only letters are allowed")
    .min(2, "Enter minimum 2 characters")
    .max(20, "Maximum 20 characters are allowed")
    .required("Required"),
  contact: yup
    .string()
    .matches(/^\d{10}$/, "Phone number must be a 10 digit number")
    .required("Required"),
  email: yup.string().email("Please enter a valid email").required("Required"),
  dob: yup
    .date()
    .max(new Date(), "Date of Birth cannot be in the future")
    .required("Date of Birth is required"),

  password: yup
    .string()
    .matches(
      passwordRule,
      "Password must contain 1 uppercase letter, 1 number, and 1 special character"
    )
    .required("Required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Required"),
  state: yup
    .string()
    .matches(/^[a-zA-Z\s]+$/, "Only letters and spaces are allowed")
    .min(2, "Enter minimum 2 characters")
    .max(20, "Maximum 20 characters are allowed")
    .required("Required"),
  nationality: yup
    .string()
    .matches(/^[a-zA-Z\s]+$/, "Only letters are allowed")
    .min(2, "Enter minimum 2 characters")
    .max(20, "Maximum 20 characters are allowed")
    .required("Required"),
  pincode: yup
    .string()
    .matches(/^\d{6}$/, "Pincode must be a 6 digit number")
    .required("Required"),
  gender: yup
    .string()
    .min(2, "Enter minimum 2 characters")
    .required("Required"),
  image: yup
    .mixed()
    .required("Please select an image")
    .test(
      "fileSize",
      "Image size is too large (max 5 MB)",
      (value) => !value || (value && value.size <= 5 * 1024 * 1024)
    ) //validation for maximum file size (5 MB)
    .test(
      "fileType",
      "Unsupported file format",
      (value) =>
        !value ||
        (value && ["image/jpeg", "image/png", "image/gif"].includes(value.type))
    ),
});

export const ForgotPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(5, "1 uppercase, 1 number, 1 symbol")
    .max(16)
    .matches(passwordRule, "1 uppercase, 1 number, 1 symbol")
    .required("Required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

export const AdminSchema = yup.object().shape({
  email: yup.string().min(2, "Enter minimum 2 characters").required("Required"),
  password: yup.string().required("Required"),
});

export const AddMovieSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, "Enter minimum 2 characters")
    .max(100, "Maximum 100 characters are allowed")
    .required("Name is required"),
  genre: yup
    .string()
    .min(2, "Enter minimum 2 characters")
    .max(30, "Maximum 30 characters are allowed")
    .required("Genre is required"),
  director: yup
    .string()
    .min(2, "Enter minimum 2 characters")
    .max(50, "Maximum 50 characters are allowed")
    .required("Director is required"),
  scriptWriter: yup
    .string()
    .min(2, "Enter minimum 2 characters")
    .max(50, "Maximum 50 characters are allowed")
    .required("Script Writer is required"),
  duration: yup
    .string()
    .matches(/^\d{2}:\d{2}$/, "Duration must be in the format HH:MM")
    .required("Duration is required"),
  releaseDate: yup
    .date()
    .max(new Date(), "Release Date cannot be in the future")
    .required("Release Date is required"),
  description: yup
    .string()
    .min(10, "Enter minimum 10 characters")
    .max(500, "Maximum 500 characters are allowed")
    .required("Description is required"),
  language: yup
    .string()
    .min(2, "Enter minimum 2 characters")
    .max(30, "Maximum 30 characters are allowed")
    .required("Language is required"),
  thumbnail: yup
  .mixed()
  .required("Please select an image")
  .test(
    "fileType",
    "Unsupported file format",
    (value) =>
      !value || (value && SUPPORTED_IMAGE_FORMATS.includes(value.type))
  ),
  // .test(
  //   "fileSize",
  //   "Image size is too large (max 10 MB)",
  //   (value) => !value || (value && value.size <= 10 * 1024 * 1024)
  // ) //validation for maximum file size (5 MB)
  // .test(
  //   "fileType",
  //   "Unsupported file format",
  //   (value) =>
  //     !value ||
  //     (value && ["image/jpeg", "image/png", "image/gif"].includes(value.type))
  // ),
  video: yup
    .mixed()
    .required("Please select a video file")
    .test(
      "fileType",
      "Unsupported file format",
      (value) =>
        !value || (value && SUPPORTED_VIDEO_FORMATS.includes(value.type))
    ),
  adults: yup.boolean().required("Required"),
});

export const AddCastSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, "Enter minimum 2 characters")
    .max(50, "Maximum 50 characters are allowed")
    .required("Name is required"),
  image: yup
    .mixed()
    .required("Please select an image")
    .test(
      "fileType",
      "Unsupported file format",
      (value) =>
        !value || (value && SUPPORTED_IMAGE_FORMATS.includes(value.type))
    ),
});
