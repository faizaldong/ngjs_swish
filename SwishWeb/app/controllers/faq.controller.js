angular.module('SwishApp').controller('FAQController', function ($scope){

	// First FAQ
    $scope.FAQabout = [
        {   
            title		: "What is Swish all about?",
            answer		: "Swish is a one-stop ticket sale website that offer exclusive ticket deals to a comprehensive range of tourist attractions in Singapore."
        }
    ];

    // Second FAQ
    $scope.FAQpurchasing = [
        {   
            title		: "Who can or should buy tickets from Swish?",
            answer		: "If you are a tourist who’s looking for a convenient ticket purchasing experience where you can simply browse through all the attraction deals we offer in Singapore at just one site, our website will be able to suit your needs perfectly! All you need to do is simply browse through the attractions available, pick what you need, pay and then print them out."
        },
        {
        	title		: "What are the procedures if I want to purchase an e-ticket(s) from swish?",
        	answer		: "Once you have registered an account on our website, you can start purchasing your e-ticket(s) online. Simply select the attraction(s) which you are interested in and add them into the shopping cart until you are ready to pay. When you are ready to pay, all you need to do it just click on the “Proceed to checkout” button at the bottom of your shopping cart. You will then be prompted to fill in your billing information, verify your order summary and choose your payment type (via Paypal or Alipay). The screen will show you the completed transaction once payment is processed. Once this is done, you can print your e-ticket(s) directly from your transaction/order history or email."
        },
        {
        	title		: "Will I need to create an account to complete my ticket purchase?",
        	answer		: "Yes. In fact, we strongly encourage all our guests to create an account as that is where you will find all your purchase history as well as your e-tickets/vouchers whenever you make a purchase at our website (a copy of your purchase will also be sent to your email account). When you create an account, our system will recognised you as our member. You will be able to gain access and enjoy benefits including but not limited to exclusive deals, information about our latest attraction offerings as well as take part in pre-order deals whenever there is one!"
        },
        {
        	title		: "How safe is it to buy attraction tickets from your website?",
        	answer		: "The Swish website is powered by a SSL Certificate which protects your card details and personal information when the payment is being processed. To ensure maximum security and privacy, we do not store your credit card details except for the last 4 digits of your card number for reference and security purposes. In addition, all e-tickets contains an individual unique barcode which can only be used by one person."
        },
        {
        	title		: "What are the types of payments you accept?",
        	answer		: "We currently accept credit/debit card payments only. Our current payment platforms consist of PayPal and Alipay.com which have been recognised as some of the safest and most secured platforms in the world."
        },
        {
        	title		: "Which credit cards are accepted?",
        	answer		: "We accept MasterCard, VISA and Paypal credit card payments."
        },
        {
        	title		: "How can I buy tickets if I do not own a credit or debit card? Is there anything I could do?",
        	answer		: "In the event that you are unable to do so due to the above reasons, you may like to consider seeking help from your close friends and family to complete the transaction first. Alternatively, you may also email/call us in advance to request for alternative arrangement and advice."
        },
        {
        	title		: "I am unable to purchase online because I do not know how to use the computer. What are the alternative ways I can make a purchase?",
        	answer		: "As we operate mainly via the website, you may like to consider seeking help from your close friends and family to complete the transaction for you first. Alternatively, if you are located in Singapore, you may also email/call us in advance to make arrangements to come to our office."
        },
        {
        	title		: "Are there any extra ticket charges or administration fees if I purchase tickets from your website?",
        	answer		: "There are no extra ticket charges or administration fees when you purchase tickets from us."
        },
        {
        	title		: "How far in advance can I buy online?",
        	answer		: "We do not have any restrictions. You can buy the tickets and proceed to the attractions anytime as long as the attraction is available and you do not exceed the ticket’s expiry."
        },
        {
        	title		: "How will I know that my ticket order was completed successfully?",
        	answer		: "Upon successful payment, an order confirmation will be sent to the registered email with the e-tickets. Alternatively, users can also log in to their account and check the “Order History” area."
        },
        {
        	title		: "How many tickets can I purchase at once?",
        	answer		: "You can purchase unlimited tickets at any one time."
        },
        {
        	title		: "I haven’t received my confirmation/tickets! What can I do?",
        	answer		: "Please allow some time for the email delivery. This may take up to as long as 5 to 30 minutes as there can be a slight delay due to the different speed of servers and your internet speed. This can differs from country to country. You may also like to check your junk mail folder first to see if they have been sent there. To ensure that you can receive our emails in future, please add our email address to your contacts. If you have yet to receive anything at all after a considerable amount of time, please check your Swish account. Please contact us if you are still unable to see any details even after checking your Swish account.  Our office phone number and email can be found at the Contact Us page. It’s important to include as much information about the purchase as possible, especially your confirmation number if possible."
        },
        {
        	title		: "I am disabled/handicapped. Can I still purchase tickets online? Will there be any discounts just like when I buy over counter?",
        	answer		: "All e-tickets are sold at the same rates as they are over the counter."
        }
    ];

    // Third FAQ
    $scope.FAQticketing = [
        {
        	title		: "How can I tell if a ticket is real?",
        	answer		: "All e-tickets issued by Swish have a Swish logo. To make sure that the ticket is real, please look out for the Swish logo on the e-ticket."
        },
        {
        	title		: "What should I do if I can't print my electronic tickets?",
        	answer		: "As barcodes on the e-tickets must be scanned upon entry at attractions, all users will have to print before proceeding to attractions."
        },
        {
        	title		: "I have lost my order confirmation number. What should I do?",
        	answer		: "Please log into your Swish account, go to Purchase History and hit the “resend Vouchers” button. The pdf will be sent to your registered email."
        },
        {
        	title		: "I have lost the PDF attachment for the electronic tickets/the mail containing the PDF attachment. What should I do?",
        	answer		: "Please log into your Swish account, go to Purchase History and hit the “resend Vouchers” button. The pdf will be sent to your registered email."
        }
    ];

    // Fourth FAQ
    $scope.FAQrefunds = [
        {
        	title		: "What is your refund policy?",
        	answer		: "We do not have a refund policy. Once purchased, tickets cannot be refunded."
        },
        {
        	title		: "What happens if there is a pricing error or information error?",
        	answer		: "Please call the hotline or send an email to request for assistance."
        },
        {
        	title		: "What should I do if the event for which I purchased tickets is cancelled?",
        	answer		: "Please call the hotline or send an email for clarifications."
        },
        {
        	title		: "What if I missed the ticket's validity period? Can I get a refund?",
        	answer		: "We want to see you enjoy the attractions you have purchased. Unfortunately, once the tickets are expired, we will not be able to give you a refund or revalidate your ticket."
        },
        {
        	title		: "Can I exchange or return tickets that I have purchased online?",
        	answer		: "There is strictly no exchange nor refund for all tickets purchased online. We suggest that you consider carefully before making the purchase."
        },
        {
        	title		: "I have lost/left my tickets at home. Is there anything that can be done?",
        	answer		: "You will need to re-print your e-tickets by logging in to your Swish account to retrieve the online copy as you will need to have the barcodes on the e-tickets scanned in order to enter the attractions. We suggest you to print an extra copy of your e-ticket and keep it in another area of your luggage just in case you need it."
        },
        {
        	title		: "I am an overseas traveler. I have already bought my attraction tickets from your website but I am unable to make it for the trip/my trip has been postponed or cancelled. What can I do?",
        	answer		: "Unfortunately, we will not be able to do a refund or make any changes once the tickets are purchased."
        }
    ];

    // Fifth FAQ
    $scope.FAQothers = [
        {
        	title		: "Do you have any group discounts or packages, and how can I find out more information?",
        	answer		: "All our attraction packages and tickets are meant for purchase by tourists and the general public. If you are a corporate company or a large group who needs to purchase tickets in bulk quantities, please contact us via email or call us to enquire. Please allow at least 1-3 working days for us to get back to you. We will get back to you at our earliest convenience."
        },
        {
        	title		: "Are there discounts for travel agents?",
        	answer		: "If you are a travel agent, please drop us an email to enquire. We will get in touch with you."
        }
    ];

    
});