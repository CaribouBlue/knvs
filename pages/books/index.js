import Layout from '../../components/layout';
import isAuthenticated from '../../components/is-authenticated-hoc'
import { useRouter } from 'next/router'
import { getPathSegment } from '../../utils/router'

const navBarItems = [
  {
    linkTo: '/books/upcoming',
    pathMatch: 'upcoming',
    pathMatchSegment: 1,
    title: 'Upcomming',
  },
  {
    linkTo: '/books/calendar',
    pathMatch: 'calendar',
    pathMatchSegment: 1,
    title: 'Calendar',
  },
]

const Page = props => {
  const router = useRouter()
  const nestedRoute = getPathSegment(router, 1)
  if (!nestedRoute) router.push('/books/upcoming')
  return <>
    <Layout
      navBar={navBarItems}
    >
      {props.children}
    </Layout>
  </>
};

export default isAuthenticated(Page, true)
