import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from '@/components/layout/Layout'
import LandingPage from '@/pages/LandingPage'
import ThankYouPage from '@/pages/ThankYouPage'
import FAQPage from '@/pages/FAQPage'
import PrivacyPolicyPage from '@/pages/PrivacyPolicyPage'
import ReferralDisclosurePage from '@/pages/ReferralDisclosurePage'
import MultiStepQuiz from '@/components/quiz/MultiStepQuiz'
import DebugPage from '@/pages/DebugPage'
import BookDiscoveryPage from '@/pages/BookDiscoveryPage'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/quiz" element={<MultiStepQuiz />} />
          <Route path="/thank-you" element={<ThankYouPage />} />
          <Route path="/book-discovery" element={<BookDiscoveryPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/referral-disclosure" element={<ReferralDisclosurePage />} />
          <Route path="/debug" element={<DebugPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
