// import React, {useEffect} from "react";

// export const Payment = () => {
//     const API_publicKey = "FLWPUBK_TEST-548ec83b6909454bc7bbb3a930c51d8a-X"
    
//     useEffect(() => {
//         const script = document.createElement("script");
//         script.src = "https://api.ravepay.co/flwv3-pug/getpaidx/api/flwpbf-inline.js";
//         script.async = true;
//         script.onload = () => console.log("Flutterwave script loaded");
//         document.body.appendChild(script);

//         return () => {
//             document.body.removeChild(script);
//         };
//     }, []);


//     function payWithRave() {
//         if (!window.FlutterwaveCheckout) {
//             console.error("Flutterwave script not loaded");
//             return;
//         }

//         window.FlutterwaveCheckout({
//             public_key: API_publicKey,
//             tx_ref: "rave-123456",
//             amount: 2000,
//             currency: "NGN",
//             payment_options: "card, mobilemoney, ussd",
//             customer: {
//                 email: "user@example.com",
//                 phone_number: "234099940409",
//                 name: "John Doe",
//             },
//             callback: function (response) {
//                 console.log("Payment response:", response);
//                 if (response.status === "successful") {
//                     alert("Payment Successful!");
//                 } else {
//                     alert("Payment Failed!");
//                 }
//             },
//             onclose: function () {
//                 console.log("Payment modal closed");
//             },
//         });
//     }

//     return (
//         <div style={{marginTop: "50px"}}>
//             <h1>Hello there</h1>
//             <button style = {{background: "red"}} type="button" onClick={payWithRave}>
//                 Pay Now
//             </button>
//         </div>
//     );
// };

