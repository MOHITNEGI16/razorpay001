const button = document.getElementById("rzp-button1");
const form = document.getElementById("form");
const paymentCancelBtn = document.getElementById("cancel");
const formDiv = document.getElementById("formDiv");
const buttons = document.querySelectorAll(".button");

buttons.forEach((ele) => {
  ele.addEventListener("click", () => {
    formDiv.style.display = "block";
  });
});

paymentCancelBtn.addEventListener("click", () => {
  formDiv.style.display = "none";
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let userName = document.getElementById("name").value;
  let userDonation = Number(document.getElementById("payment").value);
  let userEmail = document.getElementById("email").value;

  const foundationImageLink =
    "https://i.pinimg.com/564x/d8/16/4a/d8164a7d91f58a8974b0b56ca38dbf1b.jpg";
  if (userName || userDonation || userEmail) {
    handlePayment(userName, userDonation, userEmail, foundationImageLink);
    formDiv.style.display = "none";
  } else {
    alert("Please Fill All The Details ");
  }

  userName = "";
  userDonation = "";
  userEmail = "";
});

function handlePayment(donarName, donarDonation, donarEmail, image) {
  // Preload the audio for success notification
  const successSound = new Audio("thank-you-for-shopping-garvins.mp3");
  successSound.preload = "auto";

  // Configure options for Razorpay
  const options = {
    key: "rzp_test_KwzFxt77N3FJwf", // Razorpay API key
    amount: donarDonation * 100, // Amount in paisa
    currency: "INR",
    name: "Cousin Foundation",
    description: `Payment for World Betterment`,
    image: image,
    handler: function (response) {
      // Show success notification and play the success sound
      toastr["success"](`Payment successful for Donation!`);
      // Play the preloaded success sound
      successSound.play();
    },
    prefill: {
      name: donarName,
      email: donarEmail,
    },
    notes: {
      address: "Customer Address",
    },
    theme: {
      color: "#092ca8", // Replace with your desired color
    },
  };
  // Create a Razorpay instance with the options
  const rzp = new Razorpay(options);
  // Open the Razorpay payment dialog
  rzp.open();
}
