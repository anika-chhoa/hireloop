import 'server-only'

import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const PLAN_PRICE_IDS={
    "seeker_pro":"price_1TifKBRg4GdBoCj1hoSdIWYR",
    "seeker_premium":"price_1Tijx6Rg4GdBoCj1NyU2PnZN",
    "recruiter_growth":"price_1TijzBRg4GdBoCj152546b15",
    "recruiter_enterprise":"price_1Tik13Rg4GdBoCj1XPxdTRap" 
}