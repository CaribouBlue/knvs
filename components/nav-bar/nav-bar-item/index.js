import Link from 'next/link'
import { getPathSegment } from '../../../utils/router'

export default (props) => {
  const pathBase = getPathSegment(props.router, props.pathMatchSegment)
  return <Link href={props.linkTo}>
    <a className={`btn btn-link ${props.pathMatch === pathBase && 'text-secondary'}`}
      style={{margin: '0 5px 0 5px', ...props.anchorStyle}}
    >{props.title}</a>
  </Link>
}
