import { useAppSelector } from "@/app/hooks"
import { persistor } from "@/app/store"
import { selectCurrentUser } from "@/features/auth"
import PropTypes from "prop-types"
import React, { ReactNode, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const AuthGuard: React.FC<{ children: ReactNode }> = ({ children }) => {
  const user = useAppSelector(selectCurrentUser)
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
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
