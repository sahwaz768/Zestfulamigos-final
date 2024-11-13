import React from 'react';
import { TbGenderBigender } from 'react-icons/tb';


const Homemidsection = () => {
  return (
    <>
      <div>
        <div className=" circlebox">
          <div className="quarter-circle"></div>
          <h1 className="text-center text-3xl text-red-900 font-bold">
            how to Connect
          </h1>
        </div>
      </div>
      <div className="bodymid">
        <div className="containermid">
          <div className="steps-container">
            <svg
              className="connections-container"
              viewBox="0 0 1200 800"
              preserveAspectRatio="none"
            >
              <path
                d="M 300 100 Q 600 0 900 100"
                fill="none"
                stroke="#d6d5d5"
                strokeWidth="3"
                strokeDasharray="10,10"
              />

              <path
                d="M 100 200 Q 0 400 100 600"
                fill="none"
                stroke="#d6d5d5"
                strokeWidth="3"
                strokeDasharray="10,10"
              />

              <path
                d="M 1100 200 Q 1200 400 1100 600"
                fill="none"
                stroke="#d6d5d5"
                strokeWidth="3"
                strokeDasharray="10,10"
              />

              <path
                d="M 300 700 Q 600 800 900 700"
                fill="none"
                stroke="#d6d5d5"
                strokeWidth="3"
                strokeDasharray="10,10"
              />
            </svg>

            <div className="step">
              <h2 className="mt-3 text-gray-800 font-bold mb-1">
                Choose gender
              </h2>

              <div className="icon-wrapper">
                <div>
                  <TbGenderBigender size={35} />
                </div>
              </div>

              <p className="text-sm text-gray-800 ">
                Let us tailor your dating journey by selecting your gender to
                match you with compatible connections
              </p>
            </div>

            <div className="step">
              <h2 className="mt-3 text-gray-800 font-bold mb-1">Get Sign up</h2>
              <div className="icon-wrapper">
                <svg className="icon" viewBox="0 0 24 24">
                  <path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>

              <p className="text-sm text-gray-800">
                Set up your account, provide detailed information, let find
                partner that matches your interests
              </p>
            </div>

            <div className="step">
              <h2 className="mt-3 text-gray-800 font-bold mb-1">
                Ready to Meetup
              </h2>
              <div className="icon-wrapper">
                <svg className="icon" viewBox="0 0 24 24">
                  <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                </svg>
              </div>

              <p className="text-sm text-gray-800">
                Take the first step towards meaningful connections. Join now and
                discover people who share your goals and interests!
              </p>
            </div>

            <div className="step">
              <h2 className="mt-3 text-gray-800 font-bold mb-1">
                Choose companion
              </h2>
              <div className="icon-wrapper">
                <svg className="icon" viewBox="0 0 24 24">
                  <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                </svg>
              </div>

              <p className="text-sm text-gray-800">
                Select the type of partner youre looking for and well help you
                find people who match and align well with your preferences
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="circlebox2">
        <div class="quarter-circle2"></div>
      </div>
    </>
  );
};

export default Homemidsection;
