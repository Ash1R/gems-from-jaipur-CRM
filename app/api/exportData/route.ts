import { NextResponse } from 'next/server';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const keys = require('../../../jemsfrom-jaipur-service-account.json');

const serviceAccountAuth = new JWT({
  email: keys.client_email,
  key: keys.private_key,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const doc = new GoogleSpreadsheet(
  process.env.GOOGLE_SHEET_ID,
  serviceAccountAuth
);

export async function GET() {
  try {
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    await sheet.clear();

    const expenses = await prisma.expense.findMany();
    for (const expense of expenses) {
      await sheet.addRow({
        id: expense.id,
        date: expense.date,
        description: expense.description,
        withdraw: expense.withdraw,
        received: expense.received,
      });
    }

    const metalPurchases = await prisma.metalPurchase.findMany();
    for (const purchase of metalPurchases) {
      await sheet.addRow({
        id: purchase.id,
        date: purchase.date,
        metalType: purchase.metalType,
        rate: purchase.rate,
        grams: purchase.grams,
        amount: purchase.amount,
        vendor: purchase.vendor,
        paid: purchase.paid,
      });
    }

    // Repeat similar code for other models

    return NextResponse.json({ message: 'Data exported successfully' });
  } catch (error) {
    console.error('Error exporting data to Google Sheets:', error);
    return NextResponse.json({ error: 'Data export failed' }, { status: 500 });
  }
}
