import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
  const modifiedPrice = price * 100;
  const publishableKey = 'pk_test_RcWV1eZu8nWPZBSvxQ1e0bVz008sJQH9f2';

  const onToken = (token) => {
    console.log(token);
    alert('Payment Succesful!');
  };

  return (
    <>
      {price > 0 ? (
        <StripeCheckout
          label={`Pay $${price}`}
          name='Clothing Site'
          billingAddress
          shippingAddress
          image='https://svgshare.com/i/CUz.svg'
          description={`Your total is $${price}`}
          amount={modifiedPrice}
          panelLabel='Pay Now'
          token={onToken}
          stripeKey={publishableKey}
        />
      ) : null}
    </>
  );
};

export default StripeCheckoutButton;
