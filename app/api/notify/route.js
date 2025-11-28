import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Notify from "@/app/model/Notify";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const { name, phone, productId, productName } = body;

    if (!name || !phone || !productId) {
      return NextResponse.json(
        { success: false, message: "Missing fields" },
        { status: 400 }
      );
    }

    // Save notify request
    const saved = await Notify.create({
      name,
      phone,
      productId,
      productName,
    });

    // WHATSAPP SEND TO ADMIN
    const ADMIN_NUMBER = process.env.CALLMEBOT_ADMIN; // Your number
    const API_KEY = process.env.CALLMEBOT_API_KEY;    // CallMeBot key

    const msg = `
🔔 *New Notify Request*
Product: ${productName}
Name: ${name}
Phone: ${phone}
    `;

    const url = `https://api.callmebot.com/whatsapp.php?phone=${ADMIN_NUMBER}&text=${encodeURIComponent(
      msg
    )}&apikey=${API_KEY}`;

    await fetch(url);

    return NextResponse.json({
      success: true,
      message: "Notification saved & WhatsApp sent!",
      data: saved,
    });
  } catch (error) {
    console.log("NOTIFY ERROR", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
