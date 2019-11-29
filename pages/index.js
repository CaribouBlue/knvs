import Layout from '../components/layout';
import isAuthenticated from '../components/is-authenticated-hoc'


const page = props => (
  <>
    <Layout>
      <div className="container">
        <div className="columns">
          <div className="column col-12">
            <p>child 1</p>
          </div>
          <div className="column col-12">
            <p>child 2</p>
          </div>
        </div>
      </div>
    </Layout>
  </>
);

export default isAuthenticated(page)
