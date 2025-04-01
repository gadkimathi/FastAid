import Navbar from '@/components/Navbar';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              About FAID
            </h1>
            <p className="text-lg text-gray-600">
              Empowering humanitarian aid through blockchain technology
            </p>
          </div>

          <div className="prose prose-lg mx-auto">
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-600 mb-4">
                FAID (Fair Aid) is a decentralized platform that revolutionizes humanitarian aid by leveraging blockchain technology to ensure transparency, accountability, and efficiency in aid distribution.
              </p>
              <p className="text-gray-600">
                We believe that every person deserves access to basic necessities and opportunities for a better life. Our platform connects donors directly with humanitarian projects, eliminating intermediaries and ensuring that aid reaches those who need it most.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Values</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Transparency</h3>
                  <p className="text-gray-600">
                    Every transaction and project is recorded on the blockchain, ensuring complete transparency and traceability of aid distribution.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Accountability</h3>
                  <p className="text-gray-600">
                    Project progress and fund utilization are tracked in real-time, holding organizations accountable for their actions.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Efficiency</h3>
                  <p className="text-gray-600">
                    By eliminating intermediaries and automating processes, we ensure that aid reaches beneficiaries faster and more efficiently.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Impact</h3>
                  <p className="text-gray-600">
                    We focus on measurable outcomes and long-term impact, ensuring that aid creates sustainable positive change in communities.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Team</h2>
              <p className="text-gray-600 mb-4">
                FAID is built by a team of passionate individuals who believe in the power of technology to create positive change. Our team combines expertise in blockchain technology, humanitarian aid, and software development to create a platform that makes a difference.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Get Involved</h2>
              <p className="text-gray-600 mb-4">
                Whether you're a donor, a humanitarian organization, or a developer, there are many ways to get involved with FAID:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Support projects by making donations</li>
                <li>Create and manage humanitarian projects</li>
                <li>Contribute to our open-source codebase</li>
                <li>Spread the word about FAID</li>
              </ul>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
} 