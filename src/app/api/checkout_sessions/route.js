import { NextResponse } from 'next/server'
import { headers } from 'next/headers'


import { getUserSession } from '@/lib/core/session'
import { PLAN_PRICE_IDS, stripe } from '../../../lib/stripe'


export async function POST(request) {
  try {
    const headersList = await headers()
    const origin = headersList.get('origin')
    const user=await getUserSession();

    const formData=await request.formData();
    const planId=formData.get("plan_id");
    const priceId=PLAN_PRICE_IDS[planId]

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
        customer_email: user.email,
      line_items: [
        {
          // Provide the exact Price ID (for example, price_1234) of the product you want to sell
          price: priceId,
          quantity: 1,
        },
      ],
      metadata:{
        planId:planId,
        userId:user.id,
        userEmail:user.email
      },
      mode: 'subscription',
      success_url: `${origin}/pricing/success?session_id={CHECKOUT_SESSION_ID}`,
    });
    return NextResponse.redirect(session.url, 303)
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    )
  }
}