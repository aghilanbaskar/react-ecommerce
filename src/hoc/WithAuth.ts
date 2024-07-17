import { useAuth } from '../customHooks/index.ts';
import { withRouter } from '../util/withRouter';

const WithAuth = (props: { children: JSX.Element }) => {
  return useAuth() && props.children;
};

export default withRouter(WithAuth);
