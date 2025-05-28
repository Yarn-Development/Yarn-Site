import { LegalLayout } from "@/components/legal-layout"

export default function TermsOfService() {
  return (
    <LegalLayout title="Terms of Service" lastUpdated="May 2025">
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
          <p>
            By accessing and using Yarn Development's services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, you should not use our services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">2. Description of Services</h2>
          <p className="mb-4">Yarn Development provides:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Custom software development services</li>
            <li>AI integration and implementation</li>
            <li>Educational technology solutions</li>
            <li>Web and mobile application development</li>
            <li>Technical consulting services</li>
            <li>MVP development and prototyping</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">3. Service Agreements</h2>
          <p>
            Specific terms for each project will be outlined in individual service agreements or statements of work. These documents will detail project scope, timelines, deliverables, and payment terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">4. Intellectual Property Rights</h2>
          <h3 className="text-xl font-medium mb-3">Client-Owned IP</h3>
          <p className="mb-4">
            Upon full payment, clients retain ownership of custom code and solutions developed specifically for their project, excluding pre-existing frameworks, libraries, and third-party components.
          </p>
          
          <h3 className="text-xl font-medium mb-3">Yarn Development IP</h3>
          <p>
            We retain rights to our proprietary methodologies, frameworks, and any general knowledge or techniques developed during the project that can be applied to other clients.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">5. Payment Terms</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Payment schedules will be defined in individual project agreements</li>
            <li>Late payments may incur additional charges</li>
            <li>Refunds are subject to the terms specified in individual contracts</li>
            <li>All prices are exclusive of VAT unless stated otherwise</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">6. Client Responsibilities</h2>
          <p className="mb-4">Clients agree to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Provide accurate and complete project requirements</li>
            <li>Respond to requests for information in a timely manner</li>
            <li>Provide necessary access to systems and data as required</li>
            <li>Review and approve deliverables within agreed timeframes</li>
            <li>Make payments according to the agreed schedule</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">7. Confidentiality</h2>
          <p>
            We maintain strict confidentiality regarding all client information and project details. We will not disclose confidential information to third parties without explicit written consent, except as required by law.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">8. Limitation of Liability</h2>
          <p className="mb-4">
            To the maximum extent permitted by law, Yarn Development's liability is limited to the amount paid for the specific service that gave rise to the claim. We are not liable for:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Indirect, incidental, or consequential damages</li>
            <li>Loss of profits, data, or business opportunities</li>
            <li>Third-party integrations or services beyond our control</li>
            <li>Issues arising from client-provided information or systems</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">9. Warranties and Disclaimers</h2>
          <p className="mb-4">
            We provide services "as is" and disclaim all warranties except those that cannot be excluded by law. We warrant that:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Services will be performed with reasonable care and skill</li>
            <li>We have the right to provide the agreed services</li>
            <li>We will comply with applicable laws and regulations</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">10. Termination</h2>
          <p>
            Either party may terminate a service agreement with written notice as specified in the individual contract. Upon termination, payment is due for all work completed to the date of termination.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">11. Force Majeure</h2>
          <p>
            Neither party shall be liable for any failure or delay in performance due to circumstances beyond their reasonable control, including but not limited to acts of God, natural disasters, government actions, or technical failures.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">12. Governing Law</h2>
          <p>
            These terms are governed by the laws of England and Wales. Any disputes will be subject to the exclusive jurisdiction of the English courts.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">13. Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. Continued use of our services constitutes acceptance of modified terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">14. Contact Information</h2>
          <p className="mb-4">For questions about these terms, contact us:</p>
          <ul className="list-none space-y-2">
            <li><strong>Email:</strong> legal@yarndev.co.uk</li>
            <li><strong>General:</strong> hello@yarndev.co.uk</li>
            <li><strong>Address:</strong> Yarn Development, United Kingdom</li>
          </ul>
        </section>
      </div>
    </LegalLayout>
  )
}
