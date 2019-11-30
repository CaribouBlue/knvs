const getPathSegment = (router, segment=0) => {
  const segments = router.pathname.split('/')
  return segments[segment + 1]
}

export {
  getPathSegment,
}
