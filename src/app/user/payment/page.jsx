import React from 'react';
import Header from '@/components/Header';

const page = () => {
  return (
    <div>
      <Header />
      <div className="paymentsummarybox">
        <div className="paymentsummary">
          <div className="paymentbox">
            <h1 className="text-2xl font-semibold">Summary of payment</h1>
            <h3 className="text-base my-4">Description amount(INR)</h3>
            <table className="mt-2">
              <tbody>
                <tr>
                  <th className="text-sm font-normal">Base price</th>
                  <td className="text-sm font-normal ">: ₹6000.00</td>
                </tr>

                <tr>
                  <th className="text-sm font-normal">Gst(18%) fee</th>
                  <td className="text-sm font-normal">: ₹1080.00</td>
                </tr>

                <tr>
                  <th className="text-sm font-normal">Total Amount</th>
                  <td className="text-sm font-normal">: ₹7080.00</td>
                </tr>
              </tbody>
            </table>
            <div className="flex mt-3">
              <input type="checkbox" />
              <p className="text-xs font-normal ml-2">
                I agree to the <a>Term and Condition</a> and Privacy policy
              </p>
            </div>
            <div className="flex my-2">
              <input type="checkbox" />
              <p className="text-xs font-normal ml-2">
                I authorize the merchant to debit the above amount for selected
                service
              </p>
            </div>
            <button className="paymentbtn">proceed to payment</button>
          </div>
        </div>
        <div className="paymentimage"></div>
      </div>
    </div>
  );
};

export default page;
