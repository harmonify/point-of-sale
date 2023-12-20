/* eslint-disable no-undef */
import { useAppSelector } from "@/app/hooks"
import { APP_PUBLIC_URL } from "@/environment"
import { selectPageTitle } from "@/features/app"
import { Helmet } from "react-helmet"

const PageHeader = () => {
  const title = useAppSelector(selectPageTitle)

  return (
    <Helmet>
      {/* <title>{title}</title> */}
      <link rel="canonical" href={APP_PUBLIC_URL} />
    </Helmet>
  )
}

export default PageHeader
