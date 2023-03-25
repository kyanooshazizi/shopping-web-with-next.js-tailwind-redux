import Layout from "./component/Layout";
import data from '../data/product.json';
import Product from "./component/product";
import { useSelector, useDispatch } from 'react-redux';

const Homepage= (props) => {
  const total_card = useSelector(state => state.shopping.dataset);
  return (
 <>
  <Layout title={"home"} flag="true">
  <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 dark:bg-dark'>
      {total_card.map(item => <Product item={item} key={item.title} />)}
  </div>
  </Layout>
 </>
  );
};

export default Homepage;