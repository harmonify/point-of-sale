import { useAppSelector } from "@/app/hooks"
import { Form, FormikTextInput } from "@/components/forms"
import { selectAuthCredentials } from "@/features/auth"
import { usePostLoginMutation } from "@/services/api"
import Paper from "@material-ui/core/Paper"
import { Formik } from "formik"
import React, { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import { object, string } from "yup"

import useStyles from "./styles"

const validationSchema = object({
  email: string().required().email(),
  password: string().required(),
})

const Login: React.FC = () => {
  const [postLogin, { isLoading }] = usePostLoginMutation()
  const { t } = useTranslation(["translation", "field"])
  const navigate = useNavigate()
  const classes = useStyles()

  const auth = useAppSelector(selectAuthCredentials)

  useEffect(() => {
    if (auth.accessToken) {
      navigate("/")
    }
  }, [auth])

  return (
    <div className={classes.root}>
      <div className={classes.loginContainer}>
        <Paper className={classes.paper}>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={validationSchema}
            validateOnChange={true}
            validateOnBlur={true}
            onSubmit={async (values) => {
              const p = postLogin({
                email: values.email,
                password: values.password,
              })
              try {
                await p.unwrap()
                navigate("/")
              } finally {
                p.reset()
              }
            }}
          >
            <Form
              submitDisabled={isLoading}
              // cancelDisabled={isLoading}
              // onCancel={() => {}}
            >
              <div style={{ marginBottom: "1em" }}>
                <span>{t("Welcome to POS")}</span>
              </div>

              <FormikTextInput
                name="email"
                fullWidth
                label={t("Email", { ns: "field" })}
                placeholder={t("Email", { ns: "field" })}
                margin="normal"
              />
              <FormikTextInput
                name="password"
                fullWidth
                label={t("Password", { ns: "field" })}
                placeholder={t("Password", { ns: "field" })}
                type="password"
                margin="normal"
              />
            </Form>
          </Formik>
        </Paper>
      </div>
    </div>
  )
}

export default Login
