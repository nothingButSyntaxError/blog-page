import Link from 'next/link'

function Header() {
  return (
    <header className="mx-auto flex max-w-6xl justify-between p-5 font-fredoka">
      <div className="flex items-center space-x-5">
        <Link href="/">
          <img
            // src="https://links.papareact.com/yvf"
            src="/SB.png"
            className="w-20 cursor-pointer object-contain"
            alt="logo"
          />
        </Link>
        <div className="hidden items-center space-x-5 md:inline-flex">
          <h3>About</h3>
          <h3>Contact</h3>
          <h3 className="rounded-full bg-[#457b9d] px-4 py-1 text-white">
            Follow
          </h3>
        </div>
      </div>
      <div className="flex items-center space-x-5 text-[#457b9d]">
        <h3>Sign In</h3>
        <h3 className="rounded-full border border-[#457b9d] px-4 py-1">
          Get Started
        </h3>
      </div>
    </header>
  )
}

export default Header
