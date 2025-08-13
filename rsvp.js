const fetch = require('node-fetch'); // per Netlify, già presente

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: 'Method Not Allowed'
    };
  }

  // Recupera i dati dal body
  const params = new URLSearchParams(event.body);

  // Inoltra al Google Apps Script
  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbz_La9YyDhC6CCMe-VNuCplG16VykHR2TfWIYNT2m4RZsQKHfKqu-qExuNzZjbXMVkz6g/exec', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params
    });

    const text = await response.text();
    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: text
    };
  } catch (e) {
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: 'Errore proxy'
    };
  }
};
