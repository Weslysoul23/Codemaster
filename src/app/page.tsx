
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
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
      <section className="mb-16">
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
            <img src="https://scontent.fmnl17-6.fna.fbcdn.net/v/t39.30808-1/488905348_4002329013427316_2377804480582801052_n.jpg?stp=cp6_dst-jpg_s200x200_tt6&_nc_cat=109&ccb=1-7&_nc_sid=1d2534&_nc_eui2=AeFiKMnqBMUPL-CdRrL7_JSTvlsM6Dlc31a-WwzoOVzfVk4U7f1YKUBrgzykJ2Oa2y2baftLmBXTuj_5F2pDZKF9&_nc_ohc=LG-dKi0iYlYQ7kNvwEw48V8&_nc_oc=Adlazm0snoi4PgIJwS3rHEPQcJKvCp3NlanBD4TwLVzJ7Tt5iit4UwTLfTE9pIXy2PY&_nc_zt=24&_nc_ht=scontent.fmnl17-6.fna&_nc_gid=lauJpPnZ16BwE_zPNvmi7Q&oh=00_AfEa49FsYckuVk4BpeKqIUqj9TXIiGIRZaE_955BLdqJ9A&oe=6817E030" alt="Developer 1" className="rounded-full mx-auto mb-2" />
            <h3 className="text-xl font-semibold text-center">Kate Crystal Miranda</h3>
            <p className="text-center">Project Manager</p>
          </div>
          <div className="bg-secondary/10 rounded-lg p-4 shadow-md">
            <img src="https://scontent.fmnl17-5.fna.fbcdn.net/v/t39.30808-1/466511401_1303190731052429_7539106753055886799_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=102&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeGX67vAxoLE_imbXFTNh9gwcek4G0Zw5KBx6TgbRnDkoP_j5NI1ZIJ50BuZZCHr00YR9DdRm350eZCjrhibrtRB&_nc_ohc=Xs7pp97wxg8Q7kNvwEVoTz7&_nc_oc=AdmOk2gfdHNULuB9ViM2WDvoM17deZRfT17FTau77KCCk5DwbZZyC4n6KsOxCn8FNiY&_nc_zt=24&_nc_ht=scontent.fmnl17-5.fna&_nc_gid=B50dPKVacjYb77zJzAt7OA&oh=00_AfHUkB2ecHiQ6t-r8lWBOLeheZSGpc364N59Eb6MuvPU7g&oe=681803D9" alt="Developer 2" className="rounded-full mx-auto mb-2" />
            <h3 className="text-xl font-semibold text-center">April Joy Garcia</h3>
            <p className="text-center">Game Designer</p>
          </div>

          <div className="bg-secondary/10 rounded-lg p-4 shadow-md">
            <img src="https://scontent.fmnl17-8.fna.fbcdn.net/v/t39.30808-1/492358102_3998366777051860_3884219696951427170_n.jpg?stp=cp6_dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeFrGnJDte2LQWxoXHmszCqZ8RoZmD6ej8XxGhmYPp6PxX7yjPXa39oVzcFhGax48aQJBXj9HImHEmI_vvGJfH0k&_nc_ohc=DLUlh-9Hx28Q7kNvwEzIgVM&_nc_oc=AdkADOhJISnH4aeodUmUcoShd2CpiqLCh48ETSbWRqGJ1wT4BEj4EDutg38f8dFzyg0&_nc_zt=24&_nc_ht=scontent.fmnl17-8.fna&_nc_gid=NG8IhMP2zPY4yTwdkXx2IA&oh=00_AfESRpfG1-mpTxCoXJCeMlkYbfW7z_EMlgdyoTC5vsor4w&oe=68180732" alt="Developer 3" className="rounded-full mx-auto mb-2" />
            <h3 className="text-xl font-semibold text-center">Gem Anthoinette Abad </h3>
            <p className="text-center">Game Design Document</p>
            
          </div>
          <div className="bg-secondary/10 rounded-lg p-4 shadow-md">
            <img src="https://scontent.fmnl17-3.fna.fbcdn.net/v/t39.30808-6/480439068_945483927670069_2434577321862454364_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeGOzCEJvtYgSq9kAtjKusEgiQ-htmMcP_qJD6G2Yxw_-putO_BGBNF0qwozjyFrbmDv-GvvgXcCO90awC9K4j_9&_nc_ohc=h1CXXOR5pCgQ7kNvwGWHPtF&_nc_oc=AdncJPOWmVc87U3F6tsEbW8pK1v97uXM1V41P1OFpLeAKvmm98t_JykpoRWmP1AikC8&_nc_zt=23&_nc_ht=scontent.fmnl17-3.fna&_nc_gid=YXO8DtNBU7vQ7pwHriidPQ&oh=00_AfGxJHIBzzDX-o2ewrcVZjyBP3uBYNn35-GESa8K-4qRxg&oe=6817E5D4" alt="Developer 3" className="rounded-full mx-auto mb-2" />
            <h3 className="text-xl font-semibold text-center">Wesly Saul </h3>
            <p className="text-center">Game Programmer</p>
            
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-4 glitch glitch-text" data-text="Contact">Contact</h2>
        <p className="text-lg">Reach out to us for collaborations, feedback, or any inquiries.</p>
        <p>Email: CODEMASTER@example.com</p>
        <p>Phone: +639451502417</p>
      </section>
    </div>
  );
}
