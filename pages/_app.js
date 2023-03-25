import '../styles/globals.css';
import store from './redux/store';
import { Provider } from 'react-redux';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
    <div className='bg-white'>
      <Component {...pageProps} />
    </div>
    </Provider>
  )
}

export default MyApp
