import { successTransaction } from '@/services/transactions/makepayement.service';
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
      successTransaction(props.data).then(({ data, error }) => {
        if (error) {
          router.push('/');
        } else {
          router.push('/user/chat');
        }
      });
    } else {
      router.push('/');
    }
  }, [props]);

  return (
    <div>
      <h1>Payment Successful</h1>
      <p>Hoorey!</p>
    </div>
  );
}

// export default SuccessPage;
