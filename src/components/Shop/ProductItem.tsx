import { useDispatch } from 'react-redux';
import Card from '../UI/Card';
import classes from './ProductItem.module.css';
import { CartActions, addItemToCart } from '../../store/cart-slice';
import { Dispatch } from '@reduxjs/toolkit';

type ProductItemProps = {
  id: string;
  title: string;
  price: number;
  description: string;
};

const ProductItem = (props: ProductItemProps) => {
  const { id, title, price, description } = props;

  const dispatch = useDispatch<Dispatch<CartActions>>();

  const addToCartHandler = () => {
    dispatch(addItemToCart({ id, title, price }));
  };

  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={addToCartHandler}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
