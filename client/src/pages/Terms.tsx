import LegalPage, { H, P, UL } from "./LegalPage";

export default function Terms() {
  return (
    <LegalPage title="Terms of Service" updated="July 14, 2026">
      <P>
        These Terms of Service ("Terms") govern your access to and use of provendy.ai and the Provendy
        software and services (the "Service"), provided by Provendy ("Provendy," "we," "us," or "our"). By
        creating an account or using the Service, you agree to these Terms. If you do not agree, do not use
        the Service.
      </P>

      <H>Eligibility</H>
      <P>
        You must be at least 18 years old and able to form a binding contract to use the Service. If you use
        the Service on behalf of a business, you represent that you are authorized to bind that business to
        these Terms.
      </P>

      <H>Your Account</H>
      <P>
        You are responsible for maintaining the confidentiality of your login credentials and for all
        activity under your account. Please keep your information accurate and notify us promptly of any
        unauthorized use.
      </P>

      <H>Subscriptions, Trials & Billing</H>
      <UL>
        <li>Paid plans are billed on a recurring basis (monthly or as otherwise stated at checkout) until cancelled.</li>
        <li>Free trials, where offered, convert to a paid subscription at the end of the trial period unless you cancel before it ends.</li>
        <li>You can cancel at any time; cancellation takes effect at the end of your current billing period, and you retain access until then.</li>
        <li>Fees are non-refundable except where required by law or expressly stated otherwise.</li>
        <li>We may change our prices with reasonable notice; changes apply to billing periods after the notice.</li>
      </UL>

      <H>Acceptable Use</H>
      <P>You agree not to:</P>
      <UL>
        <li>Use the Service for any unlawful, harmful, or fraudulent purpose;</li>
        <li>Send spam or unsolicited communications, or violate any anti-spam or telemarketing laws when using outreach or calling features;</li>
        <li>Attempt to gain unauthorized access to the Service or interfere with its operation;</li>
        <li>Reverse engineer, resell, or copy the Service except as permitted; or</li>
        <li>Upload content that infringes others' rights or violates applicable law.</li>
      </UL>
      <P>
        You are responsible for ensuring your use of any communications features (including AI calling and
        outreach) complies with all applicable laws, including obtaining any required consents.
      </P>

      <H>Your Content</H>
      <P>
        You retain all rights to the data and content you submit to the Service ("Your Content"). You grant
        us a limited license to host, process, and display Your Content solely to provide and support the
        Service. You are responsible for the accuracy and lawfulness of Your Content.
      </P>

      <H>Our Intellectual Property</H>
      <P>
        The Service, including its software, design, and branding, is owned by Provendy and protected by
        intellectual property laws. We grant you a limited, non-exclusive, non-transferable right to use the
        Service in accordance with these Terms.
      </P>

      <H>Third-Party Services</H>
      <P>
        The Service may integrate with third-party services (such as payment processors, mapping, email, and
        calling providers). Your use of those services is subject to their own terms, and we are not
        responsible for them.
      </P>

      <H>Disclaimers</H>
      <P>
        The Service is provided "as is" and "as available," without warranties of any kind, whether express or
        implied, including fitness for a particular purpose and non-infringement. We do not warrant that the
        Service will be uninterrupted, error-free, or that it will produce any particular business result.
      </P>

      <H>Limitation of Liability</H>
      <P>
        To the maximum extent permitted by law, Provendy will not be liable for any indirect, incidental,
        special, consequential, or punitive damages, or for lost profits or revenues. Our total liability for
        any claim relating to the Service will not exceed the amount you paid us in the twelve (12) months
        before the event giving rise to the claim.
      </P>

      <H>Indemnification</H>
      <P>
        You agree to indemnify and hold Provendy harmless from claims and expenses arising out of your use of
        the Service, Your Content, or your violation of these Terms or applicable law.
      </P>

      <H>Termination</H>
      <P>
        You may stop using the Service at any time. We may suspend or terminate your access if you violate
        these Terms or if necessary to protect the Service or other users. On termination, your right to use
        the Service ends, and we will handle your data as described in our Privacy Policy.
      </P>

      <H>Governing Law</H>
      <P>
        These Terms are governed by the laws of the State of Florida, without regard to its conflict-of-laws
        rules. Any disputes will be resolved in the state or federal courts located in Florida, unless
        otherwise required by applicable law.
      </P>

      <H>Changes to These Terms</H>
      <P>
        We may update these Terms from time to time. When we do, we will revise the "Last updated" date above
        and, for material changes, provide additional notice. Continued use of the Service after changes take
        effect means you accept the updated Terms.
      </P>

      <H>Contact Us</H>
      <P>
        Questions about these Terms? Contact us at{" "}
        <a href="mailto:support@provendy.ai" className="text-[#E31E24] font-medium hover:underline">support@provendy.ai</a>.
      </P>
    </LegalPage>
  );
}
