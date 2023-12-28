import { FormikHelpers, FormikValues } from "formik"

export type FormikSubmissionHandler<T = FormikValues> = (
  values: T,
  formikHelpers: FormikHelpers<T>,
) => void
