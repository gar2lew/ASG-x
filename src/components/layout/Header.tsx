import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="brand-header bg-obsidian/95 border-b border-brass-gold/20 flex flex-col gap-4 px-4 py-4 shadow-[0_18px_48px_rgba(0,0,0,0.5)] sm:flex-row sm:items-center sm:justify-between sm:px-6 md:px-8 lg:px-10">
      <div className="flex min-w-0 items-center">
        <Link
          to="/"
          className="brand-lockup-link inline-flex min-w-0 items-center"
          aria-label="Amplify X-Change by Amplify Solutions Group"
        >
          <img
            src="/brand/amplify-xchange-wordmark.svg"
            alt="Amplify X-Change by Amplify Solutions Group"
            className="h-14 w-auto max-w-[305px] sm:h-[4.5rem] sm:max-w-[430px] lg:h-20 lg:max-w-[490px]"
          />
        </Link>
      </div>
      <nav className="flex w-full justify-center gap-5 sm:w-auto sm:justify-end sm:gap-6">
        <Link
          to="/"
          className="text-white/75 hover:text-brass-gold text-sm font-semibold transition-colors"
        >
          Home
        </Link>
        <Link
          to="/quiz"
          className="text-white/75 hover:text-brass-gold text-sm font-semibold transition-colors"
        >
          Enquiry
        </Link>
        <Link
          to="/faq"
          className="text-white/75 hover:text-brass-gold text-sm font-semibold transition-colors"
        >
          FAQ
        </Link>
      </nav>
    </header>
  );
}
