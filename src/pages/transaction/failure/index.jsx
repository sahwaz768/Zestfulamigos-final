import { failureTransaction } from '@/services/transactions/makepayement.service';
import { useRouter } from 'next/router';
import querystring from 'querystring';
import { useEffect } from 'react';
import Image from "next/image";
import Card from "@/shared/Assets/paymentfailure.png";

export async function getServerSideProps({ req, res }) {
  if (req.method === 'POST') {
    // Handle POST request here
    let data;
    try {
      await new Promise((resolve, reject) => {
        req.on('data', (chunk) => {
          data += chunk;
        });

        req.on('end', () => {
          try {
            const parsedData = querystring.parse(data);
            resolve(parsedData); // Parse JSON data
          } catch (err) {
            reject(err); // Handle invalid JSON
          }
        });
      });
    } catch (error) {
      console.log('Error parsing POST data:', error);
    }
    return {
      props: {
        message: 'POST request received and processed',
        data: data ? querystring.parse(data) : null || {}
      }
    };
  }

  console.log('GET request received', req, res);

  // Handle the default GET request
  return {
    props: {
      message: 'GET request received'
    }
  };
}

export default function Page(props) {
  const router = useRouter();

  useEffect(() => {
    if (props && props.data) {
      const params = new URL(document.location.toString()).searchParams;
      const bookingId = params.get('bookingId');
      failureTransaction(props.data).then(({ data, error }) => {
        if (error) {
          router.push('/');
        } else {
          router.push(`/user/payment?bookingId=${bookingId}`);
        }
      });
    } else {
      router.push('/');
    }
  }, [props]);

  return (
    <div>
      <div className="flex justify-center mt-20">
              <Image src={Card} alt="Picture of the author" />
            </div>
            <h1 className="text-3xl font-bold text-red-600 text-center">Sorry!</h1>
            <h1 className="font-bold text-center mt-3">Payment failed</h1>
            <p className="text-center mt-3 text-sm">Sorry to inform you please complete the payment process.</p>
    </div>
  );
}

// export default SuccessPage;
