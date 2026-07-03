import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-obsidian border-b border-white/5 flex items-center justify-between px-4 py-3 md:px-8">
      <div className="flex items-center gap-3">
        <Link to="/" className="text-brass-gold font-display font-light text-2xl tracking-tight">
          Amplify X-Change
        </Link>
        <span className="text-white/40 text-sm hidden sm:inline">
          Online SMSF Property Pathway
        </span>
      </div>
      <nav className="flex gap-5">
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
