import Header from '../components/header';
import buildClient from '../api/build-client';
import 'bootstrap/dist/css/bootstrap.css';

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <div>
      <Header currentUser={currentUser} />
      <Component {...pageProps} currentUser={currentUser} />
    </div>
  );
};

AppComponent.getInitialProps = async ({ Component, ctx }) => {
  try {
    const { data } = await buildClient(ctx).get('/api/users/me');
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return {
      pageProps,
      ...data,
    };
  } catch {
    return { currentUser: null };
  }
};

export default AppComponent;
