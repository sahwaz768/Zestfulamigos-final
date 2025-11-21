import React from 'react';

import Footer from '@/components/Footer';
import Masterheader from '@/components/Masterheader';

const refundpolicy = () => {
  return (
    <div>
      <Masterheader backgroundColor="rgba(250, 236, 236, 0.8)" fillBlank />
      
      <div className="refund-policy mt-10 md:mx-14 mx-4">
        <h1 className="text-2xl text-center font-bold">Refund Policy</h1>
        <h1 className="text-sm my-2">
          At Zestful Amigos, we are dedicated to delivering exceptional
          companionship services to meet the diverse needs of our clients. We
          recognize that circumstances may arise that necessitate a request for
          a refund. This Refund Policy outlines the conditions under which
          refunds may be granted, the procedures for submitting a refund
          request, and our commitment to handling these requests with care.
        </h1>
        <div>
          <h1 className="text-sm my-2 font-bold"> 1. Definitions</h1>
          <h1 className="text-sm my-1">
            {' '}
            Client: Any individual or entity that books a companionship service
            through Zestful Amigos.
          </h1>
          <h1 className="text-sm ">
            {' '}
            Booking: The confirmed reservation of a companionship service.
          </h1>
          <h1 className="text-sm my-1">
            {' '}
            Refund: The return of funds to a client for a canceled or
            unsatisfactory service.
          </h1>
        </div>
        <div>
          <h1 className="text-sm my-2 font-bold">
            {' '}
            2. Eligibility for Refunds
          </h1>
          <h1>
            Clients may qualify for a refund under the following circumstances:
          </h1>
          <h1 className="text-sm my-1">
            {' '}
            Client-Initiated Cancellations: Clients who cancel their bookings at
            least 24 hours prior to the scheduled meeting will receive a full
            refund without penalty.
          </h1>
          <h1 className="text-sm my-1">
            {' '}
            Company-Initiated Cancellations: If Zestful Amigos is unable to
            fulfill a booking due to unforeseen circumstances (such as illness,
            emergencies, or other unavoidable situations), a full refund will be
            issued to the client.
          </h1>
          <h1 className="text-sm my-1">
            {' '}
            Service-Related Issues: Clients who experience issues during their
            appointment (e.g., the companion failing to arrive on time or not
            meeting agreed-upon standards) may submit a request for a partial or
            full refund. Each case will be carefully reviewed by our customer
            service team.
          </h1>
        </div>
        <div>
          <h1 className="text-sm my-2 font-bold">
            {' '}
            3. Non-Refundable Situations
          </h1>
          <h1>Refunds will not be issued under the following conditions:</h1>
          <h1 className="text-sm my-1">
            {' '}
            Late Cancellations: Cancellations made less than 24 hours before the
            scheduled meeting will not be eligible for a refund.
          </h1>
          <h1 className="text-sm my-1">
            Client Non-Compliance: If the client fails to comply with the
            established guidelines and policies during the booking process, this
            may result in a forfeiture of the right to a refund.
          </h1>
          <h1 className="text-sm my-1">
            {' '}
            Post-Confirmation Changes: Changes made to a confirmed booking
            (e.g., time, date, or companion changes) will not qualify for a
            refund once the confirmation has been issued.
          </h1>
        </div>
        <div>
          <h1 className="text-sm my-2 font-bold"> 4. Requesting a Refund</h1>
          <h1>Clients seeking a refund must follow these steps:</h1>
          <h1 className="text-sm my-1">
            Contact Customer Support: Clients should reach out to Zestful Amigos
            customer support at [Insert Contact Information] within 7 days of
            the booking date to initiate the refund process.
          </h1>
          <h1 className="text-sm my-1">
            Provide Necessary Information: When submitting a refund request,
            clients must include relevant details such as the booking
            confirmation number, the date of the appointment, and a clear
            explanation of the reason for the request.
          </h1>
        </div>
        <div>
          <h1 className="text-sm my-2 font-bold">
            {' '}
            5. Refund Processing Timeline
          </h1>
          <h1>
            Once a refund request is received and approved, Zestful Amigos will
            process the refund within 5-7 business days. The refund will be
            issued to the original payment method used during the transaction.
            Clients will receive a notification once the refund has been
            processed.
          </h1>
        </div>
        <div>
          <h1 className="text-sm my-2 font-bold"> 6. Escalation Process</h1>
          <h1>
            If clients are dissatisfied with the outcome of their refund
            request, they may escalate their concerns by contacting our customer
            support team, who will review the case further to ensure client
            satisfaction.
          </h1>
        </div>

        <div>
          <h1 className="text-sm my-2 font-bold"> 7. Legal Compliance</h1>
          <h1>
            Zestful Amigos is committed to adhering to all applicable consumer
            protection laws in India. This policy is designed to ensure that
            clients' rights are protected and upheld.
          </h1>
        </div>
        <div>
          <h1 className="text-sm my-2 font-bold">
            {' '}
            8. Customer Support and Inquiries
          </h1>
          <h1>
            For further assistance or inquiries regarding this Refund Policy,
            clients are encouraged to contact our dedicated customer support
            team at [Contact Information]. We value your feedback and are
            committed to ensuring a satisfactory experience with our services.
          </h1>
        </div>
      </div>
      <div className="mt-10">
        <Footer />
      </div>
    </div>
  );
};

export default refundpolicy;
