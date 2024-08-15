import { NextResponse } from "next/server";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const keys = require("../../../jemsfrom-jaipur-service-account.json");

const serviceAccountAuth = new JWT({
  email: keys.client_email,
  key: keys.private_key,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const doc = new GoogleSpreadsheet(
  process.env.GOOGLE_SHEET_ID,
  serviceAccountAuth
);

async function clearOrCreateSheet(title) {
  const sheet = doc.sheetsByTitle[title] || (await doc.addSheet({ title }));
  await sheet.clear();
  return sheet;
}

export async function GET() {
  try {
    await doc.loadInfo();

    // Export Expense data to a separate sheet
    const expenseSheet = await clearOrCreateSheet("Expenses");
    const expenses = await prisma.expense.findMany();
    for (const expense of expenses) {
      await expenseSheet.addRow({
        id: expense.id,
        date: expense.date,
        description: expense.description,
        withdraw: expense.withdraw,
        received: expense.received,
      });
    }

    // Export MetalPurchase data to a separate sheet
    const metalPurchaseSheet = await clearOrCreateSheet("Metal Purchases");
    const metalPurchases = await prisma.metalPurchase.findMany();
    for (const purchase of metalPurchases) {
      await metalPurchaseSheet.addRow({
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

    // Export Purchase data to a separate sheet
    const purchaseSheet = await clearOrCreateSheet("Purchases");
    const purchases = await prisma.purchase.findMany();
    for (const purchase of purchases) {
      await purchaseSheet.addRow({
        id: purchase.id,
        vendor: purchase.vendor,
        invoiceId: purchase.invoiceId,
        date: purchase.date,
        grams: purchase.grams,
        weight: purchase.weight,
        pricePerCt: purchase.pricePerCt,
        amount: purchase.amount,
      });
    }

    // Export PurchaseWithoutInvoices data to a separate sheet
    const purchaseWithoutInvoicesSheet = await clearOrCreateSheet(
      "Purchases Without Invoices"
    );
    const purchasesWithoutInvoices =
      await prisma.purchaseWithoutInvoices.findMany();
    for (const purchase of purchasesWithoutInvoices) {
      await purchaseWithoutInvoicesSheet.addRow({
        id: purchase.id,
        date: purchase.date,
        vendor: purchase.vendor,
        grams: purchase.grams,
        weight: purchase.weight,
        pricePerCt: purchase.pricePerCt,
        amount: purchase.amount,
      });
    }

    // Repeat similar code for Job, Casting, Edit, Diamond models with their respective sheets
    // Example:
    const jobSheet = await clearOrCreateSheet("Jobs");
    const jobs = await prisma.job.findMany({
      include: {
        castings: true,
        diamonds: true,
        edits: true,
      },
    });

    for (const job of jobs) {
      await jobSheet.addRow({
        id: job.id,
        name: job.name,
      });

      // Casting data
      const castingSheet = await clearOrCreateSheet(`Castings - ${job.name}`);
      for (const casting of job.castings) {
        await castingSheet.addRow({
          id: casting.id,
          date: casting.date,
          caster: casting.caster,
          goldSilver: casting.goldSilver,
          castingWeight: casting.castingWeight,
          pureWeight: casting.pureWeight,
          jobId: casting.jobId,
        });
      }

      // Edit data
      const editSheet = await clearOrCreateSheet(`Edits - ${job.name}`);
      for (const edit of job.edits) {
        await editSheet.addRow({
          id: edit.id,
          stepType: edit.stepType,
          weightBefore: edit.weightBefore,
          weightAfter: edit.weightAfter,
          polishGuy: edit.polishGuy,
          jobId: edit.jobId,
        });
      }

      // Diamond data
      const diamondSheet = await clearOrCreateSheet(`Diamonds - ${job.name}`);
      for (const diamond of job.diamonds) {
        await diamondSheet.addRow({
          id: diamond.id,
          setterName: diamond.setterName,
          beforeWeight: diamond.beforeWeight,
          afterWeight: diamond.afterWeight,
          diamondWeight: diamond.diamondWeight,
          diamondQuality: diamond.diamondQuality,
          settingDustWeight: diamond.settingDustWeight,
          totalLoss: diamond.totalLoss,
          totalNumberDiamondSet: diamond.totalNumberDiamondSet,
          totalCt: diamond.totalCt,
          returnCt: diamond.returnCt,
          brokenDiamondNumber: diamond.brokenDiamondNumber,
          brokenDiamondCt: diamond.brokenDiamondCt,
          diamondCost: diamond.diamondCost,
          jobId: diamond.jobId,
        });
      }
    }

    return NextResponse.json({ message: "Data exported successfully" });
  } catch (error) {
    console.error("Error exporting data to Google Sheets:", error);
    return NextResponse.json({ error: "Data export failed" }, { status: 500 });
  }
}
