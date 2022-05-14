import * as yup from "yup";
const numRegExp = /^[0-9]*$/;
export const FormSchema = yup.object().shape({
  name: yup
    .string()
    .required("Enter a name")
    .min(2, "Must be bigger than one letter")
    .max(100, "Must be shorted"),

  city: yup
    .string()
    // .matches(numRegExp, "EIN is not valid")
    .required("Enter a city")
    .min(2, "Too short city name")
    .max(30, "Must be shorted"),
  address: yup
    .string()
    .required("Enter an address")
    .min(2, "Too short address")
    .max(100, "Must be shorted"),
  comment: yup.string().max(200, "Must be shorter"),
  priceFromTo: yup.object().shape({
    from: yup.string(),
    to: yup.string(),
  }),
  priceOne: yup.string(),

  priceEmtpy: yup.string().nullable(true),
});
