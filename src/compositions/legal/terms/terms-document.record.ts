/* ==========================================================
   OUTFLO — TERMS DOCUMENT RECORD
   File: src/compositions/legal/terms/terms-document.record.ts
   Scope: Own the current Terms of Use document content and its canonical Outflō update Instant
   Last Updated:
   - Outflō Time: 847455447520560058175967459431
   - reference: 1958-01-01 00:00:00 TAI
   ========================================================== */

export type TermsSectionRecord = {
    number: string;
    title: string;
    paragraphs: readonly string[];
};

export type TermsDocumentRecord = {
    title: string;
    version: string;
    updatedInstant: string;
    temporalUnit: "Outflōseconds";
    temporalReference: string;
    introduction: readonly string[];
    sections: readonly TermsSectionRecord[];
};

export const TERMS_DOCUMENT: TermsDocumentRecord = {
    title: "Terms of Use",

    version: "1",

    updatedInstant: "847455447520560058175967459431",

    temporalUnit: "Outflōseconds",

    temporalReference: "1958-01-01 00:00:00 TAI",

    introduction: [
        "These Terms of Use govern your access to and use of Outflō. By accessing or using Outflō, you agree to these Terms.",
        "Please read them carefully. If you do not agree to these Terms, do not use Outflō.",
    ],

    sections: [
        {
            number: "01",
            title: "Who May Use Outflō",
            paragraphs: [
                "You may use Outflō only if you are legally able to enter into a binding agreement and your use of the service is permitted by applicable law.",
                "Outflō is not intended for use by anyone under 18 years of age.",
            ],
        },
        {
            number: "02",
            title: "What Outflō Is",
            paragraphs: [
                "Outflō is software for recording, organizing, resolving, computing, and presenting information within a Guide-controlled system.",
                "The service may include temporal information, information you intentionally provide, derived information, and additional capabilities introduced over time. Outflō will continue to evolve, and features may change as the system develops.",
            ],
        },
        {
            number: "03",
            title: "Your Account",
            paragraphs: [
                "Some features require an Outflō account. You are responsible for providing accurate account information and for maintaining the security of your account and credentials.",
                "You are responsible for activity that occurs through your account unless applicable law provides otherwise. If you believe your account has been compromised, contact us promptly.",
            ],
        },
        {
            number: "04",
            title: "Your Information",
            paragraphs: [
                "You retain any rights you already hold in information you provide to Outflō.",
                "You grant Outflō a limited, non-exclusive right to host, process, reproduce, transform, and display that information only as reasonably necessary to operate, secure, maintain, and provide the service and the features you request.",
                "This permission does not transfer ownership of your information to Outflō.",
            ],
        },
        {
            number: "05",
            title: "Guide Control",
            paragraphs: [
                "Outflō is designed around the Guide and the information the Guide permits the system to use.",
                "Where Outflō provides a choice about whether a category of information may be recorded, processed, connected, or used for a particular capability, the Guide's selection governs that operation subject to applicable law and the technical requirements necessary to provide the selected feature.",
                "Permission involving one category of information does not automatically grant permission involving another category.",
            ],
        },
        {
            number: "06",
            title: "Acceptable Use",
            paragraphs: [
                "You may not use Outflō unlawfully, fraudulently, or in a way that harms other people, the service, or the systems that support it.",
                "You may not attempt to gain unauthorized access to accounts, systems, networks, data, or functionality; interfere with the operation or security of Outflō; introduce malicious code; circumvent access or security controls; or use the service to violate the rights of another person.",
            ],
        },
        {
            number: "07",
            title: "Outflō Intellectual Property",
            paragraphs: [
                "Outflō and its software, visual design, interfaces, marks, documentation, and other original materials are owned by Outflō or its licensors and are protected by applicable intellectual-property laws.",
                "These Terms give you permission to use the service. They do not transfer ownership of Outflō or its intellectual property to you.",
            ],
        },
        {
            number: "08",
            title: "Computed and Resolved Information",
            paragraphs: [
                "Outflō may compute, resolve, transform, organize, or derive information from canonical or user-provided inputs.",
                "Although we design these operations to be reliable, computed or resolved information may contain errors, depend on incomplete inputs, or change as underlying systems and methods improve.",
                "Outflō is not a substitute for professional legal, medical, financial, tax, safety, or other specialized advice.",
            ],
        },
        {
            number: "09",
            title: "Third-Party Services",
            paragraphs: [
                "Outflō may rely on or connect with third-party infrastructure, identity systems, hosting providers, data sources, integrations, or other services.",
                "Third-party services are governed by their own terms, policies, availability, and technical limitations. Outflō is not responsible for third-party services that it does not control.",
            ],
        },
        {
            number: "10",
            title: "Availability and Data Reliability",
            paragraphs: [
                "We work to keep Outflō available and reliable, but the service may occasionally be unavailable, interrupted, delayed, changed, or affected by events outside our control.",
                "You should not rely on Outflō as the sole copy of information that is irreplaceable or independently required to be preserved.",
            ],
        },
        {
            number: "11",
            title: "Changes to the Service",
            paragraphs: [
                "Outflō is an evolving system. We may add, change, suspend, replace, or remove features as the product develops.",
                "We may also change technical requirements or discontinue parts of the service when reasonably necessary for security, reliability, legal compliance, or continued development.",
            ],
        },
        {
            number: "12",
            title: "Ending Your Use",
            paragraphs: [
                "You may stop using Outflō at any time.",
                "Where account deletion or another account-ending process is available, the handling of personal information associated with that process is governed by the Privacy Policy and applicable law.",
                "We may suspend or terminate access when reasonably necessary to protect the service, other users, legal rights, or system security, or when these Terms are materially violated.",
            ],
        },
        {
            number: "13",
            title: "Disclaimer of Warranties",
            paragraphs: [
                "To the maximum extent permitted by applicable law, Outflō is provided on an \"as is\" and \"as available\" basis.",
                "We do not warrant that the service will always be uninterrupted, error-free, secure, or suitable for every purpose, or that every computation, resolution, integration, or output will be complete or accurate.",
                "Nothing in these Terms excludes warranties or rights that cannot lawfully be excluded.",
            ],
        },
        {
            number: "14",
            title: "Limitation of Liability",
            paragraphs: [
                "To the maximum extent permitted by applicable law, Outflō and its owners, operators, affiliates, employees, and service providers will not be liable for indirect, incidental, special, consequential, exemplary, or punitive damages arising from or relating to your use of the service.",
                "To the maximum extent permitted by applicable law, the total liability arising from or relating to the service will not exceed the greater of the amount you paid to Outflō during the twelve months before the event giving rise to the claim or 100 United States dollars.",
                "These limitations do not apply where liability cannot lawfully be limited or excluded.",
            ],
        },
        {
            number: "15",
            title: "Governing Law and Disputes",
            paragraphs: [
                "These Terms and any dispute arising from or relating to them or the service are governed by the laws of the State of Florida, without regard to conflict-of-law principles.",
                "Unless applicable law requires otherwise, disputes arising from or relating to these Terms or Outflō will be brought in the state or federal courts located in Miami-Dade County, Florida.",
            ],
        },
        {
            number: "16",
            title: "Changes to These Terms",
            paragraphs: [
                "We may revise these Terms as Outflō changes or when legal, operational, or security requirements make an update appropriate.",
                "When the Terms change, the current document will identify its update through a canonical Outflō temporal Instant.",
                "If a change materially affects your rights or obligations, we may provide additional notice where appropriate or required by law.",
            ],
        },
        {
            number: "17",
            title: "General Terms",
            paragraphs: [
                "These Terms, together with any policies or additional terms expressly incorporated into them, constitute the agreement governing your use of Outflō.",
                "If any provision is found unenforceable, the remaining provisions remain in effect to the extent permitted by law.",
                "A failure to enforce a provision is not a waiver of the right to enforce it later.",
                "You may not transfer your rights or obligations under these Terms without our consent. We may transfer these Terms as part of a reorganization, financing, acquisition, sale, or transfer of the service or its operator, subject to applicable law.",
            ],
        },
        {
            number: "18",
            title: "Contact",
            paragraphs: [
                "Questions about these Terms may be directed to Outflō using the legal contact information provided by the service.",
                "Before these Terms are published for production use, Outflō's legal operator name, legal contact email, and applicable mailing address must be supplied here.",
            ],
        },
    ],
};
