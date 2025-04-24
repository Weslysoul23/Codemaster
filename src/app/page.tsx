
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-4xl font-bold mb-4 glitch glitch-text" data-text="Code Glitch 3D">Code Glitch 3D</h1>
          <p className="text-lg mb-8">Dive into the cyberpunk world of Codemaster, a 3D game where reality glitches and code is your weapon.</p>
          <Button variant="secondary">
            Download Now
          </Button>
        </div>
        <div>
          <img
            src="https://picsum.photos/800/600"
            alt="3D Game Humanoid Design"
            className="rounded-lg shadow-md"
          />
        </div>
      </section>

      {/* Videos Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-4 glitch glitch-text" data-text="Videos">Videos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Example Video Cards */}
          <div className="shadow-md rounded-lg overflow-hidden">
            <img src="https://picsum.photos/400/300" alt="Gameplay 1" className="w-full" />
          </div>
          <div className="shadow-md rounded-lg overflow-hidden">
            <img src="https://picsum.photos/400/300" alt="Gameplay 2" className="w-full" />
          </div>
          <div className="shadow-md rounded-lg overflow-hidden">
            <img src="https://picsum.photos/400/300" alt="Gameplay 3" className="w-full" />
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-4 glitch glitch-text" data-text="About Us">About Us</h2>
        <p className="text-lg">We are a team of passionate developers dedicated to creating immersive and innovative gaming experiences. Our mission is to push the boundaries of technology and storytelling.</p>
      </section>

      {/* Developers/Team Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-4 glitch glitch-text" data-text="Developers/Team">Developers/Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Example Team Member Cards */}
          <div className="bg-secondary/10 rounded-lg p-4 shadow-md">
            <img src="https://picsum.photos/100/100" alt="Developer 1" className="rounded-full mx-auto mb-2" />
            <h3 className="text-xl font-semibold text-center">John Doe</h3>
            <p className="text-center">Lead Developer</p>
          </div>
          <div className="bg-secondary/10 rounded-lg p-4 shadow-md">
            <img src="https://picsum.photos/100/100" alt="Developer 2" className="rounded-full mx-auto mb-2" />
            <h3 className="text-xl font-semibold text-center">Jane Smith</h3>
            <p className="text-center">Art Director</p>
          </div>
          <div className="bg-secondary/10 rounded-lg p-4 shadow-md">
            <img src="https://picsum.photos/100/100" alt="Developer 3" className="rounded-full mx-auto mb-2" />
            <h3 className="text-xl font-semibold text-center">Peter Jones</h3>
            <p className="text-center">Sound Designer</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-4 glitch glitch-text" data-text="Contact">Contact</h2>
        <p className="text-lg">Reach out to us for collaborations, feedback, or any inquiries.</p>
        <p>Email: contact@example.com</p>
        <p>Phone: +1 555-123-4567</p>
      </section>
    </div>
  );
}
