'use server';

import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
const keys = require('../jemsfrom-jaipur-service-account.json');

const serviceAccountAuth = new JWT({
  email: keys.client_email,
  key: keys.private_key,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const doc = new GoogleSpreadsheet(
  process.env.GOOGLE_SHEET_ID,
  serviceAccountAuth
);

const useExpenseSpreadsheet = async ({
  date,
  description,
  withdraw,
  received,
}) => {
  await doc.loadInfo();
  const sheet = doc.sheetsByIndex[2]; // Updated to use the sheet at index 1
  await sheet.addRow({
    date,
    description,
    withdraw,
    received,
  });
};

export default useExpenseSpreadsheet;
