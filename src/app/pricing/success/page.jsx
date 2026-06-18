import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Card, Button } from "@heroui/react"
import { CheckCircle2, Mail, ArrowRight, ShieldCheck } from "lucide-react"
import { stripe } from '@/lib/stripe'
import { createSubscription } from '@/lib/actions/subscription'


export default async function Success({ searchParams }) {
  const { session_id } = await searchParams

  if (!session_id) {
    throw new Error('Please provide a valid session_id (`cs_test_...`)')
  }

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  })

 const { status, metadata } = session
  const customerEmail = session.customer_details?.email

  if (status === 'open') {
    return redirect('/')
  }
  if(status==="complete"){
    const subsInfo={
        planId:metadata.planId,
        userEmail:metadata.userEmail
    }
    const result=await createSubscription(subsInfo);
    console.log(result)
  }

  return (
    <div className="relative min-h-[80vh] flex items-center justify-center bg-[#0A0A0C] px-4 py-12 text-white overflow-hidden">
      {/* Decorative Glows syncing with your project style */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-violet-600/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 h-64 w-64 rounded-full bg-sky-600/5 blur-3xl pointer-events-none" />

      <Card className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/5 bg-[#0A0A0C]/80 backdrop-blur-md p-8 text-center shadow-[0_12px_40px_rgba(124,58,237,0.08)]">
        
        {/* Success Icon Badge */}
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
          <CheckCircle2 className="h-10 w-10" />
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-bold tracking-tight text-white mb-2">
          Subscription Activated!
        </h1>
        <p className="text-sm text-gray-400 mb-6">
          Thank you for upgrading. Your account features have been successfully updated.
        </p>

        {/* Email Notification Card */}
        <div className="flex items-start gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-4 text-left mb-8">
          <Mail className="h-5 w-5 text-violet-400 shrink-0 mt-0.5" />
          <div className="text-xs text-gray-400 leading-relaxed">
            A confirmation email and receipt have been sent to{' '}
            <span className="text-white font-medium break-all">{customerEmail}</span>.
          </div>
        </div>

        {/* Footer Support Info */}
        <div className="text-xs text-gray-500 flex items-center justify-center gap-1.5 mb-8">
          <ShieldCheck className="h-4 w-4 text-sky-400" />
          <span>
            Need help? Contact{' '}
            <a href="mailto:orders@example.com" className="text-violet-400 hover:underline transition">
              support
            </a>
          </span>
        </div>

        {/* CTA Actions */}
        <div className="flex flex-col gap-3">
          <Link href="/dashboard">
            <Button className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-sm font-semibold h-11 rounded-xl hover:from-violet-500 hover:to-indigo-500 transition-all text-white flex items-center justify-center gap-2 shadow-lg shadow-violet-600/20">
              Go to Dashboard
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

      </Card>
    </div>
  )
}