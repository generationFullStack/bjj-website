// app/aboutus/page.jsx
import Image from "next/image";

export default function AboutUsPage() {
  return (
    <div className="bg-[#111] min-h-screen text-white">
      {/* About Section */}
      <div className="py-12 text-center bg-gradient-to-tr from-blue-500 to-white oxygen text-2xl">
        <h1 className="text-4xl mb-4">About Us</h1>
        <p>
          Our team consists of prominent women who seek to create futuristic
          products to solve some of the biggest technical issues associated with
          music streaming.
        </p>
        <p>
          Feel free to contact any executive to assist you with your product.
        </p>
      </div>

      {/* Team Section */}
      <h2 className="text-center text-3xl my-8 nunito">Our Team</h2>
      <div className="flex flex-wrap justify-center gap-2 px-2 max-w-[1300px] mx-auto">
        {/* Team Member 1 */}
        <div className="w-full sm:w-1/3 mb-4 px-2">
          <div className="shadow-lg m-2">
            <Image
              src="https://images.unsplash.com/photo-1573002649606-a7cb9846805c?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTYzMzY1MDI4OQ&ixlib=rb-1.2.1&q=85"
              alt="Nikita Costa"
              width={500}
              height={500}
              className="w-full h-auto object-cover"
            />
            <div className="px-4 py-2 cormorant">
              <h2 className="text-center text-2xl nunito">Nikita Costa</h2>
              <p className="text-gray-500 text-center title">CEO & Founder</p>
              <p>
                Nikita is the founder of Palavah. She's super passionate about
                music and considers herself a music nerd.
              </p>
              <p>nikita7@gmail.com</p>
              <button className="w-full py-2 mt-2 text-white bg-gradient-to-tr from-blue-500 to-white hover:from-blue-400 hover:to-white text-center cursor-pointer biorhyme">
                Contact
              </button>
            </div>
          </div>
        </div>

        {/* Team Member 2 */}
        <div className="w-full sm:w-1/3 mb-4 px-2">
          <div className="shadow-lg m-2">
            <Image
              src="/images/pan.jpg"
              alt="Pan"
              width={500}
              height={500}
              className="w-full h-auto object-cover"
            />
            <div className="px-4 py-2 cormorant">
              <h2 className="text-center text-2xl nunito">Pan</h2>
              <p className="text-gray-500 text-center title">
                Creative Director
              </p>
              <p>
                Nyla is a superb web designer who strives to immerse users in
                her world and never leave.
              </p>
              <p>nyla8@gmail.com</p>
              <button className="w-full py-2 mt-2 text-white bg-gradient-to-tr from-blue-500 to-white hover:from-blue-400 hover:to-white text-center cursor-pointer biorhyme">
                Contact
              </button>
            </div>
          </div>
        </div>

        {/* Team Member 3 */}
        <div className="w-full sm:w-1/3 mb-4 px-2">
          <div className="shadow-lg m-2">
            <Image
              src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTYzMzY1MDc4OA&ixlib=rb-1.2.1&q=85"
              alt="Nellie Sawayama"
              width={500}
              height={500}
              className="w-full h-auto object-cover"
            />
            <div className="px-4 py-2 cormorant">
              <h2 className="text-center text-2xl nunito">Nellie Sawayama</h2>
              <p className="text-gray-500 text-center title">Writer</p>
              <p>
                Nellie is a passionate writer who discusses music albums and
                their impact in the industry.
              </p>
              <p>nellie9@gmail.com</p>
              <button className="w-full py-2 mt-2 text-white bg-gradient-to-tr from-blue-500 to-white hover:from-blue-400 hover:to-white text-center cursor-pointer biorhyme">
                Contact
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
