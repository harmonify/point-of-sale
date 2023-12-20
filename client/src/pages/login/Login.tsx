import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { selectAuthCredentials, setCredentials } from "@/features/auth"
import { showSnackbar } from "@/features/snackbar"
import { usePostLoginMutation } from "@/services/api"
import { logger } from "@/services/logger"
import { CircularProgress } from "@material-ui/core"
import Button from "@material-ui/core/Button"
import Paper from "@material-ui/core/Paper"
import { Formik } from "formik"
import React, { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import { object, string } from "yup"

import { TextInput } from "../../components/forms"
import useStyles from "./styles"
import Form from "@/components/forms/Form"
import { parseApiErrorMessage, sleep } from "@/utils"

const validationSchema = object({
  email: string().required().email(),
  password: string().required(),
})

const Login: React.FC = () => {
  const dispatch = useAppDispatch()
  const [postLogin, { isLoading }] = usePostLoginMutation()
  const { t } = useTranslation()
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

              <TextInput
                name="email"
                fullWidth
                label={t("Email")}
                placeholder={t("Email")}
                margin="normal"
              />
              <TextInput
                name="password"
                fullWidth
                label={t("Password")}
                placeholder={t("Password")}
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