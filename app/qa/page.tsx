'use client'

export default function QAPage() {
  const faqs = [
    {
      question: 'How do I become a member?',
      answer: 'You can register online or visit our front desk to sign up for a membership.'
    },
    {
      question: 'What classes are available?',
      answer: 'We offer a variety of classes including yoga, pilates, HIIT, and strength training. Check the Classes page for the full schedule.'
    },
    {
      question: 'How do I book a class?',
      answer: 'Log in to your account, go to the Classes section, and select the class you want to book.'
    },
    {
      question: 'Can I freeze or cancel my membership?',
      answer: 'Yes, please contact our support team or visit the front desk for assistance with freezing or cancelling your membership.'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">Q & A</h1>
        <div className="space-y-6">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-lg">
              <h2 className="text-xl font-semibold text-white mb-2">{faq.question}</h2>
              <p className="text-gray-300">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 