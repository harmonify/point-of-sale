import { selectAuthCredentials, setLogout } from "@/features/auth"
import PropTypes from "prop-types"
import React, { ReactNode, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const AuthGuard: React.FC<{ children: ReactNode }> = ({ children }) => {
  const dispatch = useDispatch()
  const credentials = useSelector(selectAuthCredentials)
  const navigate = useNavigate()

  useEffect(() => {
    if (!(credentials.accessToken || credentials.refreshToken)) {
      ;(async () => {
        dispatch(setLogout())
        return navigate("/login")
      })()
    }
  }, [])

  return children
}

AuthGuard.propTypes = {
  children: PropTypes.node,
}

export default AuthGuard
