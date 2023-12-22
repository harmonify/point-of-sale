import { useAppSelector } from "@/app/hooks"
import { persistor } from "@/app/store"
import { selectAuthCredentials, selectCurrentUser } from "@/features/auth"
import PropTypes from "prop-types"
import React, { ReactNode, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const AuthGuard: React.FC<{ children: ReactNode }> = ({ children }) => {
  const credentials = useAppSelector(selectAuthCredentials)
  const navigate = useNavigate()

  useEffect(() => {
    if (!(credentials.accessToken || credentials.refreshToken)) {
      persistor.purge()
      navigate("/login")
    }
  }, [])

  return children
}

AuthGuard.propTypes = {
  children: PropTypes.node,
}

export default AuthGuard
