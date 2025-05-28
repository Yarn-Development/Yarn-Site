import { LegalLayout } from "@/components/legal-layout"

export default function PrivacyPolicy() {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="May 2025">
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p>
            Yarn Development ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
          <h3 className="text-xl font-medium mb-3">Personal Information</h3>
          <p className="mb-4">We may collect the following personal information:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Name and contact information (email, phone number)</li>
            <li>Company information and job title</li>
            <li>Project requirements and specifications</li>
            <li>Communication preferences</li>
          </ul>

          <h3 className="text-xl font-medium mb-3 mt-6">Technical Information</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>IP address and browser information</li>
            <li>Website usage data and analytics</li>
            <li>Cookies and similar tracking technologies</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
          <p className="mb-4">We use collected information for:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Providing and improving our development services</li>
            <li>Communicating about projects and updates</li>
            <li>Responding to inquiries and support requests</li>
            <li>Analyzing website usage to improve user experience</li>
            <li>Complying with legal obligations</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">4. Data Sharing and Disclosure</h2>
          <p className="mb-4">We do not sell your personal information. We may share information in the following circumstances:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>With trusted service providers who assist in our operations</li>
            <li>When required by law or to protect our rights</li>
            <li>In connection with a business transfer or acquisition</li>
            <li>With your explicit consent</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">5. Data Security</h2>
          <p>
            We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes encryption, secure servers, and regular security assessments.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">6. Your Rights (GDPR Compliance)</h2>
          <p className="mb-4">Under GDPR, you have the right to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Access your personal data</li>
            <li>Rectify inaccurate personal data</li>
            <li>Erase your personal data</li>
            <li>Restrict processing of your personal data</li>
            <li>Data portability</li>
            <li>Object to processing</li>
            <li>Withdraw consent at any time</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">7. Cookies</h2>
          <p>
            Our website uses cookies to enhance user experience and analyze website traffic. You can control cookie preferences through your browser settings. Essential cookies are necessary for website functionality and cannot be disabled.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">8. Third-Party Services</h2>
          <p className="mb-4">We may use third-party services such as:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Google Analytics for website analytics</li>
            <li>Email service providers for communications</li>
            <li>Cloud hosting services for data storage</li>
          </ul>
          <p className="mt-4">These services have their own privacy policies governing the use of your information.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">9. Children's Privacy</h2>
          <p>
            Our services are not intended for children under 13. We do not knowingly collect personal information from children under 13. If we become aware of such collection, we will delete the information immediately.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">10. Contact Information</h2>
          <p className="mb-4">For privacy-related questions or to exercise your rights, contact us:</p>
          <ul className="list-none space-y-2">
            <li><strong>Email:</strong> privacy@yarndev.co.uk</li>
            <li><strong>Address:</strong> Yarn Development, United Kingdom</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">11. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy periodically. We will notify you of any material changes by posting the new policy on our website with an updated "last modified" date.
          </p>
        </section>
      </div>
    </LegalLayout>
  )
}
