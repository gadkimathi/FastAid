import Navbar from '@/components/Navbar';

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              How FAID Works
            </h1>
            <p className="text-lg text-gray-600">
              A transparent and efficient way to support humanitarian projects
            </p>
          </div>

          <div className="space-y-16">
            {/* For Donors */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">For Donors</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                      <span className="text-primary font-bold">1</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">Browse Projects</h3>
                  </div>
                  <p className="text-gray-600">
                    Explore verified humanitarian projects from around the world. Each project includes detailed information about its goals, progress, and impact.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                      <span className="text-primary font-bold">2</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">Make a Donation</h3>
                  </div>
                  <p className="text-gray-600">
                    Choose a project and make a donation using cryptocurrency. Your contribution is recorded on the blockchain for complete transparency.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                      <span className="text-primary font-bold">3</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">Track Impact</h3>
                  </div>
                  <p className="text-gray-600">
                    Follow the project's progress in real-time. View updates, milestones, and the impact of your donation through our transparent tracking system.
                  </p>
                </div>
              </div>
            </section>

            {/* For Organizations */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">For Organizations</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                      <span className="text-primary font-bold">1</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">Create a Project</h3>
                  </div>
                  <p className="text-gray-600">
                    Submit your humanitarian project for verification. Include detailed information about your goals, timeline, and budget.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                      <span className="text-primary font-bold">2</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">Receive Funding</h3>
                  </div>
                  <p className="text-gray-600">
                    Once verified, your project will be listed on the platform. Receive donations directly through our secure blockchain-based system.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                      <span className="text-primary font-bold">3</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">Report Progress</h3>
                  </div>
                  <p className="text-gray-600">
                    Keep donors informed with regular updates on project progress, milestones, and impact metrics.
                  </p>
                </div>
              </div>
            </section>

            {/* Technology */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Technology</h2>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Blockchain Integration</h3>
                    <p className="text-gray-600 mb-4">
                      FAID uses blockchain technology to ensure:
                    </p>
                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                      <li>Transparent transaction records</li>
                      <li>Secure fund transfers</li>
                      <li>Immutable project history</li>
                      <li>Smart contract automation</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Verification System</h3>
                    <p className="text-gray-600 mb-4">
                      Our platform includes:
                    </p>
                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                      <li>Project verification process</li>
                      <li>Progress tracking tools</li>
                      <li>Impact measurement metrics</li>
                      <li>Real-time reporting system</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
} 