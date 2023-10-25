// import { useState } from "react";

// https://uibakery.io/regex-library/phone-number
import {Form, redirect, useActionData, useNavigation} from 'react-router-dom';
import {createOrder} from '../../services/apiRestaurant.js';
import Button from '../../ui/Button.jsx';
import {useDispatch, useSelector} from 'react-redux';
import {fetchAddress, getUser} from '../user/userSlice.js';
import {clearCart, getCart, getTotalCartPrice} from '../cart/cartSlice.js';
import EmptyCart from '../cart/EmptyCart.jsx';
import store from '../../store.js';
import {formatCurrency} from '../../utils/helpers.js';
import {useState} from 'react';

const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

/*
 const fakeCart = [
 {
 pizzaId: 12,
 name: 'Mediterranean',
 quantity: 2,
 unitPrice: 16,
 totalPrice: 32,
 },
 {
 pizzaId: 6,
 name: 'Vegetable',
 quantity: 1,
 unitPrice: 13,
 totalPrice: 13,
 },
 {
 pizzaId: 11,
 name: 'Spinach and Mushroom',
 quantity: 1,
 unitPrice: 15,
 totalPrice: 15,
 },
 ];
 */

function CreateOrder() {
  const navigation = useNavigation();
  const {
    username,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
  } = useSelector(getUser);
  const isLoadingAddress = addressStatus === 'loading';
  const dispatch = useDispatch();
  const [withPriority, setWithPriority] = useState(false);
  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalCartPrice);

  const isSubmitting = navigation.state === 'submitting';

  const formErrors = useActionData();

  let priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;
  console.log(cart);

  if (!cart.length) return <EmptyCart />;
  return (
    <div className={'px-4 py-6'}>
      <h2 className={'my-8 text-center text-3xl font-bold'}>
        Ready to order? Let&apos;s go!
      </h2>

      <Form method={'POST'}>
        <div className={'mb-5 flex flex-col gap-2 sm:flex-row sm:items-center'}>
          <label className={'sm:basis-40'}>First Name</label>
          <div className={'grow'}>
            <input
              className={'input w-full'}
              type="text"
              name="customer"
              required
              defaultValue={username}
            />
          </div>
        </div>

        <div className={'mb-5 flex flex-col gap-2 sm:flex-row sm:items-center'}>
          <label className={'sm:basis-40'}>Phone number</label>
          <div className={'grow'}>
            <input
              className={'input w-full'}
              type="tel"
              name="phone"
              required
            />
          </div>
          {formErrors?.phone && (
            <p
              className={
                'mt-2 rounded-md bg-red-100 px-3 py-2 text-xs text-red-700'
              }
            >
              {formErrors.phone}
            </p>
          )}
        </div>

        <div
          className={
            'relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center'
          }
        >
          <label className={'sm:basis-40'}>Address</label>
          <div className={' grow'}>
            <input
              className={'input w-full'}
              type="text"
              name="address"
              disabled={isLoadingAddress}
              required
              defaultValue={address}
            />
            {!position.latitude && !position.longitude && (
              <span
                className={
                  'absolute bottom-[3px] right-[3px] top-[26px] z-50 md:bottom-[5px] md:right-[5px] md:top-[-3px]'
                }
              >
                <Button
                  disabled={isLoadingAddress}
                  type={'small'}
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(fetchAddress());
                  }}
                >
                  Get Position
                </Button>
              </span>
            )}
            {addressStatus === 'error' && (
              <p
                className={
                  'mt-2 rounded-md bg-red-100 px-3 py-2 text-xs text-red-700'
                }
              >
                {errorAddress}
              </p>
            )}
          </div>
        </div>

        <div className={'mb-12 flex items-center gap-5'}>
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className={
              'mr-1 h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2'
            }
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div className={'my-1'}>
          <input type={'hidden'} name={'cart'} value={JSON.stringify(cart)} />
          <input
            type={'hidden'}
            name={'position'}
            value={
              position.latitude && position.longitude
                ? `${position.latitude},${position.longitude}`
                : ''
            }
          />
          <Button disabled={isSubmitting} type={'primary'}>
            {isSubmitting
              ? 'Placing your order...'
              : `Order now from ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  // console.log(data.position);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'true',
  };

  console.log(order);
  const errors = {};

  if (!isValidPhone(order.phone)) {
    errors.phone =
      'Please give us your correct phone number. We might need it to contact you.';
  }

  if (Object.keys(errors).length > 0) return errors;

  // If everything is fine then create new order and redirect

  const newOrder = await createOrder(order);
  console.log(newOrder);

  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
