import { Button } from "@/components/ui/button";
import Header from '@/components/header'

export default function Home() {
  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8 pt-20">
        {/* Hero Section */}
        <section className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl font-bold mb-4 glitch glitch-text" data-text="CODEMASTER">CODEMASTER</h1>
            <p className="text-lg mb-8">Dive into the cyberpunk world of Codemaster, a 3D game where reality glitches and code is your weapon.</p>
            <Button variant="secondary">
              Download Now
            </Button>
          </div>
          <div>
            <img
              src="https://scontent.fmnl17-3.fna.fbcdn.net/v/t1.15752-9/477297299_1005315758108188_3221723112317890974_n.png?_nc_cat=106&ccb=1-7&_nc_sid=0024fc&_nc_eui2=AeEiFdSJ5whOHsHmkzUCJLo50h4FMRhtEFjSHgUxGG0QWIhFdJzJiXp7ws25TYbepBdWpNx5jhUdjU792ztRuAwq&_nc_ohc=LVyLeC-Hw2AQ7kNvwFMsQwG&_nc_oc=AdnDrvERH3dfHgBSxg-W4QPo_9C2_vmfN1IJQ9ByfIIqyefcVbre3ONxOxxh63KTY_w&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.fmnl17-3.fna&oh=03_Q7cD2AElKNxvqtfbZJ7iVJIyCH6K0WGFxYGiCk0cOCVB7rLH8g&oe=683982A4"
              alt="3D Game Humanoid Design"
              className="rounded-lg shadow-md"
            />
          </div>
        </section>

        {/* Videos Section */}
        <section id="videos" className="mb-16">
          <h2 className="text-3xl font-semibold mb-4 glitch glitch-text" data-text="Videos">Videos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Example Video Cards */}
            <div className="shadow-md rounded-lg overflow-hidden">
              <img src="/enemy.png" alt="Gameplay 1" className="w-full" />
            </div>
            <div className="shadow-md rounded-lg overflow-hidden">
              <img src="/blank.png" alt="Gameplay 2" className="w-full" />
            </div>
            <div className="shadow-md rounded-lg overflow-hidden">
              <img src="/code.png" alt="Gameplay 3" className="w-full" />
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section id="about" className="mb-16">
          <h2 className="text-3xl font-semibold mb-4 glitch glitch-text" data-text="About Us">About Us</h2>
          <p className="text-lg">We are a team of passionate developers dedicated to creating immersive and innovative gaming experiences. Our mission is to push the boundaries of technology and storytelling.</p>
        </section>

        {/* Developers/Team Section */}
        <section id="team" className="mb-16">
          <h2 className="text-3xl font-semibold mb-4 glitch glitch-text" data-text="Developers/Team">Developers/Team</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Top Center Card */}
            <div className="lg:col-span-3 flex justify-center">
              <div className="bg-secondary/10 rounded-lg p-4 shadow-md">
                <img 
                  src="https://scontent.fmnl17-8.fna.fbcdn.net/v/t1.15752-9/494359667_2078125056015762_5687764432066165806_n.jpg?stp=dst-jpg_s480x480_tt6&_nc_cat=104&ccb=1-7&_nc_sid=0024fc&_nc_eui2=AeHpzGsfJDx_LOZ8IjvOoP68OVjpwmb9uf85WOnCZv25_1gzcOUiTVxePk8OQE6xeDm0ctwFieuCYvBKkXDfad5y&_nc_ohc=KjGxHcW69xYQ7kNvwGmkJWv&_nc_oc=AdkyjvYTf4gFo07tZDhJaygUg6WlDzDdqSDRRsMpvInYy7NdDfleDVori8Ox0AGooVU&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.fmnl17-8.fna&oh=03_Q7cD2AEhwv0tNgMsE_Vspin31t9j4vH3TmvLmpOLUbjgjp-O-A&oe=683A862A" 
                  alt="Developer 1" 
                  className="rounded-full mx-auto mb-2" 
                  style={{ width: "120px", height: "120px", objectFit: "cover" }}
                />
                <h3 className="text-xl font-semibold text-center">Kate Crystal Miranda</h3>
                <p className="text-center">Project Manager</p>
              </div>
            </div>

            {/* Bottom Row Cards */}
            <div className="bg-secondary/10 rounded-lg p-4 shadow-md">
              <img 
                src="https://scontent.fmnl17-1.fna.fbcdn.net/v/t1.15752-9/494362110_1013423480879738_3474745705217736698_n.jpg?stp=dst-jpg_s480x480_tt6&_nc_cat=100&ccb=1-7&_nc_sid=0024fc&_nc_eui2=AeHN877OYNEUl9kT9UIOeqT5kbczeZe4LNqRtzN5l7gs2uYLJXKCT0QhYM1fy9DiMzCXeCoukXhk3-OQxVk5gGSu&_nc_ohc=pzAsv_PnQU8Q7kNvwEv3Egs&_nc_oc=Adm5aNnEKHO_r7ryUE1r2nwNTMKK-CZqDk2N-MbnpWjxBH5klvJByexeVBh4GLN_kpM&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.fmnl17-1.fna&oh=03_Q7cD2AGpN5jVfvjfpNHe9dy0WtzI4_YnB1N_PUEnXId1EbTBVg&oe=683A8CAD" 
                alt="Developer 2" 
                className="rounded-full mx-auto mb-2" 
                style={{ width: "120px", height: "120px", objectFit: "cover" }}
              />
              <h3 className="text-xl font-semibold text-center">April Joy Garcia</h3>
              <p className="text-center">Game Designer</p>
            </div>
            <div className="bg-secondary/10 rounded-lg p-4 shadow-md">
              <img 
                src="https://scontent.fmnl17-5.fna.fbcdn.net/v/t1.15752-9/494358169_536722239281862_5047116024796021418_n.jpg?stp=dst-jpg_s640x640_tt6&_nc_cat=102&ccb=1-7&_nc_sid=0024fc&_nc_eui2=AeEyy4j6eCSE_lqz3ZFqGelGLUT9xKg2MWctRP3EqDYxZ_epzSHtAz3OZ_nKj8hxr6bvQp1OTh1P2K9rlLtsgzGc&_nc_ohc=IwR_Xuv1cSEQ7kNvwFC429c&_nc_oc=Adm7Dj3uomLrWCsaLrFIE6JD7BOB5nDvpdoaffCoyb8qi-Hq8kEjFmDlJuA-MplGRJU&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.fmnl17-5.fna&oh=03_Q7cD2AFDwiSXz4ynP3jQ7ed2RLXHJk2nVDganpNZSmgKsUqKyQ&oe=683A8F62" 
                alt="Developer 3" 
                className="rounded-full mx-auto mb-2" 
                style={{ width: "120px", height: "120px", objectFit: "cover" }}
              />
              <h3 className="text-xl font-semibold text-center">Gem Anthoinette Abad</h3>
              <p className="text-center">Game Design Document</p>
            </div>
            <div className="bg-secondary/10 rounded-lg p-4 shadow-md">
              <img 
                src="https://scontent.fmnl17-2.fna.fbcdn.net/v/t1.15752-9/494357715_1342605843701353_680978572436998624_n.jpg?stp=dst-jpg_p480x480_tt6&_nc_cat=111&ccb=1-7&_nc_sid=0024fc&_nc_eui2=AeF3cSwo7qKJdhGZLcpF8Y4k16xqzpU-DerXrGrOlT4N6rJLGR4cx4YQW1gaD_k1b2o7cQG9-gZ9hSMyx-mOucKW&_nc_ohc=KMRlz-0bQLUQ7kNvwHGXspF&_nc_oc=Adkb2Z56q88eIVpzpdlbZkKvMMGGnjV5PiNRDNbVjW-TQeevxXVSvIkWRq-QMvXAAAI&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.fmnl17-2.fna&oh=03_Q7cD2AFGp-jyMflK96n_knuqs5XE8NdfWD2nTPVaBw50NzS_rw&oe=683A7F17" 
                alt="Developer 4" 
                className="rounded-full mx-auto mb-2" 
                style={{ width: "120px", height: "120px", objectFit: "cover" }}
              />
              <h3 className="text-xl font-semibold text-center">Wesly Saul</h3>
              <p className="text-center">Game Programmer</p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="mb-16">
          <h2 className="text-3xl font-semibold mb-4 glitch glitch-text" data-text="Contact">Contact</h2>
          <p className="text-lg">Reach out to us for collaborations, feedback, or any inquiries.</p>
          <p>Email: CODEMASTER@example.com</p>
          <p>Phone: +639451502417</p>
        </section>
      </div>
    </>
  );
}
