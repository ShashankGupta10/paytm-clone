import React from 'react'

const page = ({
  params,
}: {
  params: {
    token: string
  }
}) => {
  return !params.token ? (
    <div>Token not found</div>
  ) : (
    <div>Token: {params.token}</div>
  )
}

export default page
