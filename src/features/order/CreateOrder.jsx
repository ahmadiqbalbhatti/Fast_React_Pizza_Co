// import { useState } from "react";

// https://uibakery.io/regex-library/phone-number
import {Form, redirect, useActionData, useNavigation} from 'react-router-dom';
import {createOrder} from '../../services/apiRestaurant.js';
import Button from '../../ui/Button.jsx';
import {useSelector} from 'react-redux';
import {getUsername} from '../user/userSlice.js';

const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

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

function CreateOrder() {
  const navigation = useNavigation();
  const username = useSelector(getUsername);

  const isSubmitting = navigation.state === 'submitting';
  // const [withPriority, setWithPriority] = useState(false);

  const formErrors = useActionData();
  const cart = fakeCart;

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
            <p className={'mt-2 rounded-md bg-red-100 text-xs text-red-700 '}>
              {formErrors.phone}
            </p>
          )}
        </div>

        <div className={'mb-5 flex flex-col gap-2 sm:flex-row sm:items-center'}>
          <label className={'sm:basis-40'}>Address</label>
          <div className={'grow'}>
            <input
              className={'input w-full'}
              type="text"
              name="address"
              required
            />
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
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div className={'my-1'}>
          <input type={'hidden'} name={'cart'} value={JSON.stringify(cart)} />
          <Button disabled={isSubmitting} type={'primary'}>
            {isSubmitting ? 'Placing your order...' : 'Order now'}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'on',
  };
  const errors = {};

  if (!isValidPhone(order.phone)) {
    errors.phone =
      'Please give us your correct phone number. We might need it to contact you.';
  }

  if (Object.keys(errors).length > 0) return errors;

  // If everything is fine then create new order and redirect
  const newOrder = await createOrder(order);

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
