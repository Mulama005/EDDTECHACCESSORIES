import emailjs from '@emailjs/browser';

const EMAILJS_SERVICE_ID = 'service_xk3t14d';
const EMAILJS_PUBLIC_KEY = '4QYoabFrNT8IggS99';

// Owner Email Template ID 
const OWNER_TEMPLATE_ID = 'template_yscnyv1';

// Customer Email Template ID 
const CUSTOMER_TEMPLATE_ID = 'template_744isog';

export async function sendOwnerEmail({ name, phone, email, subject, message }) {
  return emailjs.send(
    EMAILJS_SERVICE_ID,
    OWNER_TEMPLATE_ID,
    {
      customer_name: name,
      customer_phone: phone,
      customer_email: email,
      subject,
      message,
      sent_at: new Date().toLocaleString('en-KE', { timeZone: 'Africa/Nairobi' }),
    },
    EMAILJS_PUBLIC_KEY
  );
}

export async function sendCustomerEmail({ name, phone, email, subject, message }) {
  return emailjs.send(
    EMAILJS_SERVICE_ID,
    CUSTOMER_TEMPLATE_ID,
    {
      customer_name: name,
      customer_email: email,
      subject,
      message,
      sent_at: new Date().toLocaleString('en-KE', { timeZone: 'Africa/Nairobi' }),
    },
    EMAILJS_PUBLIC_KEY
  );
}