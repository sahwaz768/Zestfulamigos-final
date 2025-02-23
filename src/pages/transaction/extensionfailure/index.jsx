import { extensionfailureTransaction } from '@/services/transactions/makepayement.service';
import { useRouter } from 'next/router';
import querystring from 'querystring';
import { useEffect } from 'react';

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
      extensionfailureTransaction(props.data).then(({ data, error }) => {
        if (error) {
          router.push('/');
        } else {
          router.push(`/user/extendsession?bookingId=${bookingId}`);
        }
      });
    } else {
      router.push('/');
    }
  }, [props]);

  return (
    <div>
      <h1>Payment Failure</h1>
      <p>Transaction failed!! Sorry to inform you please make payment</p>
    </div>
  );
}

// export default SuccessPage;
