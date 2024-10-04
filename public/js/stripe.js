import axios from 'axios';
import { showAlert } from './alerts';

const stripe = Stripe(
  'pk_test_51Q5tbMRxvse3eA1T5Tt5TY3cr6nRPPvTjprDOKQ49hHrgs2EcrAIYkeVc30TswcDjXsIQRgLK4KKRzsBiaG3MNSz00bjslcRLT',
);

export const bookTour = async (tourId) => {
  try {
    //1] Get checkout session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
    //console.log(session);
    //2]Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
