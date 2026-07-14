import LegalPage, { H, P, UL } from "./LegalPage";

export default function Privacy() {
  return (
    <LegalPage title="Privacy Policy" updated="July 14, 2026">
      <P>
        This Privacy Policy describes how Provendy ("Provendy," "we," "us," or "our") collects, uses,
        and shares information when you visit provendy.ai, sign up for an account, or use our software and
        related services (together, the "Service"). By using the Service, you agree to the practices
        described here.
      </P>

      <H>Information We Collect</H>
      <P>We collect the following categories of information:</P>
      <UL>
        <li><strong>Account information</strong> you provide when you sign up — such as your name, email address, phone number, business name, and password.</li>
        <li><strong>Business data you enter</strong> into the Service — including your contacts, locations, notes, proposals, contracts, and other records you create or import.</li>
        <li><strong>Payment information</strong> — processed securely by our third-party payment processor. We do not store full card numbers on our servers.</li>
        <li><strong>Usage and device data</strong> — such as pages viewed, features used, IP address, browser type, and general location, collected automatically to operate and improve the Service.</li>
        <li><strong>Cookies and similar technologies</strong> — used to keep you signed in, remember preferences, and measure usage.</li>
      </UL>

      <H>How We Use Information</H>
      <P>We use the information we collect to:</P>
      <UL>
        <li>Provide, maintain, and improve the Service;</li>
        <li>Create and manage your account and process payments;</li>
        <li>Respond to your requests and provide support;</li>
        <li>Send you service-related and, where permitted, marketing communications (you can opt out of marketing at any time);</li>
        <li>Monitor for security, prevent fraud, and enforce our terms; and</li>
        <li>Comply with legal obligations.</li>
      </UL>

      <H>How We Share Information</H>
      <P>
        We do not sell your personal information. We share information only as needed to run the Service:
      </P>
      <UL>
        <li><strong>Service providers</strong> who help us operate (for example, hosting, payment processing, email delivery, and analytics), under agreements that limit their use of the data.</li>
        <li><strong>Legal and safety</strong> reasons — to comply with law, respond to lawful requests, or protect the rights, property, and safety of Provendy, our users, or others.</li>
        <li><strong>Business transfers</strong> — in connection with a merger, acquisition, or sale of assets, subject to this policy.</li>
      </UL>

      <H>Your Data Is Yours</H>
      <P>
        The business data you enter into the Service belongs to you. We access it only to provide and
        support the Service, and you can export or request deletion of your data at any time.
      </P>

      <H>Data Retention</H>
      <P>
        We keep your information for as long as your account is active or as needed to provide the Service.
        After you close your account, we delete or de-identify your data within a reasonable period, except
        where we must retain it to meet legal, accounting, or security obligations.
      </P>

      <H>Security</H>
      <P>
        We use industry-standard measures to protect your information, including encryption in transit and at
        rest. No method of transmission or storage is completely secure, so we cannot guarantee absolute
        security, but we work continually to safeguard your data.
      </P>

      <H>Your Rights</H>
      <P>
        Depending on where you live, you may have the right to access, correct, delete, or port your personal
        information, or to object to or restrict certain processing. To exercise these rights, contact us
        using the details below. We will respond in accordance with applicable law.
      </P>

      <H>Cookies</H>
      <P>
        You can control cookies through your browser settings. Disabling some cookies may affect how the
        Service works — for example, keeping you signed in.
      </P>

      <H>Children's Privacy</H>
      <P>
        The Service is intended for businesses and is not directed to individuals under 18. We do not
        knowingly collect personal information from children.
      </P>

      <H>Changes to This Policy</H>
      <P>
        We may update this Privacy Policy from time to time. When we do, we will revise the "Last updated"
        date above and, for material changes, provide additional notice.
      </P>

      <H>Contact Us</H>
      <P>
        If you have questions about this Privacy Policy or your information, contact us at{" "}
        <a href="mailto:privacy@provendy.ai" className="text-[#E31E24] font-medium hover:underline">privacy@provendy.ai</a>.
      </P>
    </LegalPage>
  );
}
