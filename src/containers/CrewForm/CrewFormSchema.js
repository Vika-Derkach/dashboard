import * as yup from "yup";
const numRegExp = /^[0-9]*$/;
export const CrewFormSchema = yup.object().shape({
  name: yup
    .string()
    .required("Enter a name")
    .min(2, "Must be bigger than one letter")
    .max(100, "Must be shorted"),

  job: yup
    .string()
    // .matches(numRegExp, "EIN is not valid")
    .required("Enter a job")
    .min(2, "Too short city name")
    .max(30, "Must be shorted"),
  department: yup
    .string()
    .required("Enter a department")
    .min(2, "Too short department")
    .max(100, "Must be shorted"),
  popularity: yup.string(),
  gender: yup.string().required("Choose gender"),
});
