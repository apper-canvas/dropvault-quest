import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from '../components/ApperIcon'

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState('monthly')
  const [isLoading, setIsLoading] = useState({})

  const handlePlanSelection = async (planName) => {
    setIsLoading(prev => ({ ...prev, [planName]: true }))
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    if (planName === 'Free') {
      toast.success('Welcome to DropMe! Your free account is ready to use.')
    } else {
      toast.success(`${planName} plan selected! Redirecting to checkout...`)
    }
    
    setIsLoading(prev => ({ ...prev, [planName]: false }))
  }

  const plans = [
    {
      name: 'Free',
      price: { monthly: 0, yearly: 0 },
      description: 'Perfect for personal use',
      features: [
        '5GB Storage',
        'Up to 10 files per upload',
        'Basic file sharing',
        'Mobile app access',
        'Email support'
      ],
      highlighted: false,
      cta: 'Get Started Free'
    },
    {
      name: 'Pro',
      price: { monthly: 12, yearly: 120 },
      description: 'Best for professionals',
      features: [
        '1TB Storage',
        'Unlimited file uploads',
        'Advanced sharing controls',
        'Priority support',
        'Version history',
        'Team collaboration',
        'API access',
        'Custom branding'
      ],
      highlighted: true,
      cta: 'Start Pro Trial'
    },
    {
      name: 'Enterprise',
      price: { monthly: 49, yearly: 490 },
      description: 'For teams and organizations',
      features: [
        'Unlimited Storage',
        'Advanced security features',
        'SSO integration',
        'Dedicated support',
        'Custom integrations',
        'Advanced analytics',
        'Compliance tools',
        'White-label solution'
      ],
      highlighted: false,
      cta: 'Contact Sales'
    }
  ]

  const faqs = [
    {
      question: 'Can I change my plan anytime?',
      answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately for upgrades, or at the next billing cycle for downgrades.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, PayPal, and wire transfers for Enterprise customers. All payments are processed securely.'
    },
    {
      question: 'Is there a free trial for paid plans?',
      answer: 'Yes! Pro and Enterprise plans come with a 14-day free trial. No credit card required to start.'
    },
    {
      question: 'What happens to my data if I cancel?',
      answer: 'You can export all your data before cancellation. We keep your data for 30 days after cancellation in case you want to reactivate.'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/20 dark:from-surface-900 dark:via-indigo-950/20 dark:to-purple-950/10">
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 px-4 sm:px-6 lg:px-8 py-4 sm:py-6 border-b border-surface-200/50 dark:border-surface-700/50 bg-white/80 dark:bg-surface-900/80 backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-soft group-hover:scale-105 transition-transform">
              <ApperIcon name="CloudUpload" className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                DropMe
              </h1>
              <p className="text-xs text-surface-600 dark:text-surface-400">Pricing Plans</p>
            </div>
          </Link>
          
          <Link 
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300 rounded-xl hover:bg-surface-200 dark:hover:bg-surface-700 transition-all duration-200 border border-surface-200 dark:border-surface-700"
          >
            <ApperIcon name="ArrowLeft" className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
        </div>
      </motion.header>

      {/* Content */}
      <motion.main 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16"
      >
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-surface-900 dark:text-white mb-6">
              Simple, Transparent
              <span className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Pricing
              </span>
            </h1>
            <p className="text-xl text-surface-600 dark:text-surface-400 leading-relaxed max-w-3xl mx-auto mb-8">
              Choose the perfect plan for your needs. All plans include our core features with no hidden fees.
            </p>
            
            {/* Billing Toggle */}
            <div className="inline-flex items-center bg-white dark:bg-surface-800 rounded-2xl p-2 border border-surface-200 dark:border-surface-700 shadow-card">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  billingCycle === 'monthly'
                    ? 'bg-primary text-white shadow-soft'
                    : 'text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-white'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 relative ${
                  billingCycle === 'yearly'
                    ? 'bg-primary text-white shadow-soft'
                    : 'text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-white'
                }`}
              >
                Yearly
                <span className="absolute -top-2 -right-2 bg-secondary text-white text-xs px-2 py-1 rounded-full">
                  Save 17%
                </span>
              </button>
            </div>
          </motion.div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className={`relative bg-white/90 dark:bg-surface-800/90 backdrop-blur-sm rounded-3xl p-8 shadow-card border transition-all duration-300 hover:shadow-soft ${
                  plan.highlighted
                    ? 'border-primary/50 shadow-primary/10 scale-105'
                    : 'border-surface-100/50 dark:border-surface-700/50 hover:border-primary/30'
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-2 rounded-full text-sm font-medium">
                      Most Popular
                    </div>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-surface-900 dark:text-white mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-surface-600 dark:text-surface-400 mb-4">
                    {plan.description}
                  </p>
                  
                  <div className="mb-6">
                    <span className="text-5xl font-black text-surface-900 dark:text-white">
                      ${plan.price[billingCycle]}
                    </span>
                    <span className="text-surface-600 dark:text-surface-400 ml-2">
                      /{billingCycle === 'monthly' ? 'month' : 'year'}
                    </span>
                  </div>
                </div>
                
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <ApperIcon name="Check" className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span className="text-surface-700 dark:text-surface-300">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                
                <motion.button
                  onClick={() => handlePlanSelection(plan.name)}
                  disabled={isLoading[plan.name]}
                  whileHover={{ scale: isLoading[plan.name] ? 1 : 1.02 }}
                  whileTap={{ scale: isLoading[plan.name] ? 1 : 0.98 }}
                  className={`w-full py-4 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                    plan.highlighted
                      ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-soft hover:shadow-lg'
                      : 'bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-600'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {isLoading[plan.name] ? (
                    <>
                      <ApperIcon name="Loader2" className="w-5 h-5 animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    plan.cta
                  )}
                </motion.button>
              </motion.div>
            ))}
          </div>

          {/* Features Comparison */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-surface-900 dark:text-white mb-4">
                Compare Features
              </h2>
              <p className="text-surface-600 dark:text-surface-400">
                Detailed comparison of what's included in each plan
              </p>
            </div>
            
            <div className="bg-white/90 dark:bg-surface-800/90 backdrop-blur-sm rounded-3xl overflow-hidden border border-surface-100/50 dark:border-surface-700/50">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-surface-50 dark:bg-surface-700/50">
                    <tr>
                      <th className="text-left p-6 font-semibold text-surface-900 dark:text-white">
                        Features
                      </th>
                      <th className="text-center p-6 font-semibold text-surface-900 dark:text-white">
                        Free
                      </th>
                      <th className="text-center p-6 font-semibold text-primary">
                        Pro
                      </th>
                      <th className="text-center p-6 font-semibold text-surface-900 dark:text-white">
                        Enterprise
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-100 dark:divide-surface-700">
                    <tr>
                      <td className="p-6 text-surface-700 dark:text-surface-300">Storage Space</td>
                      <td className="p-6 text-center text-surface-700 dark:text-surface-300">5GB</td>
                      <td className="p-6 text-center text-surface-700 dark:text-surface-300">1TB</td>
                      <td className="p-6 text-center text-surface-700 dark:text-surface-300">Unlimited</td>
                    </tr>
                    <tr>
                      <td className="p-6 text-surface-700 dark:text-surface-300">File Upload Limit</td>
                      <td className="p-6 text-center text-surface-700 dark:text-surface-300">10 files</td>
                      <td className="p-6 text-center text-surface-700 dark:text-surface-300">Unlimited</td>
                      <td className="p-6 text-center text-surface-700 dark:text-surface-300">Unlimited</td>
                    </tr>
                    <tr>
                      <td className="p-6 text-surface-700 dark:text-surface-300">API Access</td>
                      <td className="p-6 text-center">
                        <ApperIcon name="X" className="w-5 h-5 text-surface-400 mx-auto" />
                      </td>
                      <td className="p-6 text-center">
                        <ApperIcon name="Check" className="w-5 h-5 text-emerald-500 mx-auto" />
                      </td>
                      <td className="p-6 text-center">
                        <ApperIcon name="Check" className="w-5 h-5 text-emerald-500 mx-auto" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </motion.section>

          {/* FAQ */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-surface-900 dark:text-white mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-surface-600 dark:text-surface-400">
                Everything you need to know about our pricing
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 + index * 0.1 }}
                  className="bg-white/90 dark:bg-surface-800/90 backdrop-blur-sm rounded-2xl p-6 border border-surface-100/50 dark:border-surface-700/50"
                >
                  <h3 className="font-semibold text-surface-900 dark:text-white mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-surface-600 dark:text-surface-400 leading-relaxed">
                    {faq.answer}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </div>
      </motion.main>
    </div>
  )
}

export default Pricing