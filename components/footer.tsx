import { Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full py-6 px-4 mt-12 border-t">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <span>🌟 Built with ❤️ by</span>
          <a
            href="https://github.com/oussama-zbair"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-600 flex items-center gap-2"
          >
            Oussama Zbair
            <Github className="w-4 h-4" />
          </a>
        </div>
        <p className="text-sm text-muted-foreground">
          © 2025 All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}