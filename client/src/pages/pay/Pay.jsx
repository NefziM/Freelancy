import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import newRequest from "../../utils/newRequest";
import { useParams } from "react-router-dom";
import CheckoutForm from "../../components/checkoutForm/CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51OIUvoDviaT6UrHcZQdWUcyxZLRe2m2UnoojxfTRFdxPJkfPNgr6RvEX29oI2oD90lnd4EVEwUNj4ukUH7KGIswJ00uuptXI9u"
);

const Pay = () => {
  const [clientSecret, setClientSecret] = useState("");

  const { id } = useParams();

  useEffect(() => {
    const makeRequest = async () => {
        try {
          const res = await newRequest.post(
            `/orders/create-payment-intent/${id}`
          );
          setClientSecret(res.data.clientSecret);
        } catch (err) {
          console.log(err);
        }
      };
    makeRequest();
  }, [id]);

  const appearance = {
    theme: 'stripe',
  };

  return (
    <div className="pay">
      {clientSecret ? (
        <Elements stripe={stripePromise}>
          <CheckoutForm clientSecret={clientSecret} appearance={appearance} />
        </Elements>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Pay;
