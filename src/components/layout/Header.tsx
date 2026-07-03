import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-obsidian border-b border-white/5 flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between md:px-8">
      <div className="flex min-w-0 items-center">
        <Link
          to="/"
          className="inline-flex min-w-0 items-center"
          aria-label="Amplify X-Change by Amplify Solutions Group"
        >
          <img
            src="/brand/amplify-xchange-wordmark.svg"
            alt="Amplify X-Change by Amplify Solutions Group"
            className="h-12 w-auto max-w-[270px] sm:max-w-[340px]"
          />
        </Link>
      </div>
      <nav className="flex w-full justify-center gap-5 sm:w-auto sm:justify-end">
        <Link
          to="/"
          className="text-white/70 hover:text-brass-gold text-sm font-medium transition-colors"
        >
          Home
        </Link>
        <Link
          to="/quiz"
          className="text-white/70 hover:text-brass-gold text-sm font-medium transition-colors"
        >
          Enquiry
        </Link>
        <Link
          to="/faq"
          className="text-white/70 hover:text-brass-gold text-sm font-medium transition-colors"
        >
          FAQ
        </Link>
      </nav>
    </header>
  );
}
