import { useAppDispatch, useAppSelector } from "@/app/hooks"
import Form from "@/components/forms/Form"
import FormikTextInput from "@/components/forms/FormikTextInput"
import { selectAuthCredentials, setCredentials } from "@/features/auth"
import { usePostLoginMutation } from "@/services/api"
import Paper from "@material-ui/core/Paper"
import { Formik } from "formik"
import React, { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import { object, string } from "yup"

import useStyles from "./styles"
import { IconButton, InputAdornment } from "@material-ui/core"
import { Visibility, VisibilityOff } from "@material-ui/icons"

const validationSchema = object({
  email: string().required().email(),
  password: string().required(),
})

const Login: React.FC = () => {
  const classes = useStyles()
  const navigate = useNavigate()
  const [postLogin, { isLoading }] = usePostLoginMutation()
  const { t } = useTranslation(["translation", "message"])

  const auth = useAppSelector(selectAuthCredentials)

  useEffect(() => {
    if (auth.accessToken) {
      navigate("/")
    }
  }, [auth])

  const [showPassword, setShowPassword] = React.useState(false)

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault()
  }

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
              await postLogin({
                email: values.email,
                password: values.password,
              }).unwrap()
            }}
          >
            <Form
              submitDisabled={isLoading}
              // cancelDisabled={isLoading}
              // onCancel={() => {}}
            >
              <div style={{ marginBottom: "1em" }}>
                <span>{t("Welcome to POS", { ns: "message" })}</span>
              </div>

              <FormikTextInput
                name="email"
                fullWidth
                label={t("Email")}
                placeholder={t("Email")}
                margin="normal"
              />
              <FormikTextInput
                name="password"
                fullWidth
                label={t("Password")}
                placeholder={t("Password")}
                margin="normal"
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Form>
          </Formik>
        </Paper>
      </div>
    </div>
  )
}

export default Login
