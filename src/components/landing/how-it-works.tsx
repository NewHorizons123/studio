const steps = [
  {
    step: '01',
    title: 'Enter Your Profile',
    description: 'Tell us your study field, academic level, and country of interest to get started.',
  },
  {
    step: '02',
    title: 'AI-Powered Discovery',
    description: 'Our AI engine instantly finds matching scholarships and potential academic supervisors for you.',
  },
  {
    step: '03',
    title: 'Generate Application Drafts',
    description: 'Automatically create drafts for your Statement of Purpose (SoP), CV, and outreach emails.',
  },
  {
    step: '04',
    title: 'Receive Your Personalized Plan',
    description: 'Get a customized study plan with application timelines and visa checklists.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 sm:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            A simple, streamlined process to guide you from ambition to admission.
          </p>
        </div>
        <div className="relative max-w-4xl mx-auto">
          <div className="hidden md:block absolute top-8 bottom-8 left-1/2 w-px bg-border -translate-x-1/2"></div>
          <div className="grid gap-12 md:grid-cols-2 md:gap-x-12">
            {steps.map((step, index) => (
              <div key={index} className={`relative flex items-start gap-6 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="md:hidden absolute top-0 -left-4 h-full w-px bg-border"></div>
                <div className="relative flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground font-bold text-2xl font-headline z-10">
                  {step.step}
                </div>
                <div className={`pt-2 ${index % 2 !== 0 ? 'md:text-right' : ''}`}>
                  <h3 className="text-xl font-semibold font-headline">{step.title}</h3>
                  <p className="mt-2 text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
