import { useAppSelector } from "@/app/hooks"
import { selectAuthCredentials } from "@/features/auth"
import { purgeStoreAndNavigate } from "@/features/auth/util"
import PropTypes from "prop-types"
import React, { ReactNode, useEffect } from "react"

const AuthGuard: React.FC<{ children: ReactNode }> = ({ children }) => {
  const credentials = useAppSelector(selectAuthCredentials)

  useEffect(() => {
    if (!(credentials.accessToken || credentials.refreshToken)) {
      purgeStoreAndNavigate()
    }
  }, [])

  return children
}

AuthGuard.propTypes = {
  children: PropTypes.node,
}

export default AuthGuard
