import { Suspense } from "react";
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import { DefaultProviders } from "./components/providers/default.tsx";
import LocaleWrapper from "./components/providers/locale-wrapper.tsx";
import { SAVED_OR_DEFAULT_LOCALE, setLocaleInPath } from "./i18n.ts";
import "./i18n.ts";
import AuthCallback from "./pages/auth/Callback.tsx";
import Index from "./pages/Index.tsx";
import ComingSoon from "./pages/ComingSoon.tsx";
import JobsPage from "./pages/jobs/page.tsx";
import JobDetailPage from "./pages/jobs/detail/page.tsx";
import ProfilePage from "./pages/profile/page.tsx";
import EmployerPage from "./pages/employer/page.tsx";
import OnboardingPage from "./pages/onboarding/page.tsx";
import NotFound from "./pages/NotFound.tsx";
import NotificationsPage from "./pages/notifications/page.tsx";
import AdminPage from "./pages/admin/page.tsx";
import ChatPage from "./pages/chat/page.tsx";
import TermsPage from "./pages/legal/terms.tsx";
import PrivacyPage from "./pages/legal/privacy.tsx";
import AntiFraudPage from "./pages/legal/anti-fraud.tsx";
import ReferPage from "./pages/refer/page.tsx";
import { useServiceWorker } from "@/hooks/use-service-worker.ts";
import PwaInstallBanner from "@/components/pwa-install-banner.tsx";

import SuperAdminPage from "./pages/superadmin/page.tsx";
import ResumePage from "./pages/resume/page.tsx";
import AdsPage from "./pages/ads/page.tsx";
import ServicesPage from "./pages/services/page.tsx";

function AppContent() {
  useServiceWorker();
  return (
    <>
      <Suspense fallback={<div></div>}>
        <Routes>
          {/* Root: redirect to saved/default locale */}
          <Route
            path="/"
            element={<Navigate to={setLocaleInPath(SAVED_OR_DEFAULT_LOCALE, "/")} replace />}
          />

          {/* Non-localized routes */}
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/superadmin" element={<SuperAdminPage />} />

          {/* All localized routes under /:lng */}
          <Route
            path="/:lng"
            element={
              <LocaleWrapper>
                <Outlet />
              </LocaleWrapper>
            }
          >
            <Route index element={<Index />} />
            <Route path="jobs" element={<JobsPage />} />
            <Route path="jobs/:jobId" element={<JobDetailPage />} />
            <Route path="post-job" element={<EmployerPage />} />
            <Route path="employer" element={<EmployerPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="onboarding" element={<OnboardingPage />} />
            <Route path="chat" element={<ChatPage />} />
            <Route path="admin" element={<AdminPage />} />
            <Route path="notifications" element={<NotificationsPage />} />
            <Route path="terms" element={<TermsPage />} />
            <Route path="privacy" element={<PrivacyPage />} />
            <Route path="anti-fraud" element={<AntiFraudPage />} />
            <Route path="resume" element={<ResumePage />} />
            <Route path="refer" element={<ReferPage />} />
            <Route path="ads" element={<AdsPage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="register" element={<ComingSoon title="Register - Jald Aayega!" />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
      <PwaInstallBanner />
    </>
  );
}

export default function App() {
  return (
    <DefaultProviders>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </DefaultProviders>
  );
}
