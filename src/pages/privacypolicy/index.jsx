import React from 'react';
import { AiOutlineSecurityScan } from 'react-icons/ai';
import { IoLibraryOutline } from 'react-icons/io5';
import { IoIosInformationCircleOutline } from 'react-icons/io';
import { MdOutlineSecurity } from 'react-icons/md';
import { CiMedicalClipboard } from 'react-icons/ci';
import { RiLinksLine } from 'react-icons/ri';
import { TbRating18Plus } from 'react-icons/tb';
import Footer from '@/components/Footer';
import Masterheader from '@/components/Masterheader';

const PrivacyPolicyPage = () => {
  return (
    <>
      <Masterheader backgroundColor="rgba(250, 236, 236, 0.8)" fillBlank />
      <div className="md:mx-14 mx-4">
        <h1 className="text-2xl text-center font-bold">Privacy Policy</h1>
        <p className="text-center font-bold">Our terms and conditions</p>
        <div className="mt-7">
          <div className="flex items-center gap-3">
            <AiOutlineSecurityScan color="pink" size={25} />
            <p>Our Commitment To You</p>
          </div>
          <p className="text-sm my-2">
            At Zestful Amigos, we are committed to protecting the privacy and
            security of your personal information. This Privacy Policy outlines
            how we collect, use, disclose, and protect the information you
            provide when using our platform and services. By accessing or using
            Zestful Amigos, you consent to the terms and practices described in
            this policy
          </p>
        </div>
        <div className="mt-7">
          <div className="flex items-center gap-3">
            <p>Information we collect</p>
            <IoLibraryOutline color="pink" size={20} />
          </div>
          <h1 className="text-sm my-2">
            Personal Information : When you register an account with Zestful
            Amigos, we may collect personal information, such as your name,
            email address, and demographic details.
          </h1>
          <h1 className="text-sm my-2">
            Communication Data : We may collect information related to your
            interactions with other users on our platform, including messages
            and conversations.
          </h1>
          <h1 className="text-sm my-2">
            Usage Data : We automatically collect certain information about your
            use of Zestful Amigos, such as your IP address, device type, browser
            information, and website usage statistics.
          </h1>
          <h1 className="text-sm my-2">
            Cookies and Similar Technologies : We may use cookies and similar
            technologies to enhance your experience and gather information about
            your preferences.
          </h1>
        </div>
        <div className="mt-7">
          <div className="flex items-center gap-3">
            <IoIosInformationCircleOutline color="pink" size={20} />
            <p>Use of Information </p>
          </div>
          <h1 className="text-sm my-2">
            Personalization : We use the information you provide to personalize
            your experience on Zestful Amigos, including matching you with
            compatible individuals and suggesting relevant content.
          </h1>

          <h1 className="text-sm my-2">
            Communication : We may use your email address or other contact
            information to send you important updates, service-related
            notifications, and marketing communications with your consent.
          </h1>
          <h1 className="text-sm my-2">
            Analytics and Improvements : We analyze user data to understand user
            behavior, improve our platform and services, and optimize user
            experience.
          </h1>
          <h1 className="text-sm my-2">
            Legal Compliance: We may process your information to comply with
            applicable laws, regulations, legal processes, or enforceable
            governmental requests.
          </h1>
        </div>
        <div className="mt-7">
          <div className="flex items-center gap-3">
            <p>Information Sharing </p>
            <MdOutlineSecurity color="pink" size={20} />
          </div>
          <h1 className="text-sm my-2">
            User-to-User Interaction : Your interactions and communications with
            other users on Zestful Amigos are at your own discretion. We do not
            control the content or actions of other users.
          </h1>

          <h1 className="text-sm my-2">
            Third-Party Service Providers : We may share your information with
            trusted third-party service providers who assist us in operating our
            platform and delivering services, subject to strict confidentiality
            obligations.
          </h1>
          <h1 className="text-sm my-2">
            {' '}
            Legal Obligations : We may disclose your information if required to
            do so by law, or if we believe such disclosure is necessary to
            protect our rights, safety, or the rights and safety of others.
          </h1>
        </div>
        <div className="mt-7">
          <div className="flex items-center gap-3">
            <p>Data Security </p>
            <CiMedicalClipboard color="pink" size={20} />
          </div>
          <h1 className="text-sm my-2">
            Ensuring Robust Security : We implement industry-standard security
            measures to protect your personal information from unauthorized
            access, disclosure, alteration, or destruction.
          </h1>

          <h1 className="text-sm my-2">Your Choices :</h1>
          <h1 className="text-sm my-2">
            {' '}
            Manage Your Personal Information : You may access, update, or delete
            your personal information by managing your account settings or
            contacting us directly.
          </h1>
          <h1 className="text-sm my-2">
            {' '}
            Opt-Out Freedom : You have the right to opt-out of receiving
            marketing communications from us at any time.
          </h1>
        </div>
        <div className="mt-7">
          <div className="flex items-center gap-3">
            <p>Third-Party Links </p>
            <RiLinksLine color="pink" size={20} />
          </div>
          <h1 className="text-sm my-2">
            Third-Party Links Disclaimer : Our platform may contain links to
            third-party websites or services. We are not responsible for the
            privacy practices or content of these third parties.
          </h1>
        </div>
        <div className="mt-7">
          <div className="flex items-center gap-3">
            <p>Children's Privacy</p>
            <TbRating18Plus color="pink" size={20} />
          </div>
          <h1 className="text-sm my-2">
            Age Restriction Policy : Zestful Amigos is intended for users who
            are at least 18 years old. We do not knowingly collect personal
            information from individuals under the age of 18.
          </h1>
          <h1 className="text-sm my-2">Changes to this Policy :</h1>
          <h1 className="text-sm my-2">
            Privacy Policy Updates : We may update this Privacy Policy from time
            to time. The revised version will be effective as of the date stated
            at the beginning of this policy.
          </h1>
          <h1 className="text-sm my-2">Contact Us :</h1>
          <h1 className="text-sm my-2">
            Contacting Us About Privacy : If you have any questions, concerns,
            or requests regarding this Privacy Policy or our privacy practices,
            please write your query at contact us page.
          </h1>
        </div>
      </div>
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
          <h1 className="text-sm my-2 font-bold"> 2. Eligibility for Refunds</h1>
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
          <h1 className="text-sm my-2 font-bold"> 3. Non-Refundable Situations</h1>
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
          <h1 className="text-sm my-2 font-bold"> 5. Refund Processing Timeline</h1>
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
          Zestful Amigos is committed to adhering to all applicable consumer protection laws in India. This policy is designed to ensure that   clients' rights are protected and upheld.
          </h1>
        </div>
        <div>
          <h1 className="text-sm my-2 font-bold"> 8.  Customer Support and Inquiries</h1>
          <h1>
          For further assistance or inquiries regarding this Refund Policy, clients are encouraged to contact our dedicated customer support team at [Contact Information]. We value your feedback and are committed to ensuring a satisfactory experience with our services.
          </h1>
        </div>
      </div>
      <div className="mt-10">
        <Footer />
      </div>
    </>
  );
};

export default PrivacyPolicyPage;
